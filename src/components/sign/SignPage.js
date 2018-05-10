import React from 'react';
import '../../style/sign.sass';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as signActions from '../../actions/signActions';

class SignPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        id: '',
        pwd: '',
      },
      signingIn: false,
    };

    this.signIn = this.signIn.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  signIn(e) {
    e.preventDefault();
    //window.location.href = "http://localhost:3000/home";
    this.setState({signingIn: true});

    this.props.actions.signIn(this.state.user).
      then(() => {this.redirect();}).
      catch(err => {console.log(err);this.setState({signingIn: false,
    user: {id: '用户名或密码错误', pwd: ''}
    });});
  }

  redirect() {
    this.setState({signingIn: false});
    this.props.actions.push('/home/' + this.state.user.id);
  }

  updateUserInfo(e) {
    const field = e.target.name;

    let user = Object.assign({}, this.state.user);
    user[field] = e.target.value;

    return this.setState({
      user: user
    });
  }

  render() {
    return (
      <div className="signWrapper">
        <div className="signContainer">
          <h1 className="signTitle">FreeChat</h1>
          <form className="form">
            <input type="text" name="id" onChange={this.updateUserInfo} value={this.state.user.id} placeholder="UserID" />
            <input type="password" name="pwd" onChange={this.updateUserInfo} value={this.state.user.pwd} placeholder="Password" />
            <button type="submit" id="loginButton" onClick={this.signIn}>Login</button>
          </form>
        </div>
        <ul className="bg-bubbles">
          <li>扉恰</li>
          <li>FreeChat</li>
          <li></li>
          <li></li>
          <li></li>
          <li>無料チャット</li>
          <li>Kostenloser Chat</li>
          <li></li>
          <li></li>
          <li>Бесплатный чат</li>
        </ul>
      </div>
    );
  }

}

SignPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        userInfo: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({push}, signActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignPage);

// export default SignPage;