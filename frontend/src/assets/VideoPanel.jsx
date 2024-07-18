import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Domain_card_panel } from "./Domain_card_panel";

export const VideoPanel = () => {
  const location = useLocation();
  const param = useParams();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const course_id = searchParams.get("course_id");
  const [videoList, setVideoList] = useState([]);
  const [videoSelect, setVideoSelect] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/videoList?id=${id}&course_id=${course_id}`)
      .then((res) => {
        setVideoList(res.data);
        if (res.data.length > 0) {
          setVideoSelect(res.data[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, course_id]);

  if (!videoList.length) {
    return <div>Loading...</div>;
  }

  const select = (idx) => {
    setVideoSelect(videoList[idx]);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex">
        <div className="w-[850px] h-[478px] rounded-xl">
          <video
            className="w-full h-full object-cover rounded-xl"
            src={`http://localhost:8000/${videoSelect.video?.slice(8)}`}
            controls
          ></video>
          <div className="flex justify-between items-center w-full">
            <div className="mt-4 w-full">
              <h2 className="text-xl font-bold">{videoSelect.title}</h2>
              <div className=" flex items-center mt-3 mb-7">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`http://localhost:8000/${videoSelect.profile_pic?.slice(
                    8
                  )}`}
                  alt=""
                />
                <h2 className="text-xl font-semibold ml-2">
                  {videoSelect.name}
                </h2>
              </div>
              <p className="mt-2 bg-gray-300 w-full p-5 rounded-2xl">
                {videoSelect.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[30%] ml-8 border border-black rounded-xl">
          <div className="py-8 px-5 bg-black text-white font-semibold rounded-t-xl">{`Course Playlist - ${param.domain}`}</div>
          <div className="h-[400px] overflow-y-auto">
            {videoList.map((video, idx) => (
              <div
                key={idx}
                onClick={() => select(idx)}
                className="flex w-full items-center px-5 py-3 duration-300 hover:bg-gray-300 cursor-pointer"
              >
                <img
                  className="w-[6.5rem] h-[4.4rem] rounded-xl"
                  src={`http://localhost:8000/${video.thumbnail?.slice(8)}`}
                  alt={video.title}
                />
                <div className="ml-3">
                  <p className="font-semibold">{video.title}</p>
                  <p className="text-xs text-gray-700">{video.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" mt-52">
        <Domain_card_panel search={false} />
      </div>
    </div>
  );
};
