import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/";

import cardImage from "../../images/card-image.jpg";
import yes from "../../images/yes.png";
import no from "../../images/no.png";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      //console.log(survey);
      return (
        <div key={survey._id} className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={cardImage} />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {survey.title}
              <i class="material-icons right">more_vert</i>
            </span>
            <p className="right">
              <b>Sent On: </b>
              {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              Campaign Title: <i>{survey.title}</i>
              <i class="material-icons right">close</i>
            </span>
            <p>
              <b>Email Body:</b> <i>{survey.body}</i>
            </p>

            <p>
              <b>last Responded: </b>
              <i>
                {survey.lastResponded
                  ? new Date(survey.lastResponded).toLocaleDateString()
                  : "Waiting for a reply"}
              </i>
            </p>
            <div className="card-action">
              <blockquote>
                Number of people replied with either YES or NO on the sent
                survey
              </blockquote>
              <div className="card-action">
                <div class="chip">
                  <img src={yes} alt="Contact Person" />
                  Yes: {survey.yes}
                </div>
                <div class="chip">
                  <img src={no} alt="Contact Person" />
                  No: {survey.no}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="container">{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
