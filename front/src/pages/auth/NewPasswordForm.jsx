import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getImageUrl } from "../../hooks/utils";
import { useResetPasswordValidationQuery } from "../../hooks/queryHooks";
import { useResetPasswordMutation } from "../../hooks/mutationHooks";
import { LockClosedIcon } from "@heroicons/react/24/outline";

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
          <div className="bg-[#001131e0] flex items-center rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
            <LockClosedIcon className="text-white h-6 pr-3 pl-3" />
            <input
              type="password"
              className="rounded-lg pl-5 h-full w-full focus:outline-none"
              placeholder="New password"
              onChange={(e) => onChangeHandler(e, setNewPassword)}
            />
          </div>
          <div className="bg-[#001131e0] flex items-center rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
            <LockClosedIcon className="text-white h-6 pr-3 pl-3" />
            <input
              type="password"
              className="rounded-lg pl-5 h-full w-full focus:outline-none"
              placeholder="Confirm password"
              onChange={(e) => onChangeHandler(e, setConfirmPassword)}
            />
          </div>
          <button
            onClick={onSubmitHandler}
            className="rounded-sm md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full"
          >
            Change password
          </button>
        </div>
      )}
    </div>
  );
};
