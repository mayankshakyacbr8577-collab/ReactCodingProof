import React, { useContext } from "react";
import { contextInfo } from "../Home";
const C = () => {
  const infoObj = useContext(contextInfo);
  return (
    <div>
      <h2>C Component</h2>
      <h2>Inforamation: {infoObj.info}</h2>
      <button
        className="btn btn-primary"
        onClick={() => infoObj.setInfo("New info")}
      >
        Change Info
      </button>
    </div>
  );
};

export default C;
