import NotificationBar from "../../components/auth/NotificationBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { register, resetError } from "../../redux/authSlice";
import { EnvelopeIcon, InformationCircleIcon, UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
// import { EnvelopeIcon } from "@heroicons/react/24/solid";

const RegistrationPage = () => {
  const { isAuth } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const registerUser = async () => {
    await dispatch(
      register({
        firstName,
        lastName,
        username,
        password,
        email,
        navigate,
        setError,
      })
    );
  };

  const onClicErrorClose = () => {
    dispatch(resetError());
    navigate("/login");
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="w-full flex justify-center mt-7 pr-6">
      <div className="w-full flex flex-col flex-wrap max-w-sm items-center">
        <h1 className="font-bold text-[40px] mb-6 font-logo italic text-[#001e44]">Hunarli</h1>
        {error && <NotificationBar error={error} />}
        <div className="bg-[#001131e0] flex items-center  rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <InformationCircleIcon className="text-white h-6 pr-3 pl-3" />
          <input
            type="text"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Name"
            onChange={(e) => onChangeInput(e, setFirstName)}
          />
        </div>
        <div className="bg-[#001131e0] flex items-center  rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <InformationCircleIcon className="text-white h-6 pr-3 pl-3" />
          <input
            type="text"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Last name"
            onChange={(e) => onChangeInput(e, setLastName)}
          />
        </div>
        <div className="bg-[#001131e0] flex items-center  rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <UserIcon className="text-white h-6 pr-3 pl-3" />
          <input
            type="login"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Login"
            onChange={(e) => onChangeInput(e, setUsername)}
          />
        </div>
        <div className="bg-[#001131e0] flex items-center  rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <EnvelopeIcon className="text-white h-6 pr-3 pl-3"/>
          <input
            type="text"
            className="rounded-sm pl-5 h-full w-full focus:outline-none"
            placeholder="Email"
            onChange={(e) => onChangeInput(e, setEmail)}
          />
        </div>
        <div className="bg-[#001131e0] flex items-center rounded-sm m-3 box-border h-12 border border-[#001131e0] w-full">
          <LockClosedIcon className="text-white h-6 pr-3 pl-3"/>
          <input
            type="password"
            className="rounded-sm  pl-5 h-full w-full focus:outline-none"
            placeholder="Password"
            onChange={(e) => onChangeInput(e, setPassword)}
          />
        </div>
        <button
          onClick={registerUser}
          className="rounded-sm md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full"
        >
          Register
        </button>
        <div className="w-full">
          <Link
            className="hover:underline"
            to="/login"
            onClick={onClicErrorClose}
          >
            Already have account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
