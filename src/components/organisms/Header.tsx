import styled from "@emotion/styled";
import { useNavigate } from "react-router";

function Header() {
  const navigator = useNavigate();

  return (
    <HeaderWrapper>
      <h3>Board CRUD</h3>
      <button onClick={() => navigator("/insert")}>new</button>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: block;
  height: 200px;
  width: 100%;
`;

export default Header;
