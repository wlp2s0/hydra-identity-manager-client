import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import AxiosCaller from '../../utils/AxiosCaller';

const LogoutPage = () => {
  const location = useLocation();

  const [logoutChallenge, setLogoutChallenge] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const logoutChallenge = searchParams.get("challenge");
    if (logoutChallenge) {
      setLogoutChallenge(logoutChallenge);
    }
    return () => {
    }
  }, [location.search])

  const handleLogoutSubmit = useCallback(async () => {
    console.log("magicabula");
    console.log({logoutChallenge});
    const { data: response } = await AxiosCaller.post("/v1/logout", {
      challenge: logoutChallenge,
    });
    if (response?.redirectUri) {
      window.location.href = response?.redirectUri;
    }
  }, [logoutChallenge])

  return (
    <div>
      <button onClick={handleLogoutSubmit}>
        Logout
      </button>
    </div>
  );
}

export default LogoutPage;
