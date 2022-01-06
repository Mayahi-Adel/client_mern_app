import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { signin } from "../../services";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const navigate = useNavigate();

  const isInvalid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signin(email, password);
      window.location = "/";
      // navigate("/");
    } catch (error) {
      setEmail("");
      setPassword("");
      if (error?.response?.data?.errors?.email !== "")
        setError(error.response?.data.errors.email);
      if (error?.response?.data?.errors?.password !== "")
        setError(error.response.data.errors.password);
    }
  };

  useEffect(() => {
    document.title = "Connexion - Raccoon Network";
  }, []);

  return (
    <>
      <h1>Connexion</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin} method="POST" className="form">
        <input
          type="text"
          aria-label="Email"
          placeholder="Adresse email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <button
          disabled={isInvalid}
          type="submit"
          className={`${isInvalid && "opacity-50"}`}
        >
          Connexion
        </button>
      </form>
    </>
  );
}

export default SignInForm;
