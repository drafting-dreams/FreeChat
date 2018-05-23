import React, {Component} from "react";
import api from "../../api/contactApi";
import {connect} from 'react-redux';
import {updateFriendList} from "../../actions/messageActions";
import PropTypes from 'prop-types';


class ContactSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', user: null, searching: false};

    this.changeText = this.changeText.bind(this);
    this.clearBox = this.clearBox.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  changeText(e) {
    const text = e.target.value;
    this.setState({email: text, searching: text.length > 0});
    //todo settimeout
    // this.query = setTimeout(1000);
    api.findUserByEmail(text)
      .then(res => {
        if (res.success) {
          this.setState({user: res.user})
        } else {
          this.setState({user: null})
        }
      });
  }

  clearBox() {
    this.setState({email: '', searching: false});
  }

  addContact() {
    api.addContact(this.state.email)
      .then(() => {
        this.clearBox();
        api.getContact()
          .then(res => {
            this.props.updateFriendList(res.contacts);
          });
      });
  }

  render() {
    return (
      <div id={"contact-searcher"}>
        <input
          className={"search-input"}
          placeholder={"search contact"}
          value={this.state.email}
          onChange={this.changeText}
        />
        <div id="delete-icon" onClick={this.clearBox}/>
        {
          this.state.searching &&
          <div id="result-list">
            {
              this.state.user
                ?
                <div className="user-card">
                  <div className="name">{this.state.user.name}</div>
                  <div className="email">{this.state.user.email}</div>
                  <i className="add-btn fas fa-plus-circle"
                     onClick={this.addContact}
                  />
                </div>
                : "can't find user"
            }
          </div>
        }

      </div>
    );
  }
}

ContactSearcher.propTypes = {
  updateFriendList: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    updateFriendList: arg => dispatch(updateFriendList(arg))
  };
}

export default connect(null, mapDispatchToProps)(ContactSearcher);

