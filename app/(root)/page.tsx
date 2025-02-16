import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
// import { useRouter } from "next/navigation";

async function getJobs() {
  const querySnapshot = await getDocs(collection(db, "jobList"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default async function Home() {
  
  const jobs = await getJobs();
  console.log('my job lists', jobs);
  

  return (
    <>  
      <h1 className="text-3xl text-red-400">Hello Everyone!!</h1>
      {/* <button onClick={ () => router.push('/login') }>Continue</button> */}
    </>   
  );
}
  