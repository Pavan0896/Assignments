import "./App.css";
import { React, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Counter : {count}</h1>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default App;
