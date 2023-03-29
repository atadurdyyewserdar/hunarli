import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { resetPassword } from "../../api/users";
import { getImageUrl } from "../../hooks/utils";
import { useResetPasswordValidationQuery } from "../../hooks/queryHooks";
import { useResetPasswordMutation } from "../../hooks/mutationHooks";

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordValidationQuery = useResetPasswordValidationQuery(token);
  const resetPasswordMutation = useResetPasswordMutation(() =>
    navigate("/login")
  );

  const onChangeHandler = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const onSubmitHandler = () => {
    const passwordDetails = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    resetPasswordMutation.mutate({ token, passwordDetails });
  };

  return (
    <div className="w-full flex justify-center mt-20 pr-6">
      {resetPasswordValidationQuery.isError && (
        <h1>Something wrong with token...</h1>
      )}
      {resetPasswordValidationQuery.isSuccess && (
        <div className="w-full flex flex-col flex-wrap max-w-sm items-center">
          <h1 className="font-bold text-[40px] mb-6">VACANCY</h1>
          <div className="bg-[#f0f0f0] flex items-center rounded-lg m-3 box-border h-12 border border-gray-400 w-full">
            <img
              className="h-6 pr-1 pl-4"
              src={getImageUrl("../assets/icons/lock.png")}
              alt=""
            />
            <input
              type="password"
              className="rounded-lg bg-[#f0f0f0] pl-5 h-full w-full focus:outline-none"
              placeholder="New password"
              onChange={(e) => onChangeHandler(e, setNewPassword)}
            />
          </div>
          <div className="bg-[#f0f0f0] flex items-center rounded-lg m-3 box-border h-12 border border-gray-400 w-full">
            <img
              className="h-6 pr-1 pl-4"
              src={getImageUrl("../assets/icons/lock.png")}
              alt=""
            />
            <input
              type="password"
              className="rounded-lg bg-[#f0f0f0] pl-5 h-full w-full focus:outline-none"
              placeholder="Confirm password"
              onChange={(e) => onChangeHandler(e, setConfirmPassword)}
            />
          </div>
          <button
            onClick={onSubmitHandler}
            className="flex items-center justify-center rounded-lg md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full"
          >
            <img
              className="h-6 pr-3 pl-2"
              src={getImageUrl("../assets/icons/naughty.png")}
              alt=""
            />
            Change password
          </button>
        </div>
      )}
    </div>
  );
};
