let textareaTemp = [];
let textTemp = [];
let selectTemp = [];
let checkboxTemp = [];
let radioTemp = [];
let buttonTemp = [];
let hotspotTemp = [];
let dragdropTemp = [];

function mergeTemp(temp) {
    let merge = [];
    if (temp.length > 0) {
        for (let i = 0; i < temp.length; i++) {
            let goAhead = false;
            if (merge.length === 0) {
                goAhead = true;
            } else {
                let m = 0;
                while (m < merge.length) {
                    if (merge[m].qid === temp[i].qid)
                        break;
                    m++;
                }
                if (m === merge.length)
                    goAhead = true;
            }
            if (goAhead) {
                let dqid = temp[i].qid;
                let value = [temp[i].answer];
                for (let j = i + 1; j < temp.length; j++) {
                    if (temp[j].qid === dqid) {
                        value.push(temp[j].answer);
                    }
                }
                // if (value.length === 1)
                //     value = value.pop();
                merge.push({"qid": dqid, "answer": value});
            }
        }
        console.log(merge);
    }
    return merge;
}

function completeExam() {
    // drag drop, hotspot 문제 하나로 정답 통합
    let mergedDragdropTemp = [];
    let mergedHotspotTemp = [];
    if (dragdropTemp.length > 0 || hotspotTemp.length > 0) {
        if (dragdropTemp.length > 0){
            mergedDragdropTemp = mergeTemp(dragdropTemp);
        }
        else {
            mergedHotspotTemp = mergeTemp(hotspotTemp);
            for (let h = 0; h < mergedHotspotTemp.length; h++) {
                if (mergedHotspotTemp[h].answer.length > 1)
                    mergedHotspotTemp[h].answer.sort((a, b) => a - b);
            }
        }
    }
    // 전체 문제 문항번호 순으로 sort
    let all = [textareaTemp, textTemp, selectTemp, checkboxTemp, radioTemp, buttonTemp, mergedHotspotTemp, mergedDragdropTemp];
    let resultTemp = [].concat.apply([], all);
    for (let i = 0; i < resultTemp.length; i++) {
        resultTemp.sort((a, b) => Number(a.qid) - Number(b.qid));
    }
    console.log("resultTemp :", resultTemp);
    console.log("응답 개수 :", resultTemp.length);
    // 최종 정답 모양 만들기
    for (let j = 0; j < resultTemp.length; j++) {
        if (j !== resultTemp.length - 1 && resultTemp[j].qid === resultTemp[j + 1].qid) {
            resultTemp[j]["answer"] = resultTemp[j + 1].answer;
            resultTemp.splice(j + 1, 1);
        }
    }
    console.log("최종 통합 후 : ", resultTemp);
    const token = document.querySelector("meta[name='_csrf']").content;
    const header = document.querySelector("meta[name='_csrf_header']").content;
    fetch(`/submit_exam`, {
        method: "POST",
        headers: {
            'X-Requested-With': "XMLHttpRequest",
            'Accept': 'application/json',
            'X-XSRF-Token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eid: document.querySelector('.wrap').id
            , body:  resultTemp
        })
    }).then(response => {
        console.log(response);
        if (!response.ok)
            throw new Error();
        else
            return response.text();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error(error);
    });
}

function answerExtract(els, el) {
    //console.log(el.type);
    let ancestor = $(el).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
    //console.log(ancestor);
    let val = Array.from(els)
        .filter(el => {
            let condition;
            if (el.type === 'text' || el.type === 'textarea' || el.type.includes('select'))
                condition = el;
            else
                condition = el.checked;
            //console.log(condition);
            if (condition && ancestor === $(el).closest('.swiper-slide').eq(0).prop('id')) {
                //console.log(el, el.value);
                return true;
            }

        })
        .map(el => el.value);
    //console.log(val);
    if (val.length === 1)
        val = val.pop();
    if (el.type === 'textarea')
        return {"qid": ancestor, "textarea": val};
    else
        return {"qid": ancestor, "answer": val};
}

