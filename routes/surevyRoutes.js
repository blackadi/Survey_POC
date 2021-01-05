const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

//middleware should be added in sequence ordred first check if user is loggedin then check credit count
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    //get all the surveys and dispaly on dashboard
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    }); //we can use either false or 0 based mongoose API docs

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  //extract data from url  - watch (189. Parsing the Route) && 193. Lodash Chain Helper
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() //remvoe undefind elements
      .uniqBy("email", "surveyId") //remove any duplicates from the list by looking at email and surveyId properties
      //update mongoDB after processing the path from the email body sent from sendgrid
      //check 197. Executing Queries
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            //this part to find the exact docuemnt with the same email = fromSendGridPath, surveyID = fromSendGridPath and responded = false
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            //after find a match then update that record with responded = true and increment the choice [either yes or no] object to one
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value(); //return value

    res.send({}); // to till sendgrid that our response is not falling so sendgrid will not resent the response again and then we will have a multi records
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })), //we used shortened object via ES6
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();

      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      //this help the Header class to update the credit display for the user
      res.send(user);
    } catch (err) {
      //442: Unprocessable Entity response
      res.status(422).send(err);
    }
  });
};
