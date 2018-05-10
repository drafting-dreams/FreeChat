import React from 'react';
import PropTypes from 'prop-types';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../style/panel.sass';

class Panel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const user = this.props.userInfo;
    console.log(user);
    return (
      <div className="panel">
        <div className="panelHeader">
          <div className="avatar">
            <img src={"../../static/" + user.id + ".jpeg"}/>
          </div>
          <div className="info">
            <h3 className="nickName">
              <span className="displayName">{user.name}</span>
            </h3>
          </div>
        </div>
        <div className="scrollWrapper" style={{position: "relative", height: "100%"}}>
          <div className="scrollContent" style={{height: "100%"}}>
            {user.friends.map(friend => (
              <div className="chatItem">
                <div className="avatar">
                  <img src={"../../static/" + friend.id + ".jpeg"}/>
                </div>
                <div className="info">
                  <h3 className="nickName"><span className="nickNameText">{friend.name}</span></h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

}

Panel.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userInfo: state.user
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(mapStateToProps)(Panel);
