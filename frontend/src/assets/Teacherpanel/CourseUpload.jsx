import React, { useContext, useState } from "react";
import img from "../image/loading.gif";
import axios from "axios";
import { contextData } from "../../context/CreateContext";

const TeacherCourseUpload = () => {
  const data = useContext(contextData);
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDuration: "",
    courseDomain: "",
    targetAudience: "",
    courseDescription: "",
    prerequisites: "",
    courseFile: null,
    courseAmount: "",
  });
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const durations = [
    "1 week",
    "2 weeks",
    "1 month",
    "3 months",
    "6 months",
    "1 year",
  ];
  const domains = [
    "Coding",
    "Content Marketing",
    "Content Writing",
    "Finance",
    "Photography",
    "Teaching",
    "UI/UX Design",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      courseFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }
    uploadData.append("id", data.id);
    uploadData.append("email", data.email);

    try {
      const response = await axios.post(
        "http://localhost:8000/course-upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setConfirm(true);
      setLoading(false);
      setFormData({
        courseTitle: "",
        courseDuration: "",
        courseDomain: "",
        targetAudience: "",
        courseDescription: "",
        prerequisites: "",
        courseFile: null,
        courseAmount: "",
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[50%] mt-16 mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Upload Your Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Duration
          </label>
          <select
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select duration
            </option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Domain
          </label>
          <select
            name="courseDomain"
            value={formData.courseDomain}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select domain
            </option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Audience
          </label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Description
          </label>
          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prerequisites
          </label>
          <input
            type="text"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Course Materials
          </label>
          <div className="flex items-center justify-center">
            <input
              type="file"
              name="courseFile"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <div className="w-[20px]">
              <img
                className={`ml-[-30px] z-10 ${loading ? "block" : "hidden"}`}
                src={img}
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Charging Amount ($)
          </label>
          <input
            type="number"
            name="courseAmount"
            value={formData.courseAmount}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {confirm && (
          <div className="flex justify-center items-center mt-5 mb-5">
            <div className="bg-green-50 rounded-xl w-[75%] text-center py-3">
              <span>Your Course has been uploaded</span>
              <span>
                <i className="fa-solid fa-check text-green-500 text-[20px] ml-3"></i>
              </span>
            </div>
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
          >
            Upload Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherCourseUpload;
