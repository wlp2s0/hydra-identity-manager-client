import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router';

import AxiosCaller from '../../utils/AxiosCaller'

import classes from "./LoginPage.module.scss"

const LoginPage = () => {

  const location = useLocation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = async () => {
    const searchParams = new URLSearchParams(location.search);
    const challenge = searchParams.get("challenge");
    const { data: response} = await AxiosCaller.post("/v1/login", { challenge, email, password })
    if (response?.redirectUri) {
      window.location.href = response?.redirectUri
    }
  }

  return (
    <div className={classes.loginPage}>
      <input type="text" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={onLogin}> Login </button>
    </div>
  )
}

export default LoginPage;