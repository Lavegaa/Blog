import React from "react";
import styled from 'styled-components';
import EditorPage from "../pages/EditorPage";

const Wrapper = styled.div`
  body{
    margin: 0;
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // box-sizing 일괄 설정
  *{
    box-sizing:  inherit;
  }

  //링크 스타일 밑줄 및 색상 무효화
  a{
    text-decoration: inherit;
    color: inherit;
  }
`;

const App = () => {
  return (
    <Wrapper>
      <EditorPage />
    </Wrapper>
  );
};

export default App;
