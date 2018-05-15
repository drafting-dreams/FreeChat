import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as languageActions from '../../actions/languageActions';

class LanguageBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.switchLanguage = this.switchLanguage.bind(this);
  }

  switchLanguage(languageCode) {
    this.props.actions.switchLanguage(languageCode);
    this.props.removeLanguagePanel();
  }

  render() {
    return (

      <div className="languageBox">
        <div className="languageCol">
          <div className="flexCol">
            {this.props.languages.slice(0, 7).map(language => {
                return (
                  language.code === this.props.languageCode ?
                    <div className="btn languageSelector"
                         style={{backgroundColor: "#aaa"}}
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div> :
                    <div className="btn languageSelector"
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div>);
              }
            )}
          </div>
        </div>
        <div className="languageCol">
          <div className="flexCol">
            {this.props.languages.slice(7, 14).map(language =>{
                return (
                  language.code === this.props.languageCode ?
                    <div className="btn languageSelector"
                         style={{backgroundColor: "#aaa"}}
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div> :
                    <div className="btn languageSelector"
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div>);
              }
            )}
          </div>
        </div>
        <div className="languageCol">
          <div className="flexCol">
            {this.props.languages.slice(14, 21).map(language =>{
                return (
                  language.code === this.props.languageCode ?
                    <div className="btn languageSelector"
                         style={{backgroundColor: "#aaa"}}
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div> :
                    <div className="btn languageSelector"
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div>);
              }
            )}
          </div>
        </div>
        <div className="languageCol">
          <div className="flexCol">
            {this.props.languages.slice(21).map(language =>{
                return (
                  language.code === this.props.languageCode ?
                    <div className="btn languageSelector"
                         style={{backgroundColor: "#aaa"}}
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div> :
                    <div className="btn languageSelector"
                         onClick={() => {
                           this.switchLanguage(language.code)
                         }}>{language.language}</div>);
              }
            )}
          </div>
        </div>
      </div>

    );
  }

}

LanguageBox.propTypes = {
  languages: PropTypes.array.isRequired,
  removeLanguagePanel: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  languageCode: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    languages: state.language.languages,
    languageCode: state.language.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(languageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageBox);
