import React, {Component} from "react";
import LanguageBox from './LanguageBox';
import messageApi from "../../api/messageApi";
import {connect} from "react-redux";
import {sendSuccess} from '../../actions/messageActions';
import PropTypes from "prop-types";


class InputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {showLanguagePanel: false};
    this.sendMessage = this.sendMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.removeLanguagePanel = this.removeLanguagePanel.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
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

  editMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  sendMessage() {
    if (!this.state.message.trim())
      return;

    const message = {
      sender: this.props.userInfo.email,
      content: this.state.message,
      receiver: this.props.chattingWith.id
    };

    messageApi.sendMessage(message);

    this.props.sendSuccess(message);
    this.setState({message: ''});
    this.textarea.value = '';
  }

  removeLanguagePanel() {
    this.setState({showLanguagePanel: false})
  }

  render() {

    return (
      <div className="boxFt">
        <div className="toolBar">
          <div role="button" className="btn languageBtn" onClick={() => {
            this.setState({showLanguagePanel: true})
          }}>{this.props.language.language}</div>
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
                              }}
                    />
          </form>
        </div>
        <div className="action">
          <a className="btn btnSend" onClick={this.sendMessage}>Send</a>
        </div>
      </div>
    );
  }
}

InputPanel.propTypes = {
  userInfo: PropTypes.object.isRequired,
  sendSuccess: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  chattingWith: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    language: state.language
  }
}

function mapDispatchToProps(d) {
  return {
    sendSuccess: arg => d(sendSuccess(arg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPanel);

