import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../style/panel.sass';
import socket from '../../socket/socket';
import * as messageActions from '../../actions/messageActions';
import ContactSearcher from "./ContactSearcher";
import api from "../../api/contactApi";
import messageApi from "../../api/messageApi";


class Panel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.sock = socket();
    this.state = {
      selected: ''
    };
    this.selectFriend = this.selectFriend.bind(this);
  }

  componentDidMount() {
    console.log("get contacts");
    this.getFriends();
  }

  getFriends() {
    api.getContact()
      .then(res => {
        this.props.actions.updateFriendList(res.contacts);
      });
  }

  selectFriend(email) {
    // this.sock.send(JSON.stringify({type: 'otherId', otherId: email}));

    this.setState({selected: email});
    this.props.changeParentChattingWith(email);
    this.getHistoryMessage(email);
  }

  getHistoryMessage(email) {
    console.log("get history message");
    messageApi.getHistoryMessage(this.props.userInfo.email, email);
  }

  render() {
    const user = this.props.userInfo;
    return (
      <div className="panel">
        <div className="panelHeader">
          <div className="avatar">
            <img src={`https://ui-avatars.com/api/?length=1&name=${user.name}`}/>
          </div>
          <div className="info">
            <h3 className="nickName">
              <span className="displayName">{user.name}</span>
            </h3>
          </div>
        </div>
        <ContactSearcher/>
        <div className="scrollWrapper" style={{position: "relative", height: "100%"}}>
          <div className="scrollContent" style={{height: "100%"}}>
            {
              user.friends &&
              user.friends.map(friend => (
                <div key={friend.email}
                     id={friend.email}
                     className={"chatItem " + (this.state.selected === friend.email ? "active" : "")}
                     onClick={() => {
                       this.selectFriend(friend.email)
                     }}
                >
                  <div className="avatar">
                    <img src={`https://ui-avatars.com/api/?length=1&name=${friend.name}`}/>
                  </div>
                  <div className="info">
                    <h3 className="nickName">{friend.name}</h3>
                    <h6 className="email">{friend.email}</h6>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  userInfo: PropTypes.object.isRequired,
  changeParentChattingWith: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    userInfo: state.user,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
