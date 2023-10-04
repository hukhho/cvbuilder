import React from 'react';

const CertificationList = ({ data, onDelete, onEdit }) => {
  const { id, name, certificateRelevance, certificateSource, status } = data;

  const handleDeleteClick = async () => {
    try {
      onDelete(id);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      onEdit(data);
    } catch (error) {
      console.error('Error editing:', error);
    }
  };

  // Function to handle keyboard events for Edit and Delete buttons
  const handleButtonClick = (event, action) => {
    if (event.key === 'Enter') {
      // Trigger the action on Enter key press
      if (action === 'edit') {
        handleEditClick();
      } else if (action === 'delete') {
        handleDeleteClick();
      }
    }
  };

  return (
    <div className="h-[60.19px] flex-col justify-start items-start gap-[33.75px] flex">
      <div className="h-[67.39px] flex-col justify-start items-start gap-[9px] flex">
        <div className="self-stretch pr-32 pb-[0.80px] justify-start items-start inline-flex">
          <div className="text-slate-700 text-lg font-normal font-['Source Sans Pro'] leading-7 whitespace-nowrap">
            {name}
          </div>
        </div>
        <div className="self-stretch pr-[99.91px] justify-start items-start inline-flex">
          <div className="pr-[9px] justify-start items-center flex">
            <div
              onClick={handleEditClick}
              onKeyDown={e => handleButtonClick(e, 'edit')} // Handle Enter key for Edit button
              role="button" // Add a role for accessibility
              tabIndex={0} // Make the element focusable via keyboard
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
              onKeyDown={e => handleButtonClick(e, 'delete')} // Handle Enter key for Delete button
              role="button" // Add a role for accessibility
              tabIndex={0} // Make the element focusable via keyboard
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

export default CertificationList;
