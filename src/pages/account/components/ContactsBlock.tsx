import React from 'react';
import { RiContactsFill } from 'react-icons/ri';
import { MdOutlineMail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import {
  PiLinkedinLogo,
  PiTelegramLogo,
  PiWhatsappLogoLight,
} from 'react-icons/pi';
const ContactsBlock = () => {
  return (
    <div className="rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mb-12">
      <div className="px-4 py-3 border-b font-semibold text-gray-700 flex items-center">
        <RiContactsFill className="text-gray-700 mr-2" />
        Contacts
      </div>
      <div className="px-4 py-6">
        <div className="flex items-center mb-4">
          <FiPhone className="text-gray-700 mr-2" />
          <div className="text-sm font-semibold text-gray-500 mr-2">Phone:</div>
          <div className="text-sm font-semibold text-gray-700">
            +1 123 456 7890
          </div>
        </div>
        <div className="flex items-center mb-4">
          <MdOutlineMail className="text-gray-700 mr-2" />
          <div className="text-sm font-semibold text-gray-500 mr-2">
            Secondary Email:
          </div>
          <div className="text-sm font-semibold text-gray-700">
            johnsecondary.do@example.com
          </div>
        </div>
        <div className="flex items-center mb-4">
          <PiTelegramLogo className="text-gray-700 mr-2" />
          <div className="text-sm font-semibold text-gray-500 mr-2">
            Telegram:
          </div>
          <div className="text-sm font-semibold text-gray-700">@john_doe</div>
        </div>
        <div className="flex items-center mb-4">
          <PiWhatsappLogoLight className="text-gray-700 mr-2" />
          <div className="text-sm font-semibold text-gray-500 mr-2">
            WhatsApp:
          </div>
          <div className="text-sm font-semibold text-gray-700">
            @john_doe_whatsup
          </div>
        </div>
        <div className="flex items-center">
          <PiLinkedinLogo className="text-gray-700 mr-2" />
          <div className="text-sm font-semibold text-gray-500 mr-2">
            LinkedIn:
          </div>
          <div className="text-sm font-semibold text-gray-700">
            @john_doe_LinkedIn
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsBlock;
