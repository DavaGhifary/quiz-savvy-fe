import {
  ChevronLeft,
  CircleHelp,
  Ellipsis,
  GripVertical,
  Plus,
  Settings,
  Trash2,
  ChevronDown,
  Clock,
  Star,
} from "lucide-react";
import React from "react";
import SwitchRequired from "../../components/SwitchButton/SwitchRequired";
import SwitchMultipleAnswer from "../../components/SwitchButton/SwitchMultipleAnswer";
import Checkbox from "../../components/Checbox/Checbox";

const CreateQuiz = () => {
  return (
    <div>
      {/* Header Create Quiz */}
      <div className="w-full h-12 flex items-center justify-between fixed top-0 left-0 bg-white border-b px-4 z-10">
        <div className="bg-[#D9D9D9] rounded-sm">
          <ChevronLeft />
        </div>
        <div>
          <p>Name Quiz</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-sm p-2 rounded-md text-white">
            Publish
          </button>
          <Settings />
        </div>
      </div>

      {/* Layout Container */}
      <div className="flex">
        {/* Sidebar Create Quiz */}
        <div className="bg-[#F6F6F6] w-[20%] h-screen fixed left-0 top-12 border-r">
          <div className="p-4">
            <div className="flex justify-between">
              <p>Question (1)</p>
              <div className="bg-white p-1 rounded-full">
                <Plus />
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full h-20 border border-[#D9D9D9] rounded-lg">
                <div className="h-8 flex items-center mt-1">
                  <div className="bg-[#E4E4E7] w-6 h-6 flex items-center justify-center rounded-full m-2">
                    <p>1</p>
                  </div>
                  <div>
                    <p>What does UI stand fo...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-[20%] mt-12 p-6 w-full">
          <div className="w-full h-full border rounded-md">
            <div className="h-10 flex items-center justify-between border-b mx-3">
              <div>
                <p>Multiple</p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <p>required</p>
                  <SwitchRequired />
                </div>
                <div>
                  <Ellipsis />
                </div>
              </div>
            </div>
            <div className="mx-3">
              <div className="flex mt-3 gap-2">
                <CircleHelp />
                <p>
                  Question 1 <span className="text-red-600">*</span>
                </p>
              </div>
              <div className="mt-3">
                <textarea
                  type="text"
                  className="bg-[#D9D9D9] w-[35rem] h-[8rem] p-1"
                />
              </div>
            </div>
            <div className="mx-3">
              <div className="flex h-10 items-center gap-3">
                <p className="border-r text-sm font-semibold">
                  Choice <span className="text-red-600 pr-2">*</span>
                </p>
                <div className="flex gap-2">
                  <p className="text-sm font-semibold">Multiple Answer</p>
                  <SwitchMultipleAnswer />
                </div>
                <div className="flex gap-2">
                  <p className="text-sm font-semibold">Answer with image</p>
                  <SwitchMultipleAnswer />
                </div>
              </div>
            </div>
            <div className="mx-3 border-b pb-2">
              <div className="flex gap-3 items-center mt-2">
                <Checkbox />
                <input
                  type="text"
                  className="bg-[#D9D9D9] w-full h-[2rem] px-2"
                />
                <div className="bg-[#D9D9D9] w-7 h-8 flex justify-center items-center">
                  <GripVertical />
                </div>
                <Trash2 className="text-red-600" />
              </div>
              <div className="flex gap-3 items-center mt-2">
                <Checkbox />
                <input
                  type="text"
                  className="bg-[#D9D9D9] w-full h-[2rem] px-2"
                />
                <div className="bg-[#D9D9D9] w-7 h-8 flex justify-center items-center">
                  <GripVertical />
                </div>
                <Trash2 className="text-red-600" />
              </div>
              <div className="flex gap-3 items-center mt-2">
                <Checkbox />
                <input
                  type="text"
                  className="bg-[#D9D9D9] w-full h-[2rem] px-2"
                />
                <div className="bg-[#D9D9D9] w-7 h-8 flex justify-center items-center">
                  <GripVertical />
                </div>
                <Trash2 className="text-red-600" />
              </div>
              <div className="flex gap-3 items-center mt-2">
                <Checkbox />
                <input
                  type="text"
                  className="bg-[#D9D9D9] w-full h-[2rem] px-2"
                />
                <div className="bg-[#D9D9D9] w-7 h-8 flex justify-center items-center">
                  <GripVertical />
                </div>
                <Trash2 className="text-red-600" />
              </div>
              <div className="mx-9 my-4">
                <button className="text-sm flex h-8 items-center gap-2 border border-dashed p-2 rounded-md">
                  <Plus className="w-4" />
                  Add Answer
                </button>
              </div>
            </div>
            <div className="flex gap-6 items-center p-4 rounded-md">
              {/* Randomize Order */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Randomize order</label>
                <div className="flex items-center bg-gray-300 border border-gray-300 rounded-md px-2 py-1">
                  <span className="text-sm text-gray-700 border-r border-gray-600 pr-2">
                    keep choice in current order
                  </span>
                  <div className="pl-2 ml-auto">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Estimation Time */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Estimation time</label>
                <div className="bg-gray-300 rounded-md flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    className="w-12 bg-gray-300 border border-gray-300 rounded-md text-center text-gray-700 text-sm py-1"
                    defaultValue={2}
                  />
                  <span className="text-sm text-gray-600">Mins</span>
                  <div className="rounded-full p-1">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Mark as Point */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Mark as point</label>
                <div className="bg-gray-300 rounded-md flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    className="w-12 bg-gray-300 border border-gray-300 rounded-md text-center text-gray-700 text-sm py-1"
                    defaultValue={1}
                  />
                  <span className="text-sm text-gray-600">Point</span>
                  <div className="bg-gray-200 rounded-full p-1 mx-1">
                    <Star className="w-4 h-4 text-black p-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
