import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const addJobPost = ({ jobPost, username }) => {
  console.log(jobPost);
  return axiosWithCredentials.post(
    `http://localhost:8081/jobs/new/${username}`,
    jobPost
  );
};

export const updateJobPost = ({ id, jobPost }) => {
  console.log(jobPost);
  return axiosWithCredentials.put(`http://localhost:8081/jobs/${id}`, jobPost);
};

export const deleteJob = ({ id, username }) => {
  return axiosWithCredentials.delete(
    `http://localhost:8081/jobs/${id}/${username}`
  );
};

export const getJobPosts = (filters, isSearch) => {
  console.log(filters);
  console.log(isSearch);
  if (isSearch) {
    return axiosWithCredentials
      .get(`http://localhost:8081/jobs/search`, { params: filters })
      .then((response) => {
        return response.data;
      });
  } else {
    return axiosWithCredentials
      .get(`http://localhost:8081/jobs`)
      .then((response) => {
        return response.data;
      });
  }
};

export const getPostById = (id) => {
  return axiosWithCredentials
    .get(`http://localhost:8081/jobs/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const sendResume = ({ id, formData }) => {
  return axiosWithCredentials.post(
    `http://localhost:8081/jobs/apply/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

// test
