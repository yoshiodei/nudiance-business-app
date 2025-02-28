import { IEditPostJobList } from "@/app/shared/utils/types";

const editPostValidation = (jobObject: IEditPostJobList) => {
    const {
      name,
      Company,
      phoneNumber,
      companyEmail,
      address,
      salaryUpperRange,
      salaryLowerRange,
      jMinEducation,
      otherEducationRequired,
      jobTypeArray,
      jDescription,
      jComBenefit,
      jExpectation,
      jcomBlurb,
    } = jobObject;
  
    if(
      !name.trim() || !jComBenefit.trim() || !jDescription.trim() || !jExpectation.trim() || !jcomBlurb.trim() || !salaryLowerRange?.trim() || !salaryUpperRange?.trim() || !address.trim() || !Company.trim() || !jobTypeArray.length
    ){
      console.log('fields left empty', jobObject);
      return {error: true, message: "Required fields cannot be left empty"}
    }

    if(jMinEducation === 'Other' && otherEducationRequired.trim() === '' ) {
      return {error: true, message: "Minimum education has to be specified"}
    }

    if(phoneNumber.trim() && !RegExp(/^\d{10}$/).test(phoneNumber.trim())) {
      return {error: true, message: "Phone number has to be a 10 digit number"}
    }

    if(companyEmail.trim() && !RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(companyEmail.trim())) {
      return {error: true, message: "Email entered is not valid"}
    }

    if(!RegExp(/^-?\d+(\.\d+)?$/).test(salaryUpperRange.trim()) && !RegExp(/^-?\d+(\.\d+)?$/).test(salaryLowerRange.trim())) {
      return {error: true, message: "Salary entered is not a number"}
    }

    if(Number(salaryLowerRange) > Number(salaryUpperRange)) {
      return {error: true, message: "Salary lower range must be less than higher range"}
    }

    else {
      return {error: false, message: "Form data is valid"}
    }
}; 

export default editPostValidation;
