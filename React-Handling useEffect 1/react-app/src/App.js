import { useState } from "react";
import "./App.css";
import Timer from "./timer";
import Scroll from "./scroll";

function App() {
  const [timer,SetTimer]= useState(true);
  return (
    <div className="App">
      
      {timer? (<Timer />):(null)}
      {timer? (<Scroll/>):(null)}
      <button onClick={()=>SetTimer(!timer)}>Toggle</button>
      
    </div>
  );
}

export default App;
