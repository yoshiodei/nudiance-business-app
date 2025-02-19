
import { collection, query, where, getDocs } from "firebase/firestore";
// import bcrypt from "bcryptjs";

import { db } from "@/firebase/firebaseConfig";
import { ICompanyDataPayload } from "@/app/shared/utils/types";
import bcrypt from "bcryptjs";

interface IFindCompany {
  isFound: boolean;
  error: boolean;
  payload?: ICompanyDataPayload;
}

const findCompanyByEmailAndPassword = async (email: string, password: string): Promise<IFindCompany> => {
  try {
    
    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { isFound: false, error: false };
    }

    const companyDoc = querySnapshot.docs[0];
    const companyData = companyDoc.data();
    const companyPayload = {
      uid: companyData.uid,
      name: companyData.name,
      size: companyData.size,
      email: companyData.email,
      password: companyData.password,
      image: companyData?.image || '',
      wallpaper: companyData?.wallpaper || '',
    }

    if (!companyData.password) {
      throw new Error("Password not found in the company document.");
    }
    
    const isPasswordMatch = await bcrypt.compare(password, companyData.password);

    if (isPasswordMatch) {
      console.log('user data', companyData);
      
      return { isFound: true, error: false, payload: companyPayload };
    } else {
      return { isFound: false, error: false }; 
    }
  } catch (err) {
    console.error("Error checking company credentials:", err);
    return { isFound: false, error: true }; 
  }
};

export default findCompanyByEmailAndPassword;