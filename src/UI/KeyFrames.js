import { keyframes } from '@mui/material';

export const rotateOut = keyframes`
  0% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: rotate(-360deg);
              transform: rotate(-360deg);
      opacity: 0;
    }
  }
`;

export const rotateIn = keyframes`
  "0%": {
    // "-webkit-transform": "rotate3d(1, 1, 0, -360deg)",
    transform: "rotate3d(1, 1, 0, -360deg)",
    opacity: "0",
  },
  "50%": {
    // "-webkit-transform": "rotate3d(1, 1, 0, 0deg)",
    transform: "rotate3d(1, 1, 0, 0deg)",
    opacity: "1",
  },
  "100%": {
    // "-webkit-transform": "rotate3d(1, 1, 0, 0deg)",
    transform: "rotate3d(1, 1, 1, -45deg) scale(1.5)",
}`;

export const rollIn = keyframes`
  @keyframes roll-in-blurred-left {
    0% {
      -webkit-transform: translateX(-1000px) rotate(-720deg);
              transform: translateX(-1000px) rotate(-720deg);
      -webkit-filter: blur(50px);
              filter: blur(50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) rotate(0deg);
              transform: translateX(0) rotate(0deg);
      -webkit-filter: blur(0);
              filter: blur(0);
      opacity: 1;
    }
  }
`;

export const rollOut = keyframes`
@keyframes roll-out-blurred-left {
  0% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px) rotate(-720deg);
            transform: translateX(-1000px) rotate(-720deg);
    -webkit-filter: blur(50px);
            filter: blur(50px);
    opacity: 0;
  }
}
`;
