'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IJobFetch, ISalary } from '@/app/shared/utils/types';
import { educationLevels, travelRequired } from '@/app/shared/utils/arrayConstants';
import { doc, updateDoc } from "firebase/firestore";
import { fetchEditJobPosting } from "../utils/fetchEditJobPosting";
import editPostValidation from "../utils/editPostValidation";
import { showToast } from '@/app/shared/utils/showToast';
import { FirebaseError } from "firebase/app";
import { setSalaryRange } from '../../new-post/utils/setSalaryRange';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { db } from '@/firebase/firebaseConfig';
import Loader from '@/app/shared/components/Loader';



export default function EditPost() {
  const uid = useSelector((state: RootState ) => state.company.company.uid);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id }: { id: string } = useParams();

  const initialState = {
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

  const [jobPostData, setJobPostData] = useState<IJobFetch>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [otherEducationRequired, setOtherEducationRequired] = useState('');
  const [jobTypeArray, setJobTypeArray] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [salary, setSalary] = useState<ISalary>({
    salaryUpperRange: '',
    salaryLowerRange: ''
  });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
       const {name, value} = e.target;

       if(name === 'jMinEducation'){
         setOtherEducationRequired('');
       }

       setJobPostData({ ...jobPostData, [name]:value });
      //  console.log('Company data', jobPostData);
   };

  const loadFetch = async () => {
    setLoading(true);
    
    await fetchEditJobPosting(
      setJobPostData, 
      id, 
      setSelectedStatus, 
      setJobTypeArray,
      setSalary,
    );
    setLoading(false);
  }

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
    setIsLoading(true);
    const jobObject = {
      name: jobPostData.name,
      Company: jobPostData.vendor.Company,
      phoneNumber: jobPostData.phoneNumber,
      companyEmail: jobPostData.companyEmail,
      address: jobPostData.vendor.address,
      salaryUpperRange: salary.salaryUpperRange,
      salaryLowerRange: salary.salaryLowerRange,
      jMinEducation: jobPostData.jMinEducation,
      otherEducationRequired: otherEducationRequired,
      jobTypeArray: jobTypeArray,
      jDescription: jobPostData.jDescription,
      jComBenefit: jobPostData.jComBenefit,
      jExpectation: jobPostData.jExpectation,
      jcomBlurb: jobPostData.jcomBlurb,
    };

    const {error, message} = editPostValidation(jobObject);

    if(error){
          showToast(message, 'error');
          return;
    }

    const newJobPosting = {
          name: jobPostData.name,
          phoneNumber: jobPostData.phoneNumber,
          jMinEducation: jobPostData.jMinEducation === 'Other' ? otherEducationRequired : jobPostData.jMinEducation,
          jExpectation: jobPostData.jExpectation,
          jDescription: jobPostData.jDescription,
          jComBenefit: jobPostData.jComBenefit,
          externalLink: jobPostData.externalLink,
          jcomBlurb: jobPostData. jcomBlurb,
          jtravelReq: jobPostData.jtravelReq,
          companyEmail: jobPostData.companyEmail,
          salary: setSalaryRange(salary?.salaryLowerRange, salary?.salaryUpperRange) ,
          consultType: 'JobPosting',
          postedFrom: 'Web',
          datePosted: jobPostData.datePosted,
          lastEdited: new Date(),
          status: selectedStatus,
          viewCount: [],
          jobType: jobTypeArray.join(', '),
          vendor: {
            Company: jobPostData.vendor.Company,
            address: jobPostData.vendor.address,
            uid,
          }
    };

    console.log('re-arranged data', newJobPosting);

    try{
      const jobPostRef = doc(db, "jobList", id);
      await updateDoc(jobPostRef, newJobPosting);
      showToast('Post updated successfully', 'success');
      router.push("/home");
    }
      catch(err: unknown){
        if (err instanceof FirebaseError) {
          showToast((err.message || 'An error occurred while registering the user.'), 'error');
        } else if (err instanceof Error) {
          showToast(err.message, 'error');
        } else {
          showToast('An unknown error occurred.', 'error');
        }
      }
      finally{
        setIsLoading(false);
      }
  }  

  const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {value, name} = e.target;
    setSalary({...salary, [name]: value});
  }

  useEffect(() => {
    loadFetch();
  }, [id]);

  if(loading){
    return (
      <p>...loading</p>
    )
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
                    value={jobPostData.name}
                    onChange={handleChange}
                    placeholder="Enter job title" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                  />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Company Name <span>*</span></h4>
                  <input 
                    name="Company"
                    value={jobPostData.vendor.Company}
                    onChange={handleChange}
                    placeholder="Enter company name" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                  />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Company Email</h4>
                  <input 
                    name="companyEmail"
                    value={jobPostData.companyEmail}
                    onChange={handleChange}
                    placeholder="Enter company email" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                  />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Phone No.</h4>
                  <input 
                    name="phoneNumber"
                    value={jobPostData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                  />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Job Location <span>*</span></h4>
                  <input 
                    name="address"
                    value={jobPostData.vendor.address}
                    onChange={handleChange}
                    placeholder="Enter company address" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                  />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Salary ($) <span>*</span></h4>
                  <input 
                    name="salaryLowerRange"
                    value={salary.salaryLowerRange}
                    onChange={handleChangeSalary}
                    placeholder="Enter salary lower range" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3" 
                  />
                  <input 
                    name="salaryUpperRange"
                    value={salary.salaryUpperRange}
                    onChange={handleChangeSalary}
                    placeholder="Enter salary upper range" 
                    className="border border-slate-400 rounded w-full h-[2.5em] px-3 mt-3" 
                  />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Application Link</h4>
                  <input 
                    name="externalLink"
                    value={jobPostData.externalLink}
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
                   value={jobPostData.jtravelReq}
                   onChange={handleChange}
                  >
                    { travelRequired().map((item) => (
                      <option
                      
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))
                    }
                  </select>
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Min. Education Needed</h4>
                  <select
                   className="border border-slate-400 rounded w-full h-[2.5em] px-3"
                   name="jMinEducation"
                   value={educationLevels().includes(jobPostData.jMinEducation) ? jobPostData.jMinEducation : 'Other'}
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
                    (jobPostData.jMinEducation === 'Other' || !educationLevels().includes(jobPostData.jMinEducation)) && (
                      <input 
                        placeholder="Please enter educational requirement"
                        name="otherEducationRequired"
                        value={otherEducationRequired}
                        onChange={(e) => setOtherEducationRequired(e.target.value)}
                        className="border border-slate-400 rounded w-full h-[2.5em] px-3 mt-3"
                      />
                    )
                  }
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-primary">Change Post Status</h4>
                  <div className="h-[2.5em] flex gap-[15px]">
                    <button 
                      onClick={() => setSelectedStatus('active')}
                      className={`rounded px-[60px] py-[5px] hover:bg-primary ${selectedStatus === "active" ? "bg-primary" : "bg-slate-400"} text-white h-full`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setSelectedStatus('inactive')}
                      className={`rounded px-[60px] py-[5px] hover:bg-red-400 ${selectedStatus === "inactive" ? "bg-red-400" : "bg-slate-400"} text-white h-full`}
                    >
                      Inactive
                    </button>
                  </div>
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
                    value={jobPostData.jDescription}
                    onChange={handleChange}
                    placeholder="Please describe this job" 
                    className="p-3 rounded border border-slate-400 w-full h-[120px]"
                  />
                </div>    
                <div>
                  <h4 className="mb-1 font-bold text-primary">Skills and Technical Requirement <span>*</span></h4>
                  <textarea
                    name="jExpectation"
                    value={jobPostData.jExpectation}
                    onChange={handleChange}
                    placeholder="Technical and other expectations from the applicant" 
                    className="p-3 rounded border border-slate-400 w-full h-[120px]"
                  />
                </div>    
                <div>
                  <h4 className="mb-1 font-bold text-primary">Compensations and Other Benefits <span>*</span></h4>
                  <textarea
                    name="jComBenefit"
                    value={jobPostData.jComBenefit}
                    onChange={handleChange}
                    placeholder="Please give any relevant compensations and Benefits associated with the job" 
                    className="p-3 rounded border border-slate-400 w-full h-[120px]"
                  />
                </div>    
                <div>
                  <h4 className="mb-1 font-bold text-primary">Company Blurb <span>*</span></h4>
                  <textarea
                    name="jcomBlurb"
                    value={jobPostData.jcomBlurb}
                    onChange={handleChange}
                    placeholder="Give an overview of your company" 
                    className="p-3 rounded border border-slate-400 w-full h-[120px]"
                  />
                </div>    
              </div>
              <div className="my-5">
                <button onClick={handleSubmit} className="font-bold text-white py-2 px-5 rounded bg-primary">
                  {isLoading ? <Loader /> : "Submit"}
                </button>    
              </div>
            </div>  
          </div>  
        </div>  
      </div>  
    )}
