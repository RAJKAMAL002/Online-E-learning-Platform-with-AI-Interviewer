import React, { useContext } from "react";
import { Card } from "./Card";
import { contextData } from "../context/CreateContext";

export const Dashboard_course = ({ courses }) => {
  const data = useContext(contextData);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {courses.map((course) => (
          <div>
            <Card
              img={`http://localhost:8000/${course.course_materials.slice(8)}`}
              title={course.course_title}
              rating={5}
              video={"(20 videos)"}
              time={course.course_duration}
              mentor={course.name}
              button={"Edit"}
              link={`/edit-playlist/${course.course_id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
