import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addJobPost, deleteJob, sendResume, updateJobPost } from "../api/jobPost";
import {
  resetPassword,
  saveProfileImage,
  updateUserDeatils,
} from "../api/users";

export const useUserUpdate = (onSuccessUserUpdate) => {
  return useMutation({
    mutationFn: updateUserDeatils,
    onSuccess: onSuccessUserUpdate,
    onError: () => {
      toast.error("Something went wrong", { icon: "😔" });
    },
  });
};

export const useProfileImageUpdate = (username, queryClient) => {
  return useMutation({
    mutationFn: saveProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", username], { exact: true });
    },
  });
};

export const useDeleteJob = (username, queryClient) => {
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", username], { exact: true });
    },
  });
};

export const useResetPasswordMutation = (onSuccessReset) => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
    onSuccess: onSuccessReset,
  });
};

export const useUpdatePostMutation = (onSuccessUpdate) => {
  return useMutation({
    mutationFn: updateJobPost,
    onSuccess: onSuccessUpdate,
  });
};

export const useAddPost = (onSuccessRequest) => {
  return useMutation({
    mutationFn: addJobPost,
    onSuccess: onSuccessRequest,
  });
};

export const useResumeSenderMutation = (onSuccessRequest) => {
  return useMutation({
    mutationFn: sendResume,
    onSuccess: onSuccessRequest,
  });
};
