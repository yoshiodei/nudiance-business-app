export interface ICompanyDataPayload {
    password: string;
    size: string;
    uid: string;
    name: string;
    // jobListing: { id: string; title: string }[];
    email: string;
    image: string;
    wallpaper: string;
  }

  interface IVendor {
    Company: string;
    address: string;
    photoUrl: string;
    uid: string;
  }

  interface ICoordinates {
    latitude: string;
    longitude: string;
  }

  interface ILocation {
    coordinates: ICoordinates;
    country: string;
    locationIsSet: boolean;
    state: string;
    town: string;
  }

 export interface IJobList {
      name: string;
      postedFrom: string;
      phoneNumber: string;
      companyEmail: string;
      consultType: string;
      otherEducationRequired: string;
      externalLink: string;
      jComBenefit: string;
      jDescription: string;
      jExpectation: string;
      jMinEducation: string;
      jcomBlurb: string;
      jtravelReq: string;
      jobType: string;
      location?: ILocation;
      salary?: string;
      salaryLower?: string;
      salaryUpper?: string;
      status: string;
      viewCount?: string[];
      vendor?: IVendor;
      address: string;
      Company: string;
      datePosted?: string;
      lastEdited?: string;
  }
  
  export interface IEditPostJobList {
    name: string;
    Company: string;
    phoneNumber: string;
    companyEmail: string;
    address: string;
    salaryUpperRange: string;
    salaryLowerRange: string;
    jMinEducation: string;
    otherEducationRequired: string;
    jobTypeArray: string[];
    jDescription: string;
    jComBenefit: string;
    jExpectation: string;
    jcomBlurb: string;
  }

  export interface IJobPost {
      id: string;
      name: string;
      phoneNumber: string;
      jtravelReq: string;
      jMinEducation: string;
      salary: string;
      jExpectation: string;
      jDescription: string;
      jcomBlurb: string; 
      jComBenefit: string;
      externalLink: string;
      companyEmail: string;
      consultType: string;
      postedFrom: string;
      datePosted: string;
      lastEdited: string;
      status: string;
      viewCount: string[];
      jobType: string;
      vendor: {
        Company: string;
        address: string;
        uid: string;
      }
  }
  
export interface IJobFetch {
  name: string,
  phoneNumber: string,
  jMinEducation: string,
  jExpectation: string,
  jtravelReq: string,
  jDescription: string,
  jComBenefit: string,
  jcomBlurb: string,
  externalLink: string,
  companyEmail: string,
  consultType: string,
  postedFrom: string,
  datePosted: string,
  lastEdited: string,
  salary: string,
  status: string,
  viewCount: string[],
  jobType: string,
  vendor: {
    Company: string,
    address: string,
    uid: string,
  }
}

export interface ISalary {
  salaryUpperRange: string,
  salaryLowerRange: string,
}

