import React from "react";

const InvolvementList = ({ data, onDelete, onEdit }) => {
  const {
    id,
    organizationRole,
    organizationName,
    courseLocation,
    startDate,
    endDate,
    college,
    description
  } = data;
  console.log("data: ", data)
  const handleDeleteClick = async () => {
    try {
      onDelete(id);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  const handleEditClick = async () => {
    try {
      onEdit(data);
    } catch (error) {
      console.error("Error edit:", error);
    }
  };

  return (
    <div className="h-[60.19px] flex-col justify-start items-start gap-[33.75px] flex">
      <div className="h-[67.39px] flex-col justify-start items-start gap-[9px] flex">
        <div className="self-stretch pr-32 pb-[0.80px] justify-start items-start inline-flex">
          <div className="text-slate-700 text-lg font-normal font-['Source Sans Pro'] leading-7 whitespace-nowrap">
            {organizationRole}
          </div>
          {/* <div className="text-slate-300 text-lg font-normal font-['Source Sans Pro'] leading-7 whitespace-nowrap">
            {companyName}
          </div> */}
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

export default InvolvementList;
