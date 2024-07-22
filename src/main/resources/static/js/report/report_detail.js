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
    td2.textContent = `${answer}`;

    td3.textContent = `${userAns}`
    q_link.textContent = '상세 보기';

    // i 태그 생성 - 정답 여부 아이콘으로 표시
    if(correct == 1){
        tagi.setAttribute('class', 'fa-regular fa-circle-check');
    } else {
        tagi.setAttribute('class', 'fa-regular fa-circle-xmark');
    }
    // td 요소에 i 태그 추가 - 정답/오답 표시
    td4.appendChild(tagi);


    td5.textContent = `${avgAll}%`;


    // td 요소에 button 속성 추가 - 상세 보기
    q_link.setAttribute('onclick', 'openQuestion('+qid+')');
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
    window.open('/report_question/'+qid, '_blank', 'width=400,height=400');
}



window.onload = function () {

    // console.log("utid....", ut_id);
    // console.log("eid....", e_id);

    /**상단 회차, 과목 선택박스*/
    if (document.getElementById('submitForm')){ // 과목 선택박스가 있으면 (마케팅 동의여부가 1인 경우에만 수행)
        document.getElementById('submitForm').onclick = function() {
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


                for (let i = 0; i < data.length; i++) {
                    let report = data[i];

                    let orderName = report["orderName"];
                    let contentArea = report["categoryName"];
                    let correct = report["correct"];
                    let avgAll = report["avgAll"];
                    let qid = report["qid"];
                    let answer, userAns;

                    // 정답 가져오기
                    let answerlist = report["answer"];
                    let userAnswerlist = report["userAns"];

                    // console.log(answerlist);
                    // console.log(userAnswerlist);

                    // 문자열을 JSON 객체로 변환
                    let answerJS = JSON.parse(answerlist);
                    let userAnswerJS = JSON.parse(userAnswerlist);

                    // console.log(answerJS);
                    // console.log(typeof answerJS);
                    // console.log(answerJS["answer"].length);

                    if(answerJS["answer"].length == 1 && Array.isArray(answerJS["answer"])){
                        let textContent = answerJS["answer"][0].replace(/<[^>]*>/g, '');
                        answer = textContent;
                    }  else {
                        answer = answerJS["answer"];
                    }

                    if(userAnswerJS["answer"].length == 1 && Array.isArray(userAnswerJS["answer"])){
                        let textContent = userAnswerJS["answer"][0].replace(/<[^>]*>/g, '');
                        userAns = textContent;
                    }  else {
                        userAns = userAnswerJS["answer"];
                    }


                    insertTable7(tbody, orderName, contentArea, answer, userAns, correct, avgAll, qid);

                }


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

                if(data != null && data.length !=0) {

                    //서답형 정오표 hidden 해제
                    document.querySelector('.report_sub').style.display = 'block';


                    for (let i = 0; i < data.length; i++) {
                        let subject = data[i];

                        let orderName = subject["orderName"];
                        let contentArea = subject["categoryName"];
                        let correct = subject["correct"];
                        let avgAll = subject["avgAll"];
                        let qid = subject["qid"];
                        let answer, userAns;

                        // 정답 가져오기
                        let answerlist = subject["answer"];
                        let userAnswerlist = subject["userAns"];

                        // console.log(answerlist);
                        // console.log(userAnswerlist);

                        // 문자열을 JSON 객체로 변환
                        let answerJS = JSON.parse(answerlist);
                        let userAnswerJS = JSON.parse(userAnswerlist);

                        // console.log(answerJS);
                        // console.log(typeof answerJS);
                        // console.log(answerJS["answer"].length);

                        if (answerJS["answer"].length == 1 && Array.isArray(answerJS["answer"])) {
                            let textContent = answerJS["answer"][0].replace(/<[^>]*>/g, '');
                            answer = textContent;
                        } else {
                            answer = answerJS["answer"];
                        }

                        if (userAnswerJS["answer"].length == 1 && Array.isArray(userAnswerJS["answer"])) {
                            let textContent = userAnswerJS["answer"][0].replace(/<[^>]*>/g, '');
                            userAns = textContent;
                        } else {
                            userAns = userAnswerJS["answer"];
                        }


                        insertTable7(tbody, orderName, contentArea, answer, userAns, correct, avgAll, qid);

                    }
                }
            })
            .catch(error => {
                console.error('Error fetching subjective list data:', error);
            });
    }

}
