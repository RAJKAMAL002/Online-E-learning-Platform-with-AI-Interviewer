import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "./Card";
import { SearchBar } from "./SearchBar";
export const Domain_card_panel = ({ search }) => {
  const { domain } = useParams();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/course?domain=${domain}`)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [domain]);

  return (
    <div>
      {search && <SearchBar data={courses} />}

      <div className="grid grid-cols-4 w-full max-md:grid-cols-1">
        {courses.map((course) => {
          return (
            <Card
              img={`http://localhost:8000/${course.course_materials.slice(8)}`}
              title={course.course_title}
              rating={5}
              video={"(20 videos)"}
              time={course.course_duration}
              mentor={course.name}
              button={"Endroll"}
              link={`video-panel?id=${course.id}&course_id=${course.course_id}`}
            />
          );
        })}
      </div>
    </div>
  );
};
