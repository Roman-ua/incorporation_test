import React from 'react';
import { classNames, formatDateToLongForm } from '../../../utils/helpers';
import { IconTrashX } from '@tabler/icons-react';
import { MdOutlineFileDownload } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { EinDocumentGet } from '../../../state/types/einTypes';
import useEin from '../../../utils/hooks/EIN/useEin';

interface IProps {
  data: EinDocumentGet;
}

const EinFilesSection = ({ data }: IProps) => {
  const globalData = useRecoilValue(GlobalDataState);

  const { deleteEinDocument } = useEin();

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      const urlParts = url.split('/');
      const filename = urlParts[urlParts.length - 1].split('?')[0];
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('Ошибка скачивания:', err);
      alert('Не удалось скачать файл');
    }
  };

  return (
    <div className="w-full mb-20">
      <div className="flex pt-2 text-sm text-gray-500">
        <div className="w-[20%] pr-2">Document Date</div>
        <div className="w-[15%] px-2">Document Type</div>
        <div className="w-[60%] px-2">Address on the Document</div>
        <div className="pl-2 w-[72px] ml-auto" />
      </div>
      {data.ein_documents.map((item) => (
        <div
          key={item.id}
          className={`flex py-2.5 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
        >
          <div className="w-[20%] pr-2 flex flex-col items-start justify-start font-bold text-gray-900">
            {formatDateToLongForm(item.document_date)}
            <span className="font-normal text-gray-700 text-xs">
              {data.company.name}
            </span>
          </div>
          <div className="w-[15%] px-2 flex items-center justify-start">
            <span
              className={classNames(
                'text-nowrap flex items-center text-xs px-2 py-1 font-medium rounded-md ring-1 ring-inset bg-gray-100 text-gray-700 ring-gray-600/20'
              )}
            >
              {item.document_type_display}
            </span>
          </div>
          <div className="w-[60%] px-2 text-gray-900 flex items-center justify-start">
            {item.line1 && (
              <div>
                <span>{item.line1}, </span>
                {item.line2 && <span>{item.line2}, </span>}
                {item.line3 && <span>{item.line3}</span>}
                {item.line4 && (
                  <span>
                    {item.line3 ? ',' : ''} {item.line4}
                  </span>
                )}
                <span>
                  {item.line4 ? ', ' : ''}
                  {item.city},{' '}
                </span>
                <span>
                  {globalData.states.find(
                    (stateItem) => stateItem.id === item.state
                  )?.abbreviation || ''}{' '}
                </span>
                <span>{item.zip}, </span>
                <span>
                  {globalData.countryies.find(
                    (countryItem) => countryItem.id === item.country
                  )?.full_name || '-'}
                </span>
              </div>
            )}
          </div>
          <div className="pl-2 flex items-center justify-end ml-auto transition-all duration-150 ease-in-out">
            <div
              onClick={() => handleDownload(item.document || '')}
              className="group/download h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
            >
              <MdOutlineFileDownload className="w-4 h-4 text-gray-500 group-hover/download:text-gray-900 transition-all ease-in-out duration-150" />
            </div>
            <div
              onClick={() => deleteEinDocument(item.id)}
              className="ml-1 group/remove h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
            >
              <IconTrashX className="w-4 h-4 text-red-500 group-hover/remove:text-red-700 transition-all easy-in-out duration-150" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EinFilesSection;
