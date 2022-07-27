import { SvgIcon } from '@mui/material';
function Movie(props) {
  return (
    <SvgIcon {...props}>
      <svg width="100%" height="100%" viewBox="0 0 32 32">
        <circle fill="none" stroke="black" cx="9" cy="7" r="5" />
        <circle fill="none" stroke="black" cx="19" cy="7" r="5" />
        <path
          d="M21,25H7c-1.1,0-2-0.9-2-2v-6c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v6C23,24.1,22.1,25,21,25z"
          fill="none"
          stroke="black"
        />
        <polygon fill="none" stroke="black" points="29,25 23,22 23,18 29,15 " />
        <polyline fill="none" stroke="black" points="10,31 14,25 18,31 " />
        <circle fill="none" stroke="black" cx="9" cy="7" r="1" />
        <circle fill="none" stroke="black" cx="19" cy="7" r="1" />
      </svg>
    </SvgIcon>
  );
}
export default Movie;
