import React, { useState } from "react";
import ReactQuill from "react-quill";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "react-quill/dist/quill.snow.css";
import { getImageUrl } from "../../hooks/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAddPost } from "../../hooks/mutationHooks";

const NewJobPost = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postMutation = useAddPost(() => {
    queryClient.invalidateQueries(["jobs"]);
    navigate("/myprofile");
  });

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [resumesEmail, setResumeEmail] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = () => {
    if (
      title === "" ||
      description === "" ||
      location === "" ||
      companyName === "" ||
      companyUrl === "" ||
      resumesEmail === "" ||
      category === ""
    ) {
      return;
    }
    const jobPost = {
      title: title,
      description: description,
      location: location,
      companyName: companyName,
      companyUrl: companyUrl,
      resumesEmail: resumesEmail,
      category: category,
    };
    postMutation.mutate({ jobPost, username: user.username });
  };

  const onChangeHandler = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const modules = {
    toolbar: [
      [{ header: [2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div className="min-h-screen flex justify-between flex-col">
      <Header />
      <main className="flex-1 mb-9">
        <div className="container w-full sm:pr-7 p-3">
          <div className="p-6 pl-3 rounded-t-sm bg-[#001131e0]">
            <h1 className="text-white font-semibold">New job post 📢😃📃</h1>
          </div>
          <div className="p-6 pl-3 border-[#001131e0] border-2 borderb-0 border-t-0">
            <ul className="flex flex-col gap-3 w-full">
              <li>
                <h1 className="text-sm mb-1">Is wezipesi*</h1>
                <input
                  className="text-sm w-full min-h-[35px] outline-none border border-slate-700 p-1 pl-2 rounded-sm"
                  type="text"
                  value={title}
                  onChange={(e) => onChangeHandler(e, setTitle)}
                />
              </li>
              <li>
                <h1 className="text-sm mb-1">Yerleshyan yeri*</h1>
                <input
                  className="min-h-[35px] text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-sm"
                  type="text"
                  value={location}
                  onChange={(e) => onChangeHandler(e, setLocation)}
                />
              </li>
              <li>
                <h1 className="text-sm mb-1">Kompaniyan ady*</h1>
                <input
                  className="min-h-[35px] text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-sm"
                  type="text"
                  value={companyName}
                  onChange={(e) => onChangeHandler(e, setCompanyName)}
                />
              </li>
              <li>
                <h1 className="text-sm mb-1">Kategoriya*</h1>
                <input
                  className="min-h-[35px] text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-sm"
                  type="text"
                  value={category}
                  onChange={(e) => onChangeHandler(e, setCategory)}
                />
              </li>
              <li>
                <h1 className="text-sm mb-1">Web sahypanyz</h1>
                <div>
                  <input
                    className="min-h-[35px] text-sm mb-[-4px] w-full outline-none border border-slate-700 p-1 pl-2 rounded-sm"
                    type="text"
                    name="url"
                    value={companyUrl}
                    onChange={(e) => onChangeHandler(e, setCompanyUrl)}
                  />
                  <label className="text-[12px]" htmlFor="url">
                    https://www.example.com
                  </label>
                </div>
              </li>
              <li>
                <h1 className="text-sm mb-1">Email*</h1>
                <input
                  className="min-h-[35px] text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-sm"
                  type="text"
                  name="jobmail"
                  value={resumesEmail}
                  onChange={(e) => onChangeHandler(e, setResumeEmail)}
                />
                <label className="text-[12px]" htmlFor="jobmail">
                  (CV's will be send to this email and job poster)
                </label>
              </li>
            </ul>
          </div>
          <div className="p-3 bg-[#001131e0]">
            <h1 className="text-white font-semibold">Job Description</h1>
          </div>
          <ReactQuill
            value={description}
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={(html) => setDescription(html)}
            placeholder="Write your description here"
          />

          <div className="flex gap-3 float-right mt-5">
            <button className="p-1 pl-4 pr-4 bg-[#001131e0] text-white rounded-sm">
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className={`p-1 pl-4 pr-4 bg-[#001131e0] text-white rounded-sm`}
            >
              {postMutation.isLoading ? (
                <img
                  className={`text-center h-4 pr-2 pl-2 animate-spin`}
                  src={getImageUrl("../assets/icons/rotate.png")}
                  alt=""
                />
              ) : (
                <h1>Post</h1>
              )}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewJobPost;
