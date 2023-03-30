import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Tag from "./Tag";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const JobPost = ({ job }) => {
  const date = format(new Date(job?.postedDate || null), "MMM d, yyyy 'y.'");
  const time = format(new Date(job?.postedDate || null), "HH:mm");
  return (
    <li className="bg-slate-50 h-full sm:w-full m-2 mt-0 sm:min-h-[130px] border-[#979797] border rounded-sm shadow">
      <div className="flex h-1/2 p-3">
        {job.author?.profilePictureMeta ? (
          <img
            className="rounded-[50%] h-20 p-1 mr-2"
            src={job.author?.profilePictureMeta?.url}
            alt=""
          />
        ) : (
          <UserCircleIcon className="rounded-[50%] text-[#001131] h-20 p-1 mr-2" />
        )}
        <div>
          <Link
            to={`/jobs/${job?.id}`}
            className="text-lg font-bold hover:underline text-blue-900"
          >
            {job?.title}
          </Link>
          <div className="flex flex-col sm:flex-row mt-3 sm:gap-8 gap-2 mb-2">
            <div className="flex gap-1">
              <BuildingOffice2Icon className="h-4 w-4 text-[#383838]" />
              <Link className="text-[#383838] font-semibold hover:underline text-sm">
                {job?.companyName}
              </Link>
            </div>
            <div className="flex gap-1 items-center">
              <MapPinIcon className="h-4 w-4 text-[#383838]" />
              <Link className="hover:underline text-[#383838] font-semibold text-sm ">
                {job?.location}
              </Link>
            </div>
            <div className="flex gap-1 items-center">
              <UserIcon className="h-4 w-4 text-[#383838]" />
              <h1 className="text-[#383838] font-semibold text-sm">
                Full Time
              </h1>
            </div>
          </div>
          <div className="flex mt-3 gap-5 mb-2">
            <div className="flex gap-1 items-center">
              <CalendarDaysIcon className="h-4 w-4 text-[#383838]" />
              <h1 className="text-[#383838] font-semibold text-sm">{date}</h1>
            </div>
            <div className="flex gap-1 items-center">
              <ClockIcon className="h-4 w-4 text-[#383838]" />
              <h1 className="text-[#383838] font-semibold text-sm">{time}</h1>
            </div>
          </div>
          <div className="flex gap-3">
            {job?.tags?.map((value, index) => (
              <Tag key={index} value={value} />
            ))}
          </div>
        </div>
      </div>
      <div className="ml-4"></div>
    </li>
  );
};

export default JobPost;
