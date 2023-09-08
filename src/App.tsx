import React from 'react';
import './App.css';
import SwaggerMini from "./components/SwaggerMini";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<SwaggerMini />} />
            <Route path={'/swagger/:id'} element={<SwaggerMini />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
