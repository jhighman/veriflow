
'use client';
import React from 'react';
import MainMenu from '../../components/MainMenu';
import Breadcrumbs from '../../components/Breadcrumbs';
import VerificationFormComponent from '../verificationFormComponent'; // Adjust the import path as necessary

const NewVerificationPage = () => {
  // Removed state and methods related to submission

  return (
    <main>
      <MainMenu />
      <Breadcrumbs />
      <VerificationFormComponent />
    </main>
  );
};

export default NewVerificationPage;

