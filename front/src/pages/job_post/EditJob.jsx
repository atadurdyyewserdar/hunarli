import ReactQuill from "react-quill";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../hooks/utils";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
import { useJobPost } from "../../hooks/queryHooks";
import { useUpdatePostMutation } from "../../hooks/mutationHooks";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const EditJob = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const jobPostQuery = useJobPost(id);
  const updateMutation = useUpdatePostMutation(() => {
    queryClient.invalidateQueries(["jobs", id], { exact: true });
    navigate("/myprofile");
  });

  const [title, setTitle] = useState(jobPostQuery.data?.title || "");
  const [location, setLocation] = useState(jobPostQuery.data?.location || "");
  const [companyName, setCompanyName] = useState(
    jobPostQuery.data?.companyName || ""
  );
  const [category, setCategory] = useState(jobPostQuery.data?.category || "");
  const [companyUrl, setCompanyUrl] = useState(
    jobPostQuery.data?.companyUrl || ""
  );
  const [resumesEmail, setResumeEmail] = useState(
    jobPostQuery.data?.resumesEmail || ""
  );
  const [description, setDescription] = useState(
    jobPostQuery.data?.description || ""
  );

  const onChangeHandler = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

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
      username: user.username,
      title: title,
      description: description,
      location: location,
      companyName: companyName,
      companyUrl: companyUrl,
      resumesEmail: resumesEmail,
      category: category,
    };
    updateMutation.mutate({ id, jobPost });
  };

  useEffect(() => {
    setTitle(jobPostQuery.data?.title || "");
    setLocation(jobPostQuery.data?.location || "");
    setCompanyName(jobPostQuery.data?.companyName || "");
    setCategory(jobPostQuery.data?.category || "");
    setCompanyUrl(jobPostQuery.data?.companyUrl || "");
    setDescription(jobPostQuery.data?.description || "");
    setResumeEmail(jobPostQuery.data?.resumesEmail || "");
  }, [jobPostQuery.data]);

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
          <div className="p-6 pl-3 flex gap-3 items-center rounded-t-md bg-[#001131e0]">
            <h1 className="text-white font-semibold">Edit mode ✍️📃 </h1>
            {jobPostQuery.isLoading ||
              (jobPostQuery.isFetching && (
                <ArrowPathIcon
                  className="h-4 animate-spin"
                />
              ))}
          </div>
          {jobPostQuery.isSuccess && (
            <>
              <div className="p-6 pl-3 border-[#001131e0] border-2 borderb-0 border-t-0">
                <ul className="flex flex-col gap-3 w-full">
                  <li>
                    <h1 className="text-sm mb-1">Is wezipesi* 💼</h1>
                    <input
                      className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                      type="text"
                      value={title}
                      onChange={(e) => onChangeHandler(e, setTitle)}
                    />
                  </li>
                  <li>
                    <h1 className="text-sm mb-1">Yerleshyan yeri* 📌</h1>
                    <input
                      className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                      type="text"
                      value={location}
                      onChange={(e) => onChangeHandler(e, setLocation)}
                    />
                  </li>
                  <li>
                    <h1 className="text-sm mb-1">Kompaniyan ady* 🏢</h1>
                    <input
                      className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                      type="text"
                      value={companyName}
                      onChange={(e) => onChangeHandler(e, setCompanyName)}
                    />
                  </li>
                  <li>
                    <h1 className="text-sm mb-1">Kategoriya* ☘️</h1>
                    <input
                      className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                      type="text"
                      value={category}
                      onChange={(e) => onChangeHandler(e, setCategory)}
                    />
                  </li>
                  <li>
                    <h1 className="text-sm mb-1">Web sahypanyz 🌐</h1>
                    <div>
                      <input
                        className="text-sm mb-[-4px] w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
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
                    <h1 className="text-sm mb-1">Email* 📧</h1>
                    <input
                      className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
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
                <h1 className="text-white font-semibold">Job Description 📙</h1>
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
                <button className="p-1 pl-4 pr-4 bg-[#001131e0] text-white rounded-md">
                  Cancel
                </button>
                <button
                  onClick={submitHandler}
                  className={`p-1 pl-4 pr-4 bg-[#001131e0] text-white rounded-md`}
                >
                  {updateMutation.isLoading ? (
                    <ArrowPathIcon
                      className={`text-center h-4 pr-2 pl-2 animate-spin`}
                    />
                  ) : (
                    <h1>Save ✅</h1>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditJob;
