'use client'
import Loader from '@/app/shared/components/Loader';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ISignupFormProps  {
  handleSetUserCredentials: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errorMessage: string;
  loading: boolean;
  handleSubmit: () => Promise<void>;
}



export default function RegisterForm(
    { 
      handleSetUserCredentials,
      errorMessage,
      loading,
      handleSubmit,
    } : ISignupFormProps 
) {

  const router = useRouter();

  return (
    <div className="min-h-[80vh]">
        <div className="flex justify-center">
          <div className="2xl:bg-slate-50 xl:bg-slate-50 2xl:border xl:border border-slate-300 rounded-lg w-[500px] p-5 my-8">
            <h3 className="text-center text-2xl font-bold 2xl:mb-5 xl:mb-5 mb-1 text-primary">Sign Up</h3>
            <div className="2xl:hidden xl:hidden flex justify-center">
                <div className="w-[50px] mb-5 h-[2px] bg-primary" />
              </div>
            <div className="flex flex-col gap-y-5">
              <div>
                  <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Company Name</label>
                  <input
                    name="name"
                    onChange={handleSetUserCredentials}
                    className="h-[2.3em] w-full border border-slate-300 rounded bg-white px-5"
                    placeholder="Please enter company name"
                  />
              </div>
              <div>
                  <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Company Email</label>
                  <input
                    name="email"
                    onChange={handleSetUserCredentials}
                    className="h-[2.3em] w-full border border-slate-300 rounded bg-white px-5"
                    placeholder="Please enter company email"
                  />
              </div>
              <div>
                <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Company Size</label>
                <select
                  name="size"
                  onChange={handleSetUserCredentials}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">
                    -- Select an option --
                  </option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>  
              </div>
              <div>
                  <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Password</label>
                  <input
                    name="password"
                    onChange={handleSetUserCredentials}
                    className="h-[2.3em] w-full border border-slate-300 rounded bg-white px-5"
                    placeholder="Please enter password"
                  />
              </div>
              <div>
                  <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    onChange={handleSetUserCredentials}
                    className="h-[2.3em] w-full border border-slate-300 rounded bg-white px-5"
                    placeholder="Please re-enter password"
                  />
                  {errorMessage && (<p className="text-center text-red-500 text-[0.9em]">{errorMessage}</p>)}
              </div>
              <div>
                <div className="flex justify-center mb-2">  
                <button 
                  className="h-[2.3em] w-full rounded bg-primary text-white font-bold"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? <Loader/> : <h5>Sign Up</h5>}
                </button>
                </div>
                <div className="flex justify-center">
                  <h6 className="2xl:text-base xl:text-base text-[0.9em]">
                    Already have an account? 
                    <button 
                      onClick={() => router.push('/login') } 
                      className="hover:underline text-blue-400 text-primary font-semibold"
                    >
                      Login
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
