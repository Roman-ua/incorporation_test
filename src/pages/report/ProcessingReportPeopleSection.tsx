import { classNames } from '../../utils/helpers';
import TooltipWrapper from '../../components/shared/TooltipWrapper';
import { FaSignature } from 'react-icons/fa6';
import { USStates } from '../../constants/form/form';
import {
  IconArrowBackUp,
  // IconPlus,
  IconSettings,
  IconTrashX,
} from '@tabler/icons-react';
import PersonDataHandling from '../../components/shared/PersonData/PersonDataHandling';
import ButtonWithArrow from '../../components/shared/ButtonWithArrow/ButtonWithArrow';
import React, { useEffect, useState } from 'react';
import { Person } from '../../interfaces/interfaces';
import { mockPeople } from '../../mock/mockData';
interface IProps {
  disableEdit: boolean;
  propData?: Person[];
  hideControls?: boolean;
  firstColStyle?: string;
  hideRemovedPerson?: boolean;
}

const ProcessingReportPeopleSection = ({
  disableEdit,
  propData,
  hideControls,
  firstColStyle,
  hideRemovedPerson,
}: IProps) => {
  const [peopleDataDuplicate, setPeopleDataDuplicate] = useState<Person[]>(
    propData || mockPeople
  );
  console.log(peopleDataDuplicate, 'peopleDataDuplicate');
  const [editingPersonId, setEditingPersonId] = useState(-1);

  useEffect(() => {
    if (propData?.length) {
      setPeopleDataDuplicate(propData);
    }
  }, [propData]);

  const removePersonHandler = (id: number) => {
    setPeopleDataDuplicate((prevState) => {
      const data = [...prevState];
      const currentPersonIndex = data.findIndex((person) => person.id === id);

      if (currentPersonIndex !== -1) {
        data[currentPersonIndex].removed = true;
      }
      return data;
    });
  };

  const returnPersonHandler = (id: number) => {
    // setDirtyFlag(true);
    setPeopleDataDuplicate((prevState) => {
      const data = [...prevState];
      const currentPersonIndex = data.findIndex((person) => person.id === id);

      if (currentPersonIndex !== -1) {
        data[currentPersonIndex].removed = false;
      }
      return data;
    });
  };

  const updateExistedPersonHandler = (person: Person) => {
    setPeopleDataDuplicate((prevState) => {
      const data = [...prevState];
      const currentItemIndex = prevState.findIndex(
        (item) => item.id === person.id
      );

      if (person.signer) {
        const prevSignerIndex = data.findIndex((item) => item.signer);
        if (prevSignerIndex !== -1) {
          data[prevSignerIndex].signer = false;
        }
      }

      if (currentItemIndex !== -1) {
        data[currentItemIndex] = person;
      }
      return data;
    });
  };
  return (
    <>
      {peopleDataDuplicate.map((person, rowIndex) => {
        if (hideRemovedPerson && person.removed) return <></>;
        return editingPersonId !== person.id ? (
          <div key={rowIndex}>
            <div className="flex py-3 transition-all ease-in-out duration-150 items-start justify-start">
              <div
                className={classNames(
                  firstColStyle || 'w-[40%]',
                  'whitespace-nowrap max-sm:w-1/2 pr-2 flex  text-gray-900 justify-start items-start'
                )}
              >
                <span className="mr-4 min-w-7 min-h-7 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                  {person.name[0]}
                </span>
                <div
                  className={classNames(
                    'text-sm flex flex-col justify-start items-start',
                    person.removed
                      ? 'line-through decoration-gray-400 text-gray-400'
                      : ''
                  )}
                >
                  <span className="font-bold flex items-center justify-start">
                    {person.name}{' '}
                    {person.signer && (
                      <TooltipWrapper tooltipText="Signer of the Annual Report">
                        <FaSignature
                          className={classNames(
                            'w-4 h-4 ml-2 hover:cursor-pointer',
                            person.removed ? 'text-gray-400' : 'text-gray-700'
                          )}
                        />
                      </TooltipWrapper>
                    )}
                  </span>
                  <span
                    className={classNames(
                      ' font-semibold',
                      person.removed ? 'text-gray-400' : 'text-gray-500'
                    )}
                  >
                    {person.title}
                  </span>
                  {!hideControls && (
                    <span className="text-gray-400">{person.email}</span>
                  )}
                </div>
              </div>

              <div
                className={classNames(
                  'whitespace-nowrap w-[24%] max-lg:w-[34%] max-sm:w-1/2 px-1 flex items-center justify-start',
                  person.removed
                    ? 'line-through decoration-gray-400 text-gray-400'
                    : ''
                )}
              >
                <div
                  className={classNames(
                    'w-full pr-2 text-sm',
                    person.removed ? 'text-gray-400' : 'text-gray-700'
                  )}
                >
                  <div>
                    <span>{person.address.address0}, </span>
                    {person.address.address1 && (
                      <span>{person.address.address1}</span>
                    )}
                  </div>
                  <div>
                    {person.address.address2 && (
                      <span>{person.address.address2}</span>
                    )}
                    {person.address.address3 && (
                      <span>
                        {person.address.address2 ? ',' : ''}{' '}
                        {person.address.address3}
                      </span>
                    )}
                  </div>
                  <div>
                    <span>{person.address.city}, </span>
                    <span>
                      {USStates.find(
                        (item) => item.title === person.address.state
                      )?.value || ''}{' '}
                    </span>
                    <span>{person.address.zip}</span>
                  </div>
                  <div>{person.address.country}</div>
                </div>
              </div>
              <div className="whitespace-nowrap w-[24%] max-lg:hidden px-2 flex items-center justify-start"></div>
              {!disableEdit && (
                <>
                  {!person.removed ? (
                    <div className="pl-2 flex items-center justify-end ml-auto">
                      <div
                        onClick={() => {
                          setEditingPersonId(person.id);
                        }}
                        className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                      >
                        <IconSettings className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                      </div>
                      <div
                        onClick={() => {
                          removePersonHandler(person.id);
                        }}
                        className="ml-1 group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                      >
                        <IconTrashX className="w-4 h-4 text-red-500 group-hover:text-red-700 transition-all easy-in-out duration-150" />
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        returnPersonHandler(person.id);
                      }}
                      className="group ml-auto h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                    >
                      <IconArrowBackUp className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <PersonDataHandling
            key={rowIndex}
            person={person}
            closeModalHandler={() => {
              setEditingPersonId(-1);
            }}
            removePersonHandler={removePersonHandler}
            submitProcess={updateExistedPersonHandler}
            isCreateProcess={false}
          />
        );
      })}
      {!hideControls && (
        <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
          <div className="w-1/5 pr-2 max-lg:hidden" />
          <div className="w-1/2 max-xl:w-full flex items-center justify-between">
            <button
              type="button"
              className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <ButtonWithArrow title={'Save'} />
          </div>
          <div className="w-1/4 pr-2 max-lg:hidden" />
        </div>
      )}
    </>
  );
};

export default ProcessingReportPeopleSection;
