

# 🌊 학업 성취도 평가 모의 시험 서비스, TIVE
![TIVE썸네일](https://github.com/user-attachments/assets/a918f2e5-faa5-4d17-a9b3-792e4918667e)

### 천재교육 풀스택 5기 FINAL 프로젝트
 - 프로젝트 주제: 학업 성취도 평가 모의 시험 서비스 개발
 - 프로젝트 기간: 2024-07-08~2024-07-31

<br/>

## 🐚 프로젝트 소개

<br/>

### <div style="text-align:center"><span style="background-color:#C0FFFF"> 학업 성취도 평가 대비는 TIVE 에서! </span></div>

![브랜드 컨셉1](https://github.com/user-attachments/assets/dbb6e833-74ab-4d78-9840-7540caf4ad28)
![브랜드 컨셉2 수정](https://github.com/user-attachments/assets/7f2fc92d-a303-4b5d-a545-77e75ba1c741)

<br/>

## 🐚 프로젝트 목표
- 학업 성취도 평가 모의 시험 서비스를 제공하여, 학습 성취도를 높이는 데 기여하고자 함.

<br/>

## 🐚 팀구성

| 이름 | 역할 | GitHub |
|------|------|--------|
| [김혜연](https://github.com/loveyrooney) | 팀장 | 시험지 정답 제출 및 채점 기능, Github 관리 |
| [김보경](https://github.com/ppodaejang) | 팀원 | 기본 리포트 (통계), 상세 리포트 (차트), 정답 보기 기능 |
| [송미라](https://github.com/mummyyyyy) | 팀원 | 로그인/회원 가입, 시험 시간/응시 페이지, CBT 안내 페이지 |
| [최현훈](https://github.com/tongueEye) | 팀원 | 메인 페이지/공지사항, 미디어 재생 테스트 페이지, 주의 사항 페이지, PDF 다운 및 지도 기능 |
| [황현준](https://github.com/skd9712)| 팀원 | 시험지 viewing 기능, 지역 별 순위 통계 |

<br/>

## 🐚 기술 스택

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=Spring%20Boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![Thymeleaf](https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=Thymeleaf&logoColor=white)
![QueryDSL](https://img.shields.io/badge/QueryDSL-339933?style=for-the-badge&logo=QueryDSL&logoColor=white)
![JPA](https://img.shields.io/badge/JPA-007396?style=for-the-badge&logo=JPA&logoColor=white)

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)


![AWS EC2](https://img.shields.io/badge/AWS%20EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)
![AWS RDS](https://img.shields.io/badge/AWS%20RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white)
![Public Data](https://img.shields.io/badge/Public%20Data-0080FF?style=for-the-badge&logo=gov&logoColor=white)

![AJAX](https://img.shields.io/badge/AJAX-5A29E4?style=for-the-badge&logo=ajax&logoColor=white)
![API](https://img.shields.io/badge/API-0052CC?style=for-the-badge&logo=api&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

<br/>

## 🐚 프로젝트 정책 사항
- 학습자 친화적인 디자인과 사용자 경험을 위해  UI / UX  개선
- 회원 가입 시, 학교급, 소속 교육청을 선택 (마케팅 동의 여부는 추후에 상세리포트 페이지에서도 가능)
- 시험 시간은 WorldTimeZone API에서 받아온 현재 시간 기준으로 타이머가 작동
- 실제 시험 환경과 유사한 상황을 제공하기 위해 이어하기 기능은 채택하지 않고, 중간에 시험지 이탈한 경우, 다시 처음부터 응시
- 시험 이력은 마지막에 한번에 제출하며 중간 저장 되지 않음
- 정오표에는 나의 정답 / 실제 정답을 표기하여, pdf 다운로드 시 모든 리포트 내용이 유효한 정보가 되도록 구성
- 현재 나의 위치 기반으로 주변 학교들을 보여주는 지도 기능과, 내가 소속된 교육청의 전국 랭킹 차트 기능을 제공하여 학습자의 학습 의지 강화 도모

<br/>

## 🐚 프로젝트 주요 이슈 사항

### 회원 가입 관련 이슈

- 회원 가입 시 , 이메일 중복 체크 기능을 도입했는데 **중복 체크 후 가입 시도 시, 이메일 부분의 값만 받아올 수 없는 현상** 발생

       - 중복 체크 후에 다시 수정하지 못하도록 해당 input 을 disable 처리한 부분이 문제였고,  해당 input 을 
         readonly 처리로 수정하여 해결

### **시험지 관련 이슈**

<타이머 관련>  

- **새로 고침 해도 시간이 저장되지만,** **재응시 시에도 기존 남은 시간이 저장되는 현상** **발생**

       - 수정된 방식은 새로 고침 해도 시간이 초기화되며, 재응시 시에도 시간이 초기화
         이어하기 기능을 채택하지 않았기 때문에, 새로 고침 시 시간이 초기화되는 방식을 채택

<br/>

<시험지 정답 추출 관련>

- **DB에 등록되어 있는 각 문제들의 정답 표기 부분 요소에서** **일관된 정보를 추출하기 어렵고, type code 가 같아도 정답 추출의 방식이 달라야 하는 예외적 상황 빈번하게 존재**

       - 정답의 input 유형 별로 Event listener 를 동작하고, 같은 방식으로 정답을 추출할 수 있는
         유형들은 answerExtract 메서드를 호출하도록 구현하여 일관된 정답 추출 체계 형성  

<br/>

<시험지 채점 관련>

- **학습자가 푼 문제만 정답을 제출하도록 구현했는데, 풀지 않은 문제를 오답 처리 하는 부분에서 반복문의 index 처리에 어려움을 겪음**
- 최초에는 qid 의 차이를 통해 몇 개의 문제를 건너뛰었는지 탐지하도록 했으나, 한 시험지 안에 qid가 연속적이지 않은 시험지가 존재하는 문제 발생

       - 정답 추출 시, 문제의 order 도 함께 받도록 수정하여, order 의 차이를 계산해 0보다 큰 경우 
         그 차이 만큼의 문제를 건너뛴 것으로 탐지하도록 구현 

<br/>

### **지도 관련 이슈**

<보안 관련>

- **자바스크립트 코드에 직접 인증키를 작성하는 방식으로 인해 인증키 노출에 대한 우려**

       - 인증키를 yml 파일에 작성하고, controller에서 value로 인증키를 받는 방식으로 수정

<br/>

<데이터 로딩 시간 관련>

- **전국의 모든 초중고 위치 데이터를 한번에 불러오는 방식을 채택해, 데이터 로드 시간 발생**
      
       - 데이터 로드 시간 동안 로딩 화면을 추가해 현재 상황을 알려주는 방식으로 수정

<br/>

### **리포트 관련 이슈**



<정오표 정답 표기 관련>

- **정답의 데이터 형식이 다양하고 저장된 문자열, 숫자 뿐만 아니라 이미지, 문제에 있는 보기 내용을 표기해야 할 상황 발생**
    
       - 각 유형 별로 정답이 저장되어 있는 방식을 탐색 후 예외적인 부분은 각 문제에 맞춰 정답을 출력
    
       - image 등의 태그가 있는지 탐색하고 이미지 경로를 수정하여 태그가 반영 되도록 구현
    
<br/>

<상세 리포트 PDF 다운로드 관련>

- **출력할 영역을 window.print()를 이용해 pdf 다운 받는 방식 구현하니 css가 깨져서 출력됨**
    
      - jspdf, html2canvas를 사용해 html 콘텐츠를 용지 크기에 맞춰 CSS가 유지되도록 구현 
    
- **html2canvas 사용 시 현재 뷰 포트만 출력 되는 문제 발생**
    
      - 출력 버튼이 출력 영역 보다 아래에 위치하면 현재 뷰 포트만 출력 되는 현상 발견
    
      - 출력 영역에 기존에 구현한 스크롤 뷰 해제 후, 출력 버튼을 위로 올려서 해결

<br/>

## 🐚 구현 기능   

### <span style="background-color:#C0FFFF"> 1. 상단메뉴 </span>
   
![상단메뉴바](https://github.com/user-attachments/assets/086bab3f-129b-4fcb-9cb4-8a9bf776dd6a)

<br/>

### <span style="background-color:#C0FFFF"> 2. 메인페이지/공지사항</span>


![메인화면 공지사항](https://github.com/user-attachments/assets/03aff024-4e72-4ee3-acfc-4d501a803f9f)

<br/>

### <span style="background-color:#C0FFFF"> 3. 로그인/회원가입</span>
   
![가입 로그인](https://github.com/user-attachments/assets/e0bc3a47-43ed-4d45-8899-53ed85c3524a)

<br/>

### <span style="background-color:#C0FFFF"> 4. 시험지 viewing(문제 풀이)</span>

![시험지 뷰잉1](https://github.com/user-attachments/assets/bbf3e2be-6738-45f6-80bc-bfcd49447435)

<br/>

### <span style="background-color:#C0FFFF">5. 시험지 viewing(그리기, 지우기, 슬라이더 이동)</span>

![시험지 뷰잉2](https://github.com/user-attachments/assets/c3a2ffac-24a2-45bf-8622-2f6005c06747)

<br/>

### <span style="background-color:#C0FFFF">6. 기본 리포트(통계)</span>
    
![기본리포트](https://github.com/user-attachments/assets/9ed9af03-9a49-49b8-8756-d606a116505a)
   
<br/>

### <span style="background-color:#C0FFFF">7. 상세 리포트(통계, 차트, PDF 다운)</span>
    
![상세리포트](https://github.com/user-attachments/assets/11a34cdc-fabb-4e21-a6fc-af4d167ac005)

<br/>

### <span style="background-color:#C0FFFF">8. 지역별 랭킹(지도, 순위)</span>

![지역별 랭킹](https://github.com/user-attachments/assets/65efa556-2491-40cc-a550-dec7840def97)

<br/>

### <span style="background-color:#C0FFFF">9. 에러 페이지</span>

![에러페이지 ](https://github.com/user-attachments/assets/d679ed39-3241-4726-9212-40ade916efef)

<br/>

## 🐚 ERD

![erd_2](https://github.com/user-attachments/assets/f6cb33a4-942b-4775-ae7a-f9d8f0abd407)




## 🐚 시연영상

[![Watch the video](https://img.youtube.com/vi/Fe7rhsrOqkM/0.jpg)](https://youtu.be/Fe7rhsrOqkM)
