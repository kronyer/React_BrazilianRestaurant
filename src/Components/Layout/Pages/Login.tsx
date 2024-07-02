import React from "react";

function Login() {
  return (
    <div
      className="row justify-content-center text-center mt-5"
      style={{ height: "100vh" }}
    >
      <div className="col-4">
        <h2>Login</h2>
        <hr></hr>
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
            ></input>
            <label>Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
            ></input>
            <label>Password</label>
          </div>
          <button className="btn btn-dark">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
