import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services";
import SignInform from "./SignInForm";

function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const isInvalid =
    password === "" || email === "" || pseudo === "" || controlPassword === "";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== controlPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      try {
        await signup(pseudo, email, password);
        navigate("/profil");
        setFormSubmit(true);
      } catch (error) {
        setPseudo("");
        setEmail("");
        setPassword("");
        setControlPassword("");

        if (error?.response?.data?.errors?.email !== "")
          setError(error.response?.data.errors.email);
        if (error?.response?.data?.errors?.password !== "")
          setError(error.response.data.errors.password);
        if (error?.response?.data?.errors?.pseudo !== "")
          setError(error.response.data.errors.pseudo);
        console.log(error.message);
      }
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInform />
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <>
          <h1>Inscription</h1>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleRegister} id="sign-up-form">
            <input
              type="text"
              aria-label="Pseudo"
              placeholder="Pseudo"
              value={pseudo}
              onChange={({ target }) => setPseudo(target.value)}
            />
            <input
              type="text"
              aria-label="Email"
              placeholder="Adresse Email"
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
            <input
              type="password"
              aria-label="Confirmer mot de passe"
              placeholder="Confirmer mot de passe"
              value={controlPassword}
              onChange={({ target }) => setControlPassword(target.value)}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`${isInvalid && "opacity-50"}`}
            >
              S'inscrire
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default SignUpForm;
