import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./api/dbconnect"; // supabase import 유지
import { Btn } from "./ui/commonui";
import { RadioTab } from "./ui/commonui";
import { InputText } from "./ui/commonui";
import { WarningText } from "./ui/commonui";
import Movetool from './ui/Mtitle'
import { ReactComponent as Naver } from './svg/login_naver.svg';
import { ReactComponent as Kakao } from './svg/login_kakao.svg';
import { ReactComponent as Google } from './svg/login_google.svg';

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("general");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => setUserType(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("user")
        .select("password")
        .eq("username", username);

      if (error || !data || data.length === 0) {
        setErrorMessage("일치하는 회원 정보가 없습니다.");
        setPasswordError(true);
        return;
      }

      const user = data[0];

      if (user.password !== password) {
        setErrorMessage("아이디/비밀번호를 확인해 주세요.");
        setPasswordError(true);
        return;
      }

      setErrorMessage("");
      setPasswordError(false);
      alert("로그인 성공");

      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container mycontainer row justify-content-center">
        <div className="w-100 d-flex flex-column gap-3" style={{maxWidth: '427px'}}>
        <Movetool nomargin='true' textColor='#214aee' h2size='34px'>로그인/회원가입</Movetool>

          <div className="d-flex gap-2">
            <RadioTab checked={userType === "general"} htmlFor="general">
              <input
                id="general"
                type="radio"
                value="general"
                checked={userType === "general"}
                onChange={handleUserTypeChange}/>
                일반 회원
              </RadioTab>
            <RadioTab checked={userType === "member"}>
              <input
                id="member"
                type="radio"
                value="member"
                checked={userType === "member"}
                onChange={handleUserTypeChange}/>
              판매자 회원
            </RadioTab>
          </div>

          <div>
            <InputText
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="아이디를 입력해주세요"/>
          </div>
          <div>
            <InputText
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해 주세요"
              hasError={passwordError}
              onKeyDown={handleKeyDown}
            />
            {passwordError && <WarningText>{errorMessage}</WarningText>}
          </div>

          {errorMessage && !passwordError && (
            <p className="error-text">{errorMessage}</p>
          )}
          <div className="row flex-row gx-3">
            <div className="col-4">
              <Btn version="v4" borderRadius={false} onClick={() => navigate("/signup")} style={{width:'100%', height:'3.75rem'}}>
                회원가입
              </Btn>
            </div>
            <div className="col-8">
            <Btn version="v5" borderRadius={false} onClick={handleLogin} style={{width:'100%', height:'3.75rem'}}>
              로그인
            </Btn>
            </div>
          </div>

          <div className="ms-auto fs-h6" style={{color:'#888'}}>
            <a href="/find-username">아이디 찾기</a> |{" "}
            <a href="/find-password">비밀번호 찾기</a>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-4 mt-3" style={{paddingBottom:'150px'}}>
            <h3 className="fs-h3">간편 로그인</h3>
            <div className="d-flex gap-3">
              <Naver /><Kakao /><Google />  
            </div>
            <img src="/assets/cupon_banner.jpg" alt="쿠폰배너" className="img-fluid" />
          </div>

        </div>
      </div>
    </div>
  );
}
