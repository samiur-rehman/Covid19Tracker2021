import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoxBox({
  country,
  title,
  cases,
  clicked,
  isRed,
  total,
  updated,
  active,
  critical,
  tests,
  ...props
}) {
  return (
  
      <Card
        onClick={props.onClick}
        className={`infoBox ${clicked && "infobox--selected"} ${
          isRed && "infoBox--red"
        }`}
      >
        <CardContent>
          <Typography
            variant="h5"
            color="textPrimary"
            style={{ textTransform: "capitalize" }}
          >
            {country} {title}
          </Typography>
          <Typography className="infoxBox1">
            Today {title}: {cases}
          </Typography>
          {title === "Cases" ? (
            <Typography color="textSecondary">Active : {active} </Typography>
          ) : null}
          {title === "Recovered" ? (
            <Typography color="textSecondary">
              Critical : {critical}{" "}
            </Typography>
          ) : null}
          {title === "Deaths" ? (
            <Typography color="textSecondary">Tested: {tests} </Typography>
          ) : null}
          <Typography className="infoxBox2" color="textPrimary">
            Total {title} : {total}
          </Typography>
          <Typography className="infoxBox3" color="textSecondary">
            Updated : {new Date(updated).toDateString()}{" "}
          </Typography>
        </CardContent>
      </Card>
  
  );
}

export default InfoxBox;

