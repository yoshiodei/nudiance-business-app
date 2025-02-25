import { useRouter } from 'next/navigation'
import React from 'react'
import { IJobPost } from '../../shared/utils/types';
import { FaUserTie } from "react-icons/fa";

export default function PostCard({ jobData }: { jobData: IJobPost }) {
  const router = useRouter();

  console.log('job data', jobData);
  

  return (
    <button
      onClick={() => router.push(`/posting/${jobData.id}`)} 
      className="p-3 bg-white border border-slate-300 rounded h-auto hover:bg-slate-50"
    >
      <div className="flex gap-x-3 h-full">
        <div>
          <div className="flex justify-center items-center w-[45px] h-[45px] overflow-hidden rounded-full bg-slate-200 border border-slate-400">
            <FaUserTie className="text-[1.4em] text-slate-400" />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 justify-start text-left">
          <h3 className="text-[0.95em] font-bold text-primary leading-tight capitalize">{jobData.name}</h3> 
          <hr /> 
          <h3 className="text-[0.93em] font-semibold text-slate-500">{jobData.vendor.Company}</h3>  
          <p className="text-[0.92em]">{`$ ${jobData.salary}`}</p>  
          <p className="text-[0.92em]">{jobData.vendor.address}</p>  
          <div className="flex gap-2 flex-wrap">
            {
              jobData.jobType.split(", ").map((type) => (
                  <p key={type} className="text-[0.8em] rounded bg-slate-500 text-white font-semibold px-2 py-1">{ type }</p>
                )
              )
            }
          </div>
          <div>
            <span className={`text-bold text-white py-[2px] px-3 rounded text-[0.85em] ${jobData.status === 'active' ? 'bg-green-600' : 'bg-red-500' }`}>
              {jobData.status}
            </span>
          </div> 
        </div>
      </div>  
    </button>
  )
}
