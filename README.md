![README](https://github.com/user-attachments/assets/c14d2913-9b21-4692-9f7d-47b18392078b)  

# 00. 프로젝트 개요
청량리종합시장 온라인 쇼핑몰 "청량마켓몰" 리디자인 및 사용성 개선

본 프로젝트는 청량마켓몰 플랫폼 프로젝트의 연장선으로서,  
React를 이용하여 현대적이고 직관적인 UI구축을 통해 UX 개선을 목표로 하고 있습니다.

플랫폼 솔루션 프로젝트 보러가기: https://github.com/zzohae/cheonglyang

프로젝트 기간: 2024.11.01 - 12.12

# 01. 프로젝트 목표
* UI/UX 개선  
* 상품 검색 및 필터링 기능 강화  
* 페이지 로딩 속도 최적화

# 02. 팀 소개
<div align='center'>
<table>
  <tbody>
    <tr>
      <td align="center">
        <strong>PM</strong><br />
        김성현
      </td>
      <td align="center">
        <strong>UXUI</strong><br />
        이혜은
      </td>
      <td align="center">
        <strong>Publisher</strong><br />
        조해연
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/79a6df98-e66c-4798-a97d-f6006be66435" width="200px" style="border-radius: 50%;" alt="김성현 프로필 사진" /><br />
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/292348ea-5f08-4f2a-b23a-ec2438de7bf6" width="200px" style="border-radius: 50%;" alt="이혜은 프로필 사진" /><br />
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/9c2c5bf6-1fe9-48fb-9e71-74be39027868" width="200px" style="border-radius: 50%;" alt="조해연 프로필 사진" /><br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href='https://github.com/KSH7131'>GitHub: KSH7131</a>
      </td>
      <td align="center">
        <a href='https://github.com/EHEN123'>GitHub: LeeHE</a>
      </td>
      <td align="center">
        <a href='https://github.com/zzohae'>GitHub: zzohae</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src='https://github.com/user-attachments/assets/8591e686-1719-478b-b20b-af7419b7b456' />
      </td>
      <td align="center">
        <img src='https://github.com/user-attachments/assets/f6cc11d0-a046-41ed-8051-0f52935ca7c4' />
      </td>
      <td align="center">
        <img src='https://github.com/user-attachments/assets/3036e72e-6117-48d8-bae0-b685f97d5f74' />
      </td>
    </tr>
  </tbody>
</table>
</div>


# 03. 개발 환경
node v20.17.0  
Bootstrap v5.3.3

# 04. 설계
디자인을 토대로 컴포넌트 관계도와 정보구조도 Figjam에서 작성  
1차
<img width="100%" alt="컴포넌트관계도_2차" src="https://github.com/user-attachments/assets/63a7449c-5dd0-4759-9f0e-fa96f87919d2">

# 05. 개발 워크플로우
* Branch 전략  
  업무 분담과 효율적인 개발을 위해 개별 브랜치에서 기능 개발 등 작업

# 06. 브랜드소개

- [로고](#로고)
- [아이콘](#아이콘)
- [폰트](#폰트)
- [컬러](#컬러)
- [프레젠테이션](#프레젠테이션)

## 로고

| Version | Preview |
|---|---|
| Default | ![Default](./src/asset/svg/common/BI_desktop_Default.svg) |  
| Inverse | ![Inverse](./src/asset/svg/common/BI_desktop_Inverse.svg) |

## 아이콘

| Version | Preview |
|---|---|
| Default | ![Default](./src/asset/svg/common/BI_mobile_Default.svg) |  
| Inverse | ![Inverse](./src/asset/svg/common/BI_mobile_Inverse.svg) |
| Milkit_D | ![BI(mealkit)_mobile_Default](https://github.com/user-attachments/assets/15d4e750-4aaa-41bc-b3d0-7befb8a8ba5d) |
| Milkit_I | ![BI(mealkit)_mobile_Inverse](https://github.com/user-attachments/assets/7e719112-159c-4202-9fc9-dfa38edb2308) |



## 폰트

| Font  |  Link |
|---|---|
| Pretendard   |  [github](https://github.com/orioncactus/pretendard) |


### 컬러
| 메인 컬러     | 색상코드 |
|------------|-----------|
| 청량 BLUE | ![#214AEE](https://singlecolorimage.com/get/214AEE/15x15)  `214AEE` |
| 청량 YELLOW | ![#FFEA7D](https://www.singlecolorimage.com/get/FFEA7D/15x15) `#FFEA7D` |
| 청량 WHITE     | ![#FFFFFF](https://www.singlecolorimage.com/get/FFFFFF/15x15) `#FFFFFF` |
| 청량 GRAY      | ![#D2D2D2](https://www.singlecolorimage.com/get/D2D2D2/15x15) `#D2D2D2` |

| 텍스트 컬러     | 색상코드 |
|------------|-----------|
| DARKER      	 | ![#333333](https://singlecolorimage.com/get/333333/15x15)  `333333` |
| DARK      	 | ![#666666](https://www.singlecolorimage.com/get/666666/15x15) `#666666` |
| MEDIUM     | ![#888888](https://www.singlecolorimage.com/get/888888/15x15) `#888888` |
| LIGHT      | ![#AAAAAA](https://www.singlecolorimage.com/get/AAAAAA/15x15) `#AAAAAA` |
| RED      | ![#FF4A11](https://www.singlecolorimage.com/get/FF4A11/15x15) `#FF4A11` |



## 프레젠테이션

[**프레젠테이션 바로가기**](https://www.figma.com/design/hODaA3aqcUvTjZta1lzVWf/%5BKDT%5D-%ED%94%8C%EB%9E%AB%ED%8F%BC%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=1470-4790&t=gQojZyYJhK3K5mFi-4)
