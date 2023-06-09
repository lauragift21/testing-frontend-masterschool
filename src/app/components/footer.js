import React from "react";

const today = new Date();

const Footer = () => {

  return (
    <footer className="text-md py-2">
      <span className="float-left">{today.getFullYear()} Y.</span>
      <span className="float-right"> All rights reserved &copy;</span>
    </footer>
  )
}

export default Footer;