import React, { useState } from 'react';

export default function EducationForm({ onAddEducation }) {
  const [education, setEducation] = useState({
    college: '',
    degree: '',
    gpa: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddEducation(education); // Pass the education data to the parent component
    setEducation({
      college: '',
      degree: '',
      gpa: '',
    });
  };

  return (
    <div>
      <h2>Add New Education</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="college">College:</label>
          <input type="text" id="college" name="college" value={education.college} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="degree">Degree:</label>
          <input type="text" id="degree" name="degree" value={education.degree} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="gpa">GPA:</label>
          <input type="text" id="gpa" name="gpa" value={education.gpa} onChange={handleInputChange} required />
        </div>
        <div>
          <button type="submit">Add Education</button>
        </div>
      </form>
    </div>
  );
}
