import { create } from 'zustand';

const useStore = create(set => {
  let storedEmail = '';
  let storedAvatar = '';
  let storedUserRole = 'CANDIDATE';

  // Check for client-side environment before accessing localStorage
  if (typeof window !== 'undefined') {
    storedEmail = localStorage.getItem('email') || '';
    storedAvatar = localStorage.getItem('avatar') || '';
    storedUserRole = localStorage.getItem('userRole') || 'CANDIDATE';
  }

  return {
    message: '',
    email: storedEmail, // Initialize with the value from localStorage
    avatar: storedAvatar, // Initialize with the value from localStorage
    userRole: storedUserRole, // Initialize with the value from localStorage

    // Actions to update the state and localStorage
    setMessage: message => set({ message }),
    setEmail: email => {
      set({ email });
      if (typeof window !== 'undefined') {
        localStorage.setItem('email', email);
      }
    },
    setAvatar: avatar => {
      set({ avatar });
      if (typeof window !== 'undefined') {
        localStorage.setItem('avatar', avatar);
      }
    },
    setUserRole: userRole => {
      set({ userRole });
      if (typeof window !== 'undefined') {
        localStorage.setItem('userRole', userRole);
      }
    },
  };
});

export default useStore;
