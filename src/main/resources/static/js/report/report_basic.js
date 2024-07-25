// html에서 값 전달 받기
let ut_id, e_id;
let init = function (inits) {
    ut_id = inits['utid'];
    e_id = inits['eid'];
}

window.onload = function () {

    /**상단 회차, 과목 선택박스*/
    document.getElementById('submitForm').onclick = function () {
        // 선택된 값을 가져오기
        let round = document.getElementById('round').value;
        let subject = document.getElementById('subject').value;

        // GET 방식으로 값 보내기
        let url = `/report_basic?round=${round}&subject=${encodeURIComponent(subject)}`;
        location.href = url;
    }


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
            let tbody = document.getElementById('basicList');

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
            let tbody = document.getElementById('basicSubjectivelist');

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

/**정오표 데이터 받아서 테이블에 입력*/
let detailPrint = function (data, tbody) {

    for (let i = 0; i < data.length; i++) {

        let dto = data[i];

        let orderName = dto["orderName"];
        let correct = dto["correct"];
        let qid = dto["qid"];
        let qType = dto["qtype"];


        // 정답 데이터 가져오기
        let answerlist = dto["answer"];
        let userAnswerlist = dto["userAns"];

        let textAnswer, textUser; // 출력할 텍스트


        // 문자열을 JSON 객체로 변환
        let regex = /<[^>]*>/; // 태그 패턴을 정의한 정규표현식 -> 태그 있는지 확인용

        try {
            let answerJS = JSON.parse(answerlist);


            if (qType == 'IT11') {  // IT11 -> 정답 배열 순서가 문제 순서와 다름
                textAnswer = `${answerJS["answer"][2]}, ${answerJS["answer"][0]}, ${answerJS["answer"][1]}`;

            } else if (qType == 'IT14') {  // IT14 -> 숫자를 알파벳으로 바꾸고 textarea 부분 출력
                let ex = ["", "A", "B", "C", "D", "E"];
                textAnswer = `${ex[userAnswerJS["answer"]]} / ${userAnswerJS["textarea"]}`;

            } else if (qType == 'IT13') {
                if (qid == 299) { // 불규칙적인 부분 입력..
                    textAnswer = "감소한다, 변화없다";

                } else {
                    textAnswer = `${answerJS["answer"]} / ${answerJS["textarea"]}`;
                }

            } else if (qType == 'IT12') { //IT12 첫번째 값 하나만 출력
                textAnswer = `${answerJS["answer"][0]}`;

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
                                let srcRoot= srcValue[srcValue.length-1];

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
                                    let srcRoot= srcValue[srcValue.length-1];

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

                    console.log(textAnswer);
                }

            }
        } catch (error) {
            // JSON 파싱 중 오류가 발생한 경우
            console.error('JSON 파싱 오류:', error.message);
        }

        // 본인 응답!!
        let userAnswer = userAnswerlist;
        textUser = userAnswer.split(',');


        insertTable5(tbody, orderName, correct, textAnswer, textUser, qid);

    }

}


/**정오표 tbody에 결과 값 저장하기*/
let insertTable5 = function (tbodyID, orderName, correct, answer, userAns, qid) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    let tagi = document.createElement('i');
    let q_link = document.createElement('button');

    td.textContent = orderName;


    q_link.textContent = '상세 보기';

    // i 태그 생성 - 정답 여부 아이콘으로 표시
    if (correct == 1) {
        tagi.setAttribute('class', 'fa-regular fa-circle-check');
    } else {
        tagi.setAttribute('class', 'fa-regular fa-circle-xmark');
    }
    // td 요소에 i 태그 추가 - 정답/오답 표시
    td1.appendChild(tagi);


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
                spanTag.innerHTML = `${userAns[i]}, `;
                td3.appendChild(spanTag);
            }
        }
        if (userAns[i] != '') { // 배열의 맨 마지막은 쉼표 없음
            let spanTag = document.createElement('span');
            spanTag.innerHTML = userAns[i];
            td3.appendChild(spanTag);
        }
    } else { // userAns가 배열이 아니면

        td3.textContent = userAns;

    }


    // td 요소에 button 속성 추가 - 상세 보기
    q_link.setAttribute('onclick', 'openQuestion(' + qid + ')');
    q_link.setAttribute('class', 'btn_question');
    // td 요소에 a 태그 추가
    td4.appendChild(q_link);


    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbodyID.appendChild(tr);
}


/**상세보기 버튼 새창 열기*/
function openQuestion(qid) {
    // 새 창을 열고 문제 번호로 이동
    window.open('/report_question/' + qid, '_blank', 'width=400,height=400');
}

