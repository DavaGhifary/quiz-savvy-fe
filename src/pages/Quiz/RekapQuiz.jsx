import axios from "axios";
import { Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RekapQuiz = () => {
  const { resultId } = useParams();
  const [recapData, setRecapData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRekap = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/recap-jawaban/result/${resultId}`
        );
        // console.log("API Response:", response.data);
        setRecapData(response.data);
      } catch (error) {
        console.error("Failed fetching rekap:", error);
      }
    };

    fetchRekap();
  }, [resultId, apiUrl]);

  console.log("ada data:", recapData);
  return (
    <div className="bg-secondary w-full h-screen">
      <div className="pt-10 pl-10">
        <Link to={`/Result/${resultId}`}>
          <div className="bg-[#D9D9D9] bg-opacity-50 w-10 h-10 flex justify-center items-center rounded-md">
            <X />
          </div>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="mb-3">
          {recapData.length > 0 && (
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-3xl text-white">{recapData[0].quiz.title}</p>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-2">
                  <div className="bg-green-500 w-6 h-6 rounded-sm">
                    <Check className="text-white" />
                  </div>
                  <div>
                    <p className="text-white">5</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-red-500 w-6 h-6 rounded-sm">
                    <X className="text-white" />
                  </div>
                  <div>
                    <p className="text-white">5</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {recapData.length > 0 ? (
            recapData.map((rekap, index) => (
              <div
                key={index}
                className={`bg-white w-[40rem] border-l-8 rounded-md py-2 mb-3 ${
                  rekap.jawaban.jawaban_valid == 1
                    ? "border-l-green-500 "
                    : "border-l-red-500 "
                } `}
              >
                <div className="border-b border-black flex mx-6 py-3 gap-3">
                  <div className="bg-[#E4E4E7] w-7 h-7 flex justify-center items-center rounded-full">
                    <p>{index + 1}</p>
                  </div>
                  <div>
                    <p>{rekap.question.question_text}</p>
                  </div>
                </div>
                <div className="mx-6 mt-3">
                  <div className="flex py-1 gap-3">
                    <div className="bg-[#E4E4E7] w-5 h-5 flex justify-center items-center rounded-full"></div>
                    <div>
                      <p>{rekap.jawaban.jawaban_pilihan}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">TIDAK ADA REKAP</p>
          )}
        </div>
      </div>
    </div>
  );
  {
    /* <div className="bg-white w-[40rem] border-l-8 border-l-red-500 rounded-md py-2 mb-3">
    <div className="border-b border-black flex mx-6 py-3 gap-3">
      <div className="bg-[#E4E4E7] w-7 h-7 flex justify-center items-center rounded-full">
        <p>1</p>
      </div>
      <div>
        <p>Questions?</p>
      </div>
    </div>
    <div className="mx-6 mt-3">
      <div className="flex py-1 gap-3">
        <div className="bg-[#E4E4E7] w-5 h-5 flex justify-center items-center rounded-full"></div>
        <div>
          <p>Textnya</p>
        </div>
      </div>
      <div className="flex py-1 gap-3">
        <div className="bg-[#E4E4E7] w-5 h-5 flex justify-center items-center rounded-full"></div>
        <div>
          <p>Textnya</p>
        </div>
      </div>
      <div className="flex py-1 gap-3">
        <div className="bg-[#E4E4E7] w-5 h-5 flex justify-center items-center rounded-full"></div>
        <div>
          <p>Textnya</p>
        </div>
      </div>
      <div className="flex py-1 gap-3">
        <div className="bg-[#E4E4E7] w-5 h-5 flex justify-center items-center rounded-full"></div>
        <div>
          <p>Textnya</p>
        </div>
      </div>
    </div>
  </div> */
  }
};

export default RekapQuiz;
