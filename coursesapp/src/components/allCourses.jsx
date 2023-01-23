import "../css/allCourses.css";
import { CoursesContext } from "../context/courses";
import SingleCourse from "./course";
import { useEffect, useContext } from "react";
const AllCourses = () => {
  const { courses, getAllCourses, addMe } = useContext(CoursesContext);
  console.log(courses);
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <div>
      {courses.map((oneCourse) => {
        return (
          <SingleCourse
            rating={
              oneCourse.rating === 1
                ? [1]
                : oneCourse.rating === 2
                ? [1, 1]
                : oneCourse.rating === 3
                ? [1, 1, 1]
                : oneCourse.rating === 4
                ? [1, 1, 1, 1]
                : oneCourse.rating === 5
                ? [1, 1, 1, 1, 1]
                : null
            }
            addMe={addMe}
            name={oneCourse.name}
            subject={oneCourse.subject}
            subject_id={oneCourse.subject_id}
            level={oneCourse.level}
            img_src={oneCourse.picture}
            time={
              oneCourse.subject === "python"
                ? 120
                : oneCourse.subject === "javascript"
                ? 70
                : oneCourse.subject === "java"
                ? 60
                : oneCourse.subject === "docker"
                ? 75
                : oneCourse.subject === "sql"
                ? 30
                : oneCourse.subject === "mongodb"
                ? 25
                : oneCourse.subject === "react"
                ? 90
                : null
            }
          />
        );
      })}
    </div>
  );
};

export default AllCourses;
