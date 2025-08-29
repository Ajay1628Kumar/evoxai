"use client";
import Image from "next/image";
import InputModal from "./components/InputModal";
import { store } from "./store";
import { Provider } from "react-redux";
import ShowChat from "./components/ShowChat";
import bgImage from "@/public/background-image.jpg";
import bgImage1 from "@/public/bgImg1.jpg";

export default function Home() {
  return (
    <Provider store={store}>
      <div
        className={`h-[100dvh] w-full flex justify-center items-center p-[20px] md:pb-[50px]  bg-gradient-to-b from-[#272727] to-black  bg-cover`}
        // style={{ backgroundImage: `url(${bgImage1.src})` }}
      >
        <h1 className="text-white text-[30px] absolute top-5 left-5 font-[orbitron] font-bold uppercase">
          Evox.AI
        </h1>
        <div className="w-full lg:w-[60%] h-full flex flex-col justify-end gap-[20px]">
          <ShowChat />
          <InputModal />
        </div>
      </div>
    </Provider>
  );
}
