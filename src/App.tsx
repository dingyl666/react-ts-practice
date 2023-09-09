import React from 'react';
import './App.css';
import { AppContainerCss } from './app-css-in-js';
import StudyRecordList from "./components/StudyRecordList";


function App() {
  return (
      <AppContainerCss>
        <StudyRecordList />
      </AppContainerCss>
  );
}

export default App;
