"use client";

import { FC, Suspense } from "react";

import styles from "./flow.module.scss";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Suspense>
        <div>{children}</div>
      </Suspense>
    </div>
  );
};

export default Layout;
