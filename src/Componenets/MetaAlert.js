import React from "react";
import metamask from "./metamask.png";
const MetaAlert = () => {
  return (
    <div>
      <div className="my-5 text-center">
        <img src={metamask} width="250" class="mb-4" alt="" />
        <h1>Please Install Metamask</h1>
      </div>
      );
    </div>
  );
};

export default MetaAlert;
