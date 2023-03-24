import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SearchContainer from "../../components/search/SearchContainer";
import NormalViewFilters from "../../components/search/NormalViewFilters";
import MobileViewFilters from "../../components/search/MobileViewFilters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { multlipleSearchParams, removeSearchParam } from "../../utils/utils";
import { useJobPosts } from "../../hooks/queryHooks";
import "./searchpage.css";
import JobPost from "../../components/search/JobPost";

const dateFilters = [
  {
    id: 1,
    title: "All",
    value: "all",
  },
  {
    id: 2,
    title: "Last 24 hours",
    value: "last24",
    icon: "https://em-content.zobj.net/source/skype/289/fire_1f525.png",
  },

  {
    id: 3,
    title: "Last 3 days",
    value: "last3days",
  },
  {
    id: 4,
    title: "Last week",
    value: "lastweek",
  },
  {
    id: 5,
    title: "Last 2 weeks",
    value: "last2weeks",
  },
  {
    id: 6,
    title: "Last 3 weeks",
    value: "last3weeks",
  },
  {
    id: 7,
    title: "Last month",
    value: "lastmonth",
  },
];

const sortFilter = [
  {
    id: 1,
    title: "Most Relevant",
    value: "mostrelevant",
    icon: "../assets/icons/star_a.png",
  },
  {
    id: 2,
    title: "Recent",
    value: "recent",
    icon: "../assets/icons/calendar_a.png",
  },
];

const categoryFilters = [
  {
    id: 2,
    title: "Marketing",
    value: "marketing",
    icon: "../assets/icons/marketing.png",
  },
  {
    id: 3,
    title: "Engineering",
    value: "engineering",
    icon: "../assets/icons/engineering.png",
  },
  {
    id: 4,
    title: "IT",
    value: "it",
    icon: "../assets/icons/it.png",
  },
];

const SearchPage = () => {
  const [filters, setFilters] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const jobPostsQuery = useJobPosts(filters, isSearch);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fOpen, setFOpen] = useState(false);

  const initialSearchParams = {
    title: searchParams.get("title") || "",
    location: searchParams.get("location") || "",
    dateS: searchParams.get("dateS") || "",
  };

  useEffect(() => {
    if (
      initialSearchParams.title ||
      initialSearchParams.location ||
      initialSearchParams.dateS ||
      initialSearchParams.categories
    ) {
      if (initialSearchParams.title) filters.title = initialSearchParams.title;
      if (initialSearchParams.location)
        filters.location = initialSearchParams.location;
      if (initialSearchParams.dateS) filters.dateS = initialSearchParams.dateS;
      if (initialSearchParams.categories)
        filters.categories = initialSearchParams.categories;
      setIsSearch(true);
      setFilters(filters);
    }
  }, [initialSearchParams]);

  const onChangeRadio = (value) => {
    filters.dateS = value;
    setIsSearch(true);
    setFilters(filters);
    setSearchParams(filters);
  };

  const onChangeCheckBox = (value, isExist) => {
    let str = "";
    if (isExist) {
      str = removeSearchParam(searchParams.get("categories") || "", value);
    } else {
      str = multlipleSearchParams(searchParams.get("categories") || "", value);
    }
    filters.categories = str;
    if (str === "all") delete filters.categories;
    setIsSearch(true);
    setFilters(filters);
    setSearchParams(filters);
  };

  const onSearchClicked = (title, location) => {
    if (title === "" && location === "all") {
      setIsSearch(false);
    } else setIsSearch(true);
    if (title === "") delete filters.title;
    else filters.title = title;
    filters.location = location;
    if (filters.location === "all" || filters.location === "")
      delete filters.location;
    setFilters(filters);
    setSearchParams(filters);
  };

  return (
    <div className="min-h-screen flex justify-between flex-col">
      <Header />
      <main className="flex-1">
        <div className="container w-full">
          <SearchContainer
            onClick={onSearchClicked}
            title={initialSearchParams.title}
            location={initialSearchParams.location}
            isLoading={jobPostsQuery.isLoading}
          />
          {/* <PopularSearch /> */}
          <div className="w-full mt-11 mb-11">
            <div className="w-full flex sm:flex-row flex-col md:gap-5">
              <div className="m-3 sm:hidden">
                <button
                  onClick={() => setFOpen(true)}
                  className="w-full text-white text-lg p-3 font-semibold rounded-md bg-[#001131e0]"
                >
                  Filters ☘️
                </button>
              </div>
              <NormalViewFilters
                categoryFilters={categoryFilters}
                dateFilters={dateFilters}
                sortFilter={sortFilter}
                initialSearchParams={initialSearchParams}
                onChangeRadio={onChangeRadio}
                onChangeCheckBox={onChangeCheckBox}
                searchParams={searchParams}
              />
              {fOpen && (
                <MobileViewFilters
                  categoryFilters={categoryFilters}
                  dateFilters={dateFilters}
                  sortFilter={sortFilter}
                  initialSearchParams={initialSearchParams}
                  onChangeRadio={onChangeRadio}
                  onChangeCheckBox={onChangeCheckBox}
                  searchParams={searchParams}
                  setFOpen={setFOpen}
                />
              )}
              <div className="w-full">
                {jobPostsQuery.isLoading
                  ? null
                  : jobPostsQuery.isSuccess && (
                      <ul>
                        {jobPostsQuery.data?.map((job, index) => (
                          <JobPost key={index} job={job} />
                        ))}
                      </ul>
                    )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
