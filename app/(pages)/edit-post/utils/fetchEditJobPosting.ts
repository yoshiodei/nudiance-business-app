import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { showToast } from "@/app/shared/utils/showToast";
import { FirebaseError } from "firebase/app";
import { IJobFetch, ISalary } from '@/app/shared/utils/types';

export const fetchEditJobPosting = async (
  setJobPostData: React.Dispatch<React.SetStateAction<IJobFetch>>, 
  id: string, 
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>,
  setJobTypeArray: React.Dispatch<React.SetStateAction<string[]>>, 
  setSalary: React.Dispatch<React.SetStateAction<ISalary>>
) => {
    try{
        const docRef = doc(db, "jobList", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const job = docSnap.data();
          setJobPostData(
            {
              name: job.name,
              phoneNumber: job.phoneNumber,
              jMinEducation: job.jMinEducation,
              jExpectation: job.jExpectation,
              jtravelReq: job.jtravelReq,
              jDescription: job.jDescription,
              jComBenefit: job.jComBenefit,
              jcomBlurb: job.jcomBlurb,
              externalLink: job.externalLink,
              companyEmail: job.companyEmail,
              consultType: job.consultType,
              postedFrom: job.postedFrom,
              datePosted: job.datePosted,
              lastEdited: job.lastEdited,
              salary: job.salary,
              status: job.status,
              viewCount: job.viewCount,
              jobType: job.jobType,
              vendor: {
                Company: job.vendor.Company,
                address: job.vendor.address,
                uid: job.vendor.uid,
              }
            }
          );
          setSelectedStatus(job.status);
          const jobTypeArray = job.jobType.split(', ')
          setJobTypeArray(jobTypeArray);
          setSalary({ salaryUpperRange: job.salary.split(' - ')[1], salaryLowerRange: job.salary.split(' - ')[0] });
        } else {
          showToast('this post does not exist', 'error');
        }
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