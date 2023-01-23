import { useContext, useState } from "react";
import { CoursesContext } from "./../context/courses";
import "../css/allCourses.css";

const SignUp = () => {
  const { signup } = useContext(CoursesContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="fake_body">
      <div id="login">
        <h1 className="text-dark mb-3"> Register </h1>
        <form onSubmit={(e) => signup(e, { email, password, name })}>
          <input
            className="mb-3 form-control"
            type="text"
            placeholder="Insert Name"
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="btn btn-success mb-3">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
