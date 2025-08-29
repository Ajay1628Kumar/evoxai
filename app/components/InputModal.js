"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { addQuestions } from "../store/slice/inputSlice";
import { useSelector, useDispatch } from "react-redux";
import { addOutput, setLoading } from "../store/slice/outputSlice";
import { IoSend } from "react-icons/io5";

const InputModal = () => {
  const [question, setQuestion] = useState("");

  const dispatch = useDispatch();
  const handleInput = (e) => {
    setQuestion(e.target.value);
    console.log(question);
  };
  const loading = useSelector((state) => state.outputs.loading);
  const [btnLoading, setBtnLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addQuestions(question));
    let payload = {
      contents: [
        {
          parts: [
            {
              text: `${question}`,
            },
          ],
        },
      ],
    };
    try {
      dispatch(setLoading(true));
      let response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      response = await response.json();
      dispatch(addOutput(response.candidates[0].content.parts[0].text));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setQuestion("");
    }
  };

  useEffect(() => {
    setBtnLoading(false);
  }, []);

  return (
    <div className="rounded-full w-full h-[60px] flex overflow-hidden relative">
      <form onSubmit={handleSubmit} className="w-full h-full flex items-center">
        <input
          type="text"
          placeholder="Ask any question"
          className="w-full h-full text-white placeholder:text-white/50  text-[14px] md:text-[20px] bg-[rgb(39,39,39)] py-[20px] px-[20px] rounded-[10px]"
          name="prompt"
          onChange={handleInput}
          value={question}
        />
        {!btnLoading && (
          <button
            type="submit"
            className=" absolute right-[20px] rounded-[10px] flex justify-center items-center"
          >
            <IoSend className="text-xl" />
          </button>
        )}
      </form>
    </div>
  );
};

export default InputModal;
