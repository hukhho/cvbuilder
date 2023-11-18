import React, { useEffect, useState } from 'react';
import { updateExperience } from './experienceService';

const StandarList = ({ data, onDelete, onEdit, selectedExperience, cvId, title, subtitle }) => {
  const { id, companyName, location, role, description, startDate, endDate } = data;

  const [isSelected, setIsSelected] = useState(selectedExperience?.id === id);
  const [isDisplayDisplay, setIsDisplay] = useState(data?.isDisplay);
  useEffect(() => {
    setIsSelected(selectedExperience?.id === id);
  }, [selectedExperience, data]);

  // console.log('ExperienceList: ', id, role, 'selectedExperience: ', selectedExperience);
  const handleDeleteClick = async () => {
    try {
      onDelete(id);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      console.log('handleEditClick::data: ', data);
      onEdit(data);
    } catch (error) {
      console.error('Error editing:', error);
    }
  };
  const handleHideClick = async () => {
    try {
      if (data.isDisplay === null || data.isDisplay === undefined) {
        data.isDisplay = true;
        await updateExperience(cvId, id, data);
        setIsDisplay(data.isDisplay);
      } else {
        data.isDisplay = !data.isDisplay;
        await updateExperience(cvId, id, data);
        setIsDisplay(data.isDisplay);
      }
    } catch (error) {
      console.error('Error hide:', error);
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
      } else if (action === 'hide') {
        handleHideClick();
      }
    }
  };

  return (
    <div
      style={{ fontFamily: '"Source Sans Pro", sans-serif', fontSize: 16, fontWeight: 400 }}
      className="flex-col justify-start items-start  flex"
    >
      <div className="flex-col justify-start items-start  flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="flex flex-col" style={{ textAlign: 'left' }}>
            <span className="block max-w-full whitespace-no-wrap overflow-hidden text-ellipsis">
              {title}
            </span>
            <span className="block max-w-full whitespace-no-wrap overflow-hidden text-ellipsis opacity-80">
              {subtitle}
            </span>
          </div>
        </div>
        <div
          style={{ marginTop: 8 }}
          className="self-stretch pr-[99.91px] justify-start items-start inline-flex"
        >
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
              onClick={handleHideClick}
              type="button"
              data-busy="false"
              className="disabled:bg-gray-100 font-[700] uppercase disabled:text-gray-300 focus:ring-0 focus:outline-none  experience-section inline-flex items-center mr-2 bg-white text-gray-500 border-solid border border-[#eee] px-2 py-1 rounded text-[11px] whitespace-nowrap"
              id="experience-section-hide-1"
            >
              {isDisplayDisplay ? 'Hide' : 'Un-hide'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandarList;
