import React, { useEffect } from "react";

const Scroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("Scroll event has been removed.")
    };
  }, []);
  return <div>Scroll Event</div>;
};

export default Scroll;
