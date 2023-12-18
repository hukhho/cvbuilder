'use client';

import React, { useEffect, useState } from 'react';
import CertiTest from '../CertiTest';
import CertiTest1 from '../CertiSort';

const mockSkills = [
  { id: '1', order: 1, description: 'Skill 1' },
  { id: '2', order: 2, description: 'Skill 2' },
  { id: '3', order: 3, description: 'Skill 3' },
  // Add more mock data as needed
];

const YourComponent = () => {
  const [skills, setSkills] = useState(mockSkills);
  const handleChangeOrder = newSkills => {
    console.log('newSkills', newSkills);
    setSkills(newSkills);
  };
  return (
    <div>
      <CertiTest1 skills={skills} onChangeOrder={handleChangeOrder} />
    </div>
  );
};

export default YourComponent;
