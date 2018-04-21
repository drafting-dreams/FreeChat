import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.messages);
    return (
      <div>
        {this.props.messages.map(message =>
          <div>
            <div className="clearFix">
              <div>
                <div className={"message " + message.sender}>
                  <img className="avatar" src={"../../static/" + message.sender + ".jpeg"}/>
                  <div className="content">
                    <div className={"bubble bubblePrimary " + (message.sender==='me' ? 'right' : 'left')}>
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
        )}
        {this.props.sending && (
          <div>
            <div className="clearFix">
              <div>
                <div className="message me">
                  <img className="avatar" src="../../static/me.jpeg"/>
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
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}


export default connect(mapStateToProps)(MessageList);
