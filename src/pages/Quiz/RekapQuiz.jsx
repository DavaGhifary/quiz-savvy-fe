import { Check, X } from "lucide-react";
import React from "react";

const RekapQuiz = () => {
  return (
    <div className="bg-secondary w-full h-screen">
      <div className="pt-10 pl-10">
        <div className="bg-[#D9D9D9] bg-opacity-50 w-10 h-10 flex justify-center items-center rounded-md">
          <X />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <div>
                <p className="text-3xl text-white">Judul</p>
            </div>
            <div className="flex gap-6">
                <div className="flex gap-2">
                    <div className="bg-green-500 w-6 h-6 rounded-sm">
                        <Check className="text-white"/>
                    </div>
                    <div>
                        <p className="text-white">5</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="bg-red-500 w-6 h-6 rounded-sm">
                        <X className="text-white"/>
                    </div>
                    <div>
                        <p className="text-white">5</p>
                    </div>
                </div>
            </div>
          </div>
          <div className="bg-white w-[40rem] border-l-8 border-l-green-500 rounded-md py-2 mb-3">
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
          </div>
          <div className="bg-white w-[40rem] border-l-8 border-l-red-500 rounded-md py-2 mb-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapQuiz;
