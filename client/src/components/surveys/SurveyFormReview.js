import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

//submitSurvey is an action create from redux to handle the survey
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  const filterSemicolonSelectedMails = state.form.surveyForm.values.recipients
    ? state.form.surveyForm.values.recipients
        .split(",")
        .filter((email) => email)
        .join()
    : "";
  state.form.surveyForm.values.recipients = filterSemicolonSelectedMails;
  //console.log("filterSemicolonSelectedMails: " + filterSemicolonSelectedMails);

  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
