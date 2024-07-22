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
    td1.appendChild(tagi);

    // td 요소에 button 속성 추가 - 상세 보기
    q_link.setAttribute('onclick', 'openQuestion('+qid+')');
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
    window.open('/report_question/'+qid, '_blank', 'width=400,height=400');
}


window.onload = function () {

    /**상단 회차, 과목 선택박스*/
    document.getElementById('submitForm').onclick = function() {
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


            for (let i = 0; i < data.length; i++) {
                let report = data[i];

                let orderName = report["orderName"];
                let correct = report["correct"];
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
                // let userAnswerJS = JSON.parse(userAnswerlist);
                // console.log(answerJS);
                // console.log(typeof answerJS);
                // console.log(answerJS["answer"].length);

                // answer 값은 하나인데 그 안에 배열이 들어있을 때
                if(answerJS["answer"].length == 1 && Array.isArray(answerJS["answer"])){
                    let textContent = answerJS["answer"][0].replace(/<[^>]*>/g, '');
                    answer = textContent;
                }  else { // answer 단답이거나, 답이 여러개 이거나, 배열이 여러개 들어있을 때
                    answer = answerJS["answer"];
                }

                // answer 값은 하나인데 그 안에 배열이 들어있을 때
                if(userAnswerJS["answer"].length == 1 && Array.isArray(userAnswerJS["answer"])){
                    let textContent = userAnswerJS["answer"][0].replace(/<[^>]*>/g, '');
                    userAns = textContent;
                }  else { // answer 단답이거나, 답이 여러개 이거나, 배열이 여러개 들어있을 때
                    userAns = userAnswerJS["answer"];
                }

                // 상세보기 버튼 추가


                insertTable5(tbody, orderName, correct, answer, userAns, qid);

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
            let tbody = document.getElementById('basicSubjectivelist');

            if(data != null && data.length !=0) {
                //서답형 정오표 hidden 해제
                document.querySelector('.report_sub').style.display = 'block';


                for (let i = 0; i < data.length; i++) {
                    let subject = data[i];

                    let orderName = subject["orderName"];
                    let correct = subject["correct"];
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
                    // let userAnswerJS = JSON.parse(userAnswerlist);
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


                    insertTable5(tbody, orderName, correct, answer, userAns, qid);

                }
            }
        })
        .catch(error => {
            console.error('Error fetching subjective list data:', error);
        });


}