import React from 'react';
//import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '1',
      language:'zh'
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  sendMessage() {
    console.log(this.state.message);
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
        <div className="btn languageBtn selected">中</div>
        <div className="btn languageBtn" onClick={this.switchLanguage}>英</div>
      </div>
    ) : (
      <div className="toolBar">
        <div className="btn languageBtn" onClick={this.switchLanguage}>中</div>
        <div className="btn languageBtn selected">英</div>
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
              <div className="boxBd"></div>
              <div className="boxFt">
                {languageSelector}
                <div className="content">
                  <form>
                    <textarea type="text"
                              autoComplete="off"
                              autoFocus="off"
                              id="textArea"
                              className="flex"
                              autoCorrect="off"
                              onChange={this.editMessage}/>
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

HomePage.propTypes = {};

// function mapStateToProps(state) {
//     return {
//         state: state
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
