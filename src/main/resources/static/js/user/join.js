// passConfirm 함수 정의
function passConfirm() {
    let pwd = document.getElementById('pwd'); // 비밀번호
    let pwdCk = document.getElementById('pwdCk'); // 비밀번호 확인
    let confirmMsg = document.getElementById('confirmMsg'); // 확인 메세지

    if (pwd.value == pwdCk.value) {
        confirmMsg.style.color = "green";
        confirmMsg.innerHTML = "비밀번호 일치";

        // 이메일과 비밀번호가 모두 유효할 때 가입하기 버튼 활성화
        let emailCheckSpan = document.getElementById('email-check-span');
        if (emailCheckSpan && emailCheckSpan.style.color === "green") {
            document.querySelectorAll('.join_btn')[0].disabled = false;
        }
    } else {
        confirmMsg.style.color = "red";
        confirmMsg.innerHTML = "비밀번호 불일치";

        document.querySelectorAll('.join_btn')[0].disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    /** 이메일 중복체크 */
    // 이메일 중복체크가 되기 전엔 가입하기 버튼 비활성화

    document.querySelectorAll('.join_btn')[0].disabled = true;
    let emailvalue;
    document.getElementById('emailCk').onclick = function () {
        emailvalue = document.getElementById('email').value;
        console.log("email to check: ", emailvalue); // 디버깅용 로그 추가
        fetch("/emailCheck", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',  // 요청을 JSON으로 보내기 위해 설정
            },
            body: JSON.stringify({ email: emailvalue })
        }).then(response => {
            if (!response.ok)
                throw new Error('noooooooooo');
            console.log(response);
            console.log(response.body);
            return response.json();
        }).then((data) => {

            // 중복체크 버튼 초기화
            // 기존 span 요소를 찾고, 있으면 제거
            let existingSpan = document.getElementById('email-check-span');
            if (existingSpan) {
                document.getElementById("check").removeChild(existingSpan);
            }
            // 새로운 span 요소를 생성하고 ID 부여
            let checkspan = document.createElement('span');
            checkspan.id = 'email-check-span';

            if (emailvalue == '' || emailvalue == null) { // 공백일때
                let spacetext = document.createTextNode('이메일을 입력해주세요.');
                checkspan.appendChild(spacetext);
                checkspan.style.color = "red";
            } else { // 입력 했을 때
                if (data == 0) { // 사용 가능한 이메일
                    let oktext = document.createTextNode('사용 가능한 이메일입니다.');
                    checkspan.appendChild(oktext);
                    checkspan.style.color = "green";

                    // 비밀번호 확인 상태를 체크하여 가입하기 버튼 활성화 결정
                    if (document.getElementById('pwd').value === document.getElementById('pwdCk').value) {
                        document.querySelectorAll('.join_btn')[0].disabled = false; // 가입하기 버튼 활성화
                    }
                } else { // 이미 존재하는 아이디
                    let alreadytext = document.createTextNode('이미 존재하는 이메일입니다.');
                    checkspan.appendChild(alreadytext);
                    checkspan.style.color = "red";

                    document.querySelectorAll('.join_btn')[0].disabled = true; // 가입하기 버튼 비활성화
                }
            }
            document.getElementById("check").appendChild(checkspan);
        }).catch(error => {
            console.log(error);
        }).finally(
            () => console.log('finally')
        )
    }


// 비밀번호 확인 input에 onkeyup 이벤트 핸들러 연결
    document.getElementById('pwdCk').onkeyup = passConfirm;
/*    /!** 비밀번호 확인 *!/
    function passConfirm() {
        /!* 비밀번호, 비밀번호 확인 입력창에 입력된 값을 비교해서 같다면 비밀번호 일치, 그렇지 않으면 불일치 라는 텍스트 출력.*!/
        let pwd = document.getElementById('pwd'); // 비밀번호
        let pwdCk = document.getElementById('pwdCk'); // 비밀번호 확인
        let confirmMsg = document.getElementById('confirmMsg'); // 확인 메세지

        if (pwd.value == pwdCk.value) { // password 변수의 값과 passwordConfirm 변수의 값과 동일하다.
            confirmMsg.style.color = "green"; // span 태그의 ID(confirmMsg) 사용
            confirmMsg.innerHTML = "비밀번호 일치"; // innerHTML : HTML 내부에 추가적인 내용을 넣을 때 사용하는 것

            // 아이디 중복 체크 상태를 확인하여 가입하기 버튼 활성화 결정
            if (document.getElementById('email-check-span') && document.getElementById('email-check-span').style.color === "green") {
                document.querySelectorAll('.join_btn')[0].disabled = false; // 가입하기 버튼 활성화
            }
        } else {
            confirmMsg.style.color = "red";
            confirmMsg.innerHTML = "비밀번호 불일치";

            document.querySelectorAll('.join_btn')[0].disabled = true; // 가입하기 버튼 비활성화
        }
    }

    // passConfirm 함수를 비밀번호 확인 입력창에 연결 - 이거 없으면 확인 안해도 그냥 가입됨
    document.getElementById('pwdCk').onkeyup = passConfirm;
    document.getElementById('pwd').onkeyup = passConfirm;*/
});

/*document.getElementById('emailCk').onclick = function () {
    emailvalue = document.getElementById('email').value;
    console.log("email to check: ", emailvalue); // 디버깅용 로그 추가
    fetch("/emailCheck", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailvalue })
    }).then(response => {
        if (!response.ok)
            throw new Error('이메일 체크 실패');
        return response.json();
    }).then((data) => {
        // 결과에 따라 이메일 체크 결과 표시 및 가입하기 버튼 활성화/비활성화
        let existingSpan = document.getElementById('email-check-span');
        if (existingSpan) {
            document.getElementById("check").removeChild(existingSpan);
        }
        let checkspan = document.createElement('span');
        checkspan.id = 'email-check-span';

        if (emailvalue == '' || emailvalue == null) {
            let spacetext = document.createTextNode('이메일을 입력해주세요.');
            checkspan.appendChild(spacetext);
            checkspan.style.color = "red";
        } else {
            if (data == 0) { // 사용 가능한 이메일
                let oktext = document.createTextNode('사용 가능한 이메일입니다.');
                checkspan.appendChild(oktext);
                checkspan.style.color = "green";

                // 이메일 사용 가능하고, 비밀번호도 일치하는 경우에만 가입하기 버튼 활성화
                if (document.getElementById('pwd').value === document.getElementById('pwdCk').value) {
                    document.querySelectorAll('.join_btn')[0].disabled = false;
                }
            } else { // 이미 존재하는 이메일
                let alreadytext = document.createTextNode('이미 존재하는 이메일입니다.');
                checkspan.appendChild(alreadytext);
                checkspan.style.color = "red";

                document.querySelectorAll('.join_btn')[0].disabled = true;
            }
        }
        document.getElementById("check").appendChild(checkspan);
    }).catch(error => {
        console.error(error);
    });
};*/
