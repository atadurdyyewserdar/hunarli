import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getImageUrl } from "../../hooks/utils";

const EditProfile = ({ data, onSave, isLoading }) => {
  const [firstName, setFirstname] = useState(data.firstName || "");
  const [lastName, setLastname] = useState(data.lastName || "");
  const [location, setLocation] = useState(data.location || "");
  const [email, setEmail] = useState(data.email || "");
  const [currentCompany, setCurrentCompany] = useState(
    data.currentCompany || ""
  );
  const [occupation, setOccupation] = useState(data.occupation || "");
  const [portfolioUrl, setPortfolioUrl] = useState(data.portfolioUrl || "");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [aboutMe, setAboutMe] = useState(data.aboutMe || "");
  const [tags, setTags] = useState(data.tags || []);
  const [file, setFile] = useState(null);
  const [newtag, setNewtag] = useState("");

  const saveDetails = () => {
    const formData = new FormData();
    if (file !== null) {
      formData.append("resume", file);
    }
    formData.append("email", email);
    formData.append(
      "firstName",
      firstName === "" ? data?.firstName : firstName
    );
    formData.append("lastName", lastName);
    formData.append("aboutMe", aboutMe);
    formData.append("location", location);
    formData.append("currentCompany", currentCompany);
    formData.append("occupation", occupation);
    formData.append("portfolioUrl", portfolioUrl);
    formData.append("phoneNumber", phoneNumber);
    formData.append("tags", tags);
    onSave(formData);
  };

  const removeItem = (index) => {
    const arr = [...tags];
    arr.splice(index, 1);
    setTags(arr);
  };

  const addItem = (tag) => {
    const tg = tag.trim().toUpperCase();
    if (tg.length === 0 || tags.includes(tg)) {
      setNewtag("");
      return;
    }
    const arr = [tg, ...tags];
    setTags(arr);
    setNewtag("");
  };

  const onChangeInput = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const uploadHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="pl-5 pt-2 flex">
        <div>
          <ul className="flex flex-col gap-3 w-full">
            <li>
              <h1 className="text-sm mb-1">Adynyz</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.firstName}
                value={firstName}
                onChange={(e) => onChangeInput(e, setFirstname)}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Familyanyz</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.lastName}
                onChange={(e) => onChangeInput(e, setLastname)}
                value={lastName}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Ulanyjy ady</h1>
              <input
                readOnly
                className="text-sm w-full bg-[#ddd] outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.username}
                value={data.username || ""}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Yerleshyan yeriniz</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.location}
                onChange={(e) => onChangeInput(e, setLocation)}
                value={location}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Email</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.email}
                onChange={(e) => onChangeInput(e, setEmail)}
                value={email}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Is yeri</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.currentCompany}
                onChange={(e) => onChangeInput(e, setCurrentCompany)}
                value={currentCompany}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Is wezipesi</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.occupation}
                onChange={(e) => onChangeInput(e, setOccupation)}
                value={occupation}
              />
            </li>
            <li>
              <h1 className="text-sm mb-1">Web sahypanyz</h1>
              <div>
                <input
                  className="text-sm mb-[-4px] w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                  type="text"
                  placeholder={data?.portfolioUrl}
                  name="url"
                  onChange={(e) => onChangeInput(e, setPortfolioUrl)}
                  value={portfolioUrl}
                />
                <label className="text-[12px]" htmlFor="url">
                  https://www.example.com
                </label>
              </div>
            </li>
            <li>
              <h1 className="text-sm mb-1">Telefon nomeriniz</h1>
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md"
                type="text"
                placeholder={data?.phoneNumber}
                onChange={(e) => onChangeInput(e, setPhoneNumber)}
                value={phoneNumber}
              />
            </li>
            <li className="flex items-center mb-1">
              <h1 className="text-sm mr-3">Resume&nbsp;&nbsp;</h1>
              <input
                onChange={uploadHandler}
                type="file"
                className="flex justify-center items-center bg-[#001131e0] text-[12px] text-white rounded-md p-1 pl-2 pr-2"
              />
            </li>
          </ul>
          <div className="mt-3">
            <h1 className="font-semibold text-md mb-2">Tags #️⃣</h1>
            <div className="flex gap-3">
              <input
                className="text-sm w-full outline-none border border-slate-700 p-1 pl-2 rounded-md mb-2"
                type="text"
                placeholder="Tag name"
                value={newtag}
                onChange={(e) => onChangeInput(e, setNewtag)}
              />
              <button
                onClick={() => addItem(newtag)}
                className="border-[#001131e0] hover:bg-[#001131e0] hover:text-white hover:border-white rounded-md p-1 pl-4 pr-4 text-sm text-black border-2 mb-2"
              >
                Gosh
              </button>
            </div>
            <div>
              <ul className="flex gap-3 flex-wrap  border border-slate-400 p-3 rounded-md shadow-sm">
                {tags.map((value, index) => (
                  <li
                    key={index}
                    className="cursor-pointer bg-[#cc6606f8] p-1 pl-2 pr-2 w-fit text-[12px] rounded-sm text-white"
                    onClick={() => removeItem(index)}
                  >
                    {value}&nbsp;&nbsp;❌
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 mb-2">
            <h1 className="font-semibold text-md mb-2">About me 👋</h1>
            <div className="w-full border-slate-400 border p-3 rounded-md shadow-sm">
              <textarea
                className="w-full text-sm"
                placeholder={data?.aboutMe}
                onChange={(e) => onChangeInput(e, setAboutMe)}
                value={aboutMe}
              />
            </div>
          </div>
          <button
            onClick={saveDetails}
            className={` bg-[#001121e0] flex items-center justify-center w-24 h-9 rounded-md text-white text-sm`}
          >
            {isLoading ? (
              <ArrowPathIcon
                className={`text-center h-4 pr-2 pl-2 animate-spin`}
              />
            ) : (
              <h1>Save</h1>
            )}
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default EditProfile;
