import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import State from './State/State';
import District from './District/District';


const Routers = ({statenames,districtnames,districtData,content}) => {
    // console.log(statenames,districtData,districtnames);
  return (
    <Switch>

    <Route path='/' exact  >
        <Home statenames={statenames} content={content}/>    
    </Route>
            
    <Route path='/state' exact>
        <State statenames={statenames} content={content}/>
    </Route>
        
    <Route path='/district'>
        <District districtData={districtData} districtnames={districtnames}/>
    </Route>

    </Switch>
  )
}

export default Routers