// html에서 값 전달 받기
let ut_id, e_id, achieveLevel;
let init = function (inits) {
    ut_id = inits['utid'];
    e_id = inits['eid'];
    achieveLevel = inits['achieveLevel'];
}


// 3열짜리 테이블 tbody에 결과 값 저장하기
let insertTable = function (tbodyID, key, valueAll, valueMe) {
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


    // 내 성취 수준 위치 이동
    let achievePointer = document.querySelector('.user_name');

    if (achieveLevel == 4) {
        achievePointer.style.left = "82%";
    } else if (achieveLevel == 3) {
        achievePointer.style.left = "58%";
    } else if (achieveLevel == 2) {
        achievePointer.style.left = "33%";
    } else {
        achievePointer.style.left = "8%";
    }


    // 문항 난이도별 성취율 Fetch 요청
    fetch('/levelrate/' + ut_id + "/" + e_id,
        {
            method   : 'GET'
            , headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
        if (!response.ok) {
            throw new Error('난이도별 성취도에서 에러났음');
        }
        return response.json();
    })
        .then(data => {

            let level = {
                "DF01" : "최상"
                , "DF02" : "상"
                , "DF03" : "중"
                , "DF04" : "하"
                , "DF05" : "최하"
            };

            let keys = Object.keys(level);

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

                let levelvalue = level[keys[i]];

                console.log(levelvalue);

                let levelvalueAll = levelRateAll[keys[i]];  //전체성취율
                let levelvalueMe = levelRateMe[keys[i]]; // 내 성취율

                insertTable(tbody, levelvalue, levelvalueAll, levelvalueMe);

                levelAllArr.push(levelvalueAll);
                levelMyArr.push(levelvalueMe);
            }

            // 차트 그리기
            const levelChart = document.getElementById('levelChart').getContext('2d');

            new Chart(levelChart, {
                data   : {
                    datasets: [{
                        type           : 'line',
                        label          : '전체평균',
                        data           : levelAllArr,
                        borderColor    : '#FF6384',
                        backgroundColor: '#FFB1C1',
                    }, {
                        type           : 'bar',
                        label          : '내 성취율',
                        data           : levelMyArr,
                        borderColor    : '#36A2EB',
                        backgroundColor: '#9BD0F5',
                        barThickness   : 35
                    }],
                    labels  : level
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


    // 내용 영역별 성취율 Fetch 요청
    fetch('/contentrate/' + ut_id + "/" + e_id,
        {
            method   : 'GET'
            , headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
        if (!response.ok) {
            throw new Error('내용 영역별 성취율에서 에러났음');
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
                insertTable(tbody, contentvalue, contentvalueAll, contentvalueMe);

                // 차트 데이터에 추가
                contentAllArr.push(contentvalueAll);
                contentMyArr.push(contentvalueMe);

            }


            // 차트 그리기

            const contentChart = document.getElementById('contentChart').getContext('2d');


            new Chart(contentChart, {
                data   : {
                    datasets: [{
                        type           : 'line',
                        label          : '전체성취율',
                        data           : contentAllArr,
                        borderColor    : '#FF6384',
                        backgroundColor: '#FFB1C1',
                    }, {
                        type           : 'bar',
                        label          : '내 성취율',
                        data           : contentMyArr,
                        borderColor    : '#36A2EB',
                        backgroundColor: '#9BD0F5',
                        barThickness   : 35
                    }],
                    labels  : keys
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


    // 응답 유형별 정답률 Fetch 요청
    fetch('/resprate/' + ut_id + "/" + e_id,
        {
            method   : 'GET'
            , headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
        if (!response.ok) {
            throw new Error('응답 유형별 정답률에서 에러났음');
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

                insertTable(tbody, respvalue, respvalueAll, respvalueMe);

                respAllArr.push(respvalueAll);
                respMyArr.push(respvalueMe);

            }

            // 차트 그리기

            const respChart = document.getElementById('respChart').getContext('2d');


            new Chart(respChart, {
                data   : {
                    datasets: [{
                        type           : 'line',
                        label          : '전체평균',
                        data           : respAllArr,
                        borderColor    : '#FF6384',
                        backgroundColor: '#FFB1C1',
                    }, {
                        type           : 'bar',
                        label          : '내 성취율',
                        data           : respMyArr,
                        borderColor    : '#36A2EB',
                        backgroundColor: '#9BD0F5',
                        barThickness   : 35
                    }],
                    labels  : keys
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


}
