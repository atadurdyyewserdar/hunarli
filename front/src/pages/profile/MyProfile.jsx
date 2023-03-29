import Footer from "../../components/footer/Footer";
import Modal from "../../components/modal/Modal";
import Header from "../../components/header/Header";
import EditProfile from "./EditProfile";
import AvatarEditor from "react-avatar-editor";
import Notification from "../../components/general/Notification";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useResumeQuery, useUserQuery } from "../../hooks/queryHooks";
import {
  useDeleteJob,
  useProfileImageUpdate,
  useUserUpdate,
} from "../../hooks/mutationHooks";
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { FolderArrowDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

const MyProfile = () => {
  // Variables
  const { user } = useSelector((state) => state.auth);
  const [isEditUserMode, setIsEditUserMode] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [scale, setScale] = useState(1);
  const [editorRef, setEditorRef] = useState(null);

  // Send update user datails to the server
  const onSubmitUserDetails = (userDetails) => {
    const username = user.username;
    updateMutation.mutate({ userDetails, username });
  };

  // Handler for onSuccess when user updates details
  const onSuccessUserUpdate = () => {
    queryClient.invalidateQueries(["users", user?.username], { exact: true });
    toast.success("Success", { icon: "👏" });
    setIsEditUserMode(!isEditUserMode);
  };

  // Handler for uploading user profile image
  const uploadHandler = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // Handler for scaling image when user upload picture
  const handleScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  // Handler for deleting job
  const deleteHandler = (id) => {
    deleteMutation.mutate({ id, username: user.username });
  };

  // Handler for downloading user resume
  const downloadHandler = () => {
    resumeQuery.refetch();
  };

  // Function to save image to server
  const savePicture = () => {
    const formData = new FormData();
    let canvas = editorRef.getImageScaledToCanvas().toBlob((blob) => {
      let file = new File([blob], profilePic.name, {
        type: "image/png",
      });
      formData.append("file", file);
      profileImageMutation.mutate({ username: user.username, formData });
    });
  };

  // Query hooks and mutations
  const queryClient = useQueryClient();
  const userQuery = useUserQuery(user.username, queryClient);
  const updateMutation = useUserUpdate(onSuccessUserUpdate);
  const profileImageMutation = useProfileImageUpdate(
    user.username,
    queryClient
  );
  const deleteMutation = useDeleteJob(user.username, queryClient);

  // Query to get resume id and set locally
  const [resumeId, setResumeId] = useState(userQuery.data?.resumeId || "");
  const resumeQuery = useResumeQuery(resumeId);
  useEffect(() => {
    setResumeId(userQuery.data?.resumeId || "");
  }, [userQuery.data]);

  /**
   * TODO: Allow user to update their password
   * Below code needs to be implemented in future
   */

  //  const onSubmitPassword = () => {
  //   if (newPassword.length === 0 || newPassword !== confirmPassword) {
  //     setPasswordError(true);
  //   }
  //   const passwordDetails = {
  //     newPassword: newPassword,
  //     confirmPassword: confirmPassword,
  //   };
  //   const username = user.username;
  //   passwordUpdateMutation.mutate({ passwordDetails, username });
  //   setIsEditUserMode(!isEditUserMode);
  // };
  // const passwordUpdateMutation = useMutation({
  //   mutationFn: updateUserPassword,
  //   onSuccess: () => {
  //     setPasswordError(false);
  //     setNewPassword("");
  //     setConfirmPassword("");
  //     dispatch(logout());
  //   },
  // });

  return (
    <div>
      <div className="min-h-screen h-fit flex justify-between flex-col">
        <Header />
        <Notification />
        <div className="flex-1 mb-10">
          <Modal
            active={openProfileDialog}
            setActive={setOpenProfileDialog}
            contentClass={"sm:w-[50vw] w-fit m-2"}
          >
            <div className="w-full">
              <button
                className="float-right"
                onClick={() => setOpenProfileDialog(!openProfileDialog)}
              >
                <XMarkIcon className="h-4" />
              </button>
              <div className="flex items-center flex-col">
                <div className="border-4 border-[#001131e0] rounded-md p-2 m-5">
                  <AvatarEditor
                    className="bg-slate-900 mb-2"
                    image={profilePic}
                    width={250}
                    height={250}
                    border={5}
                    color={[255, 255, 255, 0.6]}
                    scale={parseFloat(scale)}
                    ref={setEditorRef}
                  />
                  <input
                    type="range"
                    className="w-full"
                    onChange={handleScale}
                    min={1}
                    max={2}
                    step={0.01}
                    defaultValue={1}
                  />
                </div>
                <label
                  className="mb-10 box-border bg-[#001131e0] text-[15px] text-white rounded-md p-2 pt-2 pl-4 pr-4 cursor-pointer"
                  htmlFor="res"
                >
                  Upload your image
                </label>
                <input
                  className="hidden"
                  id="res"
                  name="resume"
                  type="file"
                  onChange={uploadHandler}
                />
              </div>
            </div>
            <button
              onClick={savePicture}
              className={` box-border bg-[#001131e0] p-[7px] m-2 pl-7 pr-7 rounded-md float-right text-white`}
            >
              {profileImageMutation.isLoading ? (
                <ArrowPathIcon
                  className={`text-center h-4 pr-2 pl-2 animate-spin`}
                />
              ) : (
                <h1>Save ✅</h1>
              )}
            </button>
          </Modal>
          <div className="container">
            {userQuery.isLoading
              ? null
              : userQuery.isSuccess && (
                  <div className="bg-slate-100 rounded-md  sm:flex sm:gap-2 sm:pl-10 pt-20 p-5">
                    <div className="flex-shrink-0 flex flex-col items-center sm:mr-5 mb-5">
                      {userQuery.data?.profilePictureMeta ? (
                        <img
                          className="h-[200px] w-[200px] rounded-[50%] border-[#001131e0] border-[2px] mb-3"
                          src={userQuery.data?.profilePictureMeta?.url}
                          alt=""
                        />
                      ) : (
                        <UserCircleIcon className="h-[200px] w-[200px] rounded-[50%] border-[#001131e0] border-[2px] mb-3" />
                      )}
                      <h1 className="font-semibold text-lg text-slate-700 mb-2">
                        {userQuery.data?.username && (
                          <>@{userQuery.data?.username}</>
                        )}
                      </h1>
                      <h1 className="font-semibold text-lg text-slate-700 pb-2 mb-2">
                        {userQuery.data?.occupation && (
                          <>{userQuery.data?.occupation} 💼</>
                        )}
                      </h1>
                      <button
                        onClick={() => setIsEditUserMode(!isEditUserMode)}
                        className="bg-[#001121e0] mb-5 p-2 pl-3 pr-3 rounded-md text-white text-sm"
                      >
                        Edit profile ✍️
                      </button>
                      <button
                        onClick={() => setOpenProfileDialog(!openProfileDialog)}
                        className="bg-[#001121e0] p-2 pl-3 pr-3 rounded-md text-white text-sm"
                      >
                        Edit picture 📸
                      </button>
                      {/* <button onClick={notify}>Click</button> */}
                    </div>
                    {isEditUserMode ? (
                      <EditProfile
                        data={userQuery.data}
                        onSave={onSubmitUserDetails}
                        isLoading={updateMutation.isLoading}
                      />
                    ) : (
                      <div className="pl-5 pt-2">
                        <h1 className="text-3xl font-semibold mb-2">
                          {userQuery.data?.firstName}&nbsp;
                          {userQuery.data?.lastName}
                        </h1>
                        <ul className="mb-5">
                          <li>
                            <h1 className="text-[15px] mb-1">
                              {userQuery.data?.location && (
                                <>📌&nbsp;&nbsp;{userQuery.data?.location}</>
                              )}
                            </h1>
                          </li>
                          <li>
                            <h1 className="text-[15px] mb-1">
                              {userQuery.data?.currentCompany && (
                                <>
                                  🏢&nbsp;&nbsp;{userQuery.data?.currentCompany}
                                </>
                              )}
                            </h1>
                          </li>
                          <li>
                            <h1 className="text-[15px] mb-1">
                              {userQuery.data?.portfolioUrl && (
                                <>
                                  🌐&nbsp;&nbsp;{userQuery.data?.portfolioUrl}
                                </>
                              )}
                            </h1>
                          </li>
                          <li>
                            <h1 className="text-[15px] mb-1">
                              {userQuery.data?.phoneNumber && (
                                <>📞&nbsp;&nbsp;{userQuery.data?.phoneNumber}</>
                              )}
                            </h1>
                          </li>
                          <li></li>
                        </ul>
                        {userQuery.data?.resumeId && (
                          <div className="flex items-center mb-1">
                            <h1 className="text-[15px] mr-2">
                              📋&nbsp;&nbsp;Resume
                            </h1>
                            <button
                              onClick={downloadHandler}
                              className="flex justify-center items-center bg-[#001131e0] text-[15px] text-white rounded-md p-1 pl-4 pr-4"
                            >
                              Yukle
                              <FolderArrowDownIcon className="h-5 ml-2" />
                            </button>
                          </div>
                        )}
                        {userQuery.data?.tags && (
                          <div className="mt-3">
                            <h1 className="font-semibold text-md mb-2">
                              #Tags
                            </h1>
                            <ul className="flex gap-3 flex-wrap">
                              {userQuery.data?.tags?.map((tag, index) => (
                                <li
                                  key={index}
                                  className="bg-[#cc6606f8] p-1 pl-2 pr-2 w-fit text-[12px] rounded-sm text-white"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-5 w-full">
                          <h1 className="font-semibold text-md mb-2">
                            About me
                          </h1>
                          <div className="w-full border-slate-400 border p-3 rounded-md shadow-sm">
                            <p className="text-sm">{userQuery.data?.aboutMe}</p>
                          </div>
                        </div>
                        <div className="mt-5 w-full">
                          <h1 className="font-semibold text-md mb-2">
                            Job posts
                          </h1>
                          <ul className="">
                            {userQuery.data?.jobPosts?.map((job, index) => (
                              <li
                                key={index}
                                className="text-sm border-slate-400 border rounded-md shadow-sm mb-2"
                              >
                                <div className="text-white text-sm bg-[#001131e0] flex gap-3 rounded-t-md p-2 pl-2 items-center">
                                  <button
                                    onClick={() => deleteHandler(job.id)}
                                    className="p-1 bg-white rounded-md"
                                  >
                                    🗑️
                                  </button>
                                  <Link
                                    to={`/editjob/${job.id}`}
                                    className="p-1 bg-white rounded-md"
                                  >
                                    ✍️
                                  </Link>
                                </div>
                                <Link
                                  to={`/jobs/${job.id}`}
                                  className="flex sm:flex-row flex-col gap-2 p-3 flex-wrap w-full "
                                >
                                  <h1>💼&nbsp;{job.title}</h1>
                                  <h1>📌&nbsp;{job.location}</h1>
                                  <h1>🏢&nbsp;{job.companyName}</h1>
                                  <h1>📅&nbsp;{job.postedDate}</h1>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MyProfile;
