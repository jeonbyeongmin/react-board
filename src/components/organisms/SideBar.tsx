import styled from "@emotion/styled";
import Board from "../molecules/Board";

function SideBar() {
  return (
    <SideBarWrapper>
      <Board />
    </SideBarWrapper>
  );
}

const SideBarWrapper = styled.div`
  display: inline-block;
  height: calc(100% - 200px);
  width: 200px;
`;

export default SideBar;
