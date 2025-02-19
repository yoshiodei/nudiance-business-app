import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { FirebaseError } from "firebase/app";
import { ICompanyDataPayload } from "@/app/shared/utils/types";
import { useDispatch } from "react-redux";
import findCompanyByEmailAndPassword from "../utils/findCompany";
import { auth } from "@/firebase/firebaseConfig";
import { showToast } from "@/app/shared/utils/showToast";
import { setCompany } from "@/redux/slices/companySlice";

interface ICompanyObject {
  email: string;
  password: string;    
  payload?: ICompanyDataPayload;
}

export default function useLogCompanyIn() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logCompanyIn = async (companyObject: ICompanyObject) => {
    setLoading(true);
    const {password, email} = companyObject;

    try {
      const { isFound, error, payload } = await findCompanyByEmailAndPassword(email, password);   
      
      if(!isFound && !error) {
        showToast('User does not exist.', 'error');
        throw new Error("User does not exist");
      }
      if(error) {
        showToast('Error while fetching user.', 'error');
        throw new Error("Error");
      }

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if(!payload){ throw new Error("Error fetching company data") }
        dispatch(setCompany(payload));
        console.log('user credential', user);
        showToast('Logged in successfully', 'success');
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        
       const errorMessage = error.message;
       showToast(errorMessage, 'error');
     })
    } catch (err: unknown ) {
        if (err instanceof FirebaseError) {
          // setError(err.message || "An error occurred while registering the user.");
          showToast((err.message || 'An error occurred while registering the user.'), 'error');
        } else if (err instanceof Error) {
          // setError(err.message);
          showToast(err.message, 'error');
        } else {
          // setError("An unknown error occurred.");
          showToast('An unknown error occurred.', 'error');
        }
      } finally {
        setLoading(false);
      }
  }

  return {logCompanyIn, loading};
}
