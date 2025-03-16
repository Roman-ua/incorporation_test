import React, { useState } from 'react';
import { classNames, copyToClipboard } from '../../../utils/helpers';
import CopyButton from '../CopyBtn/CopyButton';

interface AddressProps {
  country?: string;
  address0?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  zip?: string;
  state?: string;
  className?: string;
}

interface IProps {
  data: AddressProps;
}

const AddressAsTable = ({ data }: IProps) => {
  const {
    country,
    address0,
    address1,
    address2,
    address3,
    city,
    zip,
    state,
    className,
  } = data;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const addressFields = [
    { label: 'Street', value: address0 },
    { label: 'Street', value: address1 },
    ...(address2 ? [{ label: 'Street', value: address2 }] : []),
    ...(address3 ? [{ label: 'Street', value: address3 }] : []),
    { label: 'City', value: city },
    { label: 'State', value: state },
    { label: 'Postal Code', value: zip },
    { label: 'Country', value: country },
  ].filter((field) => field.value);

  const handleCopy = (value: string, index: number) => {
    copyToClipboard(value);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000);
  };

  return (
    <div className={classNames('w-full max-w-2xl', className || '')}>
      <div className="grid grid-cols-3 gap-0.5 text-gray-900">
        {addressFields.map((field, index) => (
          <div key={index} className="contents">
            <div className="py-1 text-sm text-gray-400">{field.label}</div>
            <div
              onClick={() => handleCopy(field.value || '', index)}
              className="group px-1 py-1 text-sm col-span-2 flex items-center justify-start gap-1 hover:cursor-pointer relative"
            >
              <span>{field.value}</span>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out">
                <CopyButton
                  wrapperClass="w-3 h-3"
                  iconClass="w-3 h-3"
                  copied={copiedIndex === index}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressAsTable;
