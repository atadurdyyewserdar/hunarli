import Modal from "../../components/modal/Modal";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { sendResetLink } from "../../api/users";
import { useAuth } from "../../hooks/useAuth";
import { getImageUrl } from "../../hooks/utils";

const ForgotPassword = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [active, setActive] = useState(false);

  const sendResetMutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: sendResetLink,
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const onSubmitHandler = () => {
    setActive(true);
    sendResetMutation.mutate(username);
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return (
    <div className="w-full flex justify-center mt-20 pr-6">
      <div className="w-full flex flex-col flex-wrap max-w-sm items-center">
        <h1 className="font-bold text-[40px] mb-6">VACANCY</h1>
        <div className="bg-[#f0f0f0] flex items-center  rounded-lg m-3 box-border h-12 border border-gray-400 w-full">
          <img
            className="h-6 pr-1 pl-4"
            src={getImageUrl("../assets/icons/user.png")}
            alt=""
          />
          <input
            type="login"
            className="rounded-lg bg-[#f0f0f0] pl-5 h-full w-full focus:outline-none"
            placeholder="Type your email"
            onChange={onChangeHandler}
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
          Reset
        </button>
        <Modal
          active={active}
          setActive={setActive}
          contentClass={"sm:w-[50vw] w-fit m-2"}
        >
          <h1 className="text-lg">
            If your account exist you will get an email
          </h1>
          <button
            className="bg-[#001131e0] p-2 pl-7 pr-7 rounded-md float-right text-white"
            onClick={() => navigate("/login")}
          >
            Ok
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default ForgotPassword;
