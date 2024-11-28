"use client";
import { Dropdown, Input, MenuProps, Space } from "antd";
import { FC, HTMLAttributes } from "react";
import {
  DownOutlined,
  NotificationOutlined,
  UserOutlined,
  LoginOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Log In
        </a>
      ),
      icon: <LoginOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Language
        </a>
      ),
      icon: <GlobalOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Support
        </a>
      ),
      icon: <NotificationOutlined />,
    },
  ];

  const router = useRouter();
  return (
    <div
      className={`Header ${className && className}`}
      style={{
        justifyContent: "space-between",
        display: "flex",
        padding: "0.5rem",
      }}
      {...props}
    >
      <a
        style={{ width: "16px", cursor: "pointer", color: "white" }}
        className="headIcon"
        onClick={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      ></a>

      <Input style={{ maxWidth: "50vw" }}></Input>
      <div
        style={{
          borderRadius: "20px",
          padding: "8px",
          background: "white",
        }}
      >
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
