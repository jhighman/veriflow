// useFormLogic.js
import { useState, useEffect } from 'react';

const useFormLogic = ({ initialFields, domainEntity, apiSaveRoute, onSaveSuccess, onAddAnother }) => {
  const [formData, setFormData] = useState(initialFields);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if all required fields are filled out
    const isFormValid = Object.values(formData).every(field => field.trim() !== '');
    setIsSaveEnabled(isFormValid);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!apiSaveRoute) {
      console.error("API save route must be defined.");
      setError("API save route is not defined.");
      return;
    }

    try {
      const response = await fetch(apiSaveRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save ${domainEntity.toLowerCase()}`);
      }

      // Handle success
      setShowSuccessModal(true);
      setError('');
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.error(`Error saving ${domainEntity.toLowerCase()}:`, error);
      setError(error.message);
    }
  };

  const handleReset = () => {
    setFormData(initialFields);
    setShowSuccessModal(false);
    setError('');
    if (onAddAnother) onAddAnother();
  };

  return {
    formData,
    handleChange,
    handleSave,
    handleReset,
    isSaveEnabled,
    showSuccessModal,
    error,
  };
};

export default useFormLogic;
