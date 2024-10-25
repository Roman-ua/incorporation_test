// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from 'react';

const RenderEmails = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const htmlFiles = [
    { link: 'Company_Created.html', title: 'Company Created' },
    { link: 'Complete_Order_3.html', title: 'Complete Order' },
    {
      link: 'Customer_is_Not_Specified_in_the_Notice_2.html',
      title: 'Customer is Not Specified in the Notice',
    },
    {
      link: 'Former_Customer_Notification_2.html',
      title: 'Former Customer Notification',
    },
    { link: 'Invited_to_company_2.html', title: 'Invited to company' },
    {
      link: 'New_DMCA_Amendment_Order_3.html',
      title: 'New DMCA Amendment Order',
    },
    {
      link: 'New_DMCA_Amendment_Order_-_Complete_+_Domains_Added_3.html',
      title: 'New DMCA Amendment Order - Complete',
    },
    {
      link: 'New_DMCA_Amendment_Order_Complete_Representative_3.html',
      title: 'New DMCA Amendment Order Complete Representative',
    },
    { link: 'New_Order_3.html', title: 'New Order' },
    { link: 'Notice_Email.html', title: 'Notice Email' },
    {
      link: 'Request_to_Send_Only_DMCA_Notices_2.html',
      title: 'Request to Send Only DMCA Notices',
    },
    { link: 'Reset_Pass.html', title: 'Reset Pass' },
    { link: 'Reset_Pass_Confirmation.html', title: 'Reset Pass Confirmation' },
  ];

  // Функция для загрузки конкретного HTML файла
  const loadHtmlFile = (fileName: string) => {
    fetch(`/html/${fileName}`)
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке HTML файла:', error);
      });
  };
  //  https://sender-mkyhunxmi-romanuas-projects.vercel.app/send-email
  //
  // {
  //   "to": "gavrilchukroman@gmail.com",
  //   "subject": "Тестовое письмо",
  //   "text": "Это текст письма",
  //   "html": "<h1>Это HTML письмо</h1>"
  // }
  const send = () => {
    fetch('https://sender-w6ve.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'gavrilchukroman@gmail.com',
        subject: 'Тестовое письмо',
        text: 'Это текст письма',
        html: '<h1>Это HTML письмо</h1>',
      }),
    });
  };
  return (
    <div>
      <div className="mb-10">
        {htmlFiles.map((file, index) => (
          <button
            className="bg-mainBlue text-white p-2 m-2 rounded"
            key={index}
            onClick={() => loadHtmlFile(file.link)}
          >
            Загрузить {file.title}
          </button>
        ))}
      </div>
      <div onClick={send}>send</div>
      <div className="bg-gray-300 p-4">
        <div
          className="bg-white py-6"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default RenderEmails;
