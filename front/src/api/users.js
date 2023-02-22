import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const getUser = (username) => {
  return axiosWithCredentials
    .get(`http://localhost:8080/user/${username}`)
    .then((response) => response.data);
};

export const updateUserDeatils = ({ userDetails, username }) => {
  return axiosWithCredentials.post(
    `http://localhost:8080/user/${username}`,
    userDetails
  );
};

export const updateUserPassword = ({ passwordDetails, username }) => {
  return axiosWithCredentials.post(
    `http://localhost:8080/user/${username}/update-password`,
    passwordDetails
  );
};
