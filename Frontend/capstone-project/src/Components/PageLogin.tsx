import React from "react";
import BackgroundForm from "./BackgroundForm";
import FormDataUser from "./FormDataUser";

function PageLogin() {
  return (
    <BackgroundForm subTitle="Sign in">
      <FormDataUser fetchNavigate="login" nameForm={false} />
    </BackgroundForm>
  );
}

export default PageLogin;
