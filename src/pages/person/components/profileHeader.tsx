import React, { useRef, useState } from 'react';
import { classNames } from '../../../utils/helpers';
import { MdOutlineCopyAll } from 'react-icons/md';
import PersonAvatar from './personAvatar';
import { PersonData } from './personProfile';

interface ProfileHeaderProps {
  picture: string;
  onAddEmail: () => void;
  personDataForUpdate: PersonData;
  addPictureHandler: (data: string) => void;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-900 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-900 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

export function ProfileHeader({
  onAddEmail,
  personDataForUpdate,
  addPictureHandler,
}: ProfileHeaderProps) {
  const [image, setImage] = useState<string | null>(
    personDataForUpdate.picture
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    avatarInputRef.current?.click();
  };

  return (
    <div className="flex items-start flex-col justify-start gap-x-4 mb-12 ">
      <PersonAvatar
        fileInputRef={avatarInputRef}
        image={image}
        setImage={setImage}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        addPictureHandler={addPictureHandler}
        prevImage={personDataForUpdate.picture}
      />
      <div className="w-full">
        <div className="w-full flex items-center justify-between pb-2 pr-2 mt-5 border-b">
          <div className="text-2xl text-gray-700 flex items-center gap-x-2">
            <span className="text-xl font-bold text-gray-900">
              {personDataForUpdate.name}
            </span>
          </div>
          <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
            p_{personDataForUpdate.id}
            <MdOutlineCopyAll className="text-base ml-2" />
          </span>
        </div>
        <dl className="w-full mt-4 flex items-start justify-start overflow-x-scroll">
          <div className="flex flex-col gap-y-1 pr-6">
            <dt className="text-sm text-gray-500">Status</dt>
            <span
              className={classNames(
                'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                statusBadge(personDataForUpdate.status)
              )}
            >
              {personDataForUpdate.status}
            </span>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-6">
            <dt className="text-nowrap text-sm text-gray-500">Email</dt>
            <dd>
              {personDataForUpdate.email ? (
                <p className="text-base font-semibold   text-gray-700">
                  {personDataForUpdate.email}
                </p>
              ) : (
                <div className="w-full flex justify-end">
                  <button
                    onClick={onAddEmail}
                    className="text-gray-700 rounded transition-colors text-base hover:text-mainBlue"
                  >
                    Add Email
                  </button>
                </div>
              )}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-6">
            <dt className="text-nowrap text-sm text-gray-500">Phone Number</dt>
            <dd className="text-base font-semibold   text-gray-700">
              +1 234 567 890
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 ml-auto">
            <dd className="text-base font-semibold   text-gray-700 overflow-visible">
              {!croppedImage && (
                <button
                  onClick={triggerFileUpload}
                  className="rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
                >
                  Upload Picture
                </button>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
