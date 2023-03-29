import Modal from "../../components/modal/Modal";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { sendResetLink } from "../../api/users";
import { useAuth } from "../../hooks/useAuth";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

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
        <div className="bg-[#001131e0] flex items-center  rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <EnvelopeIcon className="text-white h-6 pr-3 pl-3"/>
          <input
            type="email"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Type your email"
            onChange={onChangeHandler}
          />
        </div>
        <button
          onClick={onSubmitHandler}
          className="rounded-sm md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full"
        >
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
