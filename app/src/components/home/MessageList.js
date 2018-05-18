import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as messageActions from '../../actions/messageActions';

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   user: this.props.userInfo,
    //   item: this.props.messages.filter(message => message.friendId === this.props.chattingWith.id),
    // };

    this.getHistoryMessage = this.getHistoryMessage.bind(this);
  }

  componentWillUpdate() {
    console.group("message will update");

  }

  //componentDidUpdate message length management
  componentDidUpdate(prevProps) {
    console.groupEnd("message will update");
    const item = this.props.messages.filter(message => message.friendId === this.props.chattingWith.id);
    if ((item.length > 0 && (item[0].messageContents.length > item[0].messageListLength)) ||
      prevProps.chattingWith.id !== this.props.chattingWith.id) {
      if (item.length > 0 && (item[0].messageContents.length > item[0].messageListLength)) {
        this.props.actions.lenMessageList(this.props.chattingWith.id, item[0].messageContents.length - item[0].messageListLength);
      }
    }
    this.props.scrollDown();
  }

  componentWillUnmount() {
    console.log("message un mount");
  }

  getHistoryMessage() {
    const item = this.props.messages.filter(message => message.friendId === this.props.chattingWith.id);
    this.props.actions.getHistory(this.props.userInfo.id, this.props.chattingWith.id, item[0].end);
  }

  render() {
    const user = this.props.userInfo;
    const friend = this.props.chattingWith;
    const item = this.props.messages.filter(message => message.friendId === friend.id);
    return (
      <div>
        {item.length > 0 && item[0].end > 0 ?
          <div>
            <div className="smallTip" onClick={this.getHistoryMessage}>查看更多消息</div>
          </div> : null
        }
        {
          this.props.messages.length > 0 && item.length > 0 ?

            //.messageContents.map(message =>
            item[0].messageContents.map(message =>
              <div>
                <div className="clearFix">
                  <div>
                    <div className={"message " + (message.sender === user.id ? 'me' : 'friend')}>
                      <img className="avatar" src={"../../static/" + message.sender + ".jpeg"}/>
                      <div className="content">
                        <div className={"bubble bubblePrimary " + (message.sender === user.id ? 'right' : 'left')}>
                          <div className="bubbleCont">
                            <div className="plain">
                              <pre>{message.content}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
        {this.props.sending && (
          <div>
            <div className="clearFix">
              <div>
                <div className="message me">
                  <img className="avatar" src={"../../static/" + user.id + ".jpeg"}/>
                  <div className="content">
                    <div className="bubble bubblePrimary right">
                      <div className="bubbleCont">
                        <div className="plain">
                          <pre>{this.props.newMessage}</pre>
                          <img className="icoLoading" src="../../static/loading.gif"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

}

MessageList.propTypes = {
  messages: PropTypes.array,
  sending: PropTypes.bool.isRequired,
  newMessage: PropTypes.string,
  actions: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  chattingWith: PropTypes.object.isRequired,
  scrollDown: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    userInfo: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messageActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
