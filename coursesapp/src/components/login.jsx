import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursesContext } from "../context/courses";
import { Link } from "react-router-dom";
import "../css/allCourses.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(CoursesContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div id="fake_body">
      <div id="login">
        <h1 className="text-dark mb-3">Login</h1>
        <form
          onSubmit={(e) => {
            login(e, { email, password });
          }}
        >
          <input
            className="mb-3 form-control"
            type="text"
            placeholder="Insert Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-4 form-control"
            type="text"
            placeholder="Insert Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-success mb-3">Login</button>
        </form>
        <label className="text-black"> Not Register Yet ?</label>
        <button className="btn btn-warning ms-2">
          <Link className="text-light" to="/signup">
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
};
export default Login;
