import { useQuery } from "@tanstack/react-query";
import { getResume, getUser, validateResetPasswordToken } from "../api/users";
import { toast } from "react-hot-toast";
import { getJobPosts, getPostById } from "../api/jobPost";

export const useUserQuery = (username) => {
  return useQuery({
    queryKey: ["users", username],
    queryFn: () => getUser(username),
    onError: () => {
      toast.error("Something went wrong", { icon: "😔" });
    },
  });
};

export const useResumeQuery = (resumeId) => {
  return useQuery({
    queryKey: ["resume", resumeId || ""],
    queryFn: () => getResume(resumeId),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useResetPasswordValidationQuery = (token) => {
  return useQuery({
    queryKey: ["reset-password"],
    queryFn: () => validateResetPasswordToken(token),
    staleTime: Infinity,
  });
};

export const useJobPost = (id) => {
  return useQuery({
    queryFn: () => getPostById(id),
    queryKey: ["jobs", id],
  });
};

export const useJobPosts = (filters, isSearch) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobPosts(filters, isSearch),
  });
};
