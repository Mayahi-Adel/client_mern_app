import React, { useState, useEffect } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function Log({ signIn, signUp }) {
  const [signUpModal, setSignUpModal] = useState(false);
  //const [signInModal, setSignInModal] = useState(true);

  useEffect(() => {
    setSignUpModal(false);
  }, []);
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      //setSignInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      // setSignInModal(true);
    }
  };

  return (
    <div className="log__form">
      <div className="form__container">
        {signUpModal ? <SignUpForm /> : <SignInForm />}
      </div>
      {!signUpModal ? (
        <div className="dont_have_account">
          <span className="dont_have_account_span">
            Vous n'avez pas de compte?
            <p onClick={handleModals} id="register">
              Inscrivez vous
            </p>
          </span>
        </div>
      ) : (
        <div className="dont_have_account">
          <span className="dont_have_account_span">
            Vous avez pas un compte?
            <p onClick={handleModals} id="login">
              Connectez vous
            </p>
          </span>
        </div>
      )}
    </div>
  );
}

export default Log;