function dupleElementPop(temp, answer) {
    if (temp.length > 0) {
        let i = 0;
        while (i <= temp.length) {
            if (i == temp.length) {
                temp.push(answer);
                break;
            } else if (temp[i].qid === answer.qid) {
                temp[i] = answer;
                //console.log("0보다 크고 if")
                break;
            }
            i++;
        }
    } else {
        temp.push(answer);
        //console.log("0 보다 크지 않음")
    }
}

function dupleBtnHotspotPop(on, temp, answer) {
    console.log(on);
    if (on > 0) {
        temp.push(answer);
    } else {
        if (temp.length > 0) {
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].qid === answer.qid && temp[i].ans === answer.ans) {
                    temp.splice(i, 1);
                    break;
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // IT09 - 단답 (textarea)
    let textareas = document.querySelectorAll('.question textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('change', function () {
            let parentSlide = textarea.closest('.swiper-slide');
            // hiddenInput값을 가져옴
            let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
            if (hiddenInput) {
                // value를 문제번호로 받음
                let questionOrder = hiddenInput.value;
                console.log('hidden val: ', questionOrder);
                let swiperBullet = document.querySelector('#swiper' + questionOrder);
                //슬라이더 색상 변경
                if (textarea.value.trim() !== '') {
                    if (swiperBullet) {
                        swiperBullet.style.backgroundColor = '#5DCCF3';
                        swiperBullet.style.border = '1px solid #5DCCF3';
                        swiperBullet.style.color = 'white';
                        swiperBullet.classList.add('button-clicked');
                    }

                } else {
                    if (swiperBullet) {
                        swiperBullet.style.backgroundColor = 'white';
                        swiperBullet.style.color = '#5DCCF3';
                    }
                }
            }
            let answer = answerExtract(textareas, textarea);
            //console.log(answer);
            dupleElementPop(textareaTemp, answer);
            //console.log("textarea : ",textareaTemp);
        });
    });

    // 단답 - text
    let texts = document.querySelectorAll('.question input[type="text"]');
    texts.forEach(text => {
        text.addEventListener('change', function () {
            let parentSlide = text.closest('.swiper-slide');
            // hiddenInput값을 가져옴
            let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
            if (hiddenInput) {
                // value를 문제번호로 받음
                let questionOrder = hiddenInput.value;
                console.log('hidden val: ', questionOrder);
                let swiperBullet = document.querySelector('#swiper' + questionOrder);
                if (text.value.trim() !== '') {
                    if (swiperBullet) {
                        swiperBullet.style.backgroundColor = '#5DCCF3';
                        swiperBullet.style.border = '1px solid #5DCCF3';
                        swiperBullet.style.color = 'white';
                        swiperBullet.classList.add('button-clicked');
                    }
                } else {
                    if (swiperBullet) {
                        swiperBullet.style.backgroundColor = 'white';
                        swiperBullet.style.color = '#5DCCF3';
                    }
                }
            }
            let answer = answerExtract(texts, text);
            //console.log(answer);
            dupleElementPop(textTemp, answer);
            //console.log("input text : ",textTemp);
        });
    });

    // TT04 select
    let selects = document.querySelectorAll('.question select');
    selects.forEach(select => {
        select.addEventListener('change', function () {
            let parentSlide = select.closest('.swiper-slide');
            if (parentSlide) {
                // hidden값 불러오기
                let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
                if (hiddenInput) {
                    // 문제번호를 value로
                    let questionOrder = hiddenInput.value;
                    console.log('select hidden', questionOrder);
                    let swiperBullet = document.querySelector('#swiper' + questionOrder);
                    if (select.value.trim() !== '') {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = '#5DCCF3';
                            swiperBullet.style.border = '1px solid #5DCCF3';
                            swiperBullet.style.color = 'white';
                            swiperBullet.classList.add('button-clicked');
                        }
                    } else {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = 'white';
                            swiperBullet.style.color = '#5DCCF3';
                        }
                    }
                }
            }
            let answer = answerExtract(selects, select);
            //console.log(answer);
            dupleElementPop(selectTemp, answer);
            //console.log("select : ",selectTemp);
        });
    });

    // IT02(체크박스)
    let checkboxes = document.querySelectorAll('.question input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let parentSlide = checkbox.closest('.swiper-slide');
            if (parentSlide) {
                // hidden값 불러오기
                let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
                if (hiddenInput) {
                    // 문제번호를 value로
                    let questionOrder = hiddenInput.value;
                    console.log('checkbox hidden', questionOrder);
                    let swiperBullet = document.querySelector('#swiper' + questionOrder);
                    let anyChecked = Array.from(checkboxes).some(e => e.checked);
                    if (anyChecked) {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = '#5DCCF3';
                            swiperBullet.style.border = '1px solid #5DCCF3';
                            swiperBullet.style.color = 'white';
                            swiperBullet.classList.add('button-clicked');
                        }
                    } else {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = 'white';
                            swiperBullet.style.color = '#5DCCF3';
                        }
                    }
                }
            }
            let answer = answerExtract(checkboxes, checkbox);
            //console.log(answer);
            dupleElementPop(checkboxTemp, answer);
            //console.log("checkbox : ",checkboxTemp);
        });
    });

    // IT01(라디오버튼)
    let radios = document.querySelectorAll('.question input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            let parentSlide = radio.closest('.swiper-slide');
            if (parentSlide) {
                // hidden값 불러오기
                let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
                if (hiddenInput) {
                    // 문제번호를 value값으로
                    let questionOrder = hiddenInput.value;
                    console.log('hidden val: ', questionOrder);
                    let swiperBullet = document.querySelector('#swiper' + questionOrder);
                    //슬라이더 색상 변경
                    if (radio.checked) {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = '#5DCCF3';
                            swiperBullet.style.border = '1px solid #5DCCF3';
                            swiperBullet.style.color = 'white';
                            swiperBullet.classList.add('button-clicked');
                        }
                    } else {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = 'white';
                            swiperBullet.style.color = '#5DCCF3';
                        }
                    }
                }
            }
            let answer = answerExtract(radios, radio);
            //console.log(answer);
            dupleElementPop(radioTemp, answer);
            //console.log("radio : ",radioTemp);
        });
    });


    //IT02 (버튼)
    let btns = document.querySelectorAll('.text-box button');
    btns.forEach((btn, index) => {
        btn.addEventListener('click', function (e) {
            e.target.classList.toggle('btn-ans');

            // 버튼의 부모 swiper-slide 요소를 찾기
            let parentSlide = e.target.closest('.swiper-slide');

            if (parentSlide) {
                // 현재 swiper-slide 내의 숨겨진 input을 찾음
                let hiddenInput = parentSlide.querySelector('input[type="hidden"]');

                if (hiddenInput) {
                    let ancestor = hiddenInput.id; // 숨겨진 input의 id를 가져옴
                    let answer = {"qid": ancestor}; // answer 객체를 생성
                    let questionOrder = hiddenInput.value;
                    // 클릭된 버튼의 인덱스를 찾아서 answer 객체에 추가
                    let siblings = e.target.parentElement.children;
                    for (let s = 0; s < siblings.length; s++) {
                        if (siblings[s] === e.target) {
                            answer["answer"] = (s + 1).toString(); // 1부터 시작하는 인덱스를 설정
                        }
                    }

                    dupleBtnHotspotPop(e.target.classList.length, buttonTemp, answer);

                    // swiper-bullet의 배경색을 업데이트
                    let swiperBullet = document.querySelector('#swiper' + questionOrder);
                    if (e.target.classList.contains('btn-ans')) {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = '#5DCCF3';
                            swiperBullet.style.border = '1px solid #5DCCF3';
                            swiperBullet.style.color = 'white';
                            swiperBullet.classList.add('button-clicked');
                        } // 원하는 배경색
                    } else {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = 'white';
                            swiperBullet.style.color = '#5DCCF3';
                        } // 배경색을 원래대로 돌림
                    }
                } else {
                    console.log("No hidden input found in this swiper-slide.");
                }
            } else {
                console.log("No swiper-slide found for this button.");
            }
        });
    });

    // let btns = document.querySelectorAll('.text-box button');
    // btns.forEach((btn, index) => {
    //     btn.addEventListener('click', function (e) {
    //         //console.log(e.target.textContent);
    //         e.target.classList.toggle('btn-ans');
    //         let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
    //         //console.log(ancestor);
    //         let answer = {"qid": ancestor};
    //         let siblings = e.target.parentElement.children;
    //         for (let s = 0; s < siblings.length; s++) {
    //             if (siblings[s] === e.target) {
    //                 //answer = [...answer,[s+1]];
    //                 answer["answer"] = s + 1;
    //             }
    //         }
    //         //console.log(answer);
    //         //console.log(`click: ${index + 1} in exam, ${answer.answer} in question`);
    //         dupleBtnHotspotPop(e.target.classList.length, buttonTemp, answer);
    //         //console.log("button : ",buttonTemp);
    //     });
    // });

    //TT03 핫스팟
    // 모든 svg g 요소를 선택
    let svgElements = document.querySelectorAll('svg g');
    svgElements.forEach((group, index) => {
        group.addEventListener('click', function (e) {
            // 클릭된 그룹의 상태를 토글
            e.target.classList.toggle('on');

            // 클릭된 그룹의 부모 swiper-slide 요소를 찾는다.
            let parentSlide = e.target.closest('.swiper-slide');

            if (parentSlide) {
                // swiper-slide 내의 숨겨진 input 요소를 찾는다.
                let hiddenInput = parentSlide.querySelector('input[type="hidden"]');

                if (hiddenInput) {
                    let ancestor = hiddenInput.id; // 숨겨진 input의 id를 가져옴
                    let answer = {"qid": ancestor}; // answer 객체를 생성
                    let questionOrder = hiddenInput.value;


                    // 클릭된 그룹의 형제 요소들을 가져와서 인덱스를 찾음
                    let siblings = e.target.parentElement.parentElement.children;
                    for (let s = 0; s < siblings.length; s++) {
                        if (siblings[s] === e.target.parentElement) {
                            answer["answer"] = (s + 1).toString(); // 1부터 시작하는 인덱스를 설정합니다.
                        }
                    }

                    console.log(answer);
                    console.log(`click: ${index + 1} in exam, ${answer.answer} in question`);


                    dupleBtnHotspotPop(e.target.classList.length, hotspotTemp, answer);
                    console.log("hotspot : ", hotspotTemp,hotspotTemp.length);

                    let swiperBullet = document.querySelector('#swiper' + questionOrder);
                    if (hotspotTemp.some(hotspot => hotspot.length !== 0)) {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = '#5DCCF3';
                            swiperBullet.style.border = '1px solid #5DCCF3';
                            swiperBullet.style.color = 'white';
                            swiperBullet.classList.add('button-clicked');
                        } // 원하는 배경색
                    } else {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = 'white';
                            swiperBullet.style.color = '#5DCCF3';
                        } // 배경색을 원래대로 돌림
                    }
                } else {
                    console.log("No hidden input found in this swiper-slide.");
                }
            } else {
                console.log("No swiper-slide found for this group.");
            }
        });
    });

    // let svgEle = document.querySelectorAll('svg g');
    // svgEle.forEach((group, index) => {
    //     group.addEventListener('click', function (e) {
    //         e.target.classList.toggle('on');
    //         let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
    //         //console.log(ancestor);
    //         let answer = {"qid": ancestor};
    //         let siblings = e.target.parentElement.parentElement.children;
    //         for (let s = 0; s < siblings.length; s++) {
    //             if (siblings[s] === e.target.parentElement)
    //                 answer["answer"] = s + 1;
    //         }
    //         console.log(answer);
    //         console.log(`click: ${index + 1} in exam, ${answer.ans} in question`);
    //         dupleBtnHotspotPop(e.target.classList.length, hotspotTemp, answer);
    //         console.log("hotspot : ",hotspotTemp);
    //     });
    // });


    // TT07 drag and drop
    let draggables = document.querySelectorAll('.drag');
    let dropArea = document.querySelectorAll('.drop');
    //let dragdropTemp = [];

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
        });
    });

    dropArea.forEach(drop => {
        setTimeout(() => {
            drop.addEventListener('drop', function (e) {
                e.preventDefault();
                let parentSlide = e.target.closest('.swiper-slide');
                if (parentSlide) {
                    let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
                    if (hiddenInput) {
                        let ancestor = hiddenInput.id;
                        let questionOrder = hiddenInput.value;

                        // let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
                        let target = (e.target.classList[0] === 'drop') ? e.target.children : e.target.parentElement.children;
                        let t = 0;
                        let goAhead = false;
                        let alerttxt = '';

                        // 한 칸에 복수개 정답 올렸는지 유효성 검사
                        while (t < target.length) {
                            if((target[0].nodeName === 'SPAN' && !target[0].classList.contains("txt"))
                                ||(target[0].nodeName === 'EM')){
                                goAhead = true;
                                break;
                            }
                            if (t + 1 === target.length) {
                                goAhead = true;
                                break;
                            }
                            for (let a = t + 1; a <= target.length - 1; a++) {
                                if (target[t].nodeName === target[a].nodeName) {
                                    target[a].remove();
                                    alerttxt = "한 칸에 하나의 정답만 입력하세요.";
                                    break;
                                }
                            }
                            if (alerttxt !== '') {
                                alert(alerttxt);
                                break;
                            }
                            t++;
                        }

                        // 유효성 검사 통과 경우에만 정답 받기 진행
                        if (goAhead) {
                            if((target[0].nodeName === 'SPAN' && !target[0].classList.contains("txt"))
                                ||(target[0].nodeName === 'EM')){
                                target[0].remove();
                            }
                            let val = target[0];
                            if (val.nodeName === 'IMG') val = val.src;
                            else val = val.textContent;

                            let answer = {"qid": ancestor};
                            let siblings = e.target.parentElement.children;
                            for (let s = 0; s < siblings.length; s++) {
                                if (siblings[s] === e.target) {
                                    console.log(e.target);
                                    answer["answer"] = [(s + 1).toString(), val];
                                }
                            }

                            // 중복 제거
                            let existingAnswerIndex = dragdropTemp.findIndex(item => item.qid === ancestor && item.answer[0] === answer.answer[0]);
                            if (existingAnswerIndex !== -1) {
                                dragdropTemp[existingAnswerIndex] = answer;
                            } else {
                                dragdropTemp.push(answer);
                            }

                            console.log("drop : ", dragdropTemp, dragdropTemp.length);

                            // 배경색 업데이트
                            let swiperBullet = document.querySelector('#swiper' + questionOrder);
                            if (dragdropTemp.length > 0) {
                                if (swiperBullet) {
                                    swiperBullet.style.backgroundColor = '#5DCCF3';
                                    swiperBullet.style.border = '1px solid #5DCCF3';
                                    swiperBullet.style.color = 'white';
                                    swiperBullet.classList.add('button-clicked');
                                } // 원하는 배경색
                            } else {
                                if (swiperBullet) {
                                    swiperBullet.style.backgroundColor = 'white';
                                    swiperBullet.style.color = '#5DCCF3';
                                } // 배경색을 원래대로 돌림
                            }
                        }
                    }
                }

            });
        }, 1000);

        // drop 클릭 시 받은 정답 다시 빼기
        drop.addEventListener('click', function (e) {
            let parentSlide = e.target.closest('.swiper-slide');
            if (parentSlide) {
                let hiddenInput = parentSlide.querySelector('input[type="hidden"]');
                if (hiddenInput) {
                    let ancestor = hiddenInput.id; // 숨겨진 input의 id를 가져옴
                    let questionOrder = hiddenInput.value;
                    // 클릭한 요소와 일치하는 항목 제거
                    dragdropTemp = dragdropTemp.filter(item => !(item.qid === ancestor && item.answer[1] === (e.target.textContent || e.target.src)));

                    console.log("dropcancel : ", dragdropTemp, dragdropTemp.length);

                    // 배경색 초기화
                    let swiperBullet = document.querySelector('#swiper' + questionOrder);
                    if (dragdropTemp.length === 0) {
                        if (swiperBullet) {
                            swiperBullet.style.backgroundColor = 'white';
                            swiperBullet.style.color = '#5DCCF3';
                        } // 배경색을 원래대로 돌림
                    }
                }
            }
        });
    });
    // let draggables = document.querySelectorAll('.drag');
    // let dropArea = document.querySelectorAll('.drop');
    // draggables.forEach(draggable => {
    //     draggable.addEventListener('dragstart', function (e) {
    //         e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
    //     });
    // });
    // dropArea.forEach(drop => {
    //     setTimeout(() => {
    //         drop.addEventListener('drop', function (e) {
    //             e.preventDefault();
    //             let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
    //             //console.log(ancestor);
    //             let target = (e.target.classList[0] === 'drop') ? e.target.children : e.target.parentElement.children;
    //             //console.log(target);
    //             let t = 0;
    //             let goAhead = false;
    //             let alerttxt = '';
    //             // 한 칸에 복수개 정답 올렸는지 유효성 검사
    //             while (t < target.length) {
    //                 if (t + 1 === target.length) {
    //                     goAhead = true;
    //                     break;
    //                 }
    //                 for (let a = t + 1; a <= target.length - 1; a++) {
    //                     if (target[t].nodeName === target[a].nodeName) {
    //                         target[a].remove();
    //                         alerttxt = "한 칸에 하나의 정답만 입력하세요.";
    //                         break;
    //                     }
    //                 }
    //                 if (alerttxt !== '') {
    //                     alert(alerttxt);
    //                     break;
    //                 }
    //                 t++;
    //             }
    //             // 유효성 검사 통과 경우에만 정답 받기 진행
    //             if (goAhead) {
    //                 let val = (target.length !== 3) ? target[0] : target[1];
    //                 //console.log(val);
    //                 if (val.nodeName === 'IMG')
    //                     val = val.src;
    //                 else
    //                     val = val.textContent;
    //                 let answer = {"qid": ancestor};
    //                 let siblings = e.target.parentElement.children;
    //                 for (let s = 0; s < siblings.length; s++) {
    //                     if (siblings[s] === e.target) {
    //                         answer["answer"] = [s + 1, val];
    //                     }
    //                 }
    //                 //console.log(answer);
    //                 // 중복 제거
    //                 if (dragdropTemp.length > 0) {
    //                     let i = 0;
    //                     while (i <= dragdropTemp.length) {
    //                         if (i == dragdropTemp.length) {
    //                             dragdropTemp.push(answer);
    //                             break;
    //                         } else if (dragdropTemp[i].qid === ancestor && dragdropTemp[i].answer[0] === answer.answer[0]) {
    //                             dragdropTemp[i] = answer;
    //                             break;
    //                         }
    //                         i++;
    //                     }
    //                 } else {
    //                     dragdropTemp.push(answer);
    //                 }
    //                  console.log("drop : ",dragdropTemp,dragdropTemp.length);
    //             }
    //         });
    //     }, 1000);
    //     // drop 클릭 시 받은 정답 다시 빼기
    //     drop.addEventListener('click', function (e) {
    //         for (let j = 0; j < dragdropTemp.length; j++) {
    //             if (dragdropTemp[j].answer[1].includes('span') || dragdropTemp[j].answer[1].includes('img'))
    //                 dragdropTemp.splice(j, 1);
    //         }
    //         console.log("dropcancel : ",dragdropTemp,dragdropTemp.length);
    //     });
    // });


    //IT05 (선그어서연결)
    // let selectedDot = null;
    // let leftDots = document.querySelectorAll('#column1 .dot');
    // let rightDots = document.querySelectorAll('#column2 .dot');
    //
    // leftDots.forEach(dot=>{
    //     dot.addEventListener('click',function (e){
    //         e.preventDefault();
    //         console.log(dot);
    //         selectedDot = this;
    //         console.log('left',selectedDot.id);
    //     })
    // })
    // rightDots.forEach(dot => {
    //     dot.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         console.log(dot);
    //         selectedDot = this;
    //         console.log('right', selectedDot.id);
    //     });
    // });
});

//export { textareaTemp,textTemp,selectTemp,checkboxTemp,radioTemp,buttonTemp,hotspotTemp,dragdropTemp };