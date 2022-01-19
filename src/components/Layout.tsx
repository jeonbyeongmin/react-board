import styled from "@emotion/styled";
import { ReactNode } from "react";
import Header from "./organisms/Header";
import SideBar from "./organisms/SideBar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header />
      <SideBar />
      <Content>{children}</Content>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div``;

const Content = styled.div`
  display: inline-block;
  height: calc(100% - 200px);
  width: calc(100% - 200px);
`;

export default Layout;
