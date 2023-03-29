import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const addJobPost = ({ jobPost, username }) => {
  return axiosWithCredentials.post(
    `http://localhost:8081/api/jobs/new/${username}`,
    jobPost
  );
};

export const updateJobPost = ({ id, jobPost }) => {
  return axiosWithCredentials.put(
    `http://localhost:8081/api/jobs/${id}`,
    jobPost
  );
};

export const deleteJob = ({ id, username }) => {
  return axiosWithCredentials.delete(
    `http://localhost:8081/api/jobs/${id}/${username}`
  );
};

export const getJobPosts = (filters, isSearch) => {
  if (isSearch) {
    return axios
      .get(`http://localhost:8081/api/jobs/search`, { params: filters })
      .then((response) => {
        return response.data;
      });
  } else {
    return axios.get(`http://localhost:8081/api/jobs`).then((response) => {
      return response.data;
    });
  }
};

export const getPostById = (id) => {
  return axios
    .get(`http://localhost:8081/api/jobs/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const sendResume = ({ id, formData }) => {
  return axiosWithCredentials.post(
    `http://localhost:8081/api/jobs/apply/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};