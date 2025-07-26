import React, { useState } from 'react';
import { ProfileHeader } from './profileHeader';
import { AddressSection } from './addressSection';
import { CompaniesSection } from './companiesSection';
import { EmailModal } from './emailModal';
import ContactsSection from './contactsSection';
import { UpdateAccountData } from './updateAccountData';
import { useRecoilState } from 'recoil';
import UserProfileState from '../../../state/atoms/UserProfile';

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

export function PersonProfile() {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [userData, setUserData] = useRecoilState(UserProfileState);

  const handleAddEmail = (email: string, sendInvitation: boolean) => {
    setUserData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        email: email,
      },
    }));
    setIsEmailModalOpen(false);

    if (sendInvitation) {
      // In a real app, you would call an API to send the invitation
      console.log(`Invitation sent to ${email}`);
    }
  };

  return (
    <div>
      <UpdateAccountData
        isOpen={updateModalOpen}
        userData={userData.data}
        onClose={() => setUpdateModalOpen(false)}
      />
      <ProfileHeader
        openEditModal={() => setUpdateModalOpen(true)}
        picture={userData.data.image || ''}
        onAddEmail={() => setIsEmailModalOpen(true)}
      />

      <div className="flex items-start gap-4 w-full">
        <div className="w-1/2">
          <ContactsSection />
        </div>
        <div className="w-1/2">
          <AddressSection data={userData.data} />
        </div>
      </div>

      <CompaniesSection companies={userData.data?.companies || []} />

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
