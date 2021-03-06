import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as languageActions from '../../actions/languageActions';
import languageApi from "../../api/languageApi";

class LanguageBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.switchLanguage = this.switchLanguage.bind(this);
  }

  switchLanguage(languageCode) {
    languageApi.changeLanguage(languageCode);
    this.props.switchLanguage(languageCode);
    this.props.removeLanguagePanel();
  }

  render() {
    return (

      <div className="languageBox">
        <div className="flexCol">
          {
            this.props.languages.map(language => {
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
            )
          }
        </div>
      </div>

    );
  }

}

LanguageBox.propTypes = {
  languages: PropTypes.array.isRequired,
  removeLanguagePanel: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
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
    switchLanguage: languageCode => dispatch(languageActions.switchLanguage(languageCode))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageBox);
