import React from 'react';
import '../../style/sign.sass';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SignPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="signWrapper">
        <div className="signContainer">
          <h1 className="signTitle">FreeChat</h1>
          <form className="form">
            <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
                <button type="submit" id="login-button">Login</button>
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

// SignPage.propTypes = {};
//
// function mapStateToProps(state, ownProps) {
//     return {
//         state: state
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignPage);

export default SignPage;
