import "../css/allCourses.css";
import { useState } from "react";
import jwtDecode from "jwt-decode";
const SingleCourse = (props) => {
  const { name, subject, subject_id, rating, addMe, level, img_src, time } =
    props;
  console.log(props);
  const showAlert = () => {
    if (window.confirm(`are you sure you want to sign to ${subject} course?`)) {
      addMe({
        user_id: jwtDecode(localStorage.getItem("token")).user_id,
        subject_id: subject_id,
      });
      alert(`${subject} course added successfully`);
    }
  };

  return (
    <article className="postcard light blue">
      <a className="postcard__img_link" href="#">
        <img className="postcard__img" src={img_src} alt="Image Title" />
      </a>
      <div className="postcard__text t-dark">
        <h1 className="postcard__title blue">
          <a href="#">{subject}</a>
        </h1>
        <div className="postcard__subtitle small">
          <time>
            <i className="fa-solid fa-clock"></i> {time} Hours
          </time>
        </div>
        <div className="postcard__bar"></div>
        <div className="postcard__preview-txt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          fugiat asperiores inventore beatae accusamus odit minima enim, commodi
          quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti
          tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci
          illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim
          quidem excepturi, illum quos!
        </div>
        <ul className="postcard__tagbox">
          <li className="tag__item" onClick={() => showAlert()}>
            <i class="fa-solid fa-graduation-cap"></i>
          </li>
          <li className="tag__item play blue">
            <a href="#" style={{ color: "yellow" }}>
              {rating.map((i) => {
                return (
                  <i class="fa-solid fa-star" style={{ marginLeft: 1.5 }}></i>
                );
              })}
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default SingleCourse;
