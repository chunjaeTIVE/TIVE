// time 관련
console.log('0');

let saveTime =
    45 *
    60 + 0;
let time =
    45 *
    60 + 0;

const x = setInterval(function () {
    const min = parseInt(time / 60);
    const sec = parseInt(time % 60);
    document.getElementById('timer').innerText = min + ':' + leadingZeros(sec, 2);
    time--;
    // if (time < 0) {
    //     clearInterval(x);
    //     fetch('/user/exam/complete-exam', {
    //         method: 'PUT',
    //         cache: 'no-cache',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({'examResultId': 5457})
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => {
    //         if (data.result === true) {
    //             alert("시험이 종료되었습니다.");
    //             location.href = "/user/exam/report?school_level=SL02&exam_round=2&subject_id=14";
    //         } else {
    //             console.log(data.message);
    //         }
    //     });
    // }
}, 1000);

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