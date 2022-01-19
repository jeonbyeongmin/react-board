import styled from "@emotion/styled";

function Header() {
  return (
    <HeaderWrapper>
      <h3>Board CRUD</h3>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: block;
  height: 200px;
  width: 100%;
`;

export default Header;
