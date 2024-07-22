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

        // 이메일 정규식 검사 먼저 하기
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailvalue)) {
            let existingSpan = document.getElementById('email-check-span');
            if (existingSpan) {
                document.getElementById("check").removeChild(existingSpan);
            }
            let checkspan = document.createElement('span');
            checkspan.id = 'email-check-span';
            let invalidText = document.createTextNode('이메일 형식이 올바르지 않습니다.');
            checkspan.appendChild(invalidText);
            checkspan.style.color = "red";
            document.getElementById("check").appendChild(checkspan);
            return; // 정규식이 맞지 않으면 중복 체크 요청을 보내지 않음
        }

        const token = document.querySelector("meta[name='_csrf']").content;

        fetch("/emailCheck", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',  // 요청을 JSON으로 보내기 위해 설정
                'X-Requested-With': "XMLHttpRequest",
                'Accept': 'application/json',
                'X-XSRF-Token': token,
            },
            body: JSON.stringify({ email: emailvalue })
        }).then(response => {
            if (!response.ok)
                throw new Error('noooooooooo');

            return response.json();
        }).then((data) => {
            console.log(data);
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

                    // 다시 수정 못하게 이메일 입력창 비활성화
                    document.getElementById('email').setAttribute("readonly", true);
                    //disable로 설정하니까 이메일값 널로 들어감 readonly 사용해야됨.........
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
            () => console.log('finally', emailvalue)
        )
    }


// 비밀번호 확인 input에 onkeyup 이벤트 핸들러 연결
    document.getElementById('pwdCk').onkeyup = passConfirm;
    document.getElementById('pwd').onkeyup = passConfirm;

});
