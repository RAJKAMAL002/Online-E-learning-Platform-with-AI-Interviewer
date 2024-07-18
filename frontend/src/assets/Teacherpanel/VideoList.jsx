import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dateformat = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

export const VideoList = ({ id, course_id }) => {
  const [videoList, setVideoList] = useState([]);
  const DelVideo = (id) => {
    axios
      .delete(`http://localhost:8000/Delete-Content?id=${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateVideo = (id) => {
    axios
      .delete(`http://localhost:8000/Update-Content?id=${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/videoList?id=${id}&course_id=${course_id}`)
      .then((res) => {
        console.log(res);
        setVideoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, course_id]);

  return (
    <div className=" mt-16">
      <div className=" ml-8 text-[2rem] font-semibold text-tempCol">
        {videoList.length > 0 ? "Course Uploads" : ""}
      </div>
      <div className="flex flex-col w-full space-y-4 p-4">
        {videoList.map((video) => (
          <div
            key={video.id}
            className="flex items-center bg-white shadow-md w-full rounded-lg p-4"
          >
            <img
              className="h-24 w-32 rounded-lg object-cover"
              src={`http://localhost:8000/${video.thumbnail.slice(8)}`}
              alt={video.title}
            />
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-gray-500">
                {dateformat(video.upload_datetime)}
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <button
                onClick={() => UpdateVideo(video.video_id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <span className="text-gray-600 flex items-center justify-between">
                10 <i class="fa-solid fa-eye text-[12px] mx-1"></i>
              </span>
              <span className="text-gray-600 flex items-center justify-between">
                10 <i class="fa-solid fa-comment text-[12px] mx-1"></i>
              </span>
              <span
                onClick={() => {
                  DelVideo(video.video_id);
                }}
                className=" text-gray-600"
              >
                <i class="fa-solid fa-trash"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
