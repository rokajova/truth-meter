import React from "react";
import classes from "./Info.module.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function Info() {
  return (
    <Tabs
      className="mt-4 mr-4 ml-4 w-50 "
      defaultActiveKey="faq"
      id="uncontrolled-tab-example"
    >
      <Tab eventKey="faq" title="FAQ">
        <div className={classes.Container}>
          {" "}
          <div className={classes.Row}>
            <div className={classes.Col}>
              <div className={classes.Title}>What is Truthmeter?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                A website with a mission to help reduce the increasing spread of
                misinformation on the internet.
              </span>
              <div className={classes.Title}>How does it work?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
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
                  padding: "3px",
                }}
              >
                Once you have created an account, you can create a new post by
                clicking +NEW POST in the header above. Then just type or paste
                your desired link, pass the verification and click Submit. Your
                new post will now appear in the top of the list in the main page
                of the website.
              </span>
              <div className={classes.Title}>How to rate a post?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                Once you have created an account, you can rate a post by
                clicking Rate this post button oh the bottom of the posts page.
                Then use the slider to rate the post from 1 to 100 and click
                Rate this post. Your new rate will update the Truth Score of the
                post.
              </span>
              <div className={classes.Title}>What is the Truth Score?</div>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
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
                  padding: "3px",
                }}
              >
                Find out about the rules under the Rules tab.
              </span>
            </div>
          </div>
        </div>
      </Tab>
      <Tab eventKey="rules" title="Rules">
        <div className={classes.Container}>
          {" "}
          <div className={classes.Row}>
            <div className={classes.Col}>
              {" "}
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                1. By using this website, you agree to all the rules and terms
                stated in this section.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                2. Truthmeter is not responsible for the content that is
                displayed on posted links. Truthmeter does not associate or
                endorse any and all content on posted links. The links posted
                are not part of this website and users may view them at their
                own risk.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                3. Do not upload links that are illegal or breaks any global or
                local laws.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                4. Posting links that contain legal NSFW content are allowed and
                will not be removed.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                5. Do not upload links that contain content containing, in any
                shape or form, child pornography, any content of minors under
                the age of 18 shown as being naked or engaging in sexual acts.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                6. Do not upload links that contain personal information of any
                person or company for malicious intent ("doxing").
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                7. Do not spam or flood the website.
              </span>
              <span
                style={{
                  border: "1px solid  rgb(157, 187, 243)",
                  padding: "3px",
                }}
              >
                8. If you found a bug or an exploit for this website, please
                contact me contact@truthmeter.link .
              </span>
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Info;
