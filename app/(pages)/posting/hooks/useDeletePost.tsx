import { showToast } from "@/app/shared/utils/showToast";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";


export default function useDeletePost() {
  const router = useRouter();  
  const [loading, setLoading] = useState(false);

  const deletePost = (id: string) => {
    console.log('start delete');
    
    setLoading(true);

    deleteDoc(doc(db, "jobList", id)).then(() => {
      router.push('/home');
      showToast('Post deleted successfully', 'success');
    }).catch((error) => {
      showToast(error.message, 'error');
    }).finally (() => {
      setLoading(false);
      console.log('end delete');
    })
  }
  
  return { deletePost, loading };
}