import "../css/card.css";
import { useContext, useEffect } from "react";
import { CoursesContext } from "../context/courses";
import Card from "./myCourseCard";
const MyCourses = () => {
  const { myCourses, userCourses, pullMeOut } = useContext(CoursesContext);
  useEffect(() => {
    userCourses();
  }, []);
  console.log(myCourses);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      {myCourses.map((course) => {
        return (
          <Card
            deleteMe={pullMeOut}
            rating={
              course.rating === 1
                ? [1]
                : course.rating === 2
                ? [1, 1]
                : course.rating === 3
                ? [1, 1, 1]
                : course.rating === 4
                ? [1, 1, 1, 1]
                : course.rating === 5
                ? [1, 1, 1, 1, 1]
                : null
            }
            name={course.course_name}
            subject={course.subject}
            subject_id={course.subject_id}
            level={course.level}
            img_src={course.picture}
            time={
              course.subject === "python"
                ? 120
                : course.subject === "javascript"
                ? 70
                : course.subject === "java"
                ? 60
                : course.subject === "docker"
                ? 75
                : course.subject === "sql"
                ? 30
                : course.subject === "mongodb"
                ? 25
                : course.subject === "react"
                ? 90
                : null
            }
          />
        );
      })}
    </div>
  );
};

export default MyCourses;
