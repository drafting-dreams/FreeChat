import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageActions from '../../actions/messageActions';
import Dialogue from './MessageList';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
      sending: false,
      language:'zh'
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
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
    this.setState({sending: true});
    this.props.actions.sendAMessage({sender: 'me', content: this.state.message})
      .then(() => {this.setState({sending: false});})
      .catch((err) => {this.setState({sending: false});console.log(err);});
    this.textarea.value = '';
  }

  editMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  switchLanguage() {
    this.state.language === 'zh' ? (
      this.setState({language: 'en'})
    ) : (
      this.setState({language: 'zh'})
    );
  }

  render() {
    const languageSelector = this.state.language === 'zh' ? (
      <div className="toolBar">
        <div role="button" className="btn languageBtn selected">中</div>
        <div role="button" className="btn languageBtn" onClick={this.switchLanguage}>英</div>
      </div>
    ) : (
      <div className="toolBar">
        <div role="button" className="btn languageBtn" onClick={this.switchLanguage}>中</div>
        <div role="button" className="btn languageBtn selected">英</div>
      </div>
    );
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
                     style={{marginBottom: "0", marginRight: "0", height: "421px"}}>
                  <Dialogue newMessage={this.state.message} sending={this.state.sending}/>
                </div>
              </div>
              <div className="boxFt">
                {languageSelector}
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
  messages: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

