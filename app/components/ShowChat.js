import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";
import { IoCopyOutline } from "react-icons/io5";

const ShowChat = () => {
  const questions = useSelector((state) => state.questions.questions);
  const outputs = useSelector((state) => state.outputs.outputs);
  const loading = useSelector((state) => state.outputs.loading);

  const handleCopy = async (output) => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied Successfully!!");
    } catch (error) {
      console.log(error);
      toast.error("There was some error, please try again");
    }
  };

  useEffect(() => {
    if (outputs.length > 0) {
      const lastIndex = outputs.length - 1;
      let id = document.getElementById(`${outputs[lastIndex]}`);
      id.scrollIntoView({ behavior: "smooth" });
    }
  }, [outputs]);
  return (
    <div className="scrollbar [&::-webkit-scrollbar-thumb]:bg-[#272727] [&::-webkit-scrollbar-thumb]:rounded-[5px] flex flex-col gap-4 p-4 w-full  rounded-[10px] h-[50vh] overflow-y-auto">
      {questions &&
        questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-2">
            {/* Question on the right */}
            <div className="flex justify-end">
              <div className="bg-[#272727] text-white p-3 rounded-full rounded-br-none">
                <h1 className="text-[12px] md:text-[18px]">{question}</h1>
              </div>
            </div>
            {/* Output on the left, if available */}
            {outputs && outputs[index] && (
              <div
                id={`${outputs[index]}`}
                className="flex justify-start relative"
              >
                <div className="text-[12px] md:text-[18px] text-white p-3 rounded-lg max-w-[70%]">
                  {outputs[index]}
                </div>
                <button
                  className="absolute top-[100%] left-4 cursor-pointer"
                  onClick={() => {
                    handleCopy(outputs[index]);
                  }}
                >
                  <IoCopyOutline />
                </button>
              </div>
            )}
          </div>
        ))}
      {loading && (
        <div className="flex items-center gap-[20px]">
          <h1 className="text-[12px] md:text-[18px]">Generating Response</h1>
          <div className="h-[20px] w-[20px] rounded-full border border-red-500 border-t-white animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ShowChat;
