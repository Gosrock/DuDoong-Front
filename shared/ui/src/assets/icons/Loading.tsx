import { HTMLAttributes } from 'react';

const Loading = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5302 9.0007C16.5302 13.1607 13.1602 16.5307 9.00022 16.5307C4.84022 16.5307 1.47021 13.1607 1.47021 9.0007C1.47021 4.8407 4.84022 1.4707 9.00022 1.4707"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};
export default Loading;
