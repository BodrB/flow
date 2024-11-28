"use client";
import { CollapseProps, Image } from "antd";
import { Collapse } from "antd";
import { FC } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import styles from "./foter.module.scss";
import { GlobalOutlined, AimOutlined } from "@ant-design/icons";

const Footer: FC = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span style={{ color: "white" }}>Company</span>,
      children: (
        <ul className={styles.customList} style={{ paddingLeft: "1rem" }}>
          <li>
            <a style={{ color: "white" }}>About us</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Jobs</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Investors</a>
          </li>
        </ul>
      ),
    },
    {
      key: "2",
      label: <span style={{ color: "white" }}>Products</span>,
      children: (
        <ul className={styles.customList} style={{ paddingLeft: "1rem" }}>
          <li>
            <a style={{ color: "white" }}>About us</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Jobs</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Investors</a>
          </li>
        </ul>
      ),
    },
    {
      key: "3",
      label: <span style={{ color: "white" }}>Usefull links</span>,
      children: (
        <ul className={styles.customList} style={{ paddingLeft: "1rem" }}>
          <li>
            <a style={{ color: "white" }}>About us</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Jobs</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Investors</a>
          </li>
        </ul>
      ),
    },
    {
      key: "4",
      label: <span style={{ color: "white" }}>Follow us</span>,
      children: (
        <ul className={styles.customList} style={{ paddingLeft: "1rem" }}>
          <li>
            <a style={{ color: "white" }}>About us</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Jobs</a>
          </li>
          <li>
            <a style={{ color: "white" }}>Investors</a>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div
      className={`${styles.wrapper}`}
      data-testid="footer"
      style={{ backgroundColor: "black" }}
    >
      <div style={{ padding: "1rem", width: "2rem" }}></div>
      <div style={{ gap: "20px", display: "flex", paddingLeft: "16px" }}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Download_on_the_App_Store_Badge_US-UK_RGB_blk.svg"
          style={{ height: "2rem" }}
          alt="Download on the App Store"
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          style={{ height: "2rem" }}
          alt="Get it on Google Play"
        />
      </div>
      <div>
        <Collapse
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 90 : 0}
              style={{ color: "white" }}
            />
          )}
          ghost
          items={items}
        />
      </div>

      <div style={{ display: "grid" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            style={{
              padding: "1rem",
              color: "white",
              display: "flex",
              gap: "8px",
            }}
          >
            <p>Location</p>
            <AimOutlined />
          </div>
          <div
            style={{
              padding: "1rem",
              color: "white",
              display: "flex",
              gap: "8px",
            }}
          >
            <p>Language</p>
            <GlobalOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
