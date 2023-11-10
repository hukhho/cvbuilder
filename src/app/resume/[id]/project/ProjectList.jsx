import React from 'react';

const ProjectList = ({ data, onDelete, onEdit }) => {
  const { id, title, organization, projectUrl, startDate, endDate, description } = data;

  const handleDeleteClick = async () => {
    try {
      console.log('handleDeleteClick::data: ', data);
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
            {title}
          </div>
        </div>
        <div className="self-stretch pr-[99.91px] justify-start items-start inline-flex">
          <div className="pr-[9px] justify-start items-center flex">
            <button
              onClick={handleEditClick}
              type="button"
              data-busy="false"
              className="text-white disabled:bg-gray-100 font-[700] uppercase disabled:text-gray-300 focus:ring-0 focus:outline-none  experience-section inline-flex items-center mr-2 bg-rezi-blue text-white px-2 py-1 rounded text-[11px] "
              id="experience-section-edit-0"
              style={{ background: 'var(--color-primary)' }}
            >
              Edit
            </button>
          </div>
          <div className="pr-[9px] justify-start items-center flex">
            <button
              type="button"
              onClick={handleDeleteClick}
              data-busy="false"
              className="text-white disabled:bg-gray-100 font-[700] uppercase disabled:text-gray-300 focus:ring-0 focus:outline-none  experience-section inline-flex items-center mr-2 bg-red-600 text-white px-2 py-1 rounded text-[11px] "
              id="experience-section-delete-0 "
            >
              Delete
            </button>
          </div>
          <div className="pr-[9px] justify-start items-center flex">
            <button
              // onClick={handleHideClick}
              type="button"
              data-busy="false"
              className=" disabled:bg-gray-100 font-[700] uppercase disabled:text-gray-300 focus:ring-0 focus:outline-none  experience-section inline-flex items-center mr-2 bg-white text-gray-500 border-solid border border-[#eee] px-2 py-1 rounded text-[11px] whitespace-nowrap"
              id="experience-section-hide-1"
            >
              Hide
              {/* {isDisplayDisplay ? 'Hide' : 'Un-hide'} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
