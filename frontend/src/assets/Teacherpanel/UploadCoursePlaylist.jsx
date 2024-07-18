import React, { useContext, useEffect, useState } from "react";
import { VideoDetails } from "./VideoDetails";
import axios from "axios";
import { useParams } from "react-router-dom";
import { contextData } from "../../context/CreateContext";
import { VideoList } from "./VideoList";

export const UploadCoursePlaylist = () => {
  const [data, setData] = useState({});
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { course_id } = useParams();
  const { id } = useContext(contextData);
  const [list, setList] = useState([]);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    formData.append("course_id", course_id);
    formData.append("id", id);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    axios
      .post("http://localhost:8000/videoUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" w-full">
      <div className="flex w-full justify-center items-center">
        <div className="text-center w-[50%]">
          <label htmlFor="uploadvideo" className="cursor-pointer">
            <div>
              <i className="fa-solid fa-cloud-arrow-up text-[10rem] text-[#abababc7]"></i>
            </div>
            <div className="text-[1.5rem] text-[#abababc7]">
              Upload your tutorial
            </div>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadvideo"
            onChange={handleVideoChange}
          />

          <button
            className="bg-tempCol hover:bg-blue-800 text-white text-[15px] font-bold mt-5 py-2 px-5 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        <VideoDetails
          videoData={(newData) =>
            setData((prevData) => ({ ...prevData, ...newData }))
          }
        />
      </div>
      <VideoList id={id} course_id={course_id} />
    </div>
  );
};
