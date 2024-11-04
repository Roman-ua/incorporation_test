import React from 'react';
import { RiContactsFill } from 'react-icons/ri';
import { MdOutlineMail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import {
  PiLinkedinLogo,
  PiTelegramLogo,
  PiWhatsappLogoLight,
} from 'react-icons/pi';
import wpLogo from '../../../images/socials/whatsapp.png';
import tgLogo from '../../../images/socials/telegram.png';

const ContactsBlock = () => {
  return (
    <div className="mb-6">
      <div className="pb-3 mb-4 border-b font-semibold text-gray-900 flex items-center">
        <RiContactsFill className="text-gray-900 mr-2" />
        Contacts
      </div>
      <table
        className="table-auto border-separate"
        style={{ borderSpacing: '0 10px' }}
      >
        <tbody>
          <tr>
            <td className="flex items-center">
              <FiPhone className="text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-500">Phone</span>
            </td>
            <td>
              <div className="pl-8 flex items-center">
                <span className="text-sm font-semibold text-gray-900">
                  +1 123 456 7890
                </span>
                <img src={wpLogo} alt="wpLogo" className="w-4 inline ml-2" />
                <img src={tgLogo} alt="tgLogo" className="w-4 inline ml-2" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <MdOutlineMail className="text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-500">Email</span>
            </td>
            <td className="pl-8 text-sm font-semibold text-gray-900">
              johnsecondary.do@example.com
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <PiTelegramLogo className="text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-500">
                Telegram
              </span>
            </td>
            <td className="pl-8 text-sm font-semibold text-gray-900">
              @john_doe
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <PiWhatsappLogoLight className="text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-500">
                WhatsApp
              </span>
            </td>
            <td className="pl-8 text-sm font-semibold text-gray-900">
              @john_doe_whatsup
            </td>
          </tr>
          <tr>
            <td className="flex items-center">
              <PiLinkedinLogo className="text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-500">
                LinkedIn
              </span>
            </td>
            <td className="pl-8 text-sm font-semibold text-gray-900">
              @john_doe_LinkedIn
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactsBlock;
