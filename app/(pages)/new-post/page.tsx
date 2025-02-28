'use client'
import { educationLevels, travelRequired } from '@/app/shared/utils/arrayConstants';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import jobPostingValidation from './utils/postValidation';
import { IJobList } from '@/app/shared/utils/types';
import { showToast } from '@/app/shared/utils/showToast';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { db } from '@/firebase/firebaseConfig';
import { FirebaseError } from "firebase/app";
import { setSalaryRange } from './utils/setSalaryRange';


export default function NewPost() {
  const uid = useSelector((state: RootState ) => state.company.company.uid);
  const router = useRouter();

  const initialState = {
    name: '',
    postedFrom: 'Web',
    phoneNumber: '',
    companyEmail: '',
    consultType: 'JobPosting',
    externalLink: '',
    jComBenefit: '',
    jDescription: '',
    jExpectation: '',
    jMinEducation: 'No education needed',
    otherEducationRequired: '',
    jcomBlurb: '',
    jobType: '',
    jtravelReq: 'No travel needed',
    salaryLower: '',
    salaryUpper: '',
    status: 'active',
    photoUrl: '',
    uid: '',
    address: '',
    Company: '',
  }
  
  const [companyData, setCompanyData] = useState<IJobList>(initialState);
  const [jobTypeArray, setJobTypeArray] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setCompanyData({ ...companyData, [name]:value });
    console.log('Company data', companyData);
  };

  const handlechangeJobType = (type: string) => {
    const exists = jobTypeArray.includes(type);
    
    if(exists){
      const newJobTypeArray = jobTypeArray.filter((item) => (
        item !== type
      ))
      setJobTypeArray(newJobTypeArray);
    } else {
      setJobTypeArray([...jobTypeArray, type]);
    }

    console.log('job type array', jobTypeArray); 
  }

  const handleSubmit = async () => {
    const jobTypeString = jobTypeArray.join(', ');
    const {error, message} = jobPostingValidation({...companyData, jobType: jobTypeString});

    if(error){
      showToast(message, 'error');
      return;
    }

    const newJobPosting = {
      name: companyData.name,
      phoneNumber: companyData.phoneNumber,
      jMinEducation: companyData.jMinEducation === 'Other' ? companyData.otherEducationRequired : companyData.jMinEducation,
      jExpectation: companyData.jExpectation,
      jDescription: companyData.jDescription,
      jComBenefit: companyData.jComBenefit,
      externalLink: companyData.externalLink,
      jcomBlurb: companyData. jcomBlurb,
      jtravelReq: companyData.jtravelReq,
      companyEmail: companyData.companyEmail,
      salary: setSalaryRange(companyData?.salaryLower, companyData?.salaryUpper) ,
      consultType: 'JobPosting',
      postedFrom: 'Web',
      datePosted: new Date(),
      lastEdited: new Date(),
      status: 'active',
      viewCount: [],
      jobType: jobTypeString,
      vendor: {
        Company: companyData.Company,
        address: companyData.address,
        uid,
      }
    };

    console.log('re-arranged data', newJobPosting);

    try{

      await addDoc(collection(db, "jobList"), newJobPosting);

      showToast('Job posted successfully', 'success');
      router.push("/home");
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

  return (
    <div className="min-h-[80vh] flex justify-center  bg-slate-50">
      <div className="h-auto w-full">
        <div className="h-auto w-full flex justify-center">
          <div className="2xl:w-[1200px] xl:w-[1200px] w-screen h-full 2xl:p-[0px] xl:p-[0px] p-2">
            <div className="flex justify-between items-center">
              <h3 className="2xl:text-3xl xl:text-3xl text-xl py-5">Add Job Posting</h3>
              <button
                onClick={() => router.back()}
                className="p-2 border border-slate-300 rounded font-bold bg-white 2xl:text-base xl:text-base text-sm"
              >
                Go Back
              </button>  
            </div>
            <div className="h-[1px] w-full bg-slate-400 mb-5" />
            <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <h4 className="mb-1 font-bold text-primary">Job Title <span>*</span></h4>
                <input 
                  name="name"
                  value={companyData.name}
                  onChange={handleChange}
                  placeholder="Enter job title" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Company Name <span>*</span></h4>
                <input 
                  name="Company"
                  value={companyData.Company}
                  onChange={handleChange}
                  placeholder="Enter company name" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Company Email</h4>
                <input 
                  name="companyEmail"
                  value={companyData.companyEmail}
                  onChange={handleChange}
                  placeholder="Enter company email" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Phone No.</h4>
                <input 
                  name="phoneNumber"
                  value={companyData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Job Location <span>*</span></h4>
                <input 
                  name="address"
                  value={companyData.address}
                  onChange={handleChange}
                  placeholder="Enter company address" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Salary ($) <span>*</span></h4>
                <input 
                  name="salaryLower"
                  value={companyData.salaryLower}
                  onChange={handleChange}
                  placeholder="Enter salary lower range" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
                <input 
                  name="salaryUpper"
                  value={companyData.salaryUpper}
                  onChange={handleChange}
                  placeholder="Enter salary upper range" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3 mt-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Application Link</h4>
                <input 
                  name="externalLink"
                  value={companyData.externalLink}
                  onChange={handleChange}
                  placeholder="Enter application link" 
                  className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Choose Job Nature</h4>
                <select
                 className="border border-slate-400 rounded w-full h-[2.5em] px-3"
                 name="jtravelReq"
                 value={companyData.jtravelReq}
                 onChange={handleChange}
                >
                  { travelRequired().map((item) => (
                    <option
                    
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-primary">Min. Education Needed</h4>
                <select
                 className="border border-slate-400 rounded w-full h-[2.5em] px-3"
                 name="jMinEducation"
                 value={companyData.jMinEducation}
                 onChange={handleChange}
                >
                  { educationLevels().map((item) => (
                    <option
                    
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                {
                  companyData.jMinEducation === 'Other' && (
                    <input 
                      placeholder="Please enter educational requirement"
                      name="otherEducationRequired"
                      value={companyData.otherEducationRequired}
                      onChange={handleChange}
                      className="border border-slate-400 rounded w-full h-[2.5em] px-3 mt-3"
                    />
                  )
                }
              </div>
            </div>
            <div className="py-5">
              <h4 className="mb-1 font-bold text-primary">Job Type</h4>  
              <div className="grid 2xl:flex xl:flex 2xl:flex-row xl:flex-row grid-cols-2 2xl:gap-x-20 xl:gap-x-20 gap-x-5">
                <div className="flex gap-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handlechangeJobType('Contract')}
                    checked={jobTypeArray.includes('Contract')}
                  />  
                  <h6 className="font-semibold text-slate-600">Contract</h6>  
                </div>  
                <div className="flex gap-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handlechangeJobType('Onsite')}
                    checked={jobTypeArray.includes('Onsite')}
                  />  
                  <h6 className="font-semibold text-slate-600">Onsite</h6>  
                </div>  
                <div className="flex gap-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handlechangeJobType('Freelance')}
                    checked={jobTypeArray.includes('Freelance')}
                  />  
                  <h6 className="font-semibold text-slate-600">Freelance</h6>  
                </div>  
                <div className="flex gap-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handlechangeJobType('Full-Time')}
                    checked={jobTypeArray.includes('Full-Time')}
                  />  
                  <h6 className="font-semibold text-slate-600">Full-Time</h6>  
                </div>  
                <div className="flex gap-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handlechangeJobType('Part-Time')}
                    checked={jobTypeArray.includes('Part-Time')}
                  />  
                  <h6 className="font-semibold text-slate-600">Part-Time</h6>  
                </div>  
              </div>
            </div>
            <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <h4 className="mb-1 font-bold text-primary">Job Description <span>*</span></h4>
                <textarea
                  name="jDescription"
                  value={companyData.jDescription}
                  onChange={handleChange}
                  placeholder="Please describe this job" 
                  className="p-3 rounded border border-slate-400 w-full h-[120px]"
                />
              </div>    
              <div>
                <h4 className="mb-1 font-bold text-primary">Skills and Technical Requirement <span>*</span></h4>
                <textarea
                  name="jExpectation"
                  value={companyData.jExpectation}
                  onChange={handleChange}
                  placeholder="Technical and other expectations from the applicant" 
                  className="p-3 rounded border border-slate-400 w-full h-[120px]"
                />
              </div>    
              <div>
                <h4 className="mb-1 font-bold text-primary">Compensations and Other Benefits <span>*</span></h4>
                <textarea
                  name="jComBenefit"
                  value={companyData.jComBenefit}
                  onChange={handleChange}
                  placeholder="Please give any relevant compensations and Benefits associated with the job" 
                  className="p-3 rounded border border-slate-400 w-full h-[120px]"
                />
              </div>    
              <div>
                <h4 className="mb-1 font-bold text-primary">Company Blurb <span>*</span></h4>
                <textarea
                  name="jcomBlurb"
                  value={companyData.jcomBlurb}
                  onChange={handleChange}
                  placeholder="Give an overview of your company" 
                  className="p-3 rounded border border-slate-400 w-full h-[120px]"
                />
              </div>    
            </div>
            <div className="my-5">
              <button onClick={handleSubmit} className="font-bold text-white py-2 px-5 rounded bg-primary w-[150px]">
                Submit
              </button>    
            </div>
          </div>  
        </div>  
      </div>  
    </div>  
  )
}
