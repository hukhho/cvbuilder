import React from "react";
import { deleteEducation } from "./educationService";

const EducationList = ({ education, onDeleteEducation, onEditEducation }) => {
  const {
    id,
    collegeName,
    location,
    description,
    endYear,
    degree,
    gpa,
    minor,  
  } = education;

  const handleDeleteClick = async () => {
    try {
      onDeleteEducation(id);
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };
  const handleEditClick = async () => {
    try {
      onEditEducation(education);
      console.log("Edit edu: ", education);
    } catch (error) {
      console.error("Error edit education:", error);
    }
  };

  return (
    <div className="h-[60.19px] flex-col justify-start items-start gap-[33.75px] flex">
      <div className="h-[67.39px] flex-col justify-start items-start gap-[9px] flex">
        <div className="self-stretch pr-32 pb-[0.80px] justify-start items-start inline-flex">
          <div className="text-slate-700 text-lg font-normal font-['Source Sans Pro'] leading-7 whitespace-nowrap">
            {collegeName}
          </div>
        </div>
        <div className="self-stretch pr-[99.91px] justify-start items-start inline-flex">
          <div className="pr-[9px] justify-start items-center flex">
            <div
              onClick={handleEditClick}
              className="pl-[9px] pr-[8.45px] pt-[4.50px] pb-[6.09px] bg-indigo-500 rounded justify-center items-center flex"
            >
              <button className="text-center text-white text-[11px] font-bold font-['Source Sans Pro'] uppercase leading-[17.60px]">
                Edit
              </button>
            </div>
          </div>
          <div className="pr-[9px] justify-start items-center flex">
            <div
              onClick={handleDeleteClick}
              className="pl-[9px] pr-[8.89px] pt-[4.50px] pb-[6.09px] bg-red-600 rounded justify-center items-center flex"
            >
              <button className="text-center text-white text-[11px] font-bold font-['Source Sans Pro'] uppercase leading-[17.60px]">
                Delete
              </button>
            </div>
          </div>
          <div className="pr-[9px] justify-start items-center flex">
            <div className="pl-[9px] pr-[10.75px] pt-[4.50px] pb-[6.09px] bg-white rounded border border-zinc-100 justify-center items-center flex">
              <button className="text-center text-gray-500 text-[11px] font-bold font-['Source Sans Pro'] uppercase leading-[17.60px]">
                Hide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationList;
