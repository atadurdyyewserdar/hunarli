import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Footer from "../../components/footer/Footer";
import Notification from "../../components/general/Notification";
import Header from "../../components/header/Header";
import Modal from "../../components/modal/Modal";
import { useResumeSenderMutation } from "../../hooks/mutationHooks";
import { useJobPost } from "../../hooks/queryHooks";
import {
  CalendarDaysIcon,
  ClockIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  MapPinIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

import "./job_post.css";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Tag from "../../components/search/Tag";
const SelectedJob = () => {
  const { id } = useParams();
  const { user, isAuth } = useSelector((state) => state.auth);
  const jobPostQuery = useJobPost(id);
  const navigate = useNavigate();
  const [description, setDescription] = useState(
    jobPostQuery.data?.description || ""
  );
  const [resume, setResume] = useState(null);
  const [open, setOpen] = useState(false);
  const date = format(
    new Date(jobPostQuery.data?.postedDate || null),
    "MMM d, yyyy 'y.'"
  );
  const time = format(new Date(jobPostQuery.data?.postedDate || null), "HH:mm");

  const resumeSenderMutation = useResumeSenderMutation(() => {
    setOpen(false);
    toast.success("Success", { icon: "👏" });
  });

  const uploadHandler = (e) => {
    setResume(e.target.files[0]);
  };

  const onSendSubmit = () => {
    if (!resume || resume === null || resume == null) {
      return;
    }
    const formData = new FormData();
    formData.append("file", resume);
    formData.append("username", user.username);
    formData.append("resumesEmail", jobPostQuery.data.resumesEmail);
    resumeSenderMutation.mutate({ id, formData });
  };

  const applyHandler = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    setOpen(!open);
  };

  useEffect(() => {
    setDescription(jobPostQuery.data?.description || "");
  }, [jobPostQuery.data]);

  return (
    <div>
      <div className="min-h-screen flex justify-between flex-col">
        <Header />
        <Notification />
        <div className="flex-1">
          <div className="container w-full mt-11">
            <div className="sm:m-auto m-3 sm:w-full w-auto bg-slate-100 rounded-sm pb-7 p-5">
              {jobPostQuery.isSuccess ? (
                <div className="w-full">
                  <div className="bg-[#001131e0]  rounded-sm">
                    <div className="flex gap-3 items-center mb-3 p-4">
                      <CalendarDaysIcon className="h-8 text-white" />
                      <h1 className="text-white font-semibold">{date}</h1>
                      <ClockIcon className="h-8 text-white  " />
                      <h1 className="text-white font-semibold">{time}</h1>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex gap-3 mb-3">
                      <BriefcaseIcon className="h-9" />
                      <h1 className="text-3xl font-bold">
                        {jobPostQuery.data?.title}
                      </h1>
                    </div>
                    <ul className="mb-3 pl-1 flex gap-8">
                      <li className="mb-1 flex items-center">
                        <BuildingOffice2Icon className="h-4 w-4" />
                        <h1 className="text-[15px]">&nbsp;&nbsp;Petronas</h1>
                      </li>
                      <li className="mb-1 flex items-center">
                        <MapPinIcon className="h-4 w-4" />
                        <h1 className="text-[15px]">
                          &nbsp;&nbsp;{jobPostQuery.data?.location}
                        </h1>
                      </li>
                      <li className="mb-1 flex items-center">
                        <GlobeAltIcon className="h-4 w-4" />
                        <h1 className="text-[15px] text-blue-700">
                          &nbsp;&nbsp;{jobPostQuery.data?.companyUrl}
                        </h1>
                      </li>
                    </ul>
                    <div className="flex gap-3 mb-4">
                      {jobPostQuery.data?.tags?.map((value, index) => (
                        <Tag key={index} value={value} />
                      ))}
                    </div>
                    <div className="bg-[#001131e0] rounded-b-none rounded-sm p-1 pl-3">
                      <h1 className="text-lg font-semibold text-white">
                        Description
                      </h1>
                    </div>
                    <div className="border-2 border-t-0 border-[#001131e0] p-2 mb-3">
                      <ReactQuill
                        className="ql-editor-custom"
                        value={description}
                        theme="bubble"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full p-3">
              <button
                onClick={applyHandler}
                className="sm:mt-4 mb-10 sm:w-32 w-full h-10 rounded-sm float-right text-white bg-[#001131e0]"
              >
                Apply
              </button>
            </div>
            <div>
              <Modal active={open} setActive={setOpen}>
                <div className="w-full text-center mt-9 mb-5">
                  <label
                    className="bg-[#001131e0] text-[15px] text-white rounded-sm p-3 pl-4 pr-4 cursor-pointer"
                    htmlFor="res"
                  >
                    Upload your resume
                  </label>
                  <input
                    id="res"
                    name="resume"
                    type="file"
                    onChange={uploadHandler}
                  />
                </div>
                <button
                  className="bg-[#001131e0] p-2 pl-7 pr-7 rounded-sm float-right text-white"
                  onClick={onSendSubmit}
                >
                  {resumeSenderMutation.isLoading ? (
                    <ArrowPathIcon className={`h-4 pr-2 pl-2 animate-spin`} />
                  ) : (
                    <h1>Send</h1>
                  )}
                </button>
              </Modal>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SelectedJob;
