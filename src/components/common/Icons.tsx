export const DownIcon = ({ fill, width, height }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width || 24}
    height={height || 24}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 16l-6-6h12z" fill={fill || '#000'} />
  </svg>
);

export const UpIcon = ({ fill, width, height }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width || 24}
    height={height || 24}
  >
    {/* <path fill="none" d="M0 0h24v24H0z" /> */}
    <path d="M12 8L18 14H6L12 8Z" fill={fill || '#000'} />
  </svg>
);

export const SearchLineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
      fill="rgba(142,153,172,1)"
    />
  </svg>
);

export const CalenderIcon = ({ fill, width, height }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z"
      fill={fill || '#000'}
    />
  </svg>
);
