import Image from "next/image";
import Button from "../shared/components/Button";

export default function Home() {
  // const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[80vh] bg-background">
      <div>
        <div className="flex justify-center w-full">
          <Image 
            src="/images/nudiance_logo.png" 
            alt=""
            width={500}
            height={500}
            className="w-[100px]"
          />
        </div>
        <h2 className="2xl:text-4xl xl:text-4xl text-xl text-slate-400 font-bold my-5 2xl:w-[45vw] xl:w-[45vw] w-full text-center">Log in to access personalized tools and resources tailored to your business needs.</h2>
        <div className="flex justify-center">
          <Button path="/login">Continue</Button>
        </div>
      </div>
    </div>  
  );
}
  