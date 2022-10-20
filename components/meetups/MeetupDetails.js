import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetails = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} /><h1>{props.title}</h1>
      <address>{props.address}</address>
      <h2>{props.description}</h2>
    </section>
  );
};
export default MeetupDetails;
