import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Notification from "../../components/general/Notification";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    const token = searchParams.get("token");
    const username = searchParams.get("username");
    if (token && username) {
      axios
        .get(`https://stg.hunarli.com/api/verify-email/confirm`, {
          params: { token: token, username: username },
        })
        .then((res) => {
          toast.success("Success");
          setError(false);
          navigate("/login");
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [searchParams]);

  return (
    <>
      <Notification />
      {error && (
        <>
          <h1 className="h-screen w-screen flex items-center justify-center text-[40px]">Something went wrong...</h1>
        </>
      )}
    </>
  );
};

export default EmailVerification;
