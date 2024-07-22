// html에서 값 전달 받기
let ut_id, e_id;
let init = function (inits) {
    ut_id = inits['utid'];
    e_id = inits['eid'];
}

/**정오표 tbody에 결과 값 저장하기*/
let insertTable4 = function (tbodyID, orderName, correct, answer, userAns) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    let tagi = document.createElement('i');

    td.textContent = `${orderName}`
    td2.textContent = `${answer}`;
    td3.textContent = `${userAns}`

    // i 태그 생성 - 정답 여부 아이콘으로 표시
    if(correct == 1){
        tagi.setAttribute('class', 'fa-regular fa-circle-check');
    } else {
        tagi.setAttribute('class', 'fa-regular fa-circle-xmark');
    }
    // td 요소에 i 태그 추가 - 정답/오답 표시
    td1.appendChild(tagi);

    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbodyID.appendChild(tr);
}

window.onload = function () {

    /**상단 회차, 과목 선택박스*/
    document.getElementById('submitForm').onclick = function() {
        // 선택된 값을 가져오기
        let round = document.getElementById('round').value;
        let subject = document.getElementById('subject').value;

        // GET 방식으로 값 보내기
        let url = `/report_basic/2?round=${round}&subject=${encodeURIComponent(subject)}`;
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


                insertTable4(tbody, orderName, correct, answer, userAns);

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


                    insertTable4(tbody, orderName, correct, answer, userAns);

                }
            }
        })
        .catch(error => {
            console.error('Error fetching subjective list data:', error);
        });


}