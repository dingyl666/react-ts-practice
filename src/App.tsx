import React from 'react';
import './App.css';

import styled from "@emotion/styled";

const MyBtn = styled.button`
  background-color: green;
`
function App() {

  return (
    <div className="App">
      <MyBtn>mybtn</MyBtn>
    </div>
  );
}

export default App;
