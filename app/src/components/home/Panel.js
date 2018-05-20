import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../style/panel.sass';
import socket from '../../socket/socket';
import * as messageActions from '../../actions/messageActions';
import ContactSearcher from "./ContactSearcher";

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
  }


  getFriends() {
  }


  selectFriend(email) {
    this.sock.send(JSON.stringify({type: 'otherId', otherId: email}));

    this.setState({selected: email});

    this.props.changeParentChattingWith(email);
    const item = this.props.messages.filter(message => message.friendId === email);
    const end = item.length > 0 ? item[0].end : -1;

    this.props.actions.getRecentHistory(this.props.userInfo.email, email, end);
  }

  render() {
    const user = this.props.userInfo;
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
        <ContactSearcher/>
        <div className="scrollWrapper" style={{position: "relative", height: "100%"}}>
          <div className="scrollContent" style={{height: "100%"}}>
            {
              user.friends &&
              user.friends.map(friend => (
                <div key={friend.email}
                     className={"chatItem" + (this.state.selected === friend.id ? " active" : "")}
                     onClick={() => {
                       this.selectFriend(friend.id)
                     }}
                >
                  <div className="avatar">
                    <img src={"../../static/" + friend.id + ".jpeg"}/>
                  </div>
                  <div className="info">
                    <h3 className="nickName"><span className="nickNameText">{friend.name}</span></h3>
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
