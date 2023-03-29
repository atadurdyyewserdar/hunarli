import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const addJobPost = ({ jobPost, username }) => {
  console.log(jobPost);
  return axiosWithCredentials.post(
    `https://stg.hunarli.com/api/jobs/new/${username}`,
    jobPost
  );
};

export const updateJobPost = ({ id, jobPost }) => {
  console.log(jobPost);
  return axiosWithCredentials.put(
    `https://stg.hunarli.com/api/jobs/${id}`,
    jobPost
  );
};

export const deleteJob = ({ id, username }) => {
  return axiosWithCredentials.delete(
    `https://stg.hunarli.com/api/jobs/${id}/${username}`
  );
};

export const getJobPosts = (filters, isSearch) => {
  if (isSearch) {
    return axios
      .get(`https://stg.hunarli.com/api/jobs/search`, { params: filters })
      .then((response) => {
        return response.data;
      });
  } else {
    return axios.get(`https://stg.hunarli.com/api/jobs`).then((response) => {
      return response.data;
    });
  }
};

export const getPostById = (id) => {
  return axios
    .get(`https://stg.hunarli.com/api/jobs/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const sendResume = ({ id, formData }) => {
  return axiosWithCredentials.post(
    `https://stg.hunarli.com/api/jobs/apply/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};