import BackgroundForm from "./BackgroundForm";
import FormDataUser from "./FormDataUser";

function PageLogin() {
  return (
    <BackgroundForm subTitle="Sign in">
      <FormDataUser
        fetchNavigate="signin"
        nameForm={false}
        navigateCustom="/catalogue"
      />
    </BackgroundForm>
  );
}

export default PageLogin;
