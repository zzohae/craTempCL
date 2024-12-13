import React, { useState } from 'react';
import { supabase } from './api/dbconnect';
import Movetool from './ui/Mtitle'
import { CheckboxCustom, RadioCustom, SelectCustom } from "./ui/commonui";
import { InputText } from "./ui/commonui";
import { Btn } from "./ui/commonui";

export default function Signup () {
  // useState를 사용하는 이유: 유효성 검사, 초기화
  const [userType, setUserType] = useState('general');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneLast, setPhoneLast] = useState('');
  const [email, setEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  // 생년월일 'YYYY-MM-DD'
  const getBirthdate = () => {
    if (birthYear && birthMonth && birthDay) {
      return `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
    }
    return '';
  };

  // 전화번호 '01X-XXXX-XXXX'
  const getPhoneNumber = () => {
    if (phonePrefix && phoneMiddle && phoneLast) {
      return `${phonePrefix}-${phoneMiddle}-${phoneLast}`;
    }
    return '';
  };

  // 이메일
  const getEmail = () => {
    if (email && emailDomain) {
      return `${email}@${emailDomain}`;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 최소 길이 체크
    if (password.length < 6) {
      alert("비밀번호는 최소 6자로 이루어져야 합니다.");
      return;
    }

    const birthdate = getBirthdate();
    const phoneNumber = getPhoneNumber();
    const finalEmail = getEmail();

    const { user, error: signUpError } = await supabase.auth.signUp({
      email: finalEmail,
      password: password
    });

    if (signUpError) {
      alert('회원가입에 실패했습니다. 고객센터에 문의 바랍니다.');
      return;
    }

    const { data, error } = await supabase
      .from('user')
      .insert([{
        user_type: userType,
        username: username,
        password: password,
        name: name,
        gender: gender,
        birthdate: birthdate,
        phone_number: phoneNumber,
        email: finalEmail,
        zipcode: zipcode,
        address: address,
        address_detail: addressDetail,
      }]);

    if (error) {
      alert('회원가입에 실패했습니다. 고객센터에 문의 바랍니다.');
    } else {
      alert('회원가입이 완료되었습니다.');
      // 초기화
      setUsername('');
      setPassword('');
      setName('');
      setGender('male');
      setBirthYear('');
      setBirthMonth('');
      setBirthDay('');
      setPhonePrefix('');
      setPhoneMiddle('');
      setPhoneLast('');
      setEmail('');
      setEmailDomain('');
      setZipcode('');
      setAddress('');
      setAddressDetail('');
    }
  };

  

  return (
    <div className="container mycontainer d-flex flex-column align-items-start justify-content-center signupform">
      <div className='row' style={{margin:'0 auto'}}>
        <div className='d-flex align-items-end gap-3' style={{padding:'0 0 1rem 0', borderBottom:'1px solid #214aee'}}>
      <Movetool nomargin='true' textColor='#214aee' h2size='34px' >회원가입</Movetool> <p className='fs-h6' style={{color:'#aaa', fontWeight:'300'}}><span className='fs-point'>*</span>필수입력사항</p>
        </div>

      <form onSubmit={handleSubmit} className='d-flex flex-column mt-4 ps-0 pe-0'>

      <div className="idpw d-flex flex-column gap-4">
        <div className='formRow'>
          <label className='fs-h4 titleLabel'>구분<span className='fs-point'>*</span></label>
          <div className='InputArea d-flex align-items-center'>
            <div className='d-flex gap-4'>
              <RadioCustom checked={userType === 'general'}>
                <input
                  name="userType"
                  type="radio"
                  value="general"
                  checked={userType === 'general'}
                  onChange={(e) => setUserType(e.target.value)}/>
                일반회원
              </RadioCustom>
              <RadioCustom checked={userType === 'member'}>
                <input
                  name="userType"
                  type="radio"
                  value="member"
                  checked={userType === 'member'}
                  onChange={(e) => setUserType(e.target.value)}/>
                조합원
              </RadioCustom>
            </div>
          </div>
        </div>

        <div className='formRow'>
          <label className='fs-h4 titleLabel'>아이디<span className='fs-point'>*</span></label>
          <InputText
            className="InputArea"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해주세요."
            hasError={false}
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className='formRow'>
          <label className='fs-h4 titleLabel'>비밀번호<span className='fs-point'>*</span></label>
          <InputText
            className='InputArea d-flex align-items-center'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </div>
        <div className='formRow'>
          <label  className='fs-h4 titleLabel'>비밀번호<br className='d-block d-md-none'/>확인<span className='fs-point'>*</span></label>
            <InputText
              className='InputArea d-flex align-items-center'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요."
              required
            />
        </div>
      </div>

        <div className="userInfo d-flex flex-column gap-4">
          <div className='fs-h5 pb-2 mt-5 mb-2 border-bottom'>사용자정보</div>

          {/* 이름 */}
          <div className='formRow'>
            <label className='fs-h4 titleLabel'>이름<span className='fs-point'>*</span></label>
            <InputText
              className='InputArea d-flex align-items-center'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요."
              required
            />
          </div>

          {/* 성별 */}
          <div className='formRow'>
            <label className='fs-h4 titleLabel'>성별</label>
              <div className='InputArea gap-4'>

                <label className='fs-h5'>
                  <RadioCustom checked={gender === 'male'}>
                    <input
                    name="gender"
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  </RadioCustom>
                  남성
                </label>

                <label className='fs-h5'>
                  <RadioCustom checked={gender === 'female'}>
                    <input
                    name="gender"
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  </RadioCustom>
                  여성
                </label>

                <label className='fs-h5'>
                  <RadioCustom checked={gender === 'other'}>
                    <input
                    name="gender"
                    type="radio"
                    value="other"
                    checked={gender === 'other'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  </RadioCustom>
                  기타
                </label>

              </div>
            </div>

          {/* 생년월일 */}
          <div className='formRow'>
            <label className='fs-h4 titleLabel'>생년월일</label>
            <div className='InputArea d-flex align-items-center'>
            <SelectCustom
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            >
              <option value="">년</option>
              {[...Array(2025 - 1900)].reverse().map((_, idx) => (
                <option key={idx} value={2024 - idx}>
                  {2024 - idx}
                </option>
              ))}
            </SelectCustom>
            <SelectCustom
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              required
            >
              <option value="">월</option>
              {[...Array(12)].map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </SelectCustom>
            <SelectCustom
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              required
            >
              <option value="">일</option>
              {[...Array(31)].map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </SelectCustom>
            </div>
          </div>

          {/* 전화번호 */}
          <div className='formRow'>
            <label className='fs-h4 titleLabel'>전화번호<span className='fs-point'>*</span></label>
            <div className='InputArea d-flex align-items-center'>
              <SelectCustom
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                required
              >
                <option value="">선택</option>
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                {/* 필요한 전화번호 추가 */}
              </SelectCustom>
              <InputText
                type="text"
                pattern="[0-9]*"
                value={phoneMiddle}
                onChange={(e) => setPhoneMiddle(e.target.value)}
                maxLength="4"
                required
              />
              <InputText
                fullWidth={false}
                type="text"
                pattern="[0-9]*"
                value={phoneLast}
                onChange={(e) => setPhoneLast(e.target.value)}
                maxLength="4"
                required
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className='formRow'>
            <label className='fs-h4 titleLabel'>E-MAIL<span className='fs-point star'>*</span></label>
            <div className='InputArea d-flex align-items-center'>
              <InputText
                type="text"
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              @
              <SelectCustom
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                required
              >
                <option value="">도메인 선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                {/* 추가적인 도메인 옵션 */}
              </SelectCustom>
            </div>
          </div>
        </div>
      
      <div className="address  d-flex flex-column gap-4 pb-4 mb-4" style={{ borderBottom:'1px solid #214aee'}}>
              <div className='fs-h5 pb-2 mt-5 mb-2 border-bottom'>배송지입력</div>

              <div className='formRow'>
                <label className='fs-h4 titleLabel'>우편번호<span className='fs-point'>*</span></label>
                <div className='InputArea d-flex align-items-center'>
                  <InputText
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder='우편번호'
                    required
                  />
                  <Btn version='v5' borderRadius={false} >주소 검색</Btn>
                </div>
              </div>
              <div className='formRow'>
                <label className='fs-h4 titleLabel'>주소<span className='fs-point'>*</span></label>
                <InputText
                className='InputArea d-flex align-items-center'
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='주소'
                  required
                />
              </div>
              <div className='formRow'>
                <label className='fs-h4 titleLabel'>상세주소<span className='fs-point'>*</span></label>
                <InputText
                className='InputArea d-flex align-items-center'
                  type="text"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder='상세주소'
                />
              </div>
            </div>


            {/* 약관동의 */}
            <div className='formRow'>
              <label className='fs-h4 mb-auto titleLabel'>약관동의<span className='fs-point'>*</span></label>

            <div className="agree d-flex flex-column InputArea">
                <CheckboxCustom color='#666' className='mb-3'>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="agreeAll"
                    onclick="toggleAll(this)"/>
                  <label class="fs-h3 fw-bold" for="agreeAll">
                    전체 동의합니다.
                  </label>
                  </div>
                  </CheckboxCustom>

                <CheckboxCustom color='#666' className='mb-2'>
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="termsRequired"
                      required/>
                    <label class="form-check-label" for="termsRequired">
                      이용약관 동의<span>(필수)</span>
                    </label>
                    <a href="#" class="text-primary ms-2">약관보기</a>
                  </div>
                </CheckboxCustom>

                <CheckboxCustom color='#666' className='mb-2'>
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="privacyRequired"
                      required/>
                    <label class="form-check-label" for="privacyRequired">
                      개인정보 수집·이용 동의<span>(필수)</span>
                    </label>
                    <a href="#" class="text-primary ms-2">약관보기</a>
                  </div>
                </CheckboxCustom>

                <CheckboxCustom color='#666' className='mb-2'>
                  <div>
                    <input class="form-check-input" type="checkbox" id="smsOptional" />
                    <label class="form-check-label" for="smsOptional">
                      SMS 혜택/정보 수신 동의<span>(선택)</span>
                    </label>
                  </div>
                </CheckboxCustom>

                <CheckboxCustom color='#666' className='mb-2'>
                  <div>
                    <input class="form-check-input" type="checkbox" id="emailOptional" />
                    <label class="form-check-label" for="emailOptional">
                      E-MAIL 혜택/정보 수신 동의<span>(선택)</span>
                    </label>
                  </div>
                </CheckboxCustom>

                <CheckboxCustom color='#666' className='mb-2'>
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="ageRequired"
                      required/>
                    <label class="form-check-label" for="ageRequired">
                      본인은 만 14세 이상입니다<span>(필수)</span>
                    </label>
                  </div>
                </CheckboxCustom>
          </div>
      </div>

        {/* 가입하기 버튼 */}
        <div className='d-flex justify-content-center mt-4'>
          <Btn version="v5" type="submit" borderRadius={false}>가입하기</Btn>
        </div>
      </form>
      </div>
    </div>
  );
};
