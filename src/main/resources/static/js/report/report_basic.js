// html에서 값 전달 받기
let ut_id, e_id;
let init = function (inits) {
    ut_id = inits['utid'];
    e_id = inits['eid'];
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

    td.textContent = `${orderName}`
    td2.textContent = answer;
    td3.textContent = userAns;
    q_link.textContent = '상세 보기';

    // i 태그 생성 - 정답 여부 아이콘으로 표시
    if (correct == 1) {
        tagi.setAttribute('class', 'fa-regular fa-circle-check');
    } else {
        tagi.setAttribute('class', 'fa-regular fa-circle-xmark');
    }
    // td 요소에 i 태그 추가 - 정답/오답 표시
    td1.appendChild(tagi);

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


function openQuestion(qid) {
    // 새 창을 열고 문제 번호로 이동
    window.open('/report_question/' + qid, '_blank', 'width=400,height=400');
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


let detailPrint = function (data, tbody) {

    for (let i = 0; i < data.length; i++) {
        let dto = data[i];

        let orderName = dto["orderName"];
        let correct = dto["correct"];
        let qid = dto["qid"];
        let qType = dto["qtype"];


        // 정답 가져오기
        let answerlist = dto["answer"];
        let userAnswerlist = dto["userAns"];


        // 문자열을 JSON 객체로 변환
        let textAnswer, textUser; // 출력할 텍스트

        try {
            let answerJS = JSON.parse(answerlist);
            let userAnswerJS = JSON.parse(userAnswerlist);


            // answer 값은 하나인데 그 안에 배열이 들어있을 때
            let regex = /<[^>]*>/; // 태그 패턴을 정의한 정규표현식

            if (qType == 'IT11') {
                textAnswer = `${answerJS["answer"][2]}, ${answerJS["answer"][0]}, ${answerJS["answer"][1]}`;
                textUser = `${userAnswerJS["answer"][2]}, ${userAnswerJS["answer"][0]}, ${userAnswerJS["answer"][1]}`;

            } else if (qType == 'IT14') {
                let ex = ["", "A", "B", "C", "D", "E"];
                textAnswer = `${ex[userAnswerJS["answer"]]} / ${userAnswerJS["textarea"]}`;
                textUser = `${ex[userAnswerJS["answer"]]} / ${userAnswerJS["textarea"]}`;

            } else if (qType == 'IT13') {
                if (qid == 299) {
                    textAnswer = "감소한다";
                    textUser = "변화없다";
                } else {
                    textAnswer = `${answerJS["answer"]} / ${answerJS["textarea"]}`;
                    textUser = `${userAnswerJS["answer"]} / ${userAnswerJS["textarea"]}`;
                }

            } else if (qType == 'IT12') {
                textAnswer = `${answerJS["answer"][0]}`;
                textUser = `${userAnswerJS["answer"][0]}`;

            } else {


                if (answerJS["answer"].length == 1 && Array.isArray(answerJS["answer"])) {


                    if (regex.test(answerJS["answer"][0])) { //answer안에 태그 패턴이 있으면
                        //태그 지우고 그 안의 text만 전달
                        textAnswer = answerJS["answer"][0].replace(/<[^>]*>/g, '');

                    } else { //answer안에 태그 패턴이 없을 때
                        textAnswer = answerJS["answer"];

                    }

                } else { // answer 단답이거나, 답이 여러개 이거나, 배열이 여러개 들어있을 때
                    textAnswer = answerJS["answer"];
                }

                // answer 값은 하나인데 그 안에 배열이 들어있을 때
                if (userAnswerJS["answer"].length == 1 && Array.isArray(userAnswerJS["answer"])) {


                    if (regex.test(userAnswerJS["answer"][0])) { //answer안에 태그 패턴이 있으면
                        //태그 지우고 그 안의 text만 전달
                        textUser = userAnswerJS["answer"][0].replace(/<[^>]*>/g, '');

                    } else { //answer안에 태그 패턴이 없을 때
                        textUser = userAnswerJS["answer"];

                    }

                } else { // answer 단답이거나, 답이 여러개 이거나, 배열이 여러개 들어있을 때
                    textUser = userAnswerJS["answer"];
                }

            }
        } catch (error) {
            // JSON 파싱 중 오류가 발생한 경우
            console.error('JSON 파싱 오류:', error.message);
        }


        insertTable5(tbody, orderName, correct, textAnswer, textUser, qid);

    }

}