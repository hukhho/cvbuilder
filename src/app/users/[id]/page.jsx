"use client"

import React, { useEffect, useState } from 'react';
import PdfViewer from '@/app/test1/PdfViewer';
import EducationForm from './EducationForm';

export default function Home({ params }) {
  const userId = params.id;

  const [user, setUser] = useState(null);
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [pdfResponse, setPdfResponse] = useState(null); // State to store the PDF response
  const [educations, setEducations] = useState([]); // State to store education records

  useEffect(() => {
    // Fetch user information based on the 'id' parameter
    if (userId) {
      fetch(`http://170.187.198.18:8080/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Set the user data in state
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [userId]);

  const handleCheckboxChange = (event) => {
    const educationId = Number(event.target.value);
    if (event.target.checked) {
      // Add the selected education ID to the list
      setSelectedEducations([...selectedEducations, educationId]);
    } else {
      // Remove the unselected education ID from the list
      setSelectedEducations(selectedEducations.filter((id) => id !== educationId));
    }
  };
  
  const handleAddEducation = (newEducation) => {
    const userIdInt = parseInt(userId, 10); // Parse as a base-10 integer

    fetch(`http://170.187.198.18:8080/api/users/${userIdInt}/educations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEducation),
    })
      .then((response) => response.json())
      .then((addedEducation) => {
        // Handle the response from the server
        console.log('Education added successfully:', addedEducation);
        fetch(`http://170.187.198.18:8080/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Set the user data in state
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
      })
      .catch((error) => {
        console.error('Error adding education:', error);
      });
  };
  
  console.log("pdfResponse", pdfResponse)

  const handleCreateCV = () => {
    console.log('Selected Education IDs:', selectedEducations);

    const userIdInt = parseInt(userId, 10); // Parse as a base-10 integer

    const cvRequest = {
      userId: userIdInt,
      templateId: 1, // Replace with the actual template ID
      educationIds: selectedEducations,
    };

    // Define the URL for the POST request
    const url = 'http://170.187.198.18:8080/api/cv/generate-cv';

    // Make a POST request with fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cvRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create CV');
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        console.log('CV created successfully:', data);
        // You can handle the response data here
        setPdfResponse(data); // Set the PDF response in state

      })
      .catch((error) => {
        console.error('Error creating CV:', error);
        // Handle the error here
      });
  };


  const handleDeleteEducation = (educationId) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      // Send a DELETE request to the API
      const userIdInt = parseInt(userId, 10); // Parse as a base-10 integer

      fetch(`http://170.187.198.18:8080/api/users/${userIdInt}/educations/${educationId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete education record');
            
          }

          fetch(`http://170.187.198.18:8080/api/users/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            setUser(data); // Set the user data in state
          })
          .catch((error) => {
            console.error('Error fetching user:', error);
          });
        
       
         
        })
        .catch((error) => {
          console.error('Error deleting education record:', error);
        });
    }
  };

  
  return (
    <div className="container mx-auto p-4">
      {user ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
          <p className="mb-2">
            User ID: {user.id}
          </p>
          <p className="mb-4">
            Name: {user.name}
          </p>
  
          {/* Display other user information */}
  
          <EducationForm onAddEducation={handleAddEducation} />
  
          <h2 className="text-xl font-semibold mb-2">Educations:</h2>
          <ul>
            {user.educations.map((education) => (
              <li key={education.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={education.id}
                    onChange={handleCheckboxChange}
                    checked={selectedEducations.includes(education.id)}
                    className="mr-2"
                  />
                  <span>
                    {education.college} - GPA: {education.gpa}
                  </span>
                  <button
                    onClick={() => handleDeleteEducation(education.id)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </label>
              </li>
            ))}
          </ul>
  
          <button
            onClick={handleCreateCV}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Create CV
          </button>
  
          {pdfResponse && <PdfViewer pdfResponse={pdfResponse} />} {/* Render PdfViewer component */}
        </div>
      ) : (
        <p className="text-xl">Loading user data...</p>
      )}
    </div>
  );
  
}
