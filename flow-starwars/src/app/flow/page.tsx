"use client";
import { FC, useEffect, useState } from "react";
import { ConfigProvider, Pagination, Spin, theme } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";
import styles from "./flow.module.scss";
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProps,
  Node,
  Edge,
} from "@xyflow/react";
import { AnimatePresence, motion } from "framer-motion";
import { Person, Film, Starship } from "./types";
import HeroDisplay from "@/components/HeroDisplay";

function FlowF(props: ReactFlowProps) {
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();

  useEffect(() => {
    reactFlowInstance.fitView();
  }, [nodes, reactFlowInstance]);

  return (
    <>
      <ReactFlow {...props} />
    </>
  );
}

const Flow: FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const [titleClass, setTitleClass] = useState("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [characterHero, setCharacterHero] = useState<Person>();

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
      fetchData(parseInt(pageFromUrl));
    }
  }, [searchParams]);

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(
        `https://sw-api.starnavi.io/people/?page=${page}`
      );
      const result = await response.json();
      setData(result.results);
      setTotalResults(result.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHeroDetails = async (hero: Person) => {
    console.log(`fetchHeroDetails`, hero);
    try {
      // Fetch hero films and starships
      const filmData = await Promise.all(
        hero.films.map(async (filmId) => {
          const response = await fetch(
            `https://sw-api.starnavi.io/films/${filmId}/`
          );
          return response.json();
        })
      );

      const fetchStarshipsSequentially = async (starshipIds: number[]) => {
        const starshipData = [];
        for (const starshipId of starshipIds) {
          try {
            const response = await fetch(
              `https://sw-api.starnavi.io/starships/${starshipId}/`
            );
            const data = await response.json();
            starshipData.push(data);
          } catch (error) {
            console.error(`Error fetching starship ${starshipId}:`, error);
          }
        }
        return starshipData;
      };

      // Fetch starships sequentially
      const starshipData = await fetchStarshipsSequentially(hero.starships);

      displayGraph(hero, filmData, starshipData);
    } catch (error) {
      console.error("Error fetching hero details:", error);
    }
    setIsFetching(false);
  };

  // Generate nodes and edges for the hero, their films, and starships
  const displayGraph = (hero: Person, films: Film[], starships: Starship[]) => {
    // Calculate the horizontal starting position for starships to center them
    const graphWidth = 800; // Set the width of the graph area
    const spacing = 200; // Space between each starship node

    const totalStarshipWidth = (starships.length - 1) * spacing;
    const totalFilmsWidth = (films.length - 1) * spacing;

    const startXStarship = (graphWidth - totalStarshipWidth) / 2;
    const startXFilms = (graphWidth - totalFilmsWidth) / 2;

    // Define the hero node, central in the graph
    const heroNode = {
      id: `hero-${hero.id}`,
      position: { x: 400, y: 200 },
      data: {
        label: `${hero.name} - Height: ${hero.height}, Mass: ${hero.mass}`,
      },
    };

    // Create nodes for each film
    const filmNodes = films.map((film, index) => ({
      id: `film-${film.id}`,
      position: { x: startXFilms + index * spacing, y: 400 },
      data: { label: film.title },
    }));

    // Create nodes for each starship, centered horizontally
    const starshipNodes = starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      position: { x: startXStarship + index * spacing, y: 600 },
      data: { label: starship.name },
    }));

    // Create edges:
    const edges = [
      // Hero to each film
      ...films.map((film) => ({
        id: `edge-hero-${film.id}`,
        source: `hero-${hero.id}`,
        target: `film-${film.id}`,
      })),

      // Film to only the starships that appear in that film
      ...films.flatMap((film) => {
        // Filter starships that appear in the current film
        const filmStarships = starships.filter((starship) =>
          starship.films.includes(film.id)
        );

        // Create an edge for each matching starship
        return filmStarships.map((starship) => ({
          id: `edge-film-${film.id}-starship-${starship.id}`,
          source: `film-${film.id}`,
          target: `starship-${starship.id}`,
        }));
      }),
    ];

    // Set nodes and edges in React Flow
    setNodes([heroNode, ...filmNodes, ...starshipNodes]);

    setEdges(edges);
  };

  const handleHeroClick = async (hero: Person) => {
    // Start the title slide-up animation
    setTitleClass("title-up");
    setIsFetching(true);
    // Wait for the transition to complete (300ms) before updating the title
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Update the displayed title and fetch hero details
    setCharacterHero(hero);

    await fetchHeroDetails(hero);

    // Reset the title class for future animations
    setTitleClass("");
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    setCharacterHero(undefined);
    setNodes([]);
    setEdges([]);
    router.push(`/flow?page=${page}`);
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage} // This key makes AnimatePresence recognize the page change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <HeroDisplay
            FlowF={FlowF}
            character={characterHero}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            isFetching={isFetching}
            data={data}
            handleHeroClick={handleHeroClick}
            setIsExpanded={setIsExpanded}
            isExpanded={isExpanded}
            titleClass={titleClass}
          />
        </motion.div>
      </AnimatePresence>

      <div className="paginationContainer" style={{ backgroundColor: "black" }}>
        {totalResults ? (
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Pagination
              current={currentPage}
              pageSize={10}
              total={totalResults}
              onChange={onPageChange}
              showSizeChanger={false}
            />
          </ConfigProvider>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default Flow;
