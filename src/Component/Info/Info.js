import React from "react";
import classes from "./Info.module.css";

function Info() {
  return (
    <div className={classes.Container}>
      <div className={classes.Row}>
        <div className={classes.Col}>
          <div className={classes.Title}>Profile</div>
          <span
            style={{
              borderTop: "1px solid  rgb(206, 223, 255)",
              padding: "3px",
            }}
          >
            Email:
          </span>
        </div>
      </div>
    </div>
  );
}

export default Info;
