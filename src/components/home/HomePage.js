import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageActions from '../../actions/messageActions';
import * as languageActions from '../../actions/languageActions';
import Dialogue from './MessageList';
import LanguageBox from './LanguageBox';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
      sending: false,
      showLanguagePanel: false,
      language: props.language.language,
      messageLength: props.messageListLength,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.removeLanguagePanel = this.removeLanguagePanel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('willreceive', nextProps);
    if(nextProps.language.language !== this.state.language)
      this.setState({language: nextProps.language.language});
    if(nextProps.messageListLength > this.state.messageLength)
      this.scrollableDiv.scrollTop = this.scrollableDiv.scrollHeight;
  }

  checkEnter(e) {
    if(e.ctrlKey && e.key === 'Enter') {
      this.textarea.value += '\n';
      return;
    }
    if(e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    if(!this.state.message.trim())
      return;
    this.setState({sending: true});
    this.props.actions.sendAMessage({sender: 'me', content: this.state.message})
      .then(() => {
        this.setState({message:'', sending: false});
        })
      .catch((err) => {
        this.setState({message:'', sending: false});
        console.log(err);
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

  render() {
    const languageList = this.props.language.languages;
    const languageLabel = languageList.find(value =>
      value.code === this.state.language).language
    return (
      <div className="main">
        <div className="mainInner">
          <div style={{"height": "100%"}}>
            <div id="chatArea" className="box chat">
              <div className="boxHead">
                <div className="titleWrapper">Chat without obstacle !!!</div>
              </div>
              <div className="scrollWrapper boxBd" style={{"position": "absolute"}}>
                <div className="boxBd scrollbarDynamic scrollContent"
                     style={{marginBottom: "0", marginRight: "0", height: "421px"}}
                ref={(div) => {this.scrollableDiv = div}}>
                  <Dialogue newMessage={this.state.message} sending={this.state.sending}/>
                </div>
              </div>
              <div className="boxFt">
                <div className="toolBar">
                  <div role="button" className="btn languageBtn" onClick={() =>
                  {this.setState({showLanguagePanel: true})}}>{languageLabel}</div>
                  {this.state.showLanguagePanel ? (
                  <div>
                    <div className="clickBoard" onClick={this.removeLanguagePanel}/>
                    <div className="boxDecorator arrowShadow"/>
                    <div className="boxDecorator arrow"/>
                    <LanguageBox removeLanguagePanel={this.removeLanguagePanel}/>
                  </div>) : null}
                </div>
                <div className="content">
                  <form>
                    <textarea autoComplete="off"
                              autoFocus="off"
                              id="textArea"
                              className="flex"
                              autoCorrect="off"
                              onChange={this.editMessage}
                              onKeyDown={this.checkEnter}
                              ref={(textarea) => {this.textarea = textarea}}/>
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
};

function mapStateToProps(state) {
  return {
    language: state.language,
    messages: state.messages,
    messageListLength: state.scrollBar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, languageActions, messageActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

