import { showToast } from "@/app/shared/utils/showToast";
import { db } from "@/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IJobPost } from '@/app/shared/utils/types';

export const getJobListByStatus = async (setJobListData: React.Dispatch<React.SetStateAction<IJobPost[]>>, status: string) => {
    try{

        const q = query(collection(db, "jobList"), where("status", "==", status));

        const querySnapshot = await getDocs(q);
        const jobList:IJobPost[] = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const jodData = {
              id: '',
              name: doc.data().name,
              phoneNumber: doc.data().phoneNumber,
              jtravelReq: doc.data().jtravelReq,
              jMinEducation: doc.data().jMinEducation,
              jExpectation: doc.data().jExpectation,
              jDescription: doc.data().jDescription,
              jComBenefit: doc.data().jComBenefit,
              jcomBlurb: doc.data().jcomBlurb,
              externalLink: doc.data().externalLink,
              companyEmail: doc.data().companyEmail,
              consultType: doc.data().consultType,
              postedFrom: doc.data().postedFrom,
              datePosted: doc.data().datePosted,
              lastEdited: doc.data().lastEdited,
              salary: doc.data().salary,
              status: doc.data().status,
              viewCount: doc.data().viewCount,
              jobType: doc.data().jobType,
              vendor: {
                Company: doc.data().vendor.Company,
                address: doc.data().vendor.address,
                uid: doc.data().vendor.uid,
              }
            };
            jobList.push({...jodData, id: doc.id});
        });  
        setJobListData(jobList);
    }
    catch(err: unknown){
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
    }
  }