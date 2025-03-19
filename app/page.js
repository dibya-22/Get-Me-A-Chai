import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[40vh] text-white flex flex-col items-center justify-center gap-3">
        <div className="text-2xl md:text-5xl font-bold cursor-pointer flex gap-2 items-center">Buy Me A Chai <span><img width={50} src="/icons/tea-cup.gif" alt="tea"/></span></div>

        <p className="text-base text-center">A crowd funding platform. Get support from your fans and followers.</p>

        <div className="btns flex gap-4">
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Start Now!</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-[#0E0E0E] h-1"></div>

      <div className="container mx-auto text-white flex flex-col px-10 my-5 md:pb-20 md:pt-10 items-center justify-center gap-5">
        <h2 className="text-xl md:text-3xl font-semibold flex gap-2 items-center mb-3 md:mb-16 text-center">Your fans can support your work. <img width={30} src="/icons/wallet.gif" alt="wallet" className="hidden md:block"/></h2>
        <div className="flex md:justify-between w-full gap-10 md:gap-0 items-center">
          <div className="item space-y-2 flex flex-col items-center">
            <img width={100} src="/icons/working.gif" alt="" className="bg-gray-500 hover:bg-gray-700 cursor-pointer p-2 rounded-full"/>
            <p className="font-bold text-sm md:text-lg text-center">Fund Yourself</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center">
            <img width={110} src="/icons/rupee.gif" alt="" className="bg-gray-500 hover:bg-gray-700 cursor-pointer p-2 rounded-full "/>
            <p className="font-bold text-sm md:text-lg text-center">Earn Money</p>
          </div>
          <div className="item md:space-y-2 flex flex-col items-center">
            <img width={100} src="/icons/group.png" alt="" className="bg-gray-500 hover:bg-gray-700 cursor-pointer p-2 rounded-full transform scale-75 md:scale-100"/>
            <p className="font-bold text-sm md:text-lg text-center">Fans wants to help</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0E0E0E] h-1"></div>

      <div className="container mx-auto text-white flex flex-col px-10 pb-20 pt-10 items-center justify-center gap-5">
        <h2 className="text-xl md:text-3xl font-semibold flex gap-2 items-center mb-1 md:mb-16 text-center">Learn more about us. <img width={25} src="/icons/info.png" alt="info" /></h2>
        <video width={1000} src="/Intro-GetMeAChai.mp4" controls controlsList="nodownload noplaybackrate nofullscreen" disablePictureInPicture></video>
      </div>

    </>
  );
}
