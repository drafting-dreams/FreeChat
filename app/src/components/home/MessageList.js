import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as scrollActions from '../../actions/scrollActions';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  //componentDidUpdate message length management
  componentDidUpdate() {
    if(this.props.messages.length > this.props.messageListLength)
      this.props.actions.lenMessageList(this.props.messages.length)
  }

  render() {
    console.log("messagelist", this.props.messages);
    const user = this.props.userInfo;
    const friend = this.props.chattingWith;
    const item = this.props.messages.filter(message =>{return message.friendId === friend.id});
    console.log('item', item);
    return (
      <div>
        <div><div id="historyMessage">查看更多消息</div></div>
        {
          this.props.messages.length>0 && item.length>0 ?

          //.messageContents.map(message =>
          item[0].messageContents.map(message =>
          <div>
            <div className="clearFix">
              <div>
                <div className={"message " + (message.sender===user.id ? 'me' : 'friend')}>
                  <img className="avatar" src={"../../static/" + message.sender + ".jpeg"}/>
                  <div className="content">
                    <div className={"bubble bubblePrimary " + (message.sender===user.id ? 'right' : 'left')}>
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
  messageListLength: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  chattingWith: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    messageListLength: state.scrollBar,
    userInfo: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(scrollActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
