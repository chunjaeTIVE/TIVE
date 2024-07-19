//import { textareaTemp,textTemp,selectTemp,checkboxTemp,radioTemp,buttonTemp,hotspotTemp,dragdropTemp } from './answerExtractor.js';

/*
// time 관련
console.log('0');

let initialTime = 45*60+0;
// let time = localStorage.getItem('remainingTime')?parseInt(localStorage.getItem('remainingTime')):initialTime;
let time;
let timerInterval;
function saveTime(){
    localStorage.setItem('remainingTime',time);
}


// const x = setInterval(function () {
//     const min = parseInt(time / 60);
//     const sec = parseInt(time % 60);
//     document.getElementById('timer').innerText = min + ':' + leadingZeros(sec, 2);
//     time--;
//     saveTime();
//     if (time < 0) {
//         clearInterval(x);
//         // fetch('/user/exam/complete-exam', {
//         //     method: 'PUT',
//         //     cache: 'no-cache',
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     },
//         //     body: JSON.stringify({'examResultId': 5457})
//         // }).then(response => {
//         //     return response.json();
//         // }).then(data => {
//         //     if (data.result === true) {
//         //         alert("시험이 종료되었습니다.");
//         //         location.href = "/user/exam/report?school_level=SL02&exam_round=2&subject_id=14";
//         //     } else {
//         //         console.log(data.message);
//         //     }
//         // });
//         location.href="/index";
//     }
// }, 1000);

// 타이머 초단위 00
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

// 문제 푼 슬라이드 색 동적 변경 saveTime 변수 활용
// 최종 제출 처리는 여기서 해야될듯 (answerExtractor 로부터 각 정답을 가져와서)

*/
//TIME api를 이용해 만든 컨트롤러로 서버시간을 불러옴

document.addEventListener('DOMContentLoaded', (e) => {
    const wrapEle = document.querySelector('.wrap');
    let eid = wrapEle.id;
    console.log('testtime eid: ', eid);
    let initialTime;
    let currentEid = wrapEle.id;
    let time;
    let timerInterval;
    // 서버시간 가져옴
    async function fetchServerTime() {
        try {
            const response = await fetch('http://localhost:8080/api/current-time');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data.datetime);
            return new Date(data.datetime); // 서버 응답에서 datetime 필드를 추출
        } catch (error) {
            console.error('Error fetching server time:', error);
            return new Date(); // 오류 발생 시 현재 시간을 반환
        }
    }

    //시험지별 제한 시간 설정
    function getInitialTime(eid) {
        if (eid === '1' || eid === '2' || eid === '3' || eid === '4' || eid === '5' || eid === '6'
            || eid === '16' || eid === '17' || eid === '18' || eid === '19')
            return 40 * 60;
        else if (eid === '8' || eid === '9' || eid === '11' || eid === '26' || eid === '27' || eid === '28')
            return 50 * 60;
        else if (eid === '29' || eid === '30' || eid === '31' || eid === '32' || eid === '33' || eid === '34' || eid === '35' || eid === '36')
            return 60 * 60;
        else
            return 45 * 60;

    }

    // 타이머 설정
    async function setupTimer() {
        const serverTime = await fetchServerTime(); // 서버시간 설정
        const endTime = new Date(serverTime.getTime() + initialTime * 1000);

        // 남은 시간 계산
        time = Math.max(Math.floor((endTime - serverTime) / 1000), 0);

        // 로컬 스토리지에서 시간을 읽어오거나 초기화
        if (!localStorage.getItem('remainingTime') || parseInt(localStorage.getItem('remainingTime')) <= 0) {
            time = Math.max(time, initialTime);
            saveTime();
            localStorage.setItem('currentEid',currentEid);
        } else {
            time = parseInt(localStorage.getItem('remainingTime'));
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // 타이머 업데이트
    function updateTimer() {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        // UI에서 보여지는 타이머
        document.getElementById('timer').innerText = `${min}:${leadingZeros(sec, 2)}`;
        // 타이머 종료시
        if (time <= 0) {
            clearInterval(timerInterval);
            location.href = "/index"; // 타이머가 종료되면 이동할 페이지
        } else {
            time--;
            saveTime();
        }
    }

    // 초단위 자릿수
    function leadingZeros(n, digits) {
        return n.toString().padStart(digits, '0');
    }

    // 남은 시간 저장
    function saveTime() {
        localStorage.setItem('remainingTime', time);
    }
    // 타이머 초기화
    function resetTimer(){
        if(timerInterval){
            clearInterval(timerInterval);
        }
        localStorage.removeItem('remainingTime');
        initialTime = getInitialTime(currentEid);
        setupTimer();
    }

    const storedEid = localStorage.getItem('currentEid');
    if(storedEid&& storedEid!==currentEid){
        resetTimer();
    }else {
        initialTime = getInitialTime(currentEid);
        setupTimer();
    }

});
