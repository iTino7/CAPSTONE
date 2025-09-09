import BackgroundForm from "./BackgroundForm";
import FormDataUser from "./FormDataUser";

function PageRegister() {
  return (
    <BackgroundForm subTitle="Sign up">
      <FormDataUser fetchNavigate="register" nameForm={true} navigateCustom="/plans" />
    </BackgroundForm>
  );
}



export default PageRegister;
