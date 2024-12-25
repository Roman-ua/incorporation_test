import SectionHeading from '../../company/components/SectionHeading';
import { classNames } from '../../../utils/helpers';
import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';

const mock = [
  {
    id: 'ord_67897',
    orderType: 'Annual Report Filing',
    status: 'In Progress',
    orderDate: 'February 12, 2021',
    relatedInvoice: 'inv_4534',
  },
  {
    id: 'ord_34533',
    orderType: 'Annual Report Filing',
    status: 'Filed',
    orderDate: 'February 12, 2021',
    relatedInvoice: 'inv_8797',
  },
  {
    id: 'ord_12379',
    orderType: 'Annual Report Filing',
    status: 'In Progress',
    orderDate: 'February 12, 2021',
    relatedInvoice: 'inv_5645',
  },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'In Progress':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

const RelatedOrders = () => {
  return (
    <>
      <SectionHeading title="Orders" removeMargin={true} />
      <div className="w-full overflow-hidden mb-12">
        <div>
          {mock.map((order, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
            >
              <div className="w-[20%] pr-2 font-bold flex items-center justify-start text-gray-900 text-sm">
                {order.id}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900 text-sm">
                {order.orderType}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start">
                <span
                  className={classNames(
                    'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                    statusBadge(order?.status)
                  )}
                >
                  {order?.status}
                </span>
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900 text-sm">
                {order.orderDate}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900 text-sm">
                {order.relatedInvoice}
              </div>
              <div className="pl-2 flex items-center justify-end ml-auto">
                <div className="p-1 rounded w-fit bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
                  <LuArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedOrders;
