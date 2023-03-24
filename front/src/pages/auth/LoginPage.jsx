import NotificationBar from "../../components/auth/NotificationBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getImageUrl } from "../../hooks/utils";
import { login, resetError } from "../../redux/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
        <h1 className="font-bold text-[40px] mb-6">VACANCY</h1>
        {error && <NotificationBar error={error} />}
        <div className="bg-[#f0f0f0] flex items-center  rounded-lg m-3 box-border h-12 border border-gray-400 w-full">
          <img
            className="h-6 pr-1 pl-4"
            src={getImageUrl("../assets/icons/user.png")}
            alt=""
          />
          <input
            type="login"
            className="rounded-lg bg-[#f0f0f0] pl-5 h-full w-full focus:outline-none"
            placeholder="Login"
            onChange={onChangeUsername}
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
            placeholder="Password"
            onChange={onChangePassword}
          />
        </div>
        <button
          onClick={handleLoginClick}
          className="flex items-center justify-center rounded-lg md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full"
        >
          <img
            className="h-6 pr-3 pl-2"
            src={getImageUrl("../assets/icons/naughty.png")}
            alt=""
          />
          Login
        </button>
        <div className="w-full">
          <Link className="underline" to="/signup">
            Don't have account? Register
          </Link>
        </div>
        <div className="w-full">
          <button className="underline" onClick={onClicErrorClose}>
            Forgot password
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
