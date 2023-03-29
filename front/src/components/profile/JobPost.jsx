import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const JobPost = ({ job, deleteHandler, location }) => {
  const date = format(new Date(job?.postedDate || null), "MMM d, yyyy 'y.'");
  const time = format(new Date(job?.postedDate || null), "HH:mm");
  return (
    <li className="text-sm border-[#001131e0] border rounded-sm shadow-sm mb-2">
      <div className="text-white text-sm bg-[#001131e0] flex gap-3 p-2 pl-2 items-center">
        <button
          onClick={() => deleteHandler(job.id)}
          className="p-1 rounded-full hover:bg-slate-500"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
        <Link
          to={`/editjob/${job.id}`}
          className="p-1 rounded-full hover:bg-slate-500"
          state={{ from: "/myprofile" }}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </Link>
      </div>
      <Link
        to={`/jobs/${job.id}`}
        className="flex sm:flex-row flex-col gap-5 p-3 flex-wrap w-full "
      >
        <div className="flex items-center">
          <BriefcaseIcon className="h-4 w-4 text-[#383838]" />
          <h1>&nbsp;{job.title}</h1>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 text-[#383838]" />
          <h1>&nbsp;{job.location}</h1>
        </div>
        <div className="flex items-center">
          <BuildingOffice2Icon className="h-4 w-4 text-[#383838]" />
          <h1>&nbsp;{job.companyName}</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-4 w-4 text-[#383838]" />
            <h1>{date}</h1>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-[#383838]" />
            <h1>{time}</h1>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default JobPost;
