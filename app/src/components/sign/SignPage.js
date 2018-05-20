import React from 'react';
import '../../style/sign.sass';
import '../../style/styles.sass';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as signActions from '../../actions/signActions';
import userApi from '../../api/mockUserApi';

class SignPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: '',
        password: '',
        confirm: '',
        username: ''
      },
      signingIn: true,
      signState: 'signIn',
    };

    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    userApi
      .getUserInfo()
      .then(user => {
        if (user.email) {
          this.props.actions.signInSuccess(user);
          this.redirect(user.email);
        } else {
          this.setState({signingIn: false});
        }
      });
  }

  signIn(e) {
    e.preventDefault();
    //window.location.href = "http://localhost:3000/home";
    this.setState({signingIn: true});
    const user = this.state.user;

    userApi
      .signIn({email: user.email, password: user.password})
      .then(res => {
        if (res.logged) {
          this.props.actions.signInSuccess({email: res.email, name: res.name});
          this.redirect(res.email);
        } else {
          //todo show toastr
        }
      });
  }

  signUp(e) {
    e.preventDefault();
    const user = this.state.user;
    userApi
      .signUp(user)
      .then(res => {
        //todo check result
      });
  }

  redirect(email) {
    this.setState({signingIn: false});
    this.props.actions.push('/home/' + email);
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
            <input type="text" name="email"
                   onChange={this.updateUserInfo}
                   value={this.state.user.email}
                   autoComplete="off"
                   placeholder="E-mail"/>

            {
              this.state.signState === "signUp" &&
              <input type="text"
                     name="username"
                     onChange={this.updateUserInfo}
                     value={this.state.user.username}
                     autoComplete="off"
                     placeholder="name"/>
            }

            <input type="password"
                   name="password"
                   onChange={this.updateUserInfo}
                   value={this.state.user.password}
                   placeholder="Password"/>


            {
              this.state.signState === "signUp" &&
              <input type="password"
                     name="confirm"
                     onChange={this.updateUserInfo}
                     value={this.state.user.confirm}
                     autoComplete="off"
                     placeholder="confirm"/>
            }

            <button type="submit" id="loginButton"
                    onClick={this.state.signState !== 'signUp' ? this.signIn : this.signUp}
            >
              {(this.state.signState !== 'signUp') ? 'Login' : 'Sign Up'}
            </button>

            <div className="smallTip"
                 style={{color: "white", fontSize: '17px', marginTop: "20px"}}
                 onClick={() => this.setState({signState: 'signUp'})}
            >
              don't have an account?
            </div>
          </form>
        </div>
        <ul className="bg-bubbles">
          <li>扉恰</li>
          <li>FreeChat</li>
          <li/>
          <li/>
          <li/>
          <li>無料チャット</li>
          <li>Kostenloser Chat</li>
          <li/>
          <li/>
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
