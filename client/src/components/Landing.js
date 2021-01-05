import React from "react";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>BlackAdi!</h1>
      <p className="flow-text">Welcome to the land of addi!!!</p>
      <div class="containre">
        <div class="col s12 m5">
          <div class="card-panel teal">
            <span class="white-text">
              - A naive playground built on top of express.js and react to test
              the following:
              <ul className="">
                <li>google Authentication</li>
                <li>MongoDB</li>
                <li>Sendgrid APIs</li>
                <li>Stripe APIs</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
