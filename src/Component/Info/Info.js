import React, { useState } from "react";
import classes from "./Info.module.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function Info() {
  return (
    <div className={classes.Container}>
      <Tabs
        className="d-flex align-items-center justify-content-center  border-0 "
        defaultActiveKey="faq"
      >
        <Tab eventKey="faq" title="FAQ">
          <div className={classes.Row}>
            <div className={classes.Col}>
              <div className={classes.Title}>What is Truthmeter.link?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                A website with a mission to help reduce the increasing spread of
                misinformation on the internet.
              </span>
              <div className={classes.Title}>How does it work?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                Users can browse through the database of links submitted by
                other users and view the Truth Score of each link. Registered
                users can also post links and rate posts, expanding Truthmeters
                database of links and their Truth Scores.
              </span>
              <div className={classes.Title}>How to create a post?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                Once you have{" "}
                <a href="/signup" target="_blank" rel="noopener noreferrer">
                  created an account
                </a>{" "}
                , you can create a new post by clicking{" "}
                <mark
                  style={{
                    backgroundColor: "#6d76f7",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  NEW POST
                </mark>{" "}
                in the header above. Then just type or paste your desired link,
                pass the verification and click{" "}
                <mark
                  style={{
                    backgroundColor: "#6d76f7",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  Submit
                </mark>
                . Your new post will now appear in the top of the list in the
                main page of the website.
              </span>
              <div className={classes.Title}>How to rate a post?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                Once you have created an account, you can rate a post by
                clicking{" "}
                <mark
                  style={{
                    backgroundColor: "#6d76f7",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  Rate this post
                </mark>{" "}
                button on the bottom of the posts page. Then use the slider to
                rate the post from 1 to 100 and click{" "}
                <mark
                  style={{
                    backgroundColor: "#6d76f7",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  Rate this post
                </mark>{" "}
                . Your new rate will update the Truth Score of the post.
              </span>
              <div className={classes.Title}>What is the Truth Score?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                The Truth Score is the main arbiter in determining the posts
                content legitimacy. Each post will have a gauge attached to it
                displaying the Truth Score of the post. If the needle is
                pointing at red - the information is most likely to be false, if
                green - most likely true. A user may rate a post only once. When
                a rate has been submitted the Truth Score will update and the
                gauge needle will move in real time displaying the new Truth
                Score. Only You, the users, are in control of the Truth Score,
                that is why rating is strongly ecouraged.
              </span>
              <div className={classes.Title}>What are the rules?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                Find out about the rules under the Rules tab.
              </span>
            </div>
          </div>
        </Tab>
        <Tab eventKey="rules" title="Rules">
          {" "}
          <div className={classes.Row}>
            <div className={classes.Col}>
              {" "}
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>1.</strong> By using this website, you agree to all the
                rules and terms stated in this section.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>2.</strong> Truthmeter is not responsible for the
                content containing in posted links. Truthmeter does not
                associate or endorse any and all content on posted links. The
                links posted are not part of this website and users may view
                them at their own risk.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>3.</strong> Do not upload links that are illegal or
                breaks any global or local laws.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>4.</strong> Posting links that contain legal NSFW
                content are allowed and will not be removed.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>5.</strong> Do not upload links that contain content
                containing, in any shape or form, child pornography, any content
                of minors under the age of 18 shown as being naked or engaging
                in sexual acts.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>6.</strong> Do not upload links that contain personal
                information of any person or company for malicious intent
                ("doxing").
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>7.</strong> Do not spam or flood the website.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "7px",
                  marginBottom: "15px",
                }}
              >
                <strong>8.</strong> If you found a bug or an exploit for this
                website, please contact me contact@truthmeter.link .
              </span>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Info;
