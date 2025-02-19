import { useState } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import findCompanyByEmailAndPassword from "../utils/findCompany";
import { hashPassword } from "../utils/encryptPassword";
// import { showToast } from "@/app/shared/utils/showToast";



interface IcompanyObject {
  confirmPassword: string;
  password: string;
  name: string;
  size: string;
  email: string;
}

export default function useRegisterCompany() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registerCompany = async (companyObject: IcompanyObject) => {
    setLoading(true);
    const {password, email, size, name} = companyObject;

    try {
      const encryptedPassword = await hashPassword(password);
      const { isFound, error } = await findCompanyByEmailAndPassword(email, password);
    
      if(isFound && !error) {
        // showToast('User already exists.', 'error');
        throw new Error("User already exists");
      }
      
      if(error) {
        // showToast('Error while fetching user.', 'error');
        throw new Error("Error");
      }

    const companyCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = companyCredential.user.uid;

    const newCompanyData = {
      name,
      size,
      email,
      password: encryptedPassword,
      uid: userId,
    }

    console.log('new company data', newCompanyData);
    
    await setDoc(doc(db, "companies", userId), {
      ...newCompanyData,
      createdAt: new Date().toISOString(),
    });
    
    // showToast('Company registered successfully', 'success');
    router.push("/home");

  } catch (err: unknown ) {
    if (err instanceof FirebaseError) {
      // setError(err.message || "An error occurred while registering the user.");
    //   showToast((err.message || 'An error occurred while registering the user.'), 'error');
    } else if (err instanceof Error) {
      // setError(err.message);
    //   showToast(err.message, 'error');
    } else {
      // setError("An unknown error occurred.");
    //   showToast('An unknown error occurred.', 'error');
    }
  } finally {
    setLoading(false);
  }
}

  return {registerCompany, loading};
};
