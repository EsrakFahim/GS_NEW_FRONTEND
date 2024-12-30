import { useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";

const Login = () => {
  // State for handling input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Username:",
      username,
      "Password:",
      password,
      "Remember me:",
      rememberMe
    );
    // Implement your login logic here
  };

  return (
    <>
      <MetaData 
        title={"Login"} 
        description={"GalaxySpark Admin Panel Login"} 
        canonical={"https://galaxy-spark-admin-dashboard.vercel.app/login"} />
      <div
        className="container d-flex justify-content-center align-items-center"
        id="login-container"
      >
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-header mb-5">
            <h2>GalaxySpark</h2>
            <h5>Admin Panel</h5>
          </div>

          <div className="floating-label mb-3">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className={username ? "typed" : ""} htmlFor="username">
              Username
            </label>
          </div>

          <div className="floating-label mb-3">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={password ? "typed" : ""} htmlFor="password">
              Password
            </label>
          </div>

          <div className="form-check float-end">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-success w-100 my-3">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
