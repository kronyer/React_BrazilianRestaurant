import React from "react";
import accessDeniedSvg from "../../../assets/Images/accessDenied.svg";

function AccessDenied() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-8">
          <h2 className="h2 fw-semibold mb-2">
            You have no permition to go there
          </h2>
          <img src={accessDeniedSvg} width={"50%"}></img>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
