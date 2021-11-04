import React from "react";
import classes from "./Footer.module.css";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={`${classes.footer} py-4 mt-5`}>
      <div className={`${classes.footer_container}`}>
        <div className="p-2 mx-2">
          <BsFacebook />
        </div>
        <div className="p-2 mx-2">
          <BsInstagram />
        </div>
        <div className="p-2 mx-2">
          <BsTwitter />
        </div>
      </div>
      <div className="text-center text-white mt-2">
          <p> &copy;2021 | All rights reserved</p>
        </div>
    </footer>
  );
};

export default Footer;
