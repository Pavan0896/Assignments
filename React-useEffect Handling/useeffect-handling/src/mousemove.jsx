import React, { useEffect, useState } from "react";

const Mousemove = () => {
  const [key, setKey] = useState({});
  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      setKey({ x: event.clientX, y: event.clientY });
      document.title = "Component Updating";
    });
  }, [key]);

  document.title = "Component Mounted";
  return (
    <div>
      <h3>
        X:{key.x} Y:{key.y}
      </h3>
    </div>
  );
};

export default Mousemove;
