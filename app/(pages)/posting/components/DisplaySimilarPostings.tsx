'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { showToast } from '@/app/shared/utils/showToast';
import { IJobPost } from '@/app/shared/utils/types';
import { FirebaseError } from "firebase/app";
import { db } from '@/firebase/firebaseConfig';
import PostCard from '@/app/shared/components/PostCard';

export default function DisplaySimilarPostings({ id }: { id: string }) {
  const [jobListData, setJobListData] = useState<IJobPost[]>([]);
  const [loading, setLoading] = useState(false);

  const getJobList = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "jobList"));
      const jobList: IJobPost[] = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
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
            Company: doc.data().vendor?.Company || '',
            address: doc.data().vendor?.address || '',
            uid: doc.data().vendor?.uid || '',
          },
        }))
        .filter((job) => job.id !== id) // Exclude the current job
        .slice(0, 5); // Limit results

      setJobListData(jobList);
    } catch (err: unknown) {
      if (err instanceof FirebaseError || err instanceof Error) {
        showToast(err.message || 'An error occurred.', 'error');
      } else {
        showToast('An unknown error occurred.', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getJobList();
  }, [getJobList]);

  if (loading) {
    return (
      <div className="flex flex-col gap-y-3">
        <h5 className="text-slate-500 p-3 text-[1.2em]">...loading jobs</h5>
      </div>
    );
  }

  if (jobListData.length === 0) {
    return (
      <div className="flex flex-col gap-y-3">
        <h5 className="text-slate-500 p-3 text-[1.2em]">There are no other posts</h5>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3">
      {jobListData.map((jobData) => (
        <PostCard key={jobData.id} jobData={jobData} />
      ))}
    </div>
  );
}
