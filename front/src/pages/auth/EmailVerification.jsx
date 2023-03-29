import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../api/users";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { token, username } = useSearchParams();

  useEffect(() => {
    if (token && username) {
      verifyEmail(token, username);
    }
    navigate("/login");
  }, [token, username]);

  return <></>;
};

export default EmailVerification;
