//SurveyNew will show SurveyForm and SurveyFormReview

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  constructor(props) {
    super(props);
    this.state = { showFormReview: false };
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySumbit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

//this is done to clear the form if the use click on cancle watch - 175. Dumping Form Values
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
