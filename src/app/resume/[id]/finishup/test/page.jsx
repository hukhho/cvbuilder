import React from 'react';
import FinishUpV2 from '../FinishUpV2';

const Test123 = () => {
  const finishUpRef = useRef(null);

  const handleSave = () => {
    console.log('handleSave in Test123');
    // Access handleSave directly using the ref
    finishUpRef.current.handleSave();
  };
  return (
    <div>
      <FinishUpV2 cvId={15} />
      <button>Save</button>
    </div>
  );
};

export default Test123;
