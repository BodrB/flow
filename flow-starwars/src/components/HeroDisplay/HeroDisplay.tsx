// components/HeroDisplay.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Button, ConfigProvider, Divider, Image, Spin, theme } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import {
  Edge,
  ReactFlowProvider,
  Node,
  ReactFlowProps,
  OnNodesChange,
  OnEdgesChange,
} from "@xyflow/react";

import styles from "./HeroDisplay.module.scss";
import { Person } from "@/app/flow/types";

type HeroDisplayProps = {
  FlowF: React.ComponentType<ReactFlowProps>;
  character?: Person | null;
  nodes: Node[]; // Replace with actual node type
  edges: Edge[]; // Replace with actual edge type
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  isFetching: boolean;
  data: Person[];
  handleHeroClick: (character: Person) => void;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
  titleClass: string;
};

const HeroDisplay: React.FC<HeroDisplayProps> = ({
  FlowF,
  character,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  isFetching,
  data,
  handleHeroClick,
  setIsExpanded,
  isExpanded,
  titleClass,
}) => {
  return (
    <div className={styles.heroDisplay}>
      {/* Title section */}
      <div
        className={`title ${titleClass}`}
        style={{
          backgroundColor: "black",
          display: !titleClass ? "flex" : "none",
        }}
      >
        <h2 data-testid="character-name">{character?.name}</h2>
        <div className="expandButton">
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Button
              shape="circle"
              icon={isExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Character details section */}
      <div className={`flowAndInfo`}>
        <div
          className={`characterImageDescription ${isExpanded && "expanded"}`}
          style={{ transition: "all 2s" }}
        >
          <div className="charImage">
            <Image
              alt={character?.name}
              style={{ borderRadius: "50%" }}
              width={100}
              src={`https://starwars-visualguide.com/assets/img/characters/${character?.id}.jpg`}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            {character &&
              Object.entries(character)
                .filter(([key]) => !["created", "edited", "url"].includes(key))
                .map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong>{" "}
                    {Array.isArray(value)
                      ? value.join(", ")
                      : value?.toString()}
                  </p>
                ))}
          </div>
        </div>

        {/* Divider */}
        <Divider
          style={{
            background: "linear-gradient(to top, transparent, white, black)",
            color: "black",
            padding: "8px 0",
            borderColor: "#7cb305",
          }}
        >
          Flow
        </Divider>

        {/* Flow Graph */}
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          {isFetching ? (
            <Spin style={{ display: "flex", alignItems: "center" }} />
          ) : (
            <ReactFlowProvider>
              <FlowF
                minZoom={0.1}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
              />
            </ReactFlowProvider>
          )}
        </div>
      </div>

      {/* Character Buttons */}
      <div className="characters">
        {data.map((character) => (
          <div
            className="button-container"
            style={{ padding: "4px", overflow: "hidden" }}
            key={character.id}
          >
            <Button onClick={() => handleHeroClick(character)}>
              {character.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroDisplay;
