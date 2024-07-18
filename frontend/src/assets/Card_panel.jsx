import React from "react";
import { Card } from "./Card";
import img1 from "./image/coding.jpg";
import img2 from "./image/content_marketing.jpg";
import img3 from "./image/content_writing.jpg";
import img4 from "./image/finance.jpg";
import img5 from "./image/fitness.jpg";
import img6 from "./image/photography.jpg";
import img7 from "./image/teaching.jpg";
import img8 from "./image/ui_design.jpg";

const arr = [
  {
    img: img1,
    title: "Coding",
    rating: 4.9,
    no_of_videos: "(20 videos)",
    mentor: "",
    time: 8,
  },
  {
    img: img2,
    title: "Content Marketing",
    rating: 4.9,
    no_of_videos: "(20 videos)",
    mentor: "",
    time: 12,
  },
  {
    img: img3,
    title: "Content Writing",
    rating: 3.9,
    no_of_videos: "(15 videos)",
    mentor: "",
    time: 5,
  },
  {
    img: img4,
    title: "Finance",
    rating: 5,
    no_of_videos: "(50 videos)",
    mentor: "",
    time: 50,
  },
  {
    img: img5,
    title: "Fitness",
    rating: 4.9,
    no_of_videos: "(20 videos)",
    mentor: "",
    time: 8,
  },
  {
    img: img6,
    title: "Photography",
    rating: 4.9,
    no_of_videos: "(20 videos)",
    mentor: "",
    time: 8,
  },
  {
    img: img7,
    title: "Teaching",
    rating: 4.9,
    no_of_videos: "(20 videos)",
    mentor: "",
    time: 8,
  },
  {
    img: img8,
    title: "UI/UX Design",
    rating: 4.9,
    no_of_videos: "(20 videos)",
    mentor: "",
    time: 8,
  },
];

export const Card_panel = () => {
  return (
    <div className=" grid grid-cols-4 w-full max-md:grid-cols-1">
      {arr.map((val, index) => (
        <Card
          key={index}
          img={val.img}
          title={val.title}
          rating={val.rating}
          video={val.no_of_videos}
          time={val.time}
          mentor={val.mentor}
          button={"Endroll "}
          link={`/course/${val.title}`}
        />
      ))}
    </div>
  );
};
