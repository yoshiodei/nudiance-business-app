'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[80vh] bg-background">
      <div>
        <div className="flex justify-center w-full">
          <img src="/images/nudiance_logo.png" alt="..." className="w-[100px]" />
        </div>
        <h2 className="2xl:text-4xl xl:text-4xl text-xl text-slate-400 font-bold my-5 2xl:w-[45vw] xl:w-[45vw] w-full text-center">Log in to access personalized tools and resources tailored to your business needs.</h2>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/Login")} 
            className="bg-primary rounded 2xl:py-2 xl:py-2 py-1 px-5 text-white font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>  
  );
}
  