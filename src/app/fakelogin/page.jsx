"use client"

import { useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'
import { RedirectType } from "next/dist/client/components/redirect";

const CreateUser = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        "use server";

      // Send a POST request to your backend to create the user
      const response = await fetch('http://170.187.198.18:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Assuming your backend responds with the created user and user ID
        const data = await response.json();
        const { id } = data;

        // Save the user ID in a cookie
        Cookies.set('userId', id);
        console.log("cookie set userid: ", id)
		redirect("/users/1", RedirectType.push)

        // Redirect to the user's profile page
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div></div>
  );
};

export default CreateUser;