// useCVBuilderStore.js
import { create } from 'zustand';

const useCVBuilderStore = create(set => ({
  contactData: [], // Initialize with an empty array
  setContactData: data => set({ contactData: data }),
}));

export default useCVBuilderStore;
