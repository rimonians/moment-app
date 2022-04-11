import React, { useEffect } from "react";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import scrollTop from "../../utils/scrollTop";
import Card from "../../components/Card/Card";

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const momentState = useSelector((state) => state.moment);
  const { loading, moment } = momentState;

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className={classes.homeContainer}>
      <h3 className={classes.greet}>
        স্বাগতম <span>{user.displayName}</span>
      </h3>
      <div className={classes.cardContainer}>
        {loading && <h3>লোড হচ্ছে...</h3>}
        {!loading && moment.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
