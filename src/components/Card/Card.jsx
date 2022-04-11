import React from "react";
import classes from "./Card.module.css";

const Card = ({ item }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardImg}>
        <img src={item.image} alt={item.description} />
      </div>
      <div className={classes.cardInfo}>
        <h3>{item.description}</h3>
        {/* <p>{item.createAt.toDate().toDateString()}</p> */}
      </div>
    </div>
  );
};

export default Card;
