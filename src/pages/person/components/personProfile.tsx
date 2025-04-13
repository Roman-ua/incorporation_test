import React, { useState } from 'react';
import { ProfileHeader } from './profileHeader';
import { AddressSection } from './addressSection';
import { CompaniesSection } from './companiesSection';
import { EmailModal } from './emailModal';

// Sample data - in a real app this would come from an API
const personData = {
  id: 'P-12345',
  name: 'John Doe',
  status: 'Active',
  email: '', // Empty to demonstrate the add email button
  picture: '',
  address: {
    country: 'United States',
    address0: '123 Main St',
    address1: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },
  companies: [
    {
      id: 1,
      name: 'Acme Corporation',
      status: 'Active',
      registrationState: 'Delaware',
      titles: ['CEO', 'Founder'],
    },
    {
      id: 2,
      name: 'Tech Innovations LLC',
      status: 'Inactive',
      registrationState: 'California',
      titles: ['Board Member'],
    },
    {
      id: 3,
      name: 'Global Enterprises',
      status: 'Active',
      registrationState: 'New York',
      titles: ['Advisor'],
    },
  ],
};

export function PersonProfile() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [personEmail, setPersonEmail] = useState(personData.email);

  const handleAddEmail = (email: string, sendInvitation: boolean) => {
    setPersonEmail(email);
    setIsEmailModalOpen(false);

    if (sendInvitation) {
      // In a real app, you would call an API to send the invitation
      console.log(`Invitation sent to ${email}`);
    }
  };

  return (
    <div>
      <ProfileHeader
        id={personData.id}
        name={personData.name}
        status={personData.status}
        email={personEmail}
        picture={personData.picture}
        onAddEmail={() => setIsEmailModalOpen(true)}
      />

      <AddressSection address={personData.address} />

      <CompaniesSection companies={personData.companies} />

      {isEmailModalOpen && (
        <EmailModal
          open={isEmailModalOpen}
          setOpen={() => setIsEmailModalOpen(false)}
          onSubmit={handleAddEmail}
        />
      )}
    </div>
  );
}
