import { getBalance, getResumesCvs } from '@/app/utils/indexService';
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
    balance: -1,
    balance1: 0,
    ats: [],
    resumes: [], // Initialize as an empty array
    setResumes: resumes => set({ resumes }),
    refreshResumes: async () => {
      if (typeof window !== 'undefined') {
        try {
          const newResumes = await getResumesCvs();
          console.log('Fetched new resumes:', newResumes); // Log fetched balance
          set({ resumes: newResumes });
        } catch (error) {
          console.error('Error refreshing balance:', error); // Error logging
        }
      }
    },

    setAts: ats => set({ ats }),
    setBalance: balance => set({ balance }),
    setBalance1: balance1 => set({ balance1 }),
    // Actions to update the state and localStorage
    setMessage: message => set({ message }),
    // Asynchronous action to refresh balance
    refreshBalance: async () => {
      if (typeof window !== 'undefined') {
        try {
          const newBalance = await getBalance();
          console.log('Fetched new balance:', newBalance); // Log fetched balance

          if (typeof newBalance?.accountBalance === 'number' && newBalance?.accountBalance > -1) {
            console.log('Setting balance to:', newBalance.accountBalance); // Log before setting state
            set({ balance: newBalance.accountBalance });
          } else {
            console.log('Invalid balance, setting to -1'); // Log for invalid balance
            set({ balance: -1 });
          }
        } catch (error) {
          console.error('Error refreshing balance:', error); // Error logging
        }
      }
    },

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
