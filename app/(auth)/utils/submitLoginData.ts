import { ICompanyDataPayload } from "@/app/shared/utils/types";
import { validateLoginForm } from "./validateLoginForm";

interface UserCredentialsType {
  email: string;
  password: string;  
}

interface ICompanyObject {
  email: string;
  password: string;    
  payload?: ICompanyDataPayload;
}

export const submitLoginData = (
  userCredentials: UserCredentialsType, 
  setErrorMessage:React.Dispatch<React.SetStateAction<string>>,
  logCompanyIn: (companyObject: ICompanyObject) => Promise<void>
) => {
  const {email, password} = userCredentials;
  const validationData = validateLoginForm(email, password);
  if(!validationData.isValid){
    setErrorMessage(validationData.message);   
  } else {
    logCompanyIn(userCredentials);
  }
}