import React from 'react';

const SkillList = ({ data, onDelete, onEdit }) => {
  const { id, description } = data;

  const handleDeleteClick = () => {
    try {
      onDelete(id);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEditClick = () => {
    try {
      onEdit(data);
    } catch (error) {
      console.error('Error edit:', error);
    }
  };

  const handleKeyDown = (e, clickHandler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      clickHandler();
    }
  };

  return (
    <div
      className="h-[60.19px] flex-col justify-start items-start gap-[33.75px] flex"
      role="button"
      tabIndex={0}
      onClick={handleEditClick}
      onKeyDown={e => handleKeyDown(e, handleEditClick)}
    >
      <div className="h-[67.39px] flex-col justify-start items-start gap-[9px] flex">
        <div className="self-stretch pr-32 pb-[0.80px] justify-start items-start inline-flex">
          <div className="text-slate-700 text-lg font-normal font-['Source Sans Pro'] leading-7 whitespace-nowrap">
            {description}
          </div>
        </div>
        <div className="self-stretch pr-[99.91px] justify-start items-start inline-flex">
          <div className="pr-[9px] justify-start items-center flex">
            <div
              role="button"
              tabIndex={0}
              onClick={handleEditClick}
              onKeyDown={e => handleKeyDown(e, handleEditClick)}
              className="pl-[9px] pr-[8.45px] pt-[4.50px] pb-[6.09px] bg-indigo-500 rounded justify-center items-center flex"
            >
              <button className="text-center text-white text-[11px] font-bold font-['Source Sans Pro'] uppercase leading-[17.60px]">
                Edit
              </button>
            </div>
          </div>
          <div className="pr-[9px] justify-start items-center flex">
            <div
              role="button"
              tabIndex={0}
              onClick={handleDeleteClick}
              onKeyDown={e => handleKeyDown(e, handleDeleteClick)}
              className="pl-[9px] pr-[8.89px] pt-[4.50px] pb-[6.09px] bg-red-600 rounded justify-center items-center flex"
            >
              <button className="text-center text-white text-[11px] font-bold font-['Source Sans Pro'] uppercase leading-[17.60px]">
                Delete
              </button>
            </div>
          </div>
          <div className="pr-[9px] justify-start items-center flex">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={() => {}}
              className="pl-[9px] pr-[10.75px] pt-[4.50px] pb-[6.09px] bg-white rounded border border-zinc-100 justify-center items-center flex"
            >
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

export default SkillList;
