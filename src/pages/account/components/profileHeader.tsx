import React, { useRef, useState } from 'react';
import { classNames, copyToClipboard } from '../../../utils/helpers';
import PersonAvatar from './personAvatar';
import UserProfileState from '../../../state/atoms/UserProfile';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import CopyButton from '../../../components/shared/CopyBtn/CopyButton';

interface ProfileHeaderProps {
  picture: string;
  onAddEmail: () => void;
  addPictureHandler: (data: string) => void;
  openEditModal: () => void;
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
  addPictureHandler,
  openEditModal,
}: ProfileHeaderProps) {
  const userData = useRecoilValue(UserProfileState);
  const globalData = useRecoilValue(GlobalDataState);

  const [copiedId, setCopiedId] = useState('');
  const [image, setImage] = useState<string | null>(
    userData.data?.image || null
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    avatarInputRef.current?.click();
  };

  const statusName = globalData.statuses.find(
    (status) => status.id === userData.data?.status
  )?.name;
  console.log(userData.data, 'statusName');
  return (
    <div className="flex items-start flex-col justify-start gap-x-4 mb-12 ">
      <PersonAvatar
        fileInputRef={avatarInputRef}
        image={image}
        setImage={setImage}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        addPictureHandler={addPictureHandler}
        prevImage={userData.data?.image || null}
      />
      <div className="w-full">
        <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
          <div className="text-2xl text-gray-700 flex items-center gap-x-2">
            <span className="text-xl font-bold text-gray-900">
              {userData.data?.full_name || '-'}
            </span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={openEditModal}
              className="mr-2 rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
            >
              Edit
            </button>
            <span
              onClick={(event) => {
                event.stopPropagation();
                setCopiedId(userData.data?.id);

                const timer = setTimeout(() => {
                  clearTimeout(timer);
                  setCopiedId('');
                }, 700);

                copyToClipboard(userData.data?.id);
              }}
              className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out"
            >
              {userData.data?.id}
              <CopyButton
                wrapperClass="ml-1 w-4 h-4"
                iconClass="w-4 h-4 text-gray-700"
                copied={copiedId === userData.data?.id}
              />
            </span>
          </div>
        </div>
        <dl className="w-full mt-4 flex items-start justify-start overflow-x-scroll">
          <div className="flex flex-col gap-y-1 pr-6">
            <dt className="text-sm text-gray-500">Status</dt>
            <span
              className={classNames(
                'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                statusBadge(statusName || 'Active')
              )}
            >
              {statusName || 'Active'}
            </span>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-6">
            <dt className="text-nowrap text-sm text-gray-500">Email</dt>
            <dd>
              {userData.data?.email ? (
                <p className="text-base font-semibold   text-gray-700">
                  {userData.data?.email}
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
              {userData.data?.phone || '-'}
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
