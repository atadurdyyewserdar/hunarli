import NotificationBar from "../../components/auth/NotificationBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login, resetError } from "../../redux/authSlice";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { status } = useSelector((state) => state.auth);

  const onChangeUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleLoginClick = async () => {
    await dispatch(login({ username, password, navigate, setError }));
  };

  const onClicErrorClose = () => {
    dispatch(resetError());
    navigate("/signup");
    setCError(null);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="w-full flex justify-center mt-20 pr-6">
      <div className="w-full flex flex-col flex-wrap max-w-sm items-center">
        <h1 className="font-bold text-[40px] mb-6 font-logo italic text-[#001e44]">
          Hunarli
        </h1>
        {error && <NotificationBar error={error} />}
        <div className="bg-[#001131e0] flex items-center  rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <UserIcon className="text-white h-6 pr-3 pl-3" />
          <input
            type="login"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Login"
            onChange={onChangeUsername}
          />
        </div>
        <div className="bg-[#001131e0] flex items-center rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <LockClosedIcon className="text-white h-6 pr-3 pl-3" />
          <input
            type="password"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Password"
            onChange={onChangePassword}
          />
        </div>
        <button
          onClick={handleLoginClick}
          className="flex items-center justify-center rounded-sm md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full"
        >
          {status === "loading" ? (
            <ArrowPathIcon className="h-5 w-5 text-white animate-spin" />
          ) : (
            "Login"
          )}
        </button>
        <div className="w-full">
          <Link className="underline" to="/signup">
            Don't have account? Register
          </Link>
        </div>
        <div className="w-full">
          <Link className="underline" to="/reset-password">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
