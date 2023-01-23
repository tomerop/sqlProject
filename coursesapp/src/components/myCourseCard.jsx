import "../css/card.css";
import jwtDecode from "jwt-decode";
const Card = (props) => {
  const { name, subject, deleteMe, subject_id, rating, level, img_src, time } =
    props;
  const showAlert = () => {
    if (window.confirm(`are you sure you want to quit ${subject} course?`)) {
      deleteMe({
        user_id: jwtDecode(localStorage.getItem("token")).user_id,
        subject_id: subject_id,
      });
    }
  };
  return (
    <div style={{ marginTop: 10 }}>
      {" "}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
        crossorigin="anonymous"
      />
      <div className="card">
        <div className="text">
          <img src={img_src} alt="" />
          <h3>{name}</h3>
          <p>
            <i className="fa-solid fa-clock"></i> {time} Hours
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim venihjbkam, quis nostrud exercitation ullamco laboris nisi
            ut.
          </p>
        </div>
        <div className="links">
          <a target="_blank">
            <i className="fab fa-codepen"></i>
          </a>
          <a onClick={() => showAlert()}>
            <i class="fa-solid fa-dumpster"></i>
          </a>
          <a target="_blank">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
