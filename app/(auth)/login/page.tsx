'use client'
import Loader from '@/app/shared/components/Loader'
import Link from 'next/link'
import React, { useState } from 'react'
import { submitLoginData } from '../utils/submitLoginData';
import useLogCompanyIn from '../hooks/useLogCompanyIn';

interface LoginDataType {
  email: string;
  password: string;
}

export default function Login() {
  const [loginUserData, setLoginUserData] = useState<LoginDataType>({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {logCompanyIn, loading} = useLogCompanyIn();

  const handleSubmit = () => {
    submitLoginData(
      loginUserData, 
      setErrorMessage,
      logCompanyIn
    );  
  }

  return (
    <div className="min-h-[80vh]">
      <div className="flex justify-center">
        <div className="2xl:bg-slate-50 xl:bg-slate-50 2xl:border xl:border border-slate-300 rounded-lg w-[500px] p-5 mt-20">
          <h3 className="text-center text-2xl font-bold 2xl:mb-5 xl:mb-5 mb-1 text-primary">Login</h3>
          <div className="2xl:hidden xl:hidden flex justify-center">
            <div className="w-[50px] mb-5 h-[2px] bg-primary" />
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
                <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Email</label>
                <input
                  onChange={(e) => setLoginUserData({ ...loginUserData, [e.target.name]: e.target.value })}
                  name="email"
                  value={loginUserData.email}
                  className="h-[2.3em] w-full border border-slate-300 rounded bg-white px-5"
                  placeholder="Please enter email"
                />
            </div>
            <div>
                <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Password</label>
                <input
                  onChange={(e) => setLoginUserData({ ...loginUserData, [e.target.name]: e.target.value })}
                  name="password"
                  value={loginUserData.password}
                  className="h-[2.3em] w-full border border-slate-300 rounded bg-white px-5"
                  placeholder="Please enter password"
                />
                {errorMessage && (<p className="text-center text-red-500 text-[0.9em]">{errorMessage}</p>)}
            </div>
            <div>
              <div className="flex justify-center mb-2">  
                <button 
                  className="h-[2.3em] w-full rounded bg-primary text-white font-bold"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  { loading ? <Loader /> : <h5>Login</h5> }
                </button>
              </div>
              <div className="flex justify-center">
                <h6 className="2xl:text-base xl:text-base text-[0.9em]">
                  Don&apos;t have an account? 
                  <Link
                    href="/register"  
                    className="hover:underline text-blue-400 text-primary font-semibold"
                  >
                    Sign Up
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
