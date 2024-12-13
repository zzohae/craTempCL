import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as AlertIcon } from '../svg/util/alert.svg';
import { ReactComponent as CartIcon } from '../svg/util/cart.svg';
import { ReactComponent as MypageIcon } from '../svg/util/user.svg';
import { ReactComponent as LoginIcon } from '../svg/util/login.svg';
import { ReactComponent as LogoutIcon } from '../svg/util/logout.svg';

const Button = ({ icon, hasBadge, onClick, badgePosition, label }) => (
  <button
    className="icon"
    onClick={onClick}
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {React.cloneElement(icon, { style: { color: '#214AEE' } })}
    {hasBadge && (
      <span
        className="badge"
        style={{
          position: 'absolute',
          top: badgePosition?.top || 0,
          right: badgePosition?.right || 0,
          backgroundColor: '#214AEE',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
    )}
  </button>
);

const Cart = ({ icon, badgePosition, incartNum }) => (
  <Link to="/cart"
    className="icon"
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {React.cloneElement(icon, { style: { color: '#214AEE' } })}
    {incartNum.length > 0 && (
      <span
        className="badge"
        style={{
          position: 'absolute',
          fontSize: '11px',
          fontWeight: 500,
          top: '-5px',
          right: '-5px',
          backgroundColor: 'rgb(33, 74, 238)',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          boxSizing: 'unset',
          lineHeight: 1
        }}
      >{incartNum.length}</span>
    )}
  </Link>
);

const Alert = ({ icon, badgePosition, incartNum }) => (
  <Link to="/alert"
    className="icon"
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {React.cloneElement(icon, { style: { color: '#214AEE' } })}
    {incartNum && (
      <span
        className="badge"
        style={{
          position: 'absolute',
          fontSize: '11px',
          fontWeight: 500,
          top: '-5px',
          right: '-4px',
          backgroundColor: 'rgb(33, 74, 238)',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          boxSizing: 'unset'
        }}
      >{incartNum}</span>
    )}
  </Link>
);



// Util 컴포넌트
const Util = ({incartNum, className, isLoggedIn, setIsLoggedIn}) => {
  const [hasAlerts, setHasAlerts] = useState(false);
  const navigate = useNavigate();


  // 로그인/로그아웃
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('session');
      setIsLoggedIn(false);
      alert('성공적으로 로그아웃 되었습니다.');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  // 마이페이지/로그인 페이지 이동
  const handleMypageClick = () => {
    if (isLoggedIn) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  };

  // 알림 상태 토글
  const handleAlertToggle = () => {
    setHasAlerts(!hasAlerts);
  };

  return (
    <div className={` ${className}`}>
      <Alert
        icon={<AlertIcon />}
        hasBadge={7}
        onClick={handleAlertToggle}
        label="알림"
      />

      <Cart
        icon={<CartIcon />}
        incartNum={incartNum}
        label="장바구니"
      />

      <Button
        icon={<MypageIcon />}
        onClick={handleMypageClick}
        label="마이페이지"
      />

      <Button
        icon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
        onClick={handleLoginClick}
        label={isLoggedIn ? '로그아웃' : '로그인'}
      />
    </div>
  );
};

export default Util;
