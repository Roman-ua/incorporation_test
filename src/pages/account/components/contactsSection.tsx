import React from 'react';

import { MdOutlineMail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import {
  PiLinkedinLogo,
  PiTelegramLogo,
  PiWhatsappLogoLight,
} from 'react-icons/pi';
import wpLogo from '../../../images/socials/whatsapp.png';
import tgLogo from '../../../images/socials/telegram.png';
import SectionHeading from '../../company/components/SectionHeading';
import { useRecoilValue } from 'recoil';
import UserProfileState from '../../../state/atoms/UserProfile';

const ContactsSection = () => {
  const userData = useRecoilValue(UserProfileState);

  return (
    <div className="mb-6">
      <SectionHeading title="Contacts" removeMargin />
      <table
        className="table-auto border-separate mt-2"
        style={{ borderSpacing: '0 8px' }}
      >
        <tbody>
          <tr>
            <td className="flex items-center">
              <FiPhone className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">Phone</span>
            </td>
            <td>
              <div className="pl-8 flex items-center">
                <span className="text-sm   text-gray-900">
                  {userData.data?.phone || '-'}
                </span>
                {userData.data?.whatsapp && (
                  <img src={wpLogo} alt="wpLogo" className="w-4 inline ml-2" />
                )}
                {userData.data?.telegram && (
                  <img src={tgLogo} alt="tgLogo" className="w-4 inline ml-2" />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <MdOutlineMail className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">Email</span>
            </td>
            <td className="pl-8 text-sm   text-gray-900">
              {userData.data?.email || '-'}
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <PiTelegramLogo className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">Telegram</span>
            </td>
            <td className="pl-8 text-sm   text-gray-900">
              {userData.data?.telegram || '-'}
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <PiWhatsappLogoLight className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">WhatsApp</span>
            </td>
            <td className="pl-8 text-sm   text-gray-900">
              {userData.data?.whatsapp || '-'}
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <PiLinkedinLogo className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">LinkedIn</span>
            </td>
            <td className="pl-8 text-sm   text-gray-900">
              {userData.data?.linkedin || '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactsSection;
