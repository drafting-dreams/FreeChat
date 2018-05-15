import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageActions from '../../actions/messageActions';
import * as languageActions from '../../actions/languageActions';
import Dialogue from './MessageList';
import LanguageBox from './LanguageBox';
import Panel from './Panel';
import socket from '../../socket/socket';


class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);


    socket().then((sock => {
      this.sock = sock;
      sock.send(JSON.stringify({type: 'id', id: this.props.userInfo.id}));
    }));



    this.state = {
      message: '',
      sending: false,
      showLanguagePanel: false,
      language: props.language.language,
      messageLength: props.messageListLength,
      chattingWith: {name: '', id: ''}
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.removeLanguagePanel = this.removeLanguagePanel.bind(this);
    this.findNameById = this.findNameById.bind(this);
  }

  componentWillUnmount() {
    this.sock.close();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.language.language !== this.state.language)
      this.setState({language: nextProps.language.language});
    if (nextProps.messageListLength > this.state.messageLength)
      this.scrollableDiv.scrollTop = this.scrollableDiv.scrollHeight;
  }


  checkEnter(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      this.textarea.value += '\n';
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    if (!this.state.message.trim())
      return;
    this.setState({sending: true});
    this.props.actions.sendAMessage({sender: this.props.userInfo.id,
      content: this.state.message,
    receiver: this.state.chattingWith.id}, false)
      .then(() => {
        this.setState({message: '', sending: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({message: '', sending: false});
      });
    this.textarea.value = '';
  }

  editMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  removeLanguagePanel() {
    this.setState({showLanguagePanel: false})
  }

  findNameById(id) {
    this.setState({chattingWith: {id: id, name: this.props.userInfo.friends.find((friend) => id === friend.id).name}});
  }

  render() {
    const languageList = this.props.language.languages;
    const languageLabel = languageList.find(value =>
      value.code === this.state.language).language
    return (
      <div className="main">
        <div className="mainInner">
          <div className="fuckingInner" style={{"height": "100%"}}>
            <Panel changeParentChattingWith={this.findNameById}/>
            <div id="chatArea" className="box chat">
              <div className="boxHead">
                <div className="titleWrapper">{this.state.chattingWith.name || "Chat without obstacle !!!"}</div>
              </div>
              <div className="scrollWrapper boxBd" style={{"position": "absolute"}}>
                <div className="boxBd scrollbarDynamic scrollContent"
                     style={{marginBottom: "0", marginRight: "0", height: "421px"}}
                     ref={(div) => {
                       this.scrollableDiv = div
                     }}>
                  <Dialogue newMessage={this.state.message}
                            sending={this.state.sending}
                            chattingWith={this.state.chattingWith}
                  />
                </div>
              </div>
              <div className="boxFt">
                <div className="toolBar">
                  <div role="button" className="btn languageBtn" onClick={() => {
                    this.setState({showLanguagePanel: true})
                  }}>{languageLabel}</div>
                  {this.state.showLanguagePanel ? (
                    <div>
                      <div className="clickBoard" onClick={this.removeLanguagePanel}/>
                      <div className="boxDecorator arrowShadow"/>
                      <div className="boxDecorator arrow"/>
                      <LanguageBox removeLanguagePanel={this.removeLanguagePanel}/>
                    </div>) : null}
                </div>
                <div className="content">
                  <form style={{padding: 0}}>
                    <textarea autoComplete="off"
                              autoFocus="off"
                              id="textArea"
                              className="flex"
                              autoCorrect="off"
                              onChange={this.editMessage}
                              onKeyDown={this.checkEnter}
                              ref={(textarea) => {
                                this.textarea = textarea
                              }}/>
                  </form>
                </div>
                <div className="action">
                  <a className="btn btnSend" onClick={this.sendMessage}>Send</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

HomePage.propTypes = {
  language: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  messageListLength: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    language: state.language,
    messages: state.messages,
    messageListLength: state.scrollBar,
    userInfo: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, languageActions, messageActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
