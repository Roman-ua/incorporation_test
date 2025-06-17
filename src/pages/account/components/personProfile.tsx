import React, { useState } from 'react';
import { ProfileHeader } from './profileHeader';
import { AddressSection } from './addressSection';
import { CompaniesSection } from './companiesSection';
import { EmailModal } from './emailModal';
import ContactsSection from './contactsSection';

// Sample data - in a real app this would come from an API
interface Company {
  id: number;
  name: string;
  status: string;
  registrationState: string;
  titles: string[];
}

interface Address {
  country: string;
  address0: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
}

export interface PersonData {
  id: string;
  name: string;
  status: string;
  email: string;
  picture: string;
  address: Address;
  companies: Company[];
}

const personData: PersonData = {
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
  const [personDataForUpdate, setPersonDataForUpdate] =
    useState<PersonData>(personData);

  const handleAddEmail = (email: string, sendInvitation: boolean) => {
    setPersonDataForUpdate((prev) => ({
      ...prev,
      email: email,
    }));
    setIsEmailModalOpen(false);

    if (sendInvitation) {
      // In a real app, you would call an API to send the invitation
      console.log(`Invitation sent to ${email}`);
    }
  };
  const addPictureHandler = (image: string) => {
    setPersonDataForUpdate((prevState: PersonData) => ({
      ...prevState,
      picture: image,
    }));
  };

  return (
    <div>
      <ProfileHeader
        personDataForUpdate={personDataForUpdate}
        addPictureHandler={addPictureHandler}
        picture={personData.picture}
        onAddEmail={() => setIsEmailModalOpen(true)}
      />

      <div className="flex items-start gap-4 w-full">
        <div className="w-1/2">
          <ContactsSection />
        </div>
        <div className="w-1/2">
          <AddressSection address={personData.address} />
        </div>
      </div>

      <CompaniesSection companies={personData.companies} />

      {isEmailModalOpen && (
        <EmailModal
          open={isEmailModalOpen}
          setClose={() => setIsEmailModalOpen(false)}
          onSubmit={handleAddEmail}
        />
      )}
    </div>
  );
}
