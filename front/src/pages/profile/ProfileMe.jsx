import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUserDeatils,
  updateUserPassword,
} from "../../api/users";
import Footer from "../../components/footer/Footer";
import Headr from "../../components/header/Headr";
import { logout } from "../../redux/authSlice";
import "./profile.css";

function getImageUrl(name) {
  return new URL(`../../assets/icons/${name}`, import.meta.url).href;
}

const ProfileMe = () => {
  const [userdetails, setUserdetails] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["users", user?.username],
    queryFn: () => getUser(user.username),
  });

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [languageOne, setLanguageOne] = useState("");
  const [languageTwo, setLanguageTwo] = useState("");
  const [languageThree, setLanguageThree] = useState("");
  const [languageFour, setLanguageFour] = useState("");
  const [languageFive, setLanguageFive] = useState("");

  const updateMutation = useMutation({
    mutationFn: updateUserDeatils,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", user?.username], { exact: true });
      setEmail("");
      setFirstname("");
      setLastname("");
      setOccupation("");
      setLanguageFive("");
      setLanguageFour("");
      setLanguageOne("");
      setLanguageThree("");
      setLanguageTwo("");
    },
  });

  const onChangeInput = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const onSubmitUserDetails = () => {
    const userDetails = {
      email: email === "" ? data.email : email,
      firstName: firstName === "" ? data.firstName : firstName,
      lastName: lastName === "" ? data.lastName : lastName,
      occupation: occupation === "" ? data.occupation : occupation,
      topLanguages: {
        languageOne:
          languageOne === "" ? data.topLanguages.languageOne : languageOne,
        languageTwo:
          languageTwo === "" ? data.topLanguages.languageTwo : languageTwo,
        languageThree:
          languageThree === ""
            ? data.topLanguages.languageThree
            : languageThree,
        languageFour:
          languageFour === "" ? data.topLanguages.languageFour : languageFour,
        languageFive:
          languageFive === "" ? data.topLanguages.languageFive : languageFive,
      },
    };
    const username = user.username;
    updateMutation.mutate({ userDetails, username });
  };

  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const passwordUpdateMutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      setPasswordError(false);
      setNewPassword("");
      setConfirmPassword("");
      dispatch(logout());
    },
  });

  const onSubmitPassword = () => {
    if (newPassword.length === 0 || newPassword !== confirmPassword) {
      setPasswordError(true);
    }
    const passwordDetails = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    const username = user.username;
    passwordUpdateMutation.mutate({ passwordDetails, username });
  };

  return (
    <div className="profilepage">
      <Headr />
      <div className="profilepage__main">
        <div className="profile_main_container">
          <div className="upper-rectangle"></div>
          {isLoading && <>Loading...</>}
          {isError && <>Error while fetching data</>}
          {isSuccess && (
            <div className="bottom-rectangle">
              <div className="profile__image-box">
                <div className="bottom-image-box">
                  <img
                    src={getImageUrl("profile.jpg")}
                    alt="profile"
                  />
                  <h4 className="username">
                    {"@"}
                    {data.username}
                  </h4>
                  <div>
                    <button onClick={() => setUserdetails(!userdetails)}>
                      edit
                    </button>
                  </div>
                </div>
                <div className="profile-details-box">
                  <h4>
                    {data.firstName} {data.lastName}
                  </h4>
                  <div className="skills-container">
                    <div className="skill-items">
                      {data.topLanguages.languageOne !== "" &&
                        data.topLanguages.languageOne && (
                          <div className="skill">
                            {data.topLanguages?.languageOne}
                          </div>
                        )}
                      {data.topLanguages.languageTwo !== "" &&
                        data.topLanguages.languageTwo && (
                          <div className="skill">
                            {data.topLanguages?.languageTwo}
                          </div>
                        )}
                      {data.topLanguages.languageThree !== "" &&
                        data.topLanguages.languageThree && (
                          <div className="skill">
                            {data.topLanguages?.languageThree}
                          </div>
                        )}
                      {data.topLanguages.languageFour !== "" &&
                        data.topLanguages.languageFour && (
                          <div className="skill">
                            {data.topLanguages?.languageFour}
                          </div>
                        )}
                      {data.topLanguages.languageFive !== "" &&
                        data.topLanguages.languageOne && (
                          <div className="skill">
                            {data.topLanguages?.languageFive}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="profile-details">
                    <div className="membership">
                      Member since: {data.joinDate}
                    </div>
                    <div className="membership">
                      Occupation: {data.occupation}
                    </div>
                    <div className="profile-socials">
                      <a href="">
                        <img
                          src={getImageUrl("twitter24.png")}
                          alt=""
                        />
                      </a>
                      <a href="">
                        <img
                          src={getImageUrl("github.png")}
                          alt=""
                        />
                      </a>
                      <a href="">
                        <img
                          src={getImageUrl("telegram1.png")}
                          alt=""
                        />
                      </a>
                      <a href="">
                        <img
                          src={getImageUrl("linkedin.png")}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {userdetails && (
                <div className="user-details-container">
                  <div>
                    <div>
                      <span>First name</span>
                      <input
                        className="user-input"
                        type="name"
                        value={firstName}
                        placeholder={data.firstName}
                        onChange={(e) => onChangeInput(e, setFirstname)}
                      />
                    </div>
                    <div>
                      <span>Last name</span>
                      <input
                        className="user-input"
                        type="name"
                        value={lastName}
                        placeholder={data.lastName}
                        onChange={(e) => onChangeInput(e, setLastname)}
                      />
                    </div>
                    <div>
                      <span>Email</span>
                      <input
                        className="user-input"
                        type="email"
                        value={email}
                        placeholder={data.email}
                        onChange={(e) => onChangeInput(e, setEmail)}
                      />
                    </div>
                    <div className="top-languages">
                      <div>In Govy bilyan 5 programmirle diliniz</div>
                      <div>
                        <div>Programmirleme dili 1</div>
                        <input
                          value={languageOne}
                          className="user-input"
                          type="text"
                          placeholder={data.topLanguages?.languageOne}
                          onChange={(e) => onChangeInput(e, setLanguageOne)}
                        />
                      </div>
                      <div>
                        <div>Programmirleme dili 2</div>
                        <input
                          value={languageTwo}
                          className="user-input"
                          type="text"
                          placeholder={data.topLanguages?.languageTwo}
                          onChange={(e) => onChangeInput(e, setLanguageTwo)}
                        />
                      </div>
                      <div>
                        <div>Programmirleme dili 3</div>
                        <input
                          value={languageThree}
                          className="user-input"
                          type="text"
                          placeholder={data.topLanguages?.languageThree}
                          onChange={(e) => onChangeInput(e, setLanguageThree)}
                        />
                      </div>
                      <div>
                        <div>Programmirleme dili 4</div>
                        <input
                          value={languageFour}
                          className="user-input"
                          type="text"
                          placeholder={data.topLanguages?.languageFour}
                          onChange={(e) => onChangeInput(e, setLanguageFour)}
                        />
                      </div>
                      <div>
                        <div>Programmirleme dili 5</div>
                        <input
                          value={languageFive}
                          className="user-input"
                          type="text"
                          placeholder={data.topLanguages?.languageFive}
                          onChange={(e) => onChangeInput(e, setLanguageFive)}
                        />
                      </div>
                    </div>
                    <div className="occupation">
                      <span>Occupation</span>
                      <input
                        value={occupation}
                        className="user-input"
                        type="text"
                        id="occupation"
                        autoComplete="false"
                        placeholder={data.occupation}
                        onChange={(e) => onChangeInput(e, setOccupation)}
                      />
                    </div>
                    <button onClick={onSubmitUserDetails}>Submit</button>
                  </div>
                  <form style={{ display: "none" }}>
                    <input type="password" />
                    <input type="password" />
                  </form>
                  <div>
                    <div>
                      <span>New password</span>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        autoComplete="off"
                        className="user-input"
                        onChange={(e) => onChangeInput(e, setNewPassword)}
                      />
                    </div>
                    <div>
                      <span>Confirm password</span>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        autoComplete="off"
                        className="user-input"
                        onChange={(e) => onChangeInput(e, setConfirmPassword)}
                      />
                    </div>
                    <div>
                      {passwordUpdateMutation.isError && (
                        <div style={{ color: "red" }}>
                          {passwordUpdateMutation.error.response.data.message}
                        </div>
                      )}
                    </div>
                    <button onClick={onSubmitPassword}>Submit</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileMe;
