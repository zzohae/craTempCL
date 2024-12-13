import styled from 'styled-components';
import RadioSelectIcon from '../svg/radioSelect.svg';
import RadioIcon from '../svg/radio.svg';
import BottomArrow from '../svg/util/bottom_arrow.svg';
import CheckIcon from '../svg/check_active.svg';


export const Btn = styled.button.withConfig({
  shouldForwardProp: (prop) => !['version', 'page'].includes(prop),
})`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid transparent;  
  word-break: keep-all;
  white-space: nowrap;
  padding: 0 20px;
  height: 40px;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s, background-color 0.3s;
  
  ${(props) => props.version === 'v1' && `
    background-color: #fff;
    color: #214AEE;
    border: 1px solid #214AEE;
    
    &:hover {
      background-color: #214AEE;
      color: #fff;
    }
  `}

  ${(props) => props.version === 'v2' && `
    background-color: #214AEE;
    color: #fff;
    border: 1px solid #214AEE;
    
    &:hover {
      background-color: #fff;
      color: #214AEE;
    }
  `}

  ${(props) => props.version === 'v3' && `
    background-color: #fff;
    color: #aaa;
    border: 1px solid #aaa;
    
    &:hover {
      background-color: #214AEE;
      color: #fff;
      border-color: #214AEE;
    }
  `}

    ${(props) => props.version === 'v4' && `
    background-color: #fff;
    font-weight: 400;
    color: #333;
    border: 1px solid #214AEE;
    border-radius: ${props.borderRadius === false ? '0.3125rem' : '100px'};
  `}
    ${(props) => props.version === 'v5' && `
      background-color: #214AEE;
      color: #fff;
      border: 1px solid #214AEE;
      border-radius: ${props.borderRadius === false ? '0.3125rem' : '100px'};
    `}
    

  ${(props) => props.disabled && `
    background-color: #aaa;
    color: #fff;
    border: 1px solid #aaa;
  `}

  ${(props) => props.page === 'detail' && `
    height: 60px;
    border-radius: 0.3125rem;
  `}

  ${(props) => props.page === 'mainbest' && `
    border-radius: 0.3125rem;
    width: calc(100% - 40px - 10px);
  `}
`;



export const InCartBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => !['svgcolor', 'page'].includes(prop),
})`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  border: none;
  width: ${(props) => (props.page === 'mainbest' ? '40px' : '3.125rem')};
  max-width: 50px;
  height: ${(props) => (props.page === 'mainbest' ? '40px' : '3.125rem')};
  padding: 2px 5px 0px 2px;
  border-radius: 0.3125rem;
  background: rgba(210, 210, 210, 0.30);
  color: ${(props) => props.svgcolor || '#214AEE'};
`


export const TagStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  margin-left: 0.5rem;
  left: ${(props) => (props.index || 0) * 60}px;
  padding: 0 0.6rem;
  background-color: ${(props) =>
    props.type === 'hot'
      ? '#FF4500'
      : props.type === 'best'
      ? '#214AEE'
      : '#FFEA7D'};
  color: ${(props) => (props.type === 'new' ? '#214AEE' : 'white')};
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 0.1875rem;
  line-height: 1;
`;

const starSvg = `
<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.97081 0.628738C10.3918 -0.209575 11.6082 -0.209583 12.0292 0.628738L14.0338 4.62047L18.5161 5.26057C19.4575 5.395 19.8333 6.53193 19.1522 7.18444L15.9087 10.2915L16.6744 14.6789C16.8351 15.6003 15.8511 16.303 15.0091 15.8679L11 13.7965L6.99085 15.8679C6.14889 16.303 5.16482 15.6003 5.32563 14.6789L6.09131 10.2915L2.84784 7.18444C2.16667 6.53193 2.54255 5.395 3.4839 5.26057L7.96626 4.62047L9.97081 0.628738Z" fill="#FF4A11"/>
</svg>
`;

export const Starwrap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'rating'
})`
    width: ${(props) => props.rating * 22}px;
    height: 17px;
    background: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(starSvg)}');
    background-repeat: repeat-x;
    background-size: 22px 16px;
    margin: -2.5px;
