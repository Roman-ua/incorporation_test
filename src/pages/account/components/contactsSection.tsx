import React from 'react';

import { MdOutlineMail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

import SectionHeading from '../../company/components/SectionHeading';
import { useRecoilValue } from 'recoil';
import UserProfileState from '../../../state/atoms/UserProfile';
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import { LuArrowUpRight } from 'react-icons/lu';
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
          {userData.data?.phone && (
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
                  {/* {userData.data?.whatsapp && (
                  <FaWhatsapp className="w-4 inline ml-2" />
                )}
                {userData.data?.telegram && (
                  <BsTelegram className="w-4 inline ml-2" />
                )} */}
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td className="flex items-center">
              <MdOutlineMail className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">Email</span>
            </td>
            <td className="pl-8 text-sm   text-gray-900">
              {userData.data?.email || '-'}
            </td>
          </tr>
          {userData.data?.telegram && (
            <tr>
              <td className="flex items-center">
                <BsTelegram className="text-gray-500 mr-2" />
                <span className="text-sm   text-gray-500">Telegram</span>
              </td>

              <td className="pl-8 text-sm   text-gray-900">
                {userData.data?.telegram ? (
                  <a
                    href={`https://t.me/${userData.data?.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    {'@' + userData.data?.telegram}
                    <LuArrowUpRight className="h-3 w-3 ml-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out" />
                  </a>
                ) : (
                  <span className="text-sm   text-gray-900">-</span>
                )}
              </td>
            </tr>
          )}
          {/* <tr>
            <td className="flex items-center">
              <FaWhatsappSquare className="text-gray-500 mr-2" />
              <span className="text-sm   text-gray-500">WhatsApp</span>
            </td>
            <td className="pl-8 text-sm   text-gray-900">
              {userData.data?.whatsapp || '-'}
            </td>
          </tr> */}
          {userData.data?.twitter && (
            <tr>
              <td className="flex items-center">
                <FaSquareXTwitter className="text-gray-500 mr-2" />
                <span className="text-sm   text-gray-500">X</span>
              </td>
              <td className="pl-8 text-sm   text-gray-900">
                {userData.data?.twitter || '-'}
              </td>
            </tr>
          )}
          {userData.data?.facebook && (
            <tr>
              <td className="flex items-center">
                <FaFacebookSquare className="text-gray-500 mr-2" />
                <span className="text-sm   text-gray-500">Facebook</span>
              </td>
              <td className="pl-8 text-sm   text-gray-900">
                {userData.data?.facebook || '-'}
              </td>
            </tr>
          )}
          {userData.data?.linkedin && (
            <tr>
              <td className="flex items-center">
                <FaLinkedin className="text-gray-500 mr-2" />
                <span className="text-sm   text-gray-500">LinkedIn</span>
              </td>
              <td className="pl-8 text-sm   text-gray-900">
                {userData.data?.linkedin || '-'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsSection;
