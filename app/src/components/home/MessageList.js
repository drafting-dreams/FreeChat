import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as messageActions from '../../actions/messageActions';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }


  //componentDidUpdate message length management
  componentDidUpdate(prevProps) {
    this.props.scrollDown();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    console.log("message un mount");
  }


  render() {
    const user = this.props.userInfo;
    const friend = this.props.chattingWith;
    const item = this.props.messages.filter(message => message.friendId === friend.id);

    return (
      <div>
        {
          this.props.messages.length > 0 && item.length > 0
            ?
            item[0].messageContents.map(message =>
              <div key={Math.random()}>
                <div className="clearFix">
                  <div>
                    <div className={"message " + (message.sender === user.email ? 'me' : 'friend')}>
                      <i className="avatar far fa-user"/>
                      <div className="content">
                        <div className={"bubble bubblePrimary " + (message.sender === user.email ? 'right' : 'left')}>
                          <div className="bubbleCont">
                            <div className="plain">
                              {
                                message.translated && message.translated !== message.content &&
                                <pre className="translated">{message.translated}</pre>
                              }
                              <pre
                                className={`origin ${(message.translated && message.translated !== message.content) ? '' : 'big'}`}>{message.content}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : null
        }
        {
          this.props.sending &&
          <div>
            <div className="clearFix">
              <div>
                <div className="message me">
                  <i className="avatar far fa-user"/>
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
        }
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
