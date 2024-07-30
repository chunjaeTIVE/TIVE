// html에서 값 전달 받기
let ut_id, e_id, achieveLevel;
let init = function (inits) {
    ut_id = inits['utid'];
    e_id = inits['eid'];
    achieveLevel = inits['achieveLevel'];
}


/**3열짜리 테이블 tbody에 결과 값 저장하기*/
let insertTable3 = function (tbodyID, key, valueAll, valueMe) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

    td.textContent = `${key}`
    td1.textContent = `${valueAll}`;
    td2.textContent = `${valueMe}`;

    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tbodyID.appendChild(tr);
}


window.onload = function () {

    // console.log("utid....", ut_id);
    // console.log("eid....", e_id);

    /**상단 회차, 과목 선택박스*/
    if (document.getElementById('submitForm')) { // 과목 선택박스가 있으면 (마케팅 동의여부가 1인 경우에만 수행)
        document.getElementById('submitForm').onclick = function () {
            // 선택된 값을 가져오기
            let round = document.getElementById('round').value;
            let subject = document.getElementById('subject').value;

            // GET 방식으로 값 보내기
            let url = `/report_detail?round=${round}&subject=${encodeURIComponent(subject)}`;
            location.href = url;
        }


        /**내 성취 수준 위치 이동*/
        let achievePointer = document.querySelector('.user_level');

        if (achieveLevel == 4) {
            achievePointer.style.left = "83%";
        } else if (achieveLevel == 3) {
            achievePointer.style.left = "58%";
        } else if (achieveLevel == 2) {
            achievePointer.style.left = "33%";
        } else {
            achievePointer.style.left = "8%";
        }


        /**문항 난이도별 성취율 Fetch 요청*/
        fetch('/levelrate/' + ut_id + "/" + e_id,
            {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error('난이도별 성취도에서 에러');
            }
            return response.json();
        })
            .then(data => {

                let level = ["최상", "상", "중", "하", "최하"];

                // 첫 번째 요소는 문항 난이도별 전체 성취율 map
                let levelRateAll = data[0];


                // 두 번째 요소는 문항 난이도별 내 성취율 map
                let levelRateMe = data[1];


                // 받아온 데이터를 처리하고 테이블에 출력
                let tbody = document.getElementById('levelrate');

                // 차트 data 용 배열 만들기
                let levelAllArr = [];
                let levelMyArr = [];

                // 데이터를 HTML로 변환하여 tbody에 추가
                for (let i = 0; i < level.length; i++) {

                    let levelvalue = level[i];
                    let levelvalueAll = 0;
                    let levelvalueMe = 0;


                    if (levelRateAll[levelvalue]) { // 전체성취율 값이 있으면
                        levelvalueAll = levelRateAll[levelvalue];  //전체성취율 값 입력
                        levelvalueMe = levelRateMe[levelvalue]; //내 성취율

                    } else { // 전체성취율 값이 없으면 바 표시
                        levelvalueAll = "-";
                        levelvalueMe = "-";

                    }


                    insertTable3(tbody, levelvalue, levelvalueAll, levelvalueMe);

                    levelAllArr.push(levelvalueAll);
                    levelMyArr.push(levelvalueMe);
                }

                // 차트 그리기
                const levelChart = document.getElementById('levelChart').getContext('2d');

                new Chart(levelChart, {
                    data: {
                        datasets: [{
                            type: 'line',
                            label: '전체평균',
                            data: levelAllArr,
                            borderColor: '#FF6384',
                            backgroundColor: '#FFB1C1',
                        }, {
                            type: 'bar',
                            label: '내 성취율',
                            data: levelMyArr,
                            borderColor: '#36A2EB',
                            backgroundColor: '#9BD0F5',
                            barThickness: 80
                        }],
                        labels: level
                    },
                    options: {
                        layout: {
                            padding: 20
                        },
                        scales: {
                            y: {
                                suggestedMax: 100,
                            }
                        }
                    }
                });


            })
            .catch(error => {
                console.error('Error fetching level rate data:', error);
            });


        /**내용 영역별 성취율 Fetch 요청*/
        fetch('/contentrate/' + ut_id + "/" + e_id,
            {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error('내용 영역별 성취율에서 에러');
            }
            return response.json();
        })
            .then(data => {


                // 첫 번째 요소는 내용 영역별 전체 성취율 map
                let contentRateAll = data[0];
                // 두 번째 요소는  내용 영역별 내 성취율 map
                let contentRateMe = data[1];


                // 내용 영역 어떤 것이 있는지 key 가져오기
                let keys = Object.keys(contentRateAll);


                // 받아온 데이터를 처리하고 테이블에 출력
                let tbody = document.getElementById('contentrate');

                // 차트 data 용 배열 만들기
                let contentAllArr = [];
                let contentMyArr = [];


                // 데이터를 HTML로 변환하여 tbody에 추가 / 배열 만들기
                for (let i = 0; i < keys.length; i++) {

                    let contentvalue = keys[i];
                    let contentvalueAll = contentRateAll[contentvalue];  //전체성취율
                    let contentvalueMe = contentRateMe[contentvalue]; // 내 성취율

                    // 테이블 만들기
                    insertTable3(tbody, contentvalue, contentvalueAll, contentvalueMe);

                    // 차트 데이터에 추가
                    contentAllArr.push(contentvalueAll);
                    contentMyArr.push(contentvalueMe);

                }


                // 차트 그리기

                const contentChart = document.getElementById('contentChart').getContext('2d');


                new Chart(contentChart, {
                    data: {
                        datasets: [{
                            type: 'line',
                            label: '전체성취율',
                            data: contentAllArr,
                            borderColor: '#FF6384',
                            backgroundColor: '#FFB1C1',
                        }, {
                            type: 'bar',
                            label: '내 성취율',
                            data: contentMyArr,
                            borderColor: '#36A2EB',
                            backgroundColor: '#9BD0F5',
                            barThickness: 80
                        }],
                        labels: keys
                    },
                    options: {
                        layout: {
                            padding: 20
                        },
                        scales: {
                            y: {
                                suggestedMax: 100,
                            }
                        }
                    }
                });


            })
            .catch(error => {
                console.error('Error fetching content rate data:', error);
            });


        /**응답 유형별 정답률 Fetch 요청*/
        fetch('/resprate/' + ut_id + "/" + e_id,
            {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error('응답 유형별 정답률에서 에러');
            }
            return response.json();
        })
            .then(data => {


                // 첫 번째 요소는 응답 유형별 전체 성취율 map
                let respRateAll = data[0];
                // 두 번째 요소는  응답 유형별 내 성취율 map
                let respRateMe = data[1];


                // 내용 영역 어떤 것이 있는지 key 가져오기
                let keys = Object.keys(respRateAll);


                // 받아온 데이터를 처리하고 테이블에 출력
                let tbody = document.getElementById('resprate');


                // 차트 data 용 배열 만들기
                let respAllArr = [];
                let respMyArr = [];

                // 데이터를 HTML로 변환하여 tbody에 추가
                for (let i = 0; i < keys.length; i++) {

                    let respvalue = keys[i];
                    let respvalueAll = respRateAll[respvalue];  //전체성취율
                    let respvalueMe = respRateMe[respvalue]; // 내 성취율
                    insertTable3(tbody, respvalue, respvalueAll, respvalueMe);

                    respAllArr.push(respvalueAll);
                    respMyArr.push(respvalueMe);

                }

                // 차트 그리기

                const respChart = document.getElementById('respChart').getContext('2d');


                new Chart(respChart, {
                    data: {
                        datasets: [{
                            type: 'line',
                            label: '전체평균',
                            data: respAllArr,
                            borderColor: '#FF6384',
                            backgroundColor: '#FFB1C1',
                        }, {
                            type: 'bar',
                            label: '내 성취율',
                            data: respMyArr,
                            borderColor: '#36A2EB',
                            backgroundColor: '#9BD0F5',
                            barThickness: 50
                        }],
                        labels: keys
                    },
                    options: {
                        layout: {
                            padding: 20
                        },
                        scales: {
                            y: {
                                suggestedMax: 100,
                            }
                        }
                    }
                });


            })
            .catch(error => {
                console.error('Error fetching resp rate data:', error);
            });


        /**정오표 - 서답형 미포함 fetch요청*/
        fetch('/reportdetaillist/' + ut_id + "/" + e_id,
            {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error('정오표에서 에러!!!!');
            }
            return response.json();
        })
            .then(data => {

                // 받아온 데이터를 처리하고 테이블에 출력
                let tbody = document.getElementById('detailList');

                detailPrint(data, tbody);

            })
            .catch(error => {
                console.error('Error fetching report detail list data:', error);
            });


        /**정오표 - 서답형 부분 Fetch 요청*/
        fetch('/subjectivelist/' + ut_id + "/" + e_id,
            {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error('정오표 - 서답형에서 에러!!!!');
            }
            return response.json();
        })
            .then(data => {

                // 받아온 데이터를 처리하고 테이블에 출력
                let tbody = document.getElementById('subjectivelist');

                if (data != null && data.length != 0) {

                    //서답형 정오표 hidden 해제
                    document.querySelector('.report_sub').style.display = 'block';

                    detailPrint(data, tbody);

                }
            })
            .catch(error => {
                console.error('Error fetching subjective list data:', error);
            });
    }

}

