import styles from '../styles/Lightbox.module.css';
import headerStyles from '../styles/Header.module.css';

export const ArrowRight = () => {
  return (
    <svg
      width="34"
      height="16"
      viewBox="0 0 34 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.arrowRight}
    >
      <path
        d="M33.7147 8.70711C34.1052 8.31658 34.1052 7.68342 33.7147 7.29289L27.3507 0.928932C26.9602 0.538408 26.327 0.538408 25.9365 0.928932C25.546 1.31946 25.546 1.95262 25.9365 2.34315L31.5934 8L25.9365 13.6569C25.546 14.0474 25.546 14.6805 25.9365 15.0711C26.327 15.4616 26.9602 15.4616 27.3507 15.0711L33.7147 8.70711ZM-0.00756836 9H33.0076V7H-0.00756836V9Z"
        fill="white"
      />
    </svg>
  );
};

export const ArrowLeft = () => {
  return (
    <svg
      width="35"
      height="16"
      viewBox="0 0 35 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.arrowLeft}
    >
      <path
        d="M1.27289 8.70711C0.88237 8.31658 0.88237 7.68342 1.27289 7.29289L7.63685 0.928932C8.02738 0.538408 8.66054 0.538408 9.05107 0.928932C9.44159 1.31946 9.44159 1.95262 9.05107 2.34315L3.39421 8L9.05107 13.6569C9.44159 14.0474 9.44159 14.6805 9.05107 15.0711C8.66054 15.4616 8.02738 15.4616 7.63685 15.0711L1.27289 8.70711ZM35 9H1.98V7H35V9Z"
        fill="white"
      />
    </svg>
  );
};

export const ArrowDown = () => {
  return (
    <svg
      width="15"
      height="35"
      viewBox="0 0 15 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={headerStyles.arrowDown}
    >
      <path
        d="M6.79289 34.2147C7.18342 34.6052 7.81658 34.6052 8.20711 34.2147L14.5711 27.8507C14.9616 27.4602 14.9616 26.827 14.5711 26.4365C14.1805 26.046 13.5474 26.046 13.1569 26.4365L7.5 32.0934L1.84315 26.4365C1.45262 26.046 0.819456 26.046 0.428932 26.4365C0.0384079 26.827 0.0384079 27.4602 0.428932 27.8507L6.79289 34.2147ZM6.5 0.492432L6.5 33.5076H8.5L8.5 0.492432L6.5 0.492432Z"
        fill="white"
      />
    </svg>
  );
};
