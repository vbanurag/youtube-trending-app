import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from '../List';
import Details from '../Details';

import { fetchVideos } from '../../services/videos';

import './index.css';

const App = (props) => {

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
        </Switch>
    </Router>
  )

}

App.displayName = "App";
export default App;