/**정오표 데이터 받아서 테이블에 입력*/
let detailPrint = function (data, tbody) {


    for (let i = 0; i < data.length; i++) {
        let dto = data[i];

        let orderName = dto["orderName"];
        let contentArea = dto["categoryName"];
        let correct = dto["correct"];
        let avgAll = dto["avgAll"];
        let qid = dto["qid"];
        let qType = dto["qtype"];


        // 정답 가져오기
        let answerlist = dto["answer"];
        let userAnswerlist = dto["userAns"];

        let textAnswer, textUser; // 출력할 텍스트

        // 문자열을 JSON 객체로 변환
        let regex = /<[^>]*>/; // 태그 패턴을 정의한 정규표현식 -> 태그 있는지 확인용

        try {
            let answerJS = JSON.parse(answerlist);


            if (qType == 'IT11') {  // IT11 -> 정답 배열 순서가 문제 순서와 다름
                textAnswer = `${answerJS["answer"][2]}, ${answerJS["answer"][0]}, ${answerJS["answer"][1]}`;

            } else if (qType == 'IT14' || qType == 'IT15') {  // IT14 -> 숫자를 알파벳으로 바꾸고 textarea 부분 출력
                let ex1 = ["", "A", "B", "C", "D", "E"];
                let ex2 = ["", "태현", "민주", "상희"];
                let ex3 = ["", "가", "나", "다", "라"];
                if (qid == 589) {
                    textAnswer = `${ex2[answerJS["answer"]]} / ${answerJS["textarea"]}`;
                } else if (qid == 588) {
                    textAnswer = `${ex3[answerJS["answer"]]} / ${answerJS["shortText"]} / ${answerJS["textarea"]}`;
                } else {
                    textAnswer = `${ex1[answerJS["answer"]]} / ${answerJS["textarea"]}`;
                }

            } else if (qType == 'IT13' || qType == 'IT18') {
                if (qid == 299) { // 불규칙적인 부분 입력..
                    textAnswer = "감소한다, 변화없다";

                } else if (qid == 747) { // 불규칙적인 부분 입력..
                    textAnswer = '" ", "○"';

                } else {
                    textAnswer = `${answerJS["answer"]} / ${answerJS["textarea"]}`;
                }

            } else if (qType == 'IT12') { //IT12 첫번째 값 하나만 출력
                textAnswer = `${answerJS["answer"][0]}`;

            } else if (qType == 'IT17') { //IT12 첫번째 값 하나만 출력
                textAnswer = `${answerJS["answer"]} / ${answerJS["social_rule"]}`;

            } else {

                // 이미지 태그 확인용
                let imgRegex = /<img[^>]*>/i;

                // answer 값은 하나인데 그 안에 배열이 들어있을 때
                if (answerJS["answer"].length == 1 && Array.isArray(answerJS["answer"])) {


                    if (regex.test(answerJS["answer"][0])) { //answer안에 태그가 있으면


                        if (imgRegex.test(answerJS["answer"][0])) { // 이미지 태그인지 확인


                            //// src 속성 값 추출
                            let srcRegex = /<img[^>]*src=["']([^"']+)["']/i;
                            let match = answerJS["answer"][0].match(srcRegex);

                            if (match) { // src 속성이 찾아가기

                                let srcValue = match[1].split('..'); // src 속성 값 추출하고 앞에 ../부분 자르기
                                let srcRoot = srcValue[srcValue.length - 1];

                                // 절대 경로로 변환
                                let absoluteSrc = `https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com${srcRoot}`;


                                // 새로운 img 태그 생성
                                let img2 = `<img src="${absoluteSrc}" class="this">`;

                                textAnswer = [];
                                textAnswer.push(img2);


                            } else {
                                textAnswer = answerJS["answer"][0]
                            }


                        } else { // 이미지 태그가 아니면
                            //태그 지우고 그 안의 text만 전달
                            textAnswer = answerJS["answer"][0].replace(/<[^>]*>/g, '');
                        }


                    } else { //answer안에 태그 패턴이 없을 때
                        textAnswer = answerJS["answer"];

                    }

                } else { // answer 단답이거나, 답이 여러개 있거나, 배열이 여러개 들어있을 때


                    if (regex.test(answerJS["answer"][0])) { //answer안에 태그가 있으면


                        if (imgRegex.test(answerJS["answer"][0])) { // 이미지 태그인지 확인


                            for (let i = 0; i < answerJS["answer"].length; i++) {
                                //// src 속성 값 추출
                                let srcRegex = /<img[^>]*src=["']([^"']+)["']/i;
                                let match = answerJS["answer"][i].match(srcRegex);

                                if (match) { // src 속성이 찾아가기
                                    let srcValue = match[1].split('..'); // src 속성 값 추출하고 앞에 ../부분 자르기
                                    let srcRoot = srcValue[srcValue.length - 1];

                                    // 절대 경로로 변환
                                    let absoluteSrc = `https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com${srcRoot}`;


                                    // 새로운 img 태그 생성
                                    let img3 = `<img src="${absoluteSrc}" class="this">`;

                                    answerJS["answer"][i] = img3;

                                }
                            }
                        }
                    }
                    textAnswer = answerJS["answer"];

                }

            }
        } catch (error) {
            // JSON 파싱 중 오류가 발생한 경우
            console.error('JSON 파싱 오류:', error.message);
        }

        // 본인 응답!!
        let userAnswer = userAnswerlist;
        textUser = userAnswer.split(',');


        insertTable7(tbody, orderName, contentArea, textAnswer, textUser, correct, avgAll, qid);

    }


}


