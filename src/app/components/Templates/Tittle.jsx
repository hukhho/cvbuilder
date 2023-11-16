import React from 'react';

export default TitleItem = ({ tittle }) => {
  return (
    <span className="text-[#000000]" style={{ color: 'rgb(0, 0, 0)' }}>
      <div
        className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
        style={{ color: 'rgb(0, 0, 0)' }}
      >
        <span
          className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
          id="smpl125032021-role"
          contentEditable="true"
        >
          {tittle}
        </span>
      </div>
    </span>
  );
};
