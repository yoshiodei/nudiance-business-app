import { showToast } from "@/app/shared/utils/showToast";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { clearCompany } from '@/redux/slices/companySlice';
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function useLogout() {
  const router = useRouter();  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    console.log('start logout');
    
    setLoading(true);

    signOut(auth).then(() => {
      dispatch(clearCompany());
      router.push('/login');
      showToast('Logout successful', 'success');
    }).catch((error) => {
      showToast(error.message, 'error');
    }).finally (() => {
      setLoading(false);
      console.log('end logout');
    })
  }
  
  return {logout, loading };
}
