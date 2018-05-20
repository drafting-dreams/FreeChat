import React, {Component} from "react";
import api from "../../api/contactApi";

class ContactSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', user: null};

    this.changeText = this.changeText.bind(this);
    this.clearBox = this.clearBox.bind(this);
  }

  changeText(e) {
    this.setState({email: e.target.value});
    // this.query = setTimeout(1000);
    api.findUserByEmail(e.target.value)
      .then(res => {
        console.log(res)
        if (res.success) {
          this.setState({user: res.user})
        }else{
          this.setState({user: null})
        }
      });
  }

  clearBox() {
    this.setState({email: ''})
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
        <div id="result-list">
          {
            this.state.user
              ? <div className="user-card"></div>
              : "can't find user"
          }

        </div>
      </div>
    );
  }
}

export default ContactSearcher;

