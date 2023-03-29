import axios from "axios";
import { saveAs } from "file-saver";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const getUser = (username) => {
  return axiosWithCredentials
    .get(`https://stg.hunarli.com/api/user/${username}`)
    .then((response) => response.data);
};

export const updateUserDeatils = ({ userDetails, username }) => {
  return axiosWithCredentials.post(
    `https://stg.hunarli.com/api/user/${username}`,
    userDetails,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const updateUserPassword = ({ passwordDetails, username }) => {
  return axiosWithCredentials.post(
    `https://stg.hunarli.com/api/user/${username}/update-password`,
    passwordDetails
  );
};

export const saveProfileImage = ({ username, formData }) => {
  return axiosWithCredentials.post(
    `https://stg.hunarli.com/api/user/${username}/update-profile-pic`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const getResume = (id) => {
  return axiosWithCredentials
    .get(`https://stg.hunarli.com/api/user/resume/${id}`, {
      responseType: "arraybuffer",
    })
    .then((res) => {
      const dataR = res.data;
      const blob = new Blob([dataR], { type: "application/pdf;charset=utf-8" });
      const fileName = "Resume.pdf";
      saveAs(blob, fileName);
      return res.data;
    });
};

export const validateResetPasswordToken = (token) => {
  return axiosWithCredentials
    .get(`https://stg.hunarli.com/api/user/reset-password/new/${token}`)
    .then((res) => res.data);
};

export const sendResetLink = (email) => {
  return axiosWithCredentials
    .post(`https://stg.hunarli.com/api/user/reset-password/${email}`)
    .then((res) => res.data);
};

export const resetPassword = ({ token, passwordDetails }) => {
  return axiosWithCredentials
    .post(
      `https://stg.hunarli.com/api/user/reset-password/new/${token}`,
      passwordDetails
    )
    .then((res) => res.data);
};

export const verifyEmail = (token, username) => {
  return axios
    .get(
      `https://stg.hunarli.com/api/verify-email/confirm?token=${token}&username=${username}`
    )
    .then((res) => res.data);
};
