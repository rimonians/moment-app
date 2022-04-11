import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import {
  RiLoginBoxLine,
  RiAccountPinBoxLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { BsImages } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import { signout } from "../../firebase/firebase.auth";

import { toast } from "react-toastify";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  const handleSignout = () => {
    signout((status, info) => {
      if (status) {
        toast.success(info);
      } else {
        toast.error(info);
      }
    });
  };

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <BsImages />
          <span>মোমেন্ট অ্যাপ</span>
        </Link>
      </div>
      <div className={classes.links}>
        {Object.keys(user).length === 0 ? (
          <>
            <Link to="/signin">
              <RiLoginBoxLine />
              সাইন ইন
            </Link>
            <Link to="/signup">
              <RiAccountPinBoxLine />
              সাইন আপ
            </Link>
          </>
        ) : (
          <>
            <Link to="/moment">
              <BiImageAdd />
              মোমেন্ট
            </Link>
            <button onClick={handleSignout}>
              <RiLogoutBoxLine /> সাইন আউট
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
