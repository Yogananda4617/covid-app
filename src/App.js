import './App.css';
import React,{ useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import data from "./data.json";
import Header from './Header/Header';
import Routers from './Routers';

function App() {
  const [content,setContent]=useState(data);

  const statenames = Object.keys(content);
  // console.log(statenames);

  let districtnames=[];

  statenames.map ((state) => {
    return (
      districtnames.push(...Object.keys(content[`${state}`]["districtData"]))
    )
  })
  // console.log(districtnames);

  let districtData=[];

  statenames.map ((state) => {
    return (
      districtData.push((content[`${state}`]["districtData"]))
    )
  })
  // console.log(districtData);

  return (
    <Router>
      <Header/>
      <Routers 
        statenames={statenames}
        districtnames={districtnames}
        districtData={districtData}
        content={content}
      />
    </Router>
  );
}

export default App;
