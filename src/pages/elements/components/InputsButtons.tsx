import React, { useState } from 'react';
import { FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { PiTelegramLogo, PiWhatsappLogoLight } from 'react-icons/pi';
import ButtonWithIcon from '../../../components/shared/ButtonWithIcon/ButtonWithIcon';
import classNames from 'classnames';
import SectionHeading from '../../createCompany/components/SectionHeading';

const InputsButtons = () => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: '',
    telegram: '',
    phone: '',
  });
  return (
    <div className="mb-20 w-1/2">
      <SectionHeading
        text={'Heading Buttons'}
        status={true}
        hideStatus={true}
      />
      <div className="flex gap-3 items-center">
        <ButtonWithIcon
          onClick={() => {
            setShowWhatsApp(!showWhatsApp);
            setFormData({
              ...formData,
              whatsapp: formData.whatsapp ? '' : formData.phone,
            });
          }}
          active={showWhatsApp}
          title="WhatsApp"
          icon={<PiWhatsappLogoLight className="w-4 h-4 shrink-0" />}
        />
        <ButtonWithIcon
          onClick={() => {
            setShowTelegram(!showTelegram);
            setFormData({
              ...formData,
              telegram: formData.telegram ? '' : formData.phone,
            });
          }}
          active={showTelegram}
          title="Telegram"
          icon={<PiTelegramLogo className="w-4 h-4 shrink-0" />}
        />
        <button
          className={classNames(
            'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:opacity-100 [&_svg]:pointer-events-none outline-none border bg-background shadow-xs  hover:cursor-pointer h-7 rounded-md gap-1.5 px-2',
            showSocials ? 'opacity-100' : 'opacity-50'
          )}
          onClick={(e) => {
            e.preventDefault();
            setShowSocials(!showSocials);
          }}
        >
          <span>Socials</span>
          <div className="flex items-center justify-center ml-1">
            <FaSquareXTwitter className="w-4 h-4 shrink-0" />
            <FaFacebookSquare className="w-4 h-4 shrink-0" />
            <FaLinkedin className="w-4 h-4 shrink-0" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default InputsButtons;
