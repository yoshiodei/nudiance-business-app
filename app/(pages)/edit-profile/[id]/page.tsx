'use client'
import Loader from '@/app/shared/components/Loader';
import { numberOfEmployees } from '@/app/shared/utils/arrayConstants';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { fetchCompanyEditData } from './utils/fetchCompanyEditData';
import { db, storage } from '@/firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { showToast } from '@/app/shared/utils/showToast';
import { FirebaseError } from 'firebase/app';
import { useDispatch } from 'react-redux';
import { updateCompany } from '@/redux/slices/companySlice';

interface ICompanyData {
  image: string;
  lastEdited: Date | null;
  wallpaper: string;
  name: string;
  size: string;   
}

export default function EditProfile() {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const initialState = {
    image: '',
    lastEdited: null,
    wallpaper: '',
    name: '',
    size: ''
  };

  const [companyData, setCompanyData] = useState<ICompanyData>(initialState);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState('/images/nudiance_profile_logo2.jpg');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [wallpaper, setWallpaper] = useState<File | null>(null);
  const [wallpaperPreview, setWallpaperPreview] = useState('/images/nudiance_bg.jpg');
  
  const handleRemoveImage = (buttonType: string) => {
    if(buttonType === 'profile'){
      setProfileImagePreview('/images/nudiance_profile_logo2.jpg'); 
    }
    if(buttonType === 'wallpaper'){
      setWallpaperPreview('/images/nudiance_bg.jpg'); 
    }
  }

  const loadFetchCompanyEditData = async () => {
    setLoading(true);
    await fetchCompanyEditData(setCompanyData, id, setProfileImagePreview, setWallpaperPreview);
    setLoading(false);
  }

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>, 
    setImage: (file: File | null) => void,
    setPreview: (url: string) => void
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const {name, value} = e.target;
    setCompanyData({ ...companyData, [name]: value });
  }

  useEffect(() => {
    loadFetchCompanyEditData();
  }, [id]);

  const uploadImage = async (file: File | null, path: string): Promise<string | null> => {
    if (!file) return null;
    const imageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async () => {
    
    const profileImageUrl = await uploadImage(profileImage, "company-profile-images");
    const wallpaperUrl = await uploadImage(wallpaper, "company-wallpapers");

    const updatedCompanyData = {
      image: profileImageUrl,
      wallpaper: wallpaperUrl,
      size: companyData.size,
      name: companyData.name,
      lastEdited: new Date(),    
    }
    
    try{
          const companyRef = doc(db, "companies", id);
          const { lastEdited, ...otherData } = updatedCompanyData;
          console.log(lastEdited);
          
          dispatch(updateCompany({...otherData}));
          
          await updateDoc(companyRef, updatedCompanyData);
          showToast('Profile updated successfully', 'success');
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
            setSubmitLoading(false);
          }
  };
  console.log(loading);
  
  return (
    <div className="min-h-[80vh] flex justify-center  bg-slate-50">
      <div className="h-auto w-full">
        <div className="h-auto w-full flex justify-center">
          <div className="2xl:w-[1200px] xl:w-[1200px] w-screen h-full">
            <div className="w-full p-2">
                <div className="h-[80px] w-full border-b border-slate-300 mb-5 flex justify-between items-center">
                  <h3 className="text-2xl text-left text-slate-600">Edit Profile Details</h3>
                  <button
                    onClick={() => router.back()} 
                    className="p-2 border border-slate-300 rounded font-bold bg-white 2xl:text-base xl:text-base text-sm"
                  >
                    Go Back
                  </button>    
                </div>

                <div className="flex gap-[80px]">
                    <div className="flex 2xl:flex-row xl:flex-row flex-col 2xl:justify-start xl:justify-start justify-center 2xl:items-end xl:items-end items-center 2xl:gap-5 xl:gap-5 gap-3 mb-5">
                      <div className="border-2 p-1 border-slate-300 rounded border-dashed w-[180px] h-[180px]">
                        <div className="bg-slate-300 rounded h-full w-full">
                          <img src={profileImagePreview} alt="profile Preview" className="w-full h-full object-cover" />  
                        </div>    
                      </div> 
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg"
                      id="profile-image"
                      onChange={(e) => handleImageChange(e, setProfileImage, setProfileImagePreview)}
                    />
                    <div className="flex flex-col gap-[5px]">
                      <button onClick={() => handleRemoveImage('profile')} className="rounded flex justify-center items-center bg-slate-400 w-[180px] h-[2.5em] px-3">
                        <h4 className="text-white font-semibold text-[0.95em]">Remove Image</h4>
                      </button>   
                      <label htmlFor="profile-image" className="rounded flex justify-center items-center bg-primary h-[2.5em] w-[180px] px-1">
                        <h4 className="text-white font-semibold text-[0.95em]">Change Image</h4>
                      </label> 
                    </div>
                    </div>

                    <div className="flex 2xl:flex-row xl:flex-row flex-col 2xl:justify-start xl:justify-start justify-center 2xl:items-end xl:items-end items-center 2xl:gap-5 xl:gap-5 gap-3 mb-5">
                    <div className="border-2 p-1 border-slate-300 rounded border-dashed w-[280px] h-[180px]">
                      <div className="bg-slate-300 rounded h-full w-full">
                        <img src={wallpaperPreview} alt="Wallpaper Preview" className="w-full h-full object-cover" />  
                      </div>  
                    </div> 
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg"
                      id="wallpaper-image"
                      onChange={(e) => handleImageChange(e, setWallpaper, setWallpaperPreview)}
                    />
                    <div className="flex flex-col gap-[5px]">
                      <button onClick={() => handleRemoveImage('wallpaper')} className="rounded flex justify-center items-center bg-slate-400 w-[180px] h-[2.5em] px-3">
                        <h4 className="text-white font-semibold text-[0.95em]">Remove Image</h4>
                      </button> 
                      <label htmlFor="wallpaper-image" className="rounded flex justify-center items-center bg-primary w-[180px] h-[2.5em] px-3">
                        <h4 className="text-white font-semibold text-[0.95em]">Change Wallpaper</h4>
                      </label> 
                    </div>
                    </div>
                </div>


                <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1  2xl:gap-5 xl:gap-5 gap-3">
                  <div>
                    <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Company Name</label>
                    <input
                      name="name"
                      value={companyData.name}
                      onChange={handleChange}
                      className="h-[2.5em] w-full border border-slate-300 rounded bg-white px-5"
                      placeholder="Please enter company name"
                    />
                  </div>
                  <div>
                    <label className="font-bold mb-3 text-primary 2xl:text-base xl:text-base text-[0.9em]">Number of Employees</label>
                     <select
                       className="border border-slate-400 rounded w-full h-[2.5em] px-3"
                       name="size"
                       value={companyData.size}
                       onChange={handleChange}
                     >
                        { numberOfEmployees().map((employees: string) => (
                          <option
                            key={employees}
                            value={employees}
                          >
                            {employees}
                          </option>
                        ))}
                     </select>
                   </div>
                </div>
                <div className="my-5 flex 2xl:justify-start xl:justify-start justify-center">
                  <button 
                    className="rounded flex justify-center items-center bg-primary w-[170px] h-[2.5em] px-3"
                    onClick={handleSubmit}
                  >
                    <h4 className="text-white font-semibold">{submitLoading ? <Loader /> : 'Update Profile'}</h4>
                  </button> 
                </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
