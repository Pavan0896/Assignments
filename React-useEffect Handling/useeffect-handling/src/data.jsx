import React, { useEffect, useState } from "react";

const Data = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`https://reqres.in/api/users`)
      .then((res) => res.json())
      .then((data) => setUser(data.data))
      .catch();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {user.map((e, index) => (
        <div
          key={index}
          style={{
            margin: "2%",
          }}
        >
          <img
            src={e.avatar}
            alt="avatar"
            style={{
              borderRadius: "50%",
            }}
          />
          <h2>
            {e.first_name} {e.last_name}
          </h2>
          <p>{e.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Data;
