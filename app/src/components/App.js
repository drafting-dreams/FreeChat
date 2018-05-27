import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {push} from 'react-router-redux';
import HomePage from './home/HomePage';
import SignPage from './sign/SignPage';
import NotFoundPage from './NotFoundPage';
import userApi from "../api/mockUserApi";
import {bindActionCreators} from 'redux';
import * as signActions from "../actions/signActions";
import store from '../store/configureStore';


class App extends React.Component {

  componentDidMount() {
    userApi
      .getUserInfo()
      .then(user => {
        if (user.email) {
          store.dispatch(d => d(signActions.signInSuccess({name: user.username, email: user.email})));
          store.dispatch(d => d(push(`/home/${user.email}`)));
        } else {
        }
      });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignPage}/>
        <Route path="/login" component={SignPage}/>
        <Route path="/home/:id" component={HomePage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({push}, signActions), dispatch)
  };
}

export default (App);
