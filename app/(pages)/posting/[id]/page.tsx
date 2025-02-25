'use client'
// import PostCard from '@/app/components/PostCard';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { FirebaseError } from "firebase/app";
import { showToast } from '@/app/shared/utils/showToast';
import { IJobPost } from '@/app/shared/utils/types';
import DisplaySimilarPostings from '../components/DisplaySimilarPostings';
// import DeletePostModal from '../components/DeletePostModal';

export default function Posting() {
  const router = useRouter();
  const params = useParams();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  // console.log('params --->', params);
  
  const initialState = {
    id: '',
    name: '',
    phoneNumber: '',
    jMinEducation: '',
    salary: '',
    jExpectation: '',
    jDescription: '',
    jComBenefit: '',
    jcomBlurb: '',
    jtravelReq: '',
    externalLink: '',
    companyEmail: '',
    consultType: '',
    postedFrom: '',
    datePosted: '',
    lastEdited: '',
    status: '',
    viewCount: [],
    jobType: '',
    vendor: {
      Company: '',
      address: '',
      uid: '',
    }
  };

  const [jobPostData, setJobPostData] = useState<IJobPost>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJobPosting = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "jobList", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJobPostData(docSnap.data() as IJobPost);
        } else {
          showToast('This post does not exist', 'error');
        }
      } catch (err: unknown) {
        if (err instanceof FirebaseError) {
          showToast(err.message || 'An error occurred while fetching data.', 'error');
        } else {
          showToast('An unknown error occurred.', 'error');
        }
      }
      setLoading(false);
    };

    fetchJobPosting();
  }, [id]);

  if (loading) {
    return <h5>Loading...</h5>;
  }

  if (!jobPostData) {
    return <h5>This post does not exist</h5>;
  }

  return (
    <div className="min-h-[80vh] flex justify-center bg-slate-50">
      <div className="2xl:w-[1200px] xl:w-[1200px] w-auto min-h-[200px] flex 2xl:flex-row xl:flex-row flex-col gap-5 p-5">
        <main className="2xl:p-5 xl:p-5 p-2 h-auto flex-1 border border-slate-300 rounded bg-white">
          <div className="rounded border border-slate-300 2xl:p-5 xl:p-5 p-2 bg-slate-100 mb-5 flex justify-between items-center">
            <h5 className="font-bold 2xl:text-xl xl:text-xl text-base text-primary">Job Posting</h5>
            <button
              onClick={() => router.push('/home')} 
              className="p-2 border border-slate-300 rounded font-bold bg-white 2xl:text-base xl:text-base text-sm"
            >
              Go Back
            </button>
          </div>

          {jobPostData?.name && (<div>

          <div className="">
            <h6 className="2xl:text-3xl xl:text-3xl text-lg">{jobPostData.name}</h6>
          </div>

          <div className="h-[1px] bg-slate-300 2xl:my-5 xl:my-5 my-3" />

          <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5 2xl:mb-5 xl:mb-5 mb-3">
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Company name</h6>
              <p>{jobPostData.vendor.Company}</p>    
            </div>
            {jobPostData.companyEmail && (<div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Company Email</h6>
              <p>{jobPostData.companyEmail}</p>    
            </div>)}
            {jobPostData.phoneNumber && (<div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Company Phone Number</h6>
              <p>{jobPostData.phoneNumber}</p>    
            </div>)}
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Job Location</h6>
              <p>{jobPostData.vendor.address}</p>    
            </div>
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Salary</h6>
              <p>{jobPostData.salary}</p>    
            </div>
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Nature of Job</h6>
              <p>{jobPostData.jtravelReq}</p>    
            </div>
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Min. Education Needed</h6>
              <p>{jobPostData.jMinEducation}</p>    
            </div>
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Job Type</h6>
              <div className="flex gap-2 flex-wrap">
              {
                jobPostData.jobType.split(", ").map((type) => (
                  <p key={type} className="text-[0.8em] rounded bg-slate-500 text-white font-semibold px-2 py-1">{ type }</p>
                )
              )
              }
            </div>
            </div> 
            {jobPostData.externalLink && (<div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">External Link to Job</h6>
              <a href={jobPostData.externalLink}>{jobPostData.externalLink}</a>    
            </div>)}
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Post Status</h6>
              <span className={`py-[5px] px-[25px] rounded ${jobPostData.status === 'active' ? 'bg-green-600 text-white text-semibold' : 'bg-red-500 text-white text-semibold'}`}>{jobPostData.status}</span>    
            </div>
          </div>

          <br />
          <br />

          <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5 2xl:mb-5 xl:mb-5 mb-3">
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Skills and Technical Requirement</h6>
              <p>{jobPostData.jExpectation}</p>    
            </div>
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Compensation and ther Benefits</h6>
              <p>{jobPostData.jComBenefit}</p>    
            </div>
            <div>
              <h6 className="font-bold text-lg 2xl:mb-1 xl:mb-1 mb-0 text-primary">Company Blurb</h6>
              <p>{jobPostData.jcomBlurb}</p>    
            </div>
          </div>

          <div>
            <div className="h-[1px] bg-slate-200 my-5" />
            <div className="flex 2xl:flex-row xl:flex-row flex-col 2xl:justify-end xl:justify-end 2xl:gap-3 xl:gap-3 gap-2">
              <button onClick={() => router.push(`/edit-post/${id}`)} className="rounded 2xl:p-2 xl:p-2 p-1 border border-slate-300 text-slate-400 bg-white 2xl:w-[100px] xl:w-[100px] w-full">Edit</button>    
              {/* <DeletePostModal id={id} />    */}
            </div>
          </div>
          
          </div>)}

          { !jobPostData?.name && (<div className="h-[300px] flex justify-center align-center">
            <h5 className="text-[1.7em] text-slate-400 text-center">This post does not exist</h5>
          </div>)}

        </main>
        <div className="w-[300px]">
          <div className="2xl:p-5 xl:p-5 p-2 h-auto w-full border border-slate-300 rounded bg-white">
            <div>
              <h6 className="text-lg font-semibold">Other postings</h6>
            </div>
            <div className="2xl:my-5 xl:my-5 my-2 bg-slate-300 h-[1px]" />
            { (jobPostData?.name && id ) && (<DisplaySimilarPostings id={id} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
