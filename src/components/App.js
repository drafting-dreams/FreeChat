import React from 'react';
import { Switch,  Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import NotFoundPage from './NotFoundPage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage}/>
      </Switch>
    );
  }
}

export default App;
