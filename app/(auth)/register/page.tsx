'use client'
import React, { useState } from 'react'
import { validateSignupForm } from '../utils/signupValidation'
import RegisterForm from '../components/RegisterForm';
import useRegisterCompany from '../hooks/useRegisterCompany';


export default function Register() {
  const [userCredentials, setUserCredentials] = useState({name: '', email: '', password: '', confirmPassword: '', size: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const {registerCompany, loading} = useRegisterCompany();

  const handleSetUserCredentials = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>): void => {
      const { value, name } = e.target;
      setUserCredentials({ ...userCredentials, [name]: value });
      console.log(userCredentials);
  }

  const handleSubmit = async () => {
    const validationData = validateSignupForm(userCredentials);
    if(!validationData.isValid){
      setErrorMessage(validationData.message);   
    } else {
      registerCompany(userCredentials);
    }
  }

  return (
    <RegisterForm
      errorMessage={errorMessage}
      handleSetUserCredentials={handleSetUserCredentials}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  )
}
