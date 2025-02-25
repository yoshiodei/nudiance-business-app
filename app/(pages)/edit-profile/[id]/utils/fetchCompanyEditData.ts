import { showToast } from "@/app/shared/utils/showToast";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

interface ICompanyData {
  image: string;
  lastEdited: Date | null;
  wallpaper: string;
  name: string;
  size: string;   
}

export const fetchCompanyEditData = async (
  setCompanyData: React.Dispatch<React.SetStateAction<ICompanyData>>, 
  id: string,
  setProfileImagePreview: React.Dispatch<React.SetStateAction<string>>,
  setWallpaperPreview: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const docRef = doc(db, "companies", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const company = docSnap.data();
      setCompanyData({
        image: company.image,
        lastEdited: company.lastEdited,
        wallpaper: company.wallpaper,
        name: company.name,
        size: company.size,
     });

     setProfileImagePreview(company.image ? company.image : '/images/nudiance_profile_logo2.jpg');
     setWallpaperPreview(company.wallpaper ? company.wallpaper : '/images/nudiance_bg.jpg')
    }
    else {
      showToast('This user does not exist', 'error');
    }
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