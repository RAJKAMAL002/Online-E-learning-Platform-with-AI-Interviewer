import React, { useState, useEffect } from "react";

export const VideoDetails = ({ videoData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // Update parent component data when any of the details change
  useEffect(() => {
    videoData({ title, description, thumbnail });
  }, [title, description, thumbnail]);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <div className="w-[50%] px-7 py-10 shadow-lg rounded-xl">
      <div>
        <div className="font-semibold text-[25px] mb-5">Details</div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="videoTitle">
            Title
          </label>
          <input
            className="bg-slate-100 mb-2 px-3 py-2 rounded-lg"
            type="text"
            id="videoTitle"
            placeholder="Add a title that describes your video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="videoDescription">
            Description
          </label>
          <textarea
            rows={5}
            className="bg-slate-100 mb-2 px-3 py-2 rounded-lg"
            id="videoDescription"
            placeholder="Tell learners about the video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <div className="font-semibold mb-1">Add Thumbnail</div>
          <div className="font-[15px] mb-3 text-[gray]">
            Set a thumbnail that stands out and draws viewers' attention
          </div>
          <label
            htmlFor="uploadthumbnail"
            className="border-black border-dashed border-2 flex flex-col items-center justify-center w-[130px] rounded-lg py-4 cursor-pointer"
          >
            <i className="fa-solid fa-upload"></i>
            <div>Upload file +</div>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadthumbnail"
            onChange={handleThumbnailChange}
          />
        </div>
      </div>
    </div>
  );
};
