import React from 'react';

interface IProps {
  extraClass: {
    wrapper: string;
    path: string;
  };
}

const DelawareIcon = ({ extraClass }: IProps) => {
  return (
    <svg
      className={`${extraClass.wrapper}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 216 216"
    >
      <switch>
        <g>
          <path
            className={`${extraClass.path}`}
            d="m147.402 212.449-.118-.001-66.483-1.166c-3.566-.063-6.543-2.901-6.777-6.46L62.404 28.088c-.118-1.788.482-3.482 1.688-4.771a6.244 6.244 0 0 1 2.916-1.766c8.226-14.833 18.201-18 25.216-18 9.469 0 16.658 5.601 16.96 5.839 1.53 1.212 2.336 2.916 2.211 4.677-.126 1.761-1.166 3.333-2.854 4.313l-2.759 1.605c-1.039.604-2.375 2.332-2.698 3.49l-.714 2.565c-.676 2.428-2.556 5.575-4.372 7.32l-7.295 7.018c-.336.323-.397 1.062-.119 1.436l3.035 4.09c1.674 2.253 2.53 6.031 1.992 8.787l-1.362 6.97c-.159.815.377 2.201 1.045 2.697.549.407 13.497 10.116 16.575 20.263 2.968 9.774.884 31.586.793 32.509-.103 1.057.573 2.879 1.339 3.611l4.582 4.384c1.918 1.836 3.623 5.206 3.966 7.839l.737 5.672c.174 1.33 1.218 3.499 2.148 4.463l14.74 15.266c.229.237.624.391 1.006.391.225 0 .384-.054.458-.104.953-.647 2.003-.99 3.033-.99 2.544 0 4.513 2.001 4.786 4.865l4.125 43.117c.169 1.769-.4 3.517-1.563 4.796-1.163 1.276-2.845 2.009-4.617 2.009zM68.744 27.32c-.121 0-.211.033-.272.098-.061.065-.088.158-.08.276l11.62 176.734c.028.424.471.847.896.854l66.483 1.166.012 3.001v-3c.084 0 .149-.018.176-.047.027-.03.039-.101.03-.188l-4.007-41.883a7 7 0 0 1-2.422.423c-2.019 0-3.959-.811-5.323-2.223l-14.74-15.266c-1.817-1.882-3.443-5.26-3.781-7.856l-.737-5.672c-.169-1.295-1.222-3.375-2.165-4.278l-4.58-4.382c-2.083-1.991-3.444-5.659-3.164-8.53.021-.215 2.06-21.546-.562-30.184-2.502-8.249-14.295-17.103-14.414-17.191-2.512-1.867-3.954-5.592-3.354-8.663l1.362-6.97c.216-1.106-.248-3.154-.92-4.059l-3.036-4.09c-2.086-2.81-1.745-6.91.777-9.337l7.296-7.018c1.049-1.009 2.359-3.204 2.75-4.606l.715-2.566c.739-2.648 3.087-5.686 5.461-7.066l2.017-1.173c-1.808-1.211-6.713-4.074-12.559-4.074-8.099 0-15.043 5.437-20.64 16.159l-.847 1.622-1.992-.011z"
          />
        </g>
      </switch>
    </svg>
  );
};

export default DelawareIcon;
