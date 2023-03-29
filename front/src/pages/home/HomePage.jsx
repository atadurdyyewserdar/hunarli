import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import HomeSearchContainer from "../../components/home/HomeSearchContainer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex justify-between flex-col">
      <Header />
      <div className="flex-1">
        <div className="bg-slate-200">
          <div className="container max-w-screen-xl p-3 pt-20 pb-6 mb-8">
            <HomeSearchContainer />
            {/* <PopularSearch /> */}
          </div>
        </div>
        {/* <div className="container min-h-[200px] bg-[#001131e0] rounded-lg mb-11 p-3">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[40px] text-white text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit
            </h1>
            <p className="text-white text-center pb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              ipsam eaque qui, est, iste, unde placeat vitae atque fugiat
              voluptate alias. Deserunt!
            </p>
            <button className="w-64 flex items-center justify-center rounded-lg m-3 h-12 bg-[#001131e0] text-white">
              Join today
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-100">
          <div className="container">
            <div className="w-full h-full">
              <ul className="pt-11 flex flex-wrap gap-10 pb-11 items-center justify-center">
                <li className="text-center flex flex-col items-center justify-center w-[280px] border-slate-400 border rounded-lg p-5">
                  <img
                    className="h-32"
                    src={getImageUrl("../assets/icons/cv.png")}
                    alt=""
                  />
                  <p className="p-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, et. Numquam
                  </p>
                  <button className="w-full text-white h-10 rounded-md bg-[#001131e0]">
                    Read
                  </button>
                </li>
                <li className="text-center flex flex-col items-center justify-center w-[280px] border-slate-400 border rounded-lg p-5">
                  <img
                    className="h-32"
                    src={getImageUrl("../assets/icons/job-interview.png")}
                    alt=""
                  />
                  <p className="p-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, et. Numquam
                  </p>
                  <button className="w-full text-white h-10 rounded-md bg-[#001131e0]">
                    Read
                  </button>
                </li>
                <li className="text-center flex flex-col items-center justify-center w-[280px] border-slate-400 border rounded-lg p-5">
                  <img
                    className="h-32"
                    src={getImageUrl("../assets/icons/resume-tips.png")}
                    alt=""
                  />
                  <p className="p-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, et. Numquam
                  </p>
                  <button className="w-full text-white h-10 rounded-md bg-[#001131e0]">
                    Read
                  </button>
                </li>
                <li className="text-center flex flex-col items-center justify-center w-[280px] border-slate-400 border rounded-lg p-5">
                  <img
                    className="h-32"
                    src={getImageUrl("../assets/icons/success.png")}
                    alt=""
                  />
                  <p className="p-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, et. Numquam
                  </p>
                  <button className="w-full text-white h-10 rounded-md bg-[#001131e0]">
                    Read
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