/**정오표 tbody에 결과 값 저장하기*/
let insertTable7 = function (tbodyID, orderName, contentArea, answer, userAns, correct, avgAll, qid) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');

    let tagi = document.createElement('i');
    let q_link = document.createElement('button');

    td.textContent = `${orderName}`
    td1.textContent = `${contentArea}`;
    // td2.textContent = `${answer}`;
    // td3.textContent = `${userAns}`
    td5.textContent = `${avgAll}%`;

    q_link.textContent = '상세 보기';

    // i 태그 생성 - 정답 여부 아이콘으로 표시
    if (correct == 1) {
        tagi.setAttribute('class', 'fa-regular fa-circle-check');
    } else {
        tagi.setAttribute('class', 'fa-regular fa-circle-xmark');
    }
    // td 요소에 i 태그 추가 - 정답/오답 표시
    td4.appendChild(tagi);


    // 정답
    if (Array.isArray(answer)) {  // answer가 배열이면

        let i;
        for (i = 0; i < answer.length - 1; i++) {

            if (answer != '') {
                let spanTag = document.createElement('span');
                spanTag.innerHTML = `${answer[i]}, `;
                td2.appendChild(spanTag);
            }
        }
        if (answer[i] != '') { // 배열의 맨 마지막은 쉼표 없음
            let spanTag = document.createElement('span');
            spanTag.innerHTML = answer[i];
            td2.appendChild(spanTag);
        }

    } else { // userAns가 배열이 아니면

        td2.textContent = answer;

    }


    //본인 응답
    if (Array.isArray(userAns)) {  // userAns가 배열이면

        let i;
        for (i = 0; i < userAns.length - 1; i++) {

            if (userAns != '') {
                let spanTag = document.createElement('span');
                spanTag.innerHTML = `${userAns[i]} `;
                td3.appendChild(spanTag);
            }
        }
        if (userAns[i] != '') { // 배열의 맨 마지막은 쉼표 없음
            let spanTag = document.createElement('span');
            spanTag.innerHTML = userAns[i];
            td3.appendChild(spanTag);
        }
    } else { // userAns가 배열이 아니면

        // 문자열의 마지막 글자가 쉼표인지 확인
        if (userAns.endsWith(',')) {
            // 쉼표를 제외한 부분만 잘라서 새로운 변수에 저장
            let userAns2 = userAns.slice(0, -1);
            td3.textContent = userAns2;

        } else {
            td3.textContent = userAns;
        }

    }


    // td 요소에 button 속성 추가 - 상세 보기
    q_link.setAttribute('onclick', 'openQuestion(' + qid + ')');
    q_link.setAttribute('class', 'btn_question');
    // td 요소에 a 태그 추가
    td6.appendChild(q_link);

    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tbodyID.appendChild(tr);
}

function openQuestion(qid) {
    // 새 창을 열고 문제 번호로 이동
    window.open('/report_question/' + qid, '_blank', 'width=1000,height=900');
}