`


export const StoreTag = styled.div`
    display: flex;
    height: 1.625rem;
    padding: 0 0.625rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.75rem;
    border-radius: 100px;
    background-color: #F4F4F4;
    color: #888;
    line-height: 1;

  background-color: ${(props)=>
    props.type ===  'location'
    ? '#FFEA7D'
    : props.type === 'open'
    ? '#214AEE' 
    : props.type === 'close'
    ? '#F4F4F4'
    : '#214AEE'};

    color: ${(props)=>
      props.type === 'location'
      ? '#666'
      : props.type === 'open'
      ? '#fff'
      : props.type === 'close'
      ? '#888'
      : '#666'
    };
`

export const YellowTag = styled.span`
    display: inline-flex;
    height: 1.625rem;
    padding: 0.375rem 0.625rem;
    align-items: center;
    gap: 0.625rem;
    background-color: #FFEA7D;
    color: #333;
    border-radius: 3px;
    white-space: nowrap;
`;


export const RadioTab = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: clamp(0.875rem, 3vw, 1rem);
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid transparent;  
  word-break: keep-all;
  white-space: nowrap;
  padding: 0 20px;
  height: 40px;
  cursor: pointer;
  background: ${({ checked }) => (checked ? '#214AEE' : '#f0f0f0')};
  color: ${({ checked }) => (checked ? '#fff' : '#666')};
  
  input {
    display: none;
  }
`;

export const RadioCustom = styled.label`
  font-family: 'Pretendard', sans-serif;
  color: #666;
  font-size: clamp(0.875rem, 3vw, 1rem);
  display: flex;
  align-items: center;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 8px; /* 아이콘과 텍스트 간 간격 추가 */
    background: ${({ checked }) =>
      checked
        ? `url(${RadioSelectIcon}) no-repeat center/contain`
        : `url(${RadioIcon}) no-repeat center/contain`};
  }

  input {
    display: none; /* 기본 라디오 버튼 숨기기 */
  }
`;



export const InputText = styled.input`
  width: ${({ fullWidth = true }) => (fullWidth ? '100%' : 'auto')};
  height: 3.75rem;
  padding: 0.9375rem;
  font-size: 1rem;
  border: 1px solid ${({ hasError }) => (hasError ? '#ff4d4f' : '#ccc')};
  border-radius: 0.3125rem;
  outline: none;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? '#FF4A11' : '#214AEE')}!important; ${({ hasError }) => (hasError ? '#ff4d4f' : '#214AEE')};
    &::placeholder {
      color: #888;
    }
  }

  &::placeholder {
    color: #aaa;
    font-size: clamp(0.875rem, 3vw, 1rem);
  }
`;


export const SelectCustom = styled.select`
  width: ${({ fullWidth = true }) => (fullWidth ? '100%' : 'auto')};
  padding: 0.9375rem;
  font-size: 1rem;
  border: 1px solid ${({ hasError }) => (hasError ? '#ff4d4f' : '#ccc')};
  border-radius: 0.3125rem;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-image: url(${BottomArrow});
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.9375rem;
`;


export const WarningText = styled.p`
  font-size: 0.875rem;
  color: #ff4d4f;
  margin: 5px 0 0;
`;



export const CheckboxCustom = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  line-height: normal;
  color: ${({ color }) => color || '#333'};

  input[type='checkbox'] {
    display: none;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 1.25rem;
    border: 1px solid #214AEE;
    border-radius: 0.3125rem;
    background-color: white;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  input[type='checkbox']:checked + &::before {
    background-image: url(${CheckIcon});
  }

  span {
    color: #aaa;
  }
`;
