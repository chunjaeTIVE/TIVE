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
    if(temp.length>0){
        for(let i=0; i<temp.length; i++){
            let goAhead = false;
            if(merge.length===0){
                goAhead = true;
            } else {
                let m=0;
                while(m<merge.length){
                    if(merge[m].qid === temp[i].qid)
                        break;
                    m++;
                }
                if(m === merge.length)
                    goAhead = true;
            }
            if(goAhead){
                let dqid = temp[i].qid;
                let value = [temp[i].answer];
                for(let j=i+1; j<temp.length; j++){
                    if(temp[j].qid === dqid){
                        value.push(temp[j].answer);
                    }
                }
                if(value.length===1)
                    value = value.pop();
                merge.push({"qid" :dqid,"answer" :value});
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
    if(dragdropTemp.length>0 || hotspotTemp.length>0){
        if(dragdropTemp.length>0)
            mergedDragdropTemp = mergeTemp(dragdropTemp);
        else{
            mergedHotspotTemp = mergeTemp(hotspotTemp);
            for(let h=0; h<mergedHotspotTemp.length; h++){
                if(mergedHotspotTemp[h].answer.length>1)
                    mergedHotspotTemp[h].answer.sort((a,b)=>a-b);
            }
        }
    }
    // 전체 문제 문항번호 순으로 sort
    let all = [textareaTemp,textTemp,selectTemp,radioTemp,buttonTemp,mergedHotspotTemp,mergedDragdropTemp];
    let resultTemp = [].concat.apply([],all);
    for(let i=0; i<resultTemp.length; i++){
        resultTemp.sort((a, b) => Number(a.qid) - Number(b.qid));
    }
    console.log("resultTemp :",resultTemp);
    console.log("응답 개수 :", resultTemp.length);
    // 최종 정답 모양 만들기
    for(let j=0; j<resultTemp.length; j++){
        if(j!== resultTemp.length-1 && resultTemp[j].qid === resultTemp[j+1].qid){
            resultTemp[j]["answer"] = resultTemp[j+1].answer;
            resultTemp.splice(j+1,1);
        }
    }
    console.log("최종 통합 후 : ",resultTemp);
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
            //uid: params.p_uid,
            eid: document.querySelector('.wrap').id
            ,body: resultTemp
        })
    }).then(response=>{
        console.log(response);
        if(!response.ok)
            throw new Error();
        else
            return response.text();
    }).then(data=>{console.log(data);
    }).catch (error=>{
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
            if(el.type === 'text' || el.type === 'textarea' || el.type.includes('select'))
                condition = el;
            else
                condition = el.checked;
            //console.log(condition);
            if (condition && ancestor === $(el).closest('.swiper-slide').eq(0).prop('id')){
                //console.log(el, el.value);
                return true;
            }

        })
        .map(el => el.value);
    if(val.length===1)
        val = val.pop();
    if(el.type ==='textarea')
        return { "qid" : ancestor, "textarea" : val };
    else
        return { "qid" : ancestor, "answer" : val };
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

function dupleBtnHotspotPop(on,temp,answer) {
    console.log(on);
    if(on>0){
        temp.push(answer);
    } else {
        if(temp.length>0){
            for(let i=0; i < temp.length; i++) {
                if (temp[i].qid === answer.qid && temp[i].ans === answer.ans) {
                    temp.splice(i,1);
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
            let answer = answerExtract(textareas,textarea);
            //console.log(answer);
            dupleElementPop(textareaTemp,answer);
            //console.log("textarea : ",textareaTemp);
        });
    // let textareas = document.querySelectorAll('.question textarea');
    // let swiperBullets = document.querySelectorAll('.swiper-pagination-bullet'); // 모든 swiper-pagination-bullet 요소 선택
    //
    // textareas.forEach((textarea, index) => {
    //     textarea.setAttribute('data-index', index);
    // });
    //
    //
    // textareas.forEach(textarea => {
    //     textarea.addEventListener('change', function () {
    //         let answer = answerExtract(textareas, textarea);
    //         // console.log(answer);
    //         dupleElementPop(textareaTemp, answer);
    //         console.log("textarea : ", textareaTemp);
    //
    //         let index = textarea.getAttribute('data-index');
    //         let swiperBullet = document.querySelector('#swiper' + (parseInt(index)));
    //
    //         if (textarea.value.trim() !== '') {
    //             if (swiperBullet) swiperBullet.style.backgroundColor = '#d4edda'; // 원하는 배경색
    //         } else {
    //             if (swiperBullet) swiperBullet.style.backgroundColor = ''; // 배경색을 원래대로 돌림
    //         }
    //    });
    });

    // 단답 - text
    let texts = document.querySelectorAll('.question input[type="text"]');
    texts.forEach(text => {
        text.addEventListener('change', function () {
            let answer = answerExtract(texts,text);
            //console.log(answer);
            dupleElementPop(textTemp,answer);
            //console.log("input text : ",textTemp);
        });
    });

    // TT04 select
    let selects = document.querySelectorAll('.question select');
    selects.forEach(select=>{
        select.addEventListener('change', function () {
            let answer = answerExtract(selects,select);
            //console.log(answer);
            dupleElementPop(selectTemp,answer);
            //console.log("select : ",selectTemp);
        });
    });

    // IT02(체크박스)
    let checkboxes = document.querySelectorAll('.question input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let answer = answerExtract(checkboxes,checkbox);
            //console.log(answer);
            dupleElementPop(checkboxTemp,answer);
            //console.log("checkbox : ",checkboxTemp);
        });
    });

    // IT01(라디오버튼)
    let radios = document.querySelectorAll('.question input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            let answer = answerExtract(radios,radio);
            //console.log(answer);
            dupleElementPop(radioTemp,answer);
            //console.log("radio : ",radioTemp);
        });
    });

    //IT02 (버튼)
    let btns = document.querySelectorAll('.text-box button');
    btns.forEach((btn,index)=>{
        btn.addEventListener('click',function (e) {
            //console.log(e.target.textContent);
            e.target.classList.toggle('btn-ans');
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            //console.log(ancestor);
            let answer = {"qid" : ancestor};
            let siblings = e.target.parentElement.children;
            for(let s=0; s<siblings.length; s++){
                if(siblings[s] === e.target){
                    //answer = [...answer,[s+1]];
                    answer["answer"]= s+1;
                }
            }
            //console.log(answer);
            //console.log(`click: ${index + 1} in exam, ${answer.answer} in question`);
            dupleBtnHotspotPop(e.target.classList.length,buttonTemp,answer);
            //console.log("button : ",buttonTemp);
        });
    });

    //TT03 핫스팟
    let svgEle = document.querySelectorAll('svg g');
    svgEle.forEach((group,index)=>{
        group.addEventListener('click', function (e) {
            e.target.classList.toggle('on');
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            //console.log(ancestor);
            let answer = {"qid" : ancestor};
            let siblings = e.target.parentElement.parentElement.children;
            for(let s=0; s<siblings.length; s++){
                if(siblings[s] === e.target.parentElement)
                    answer["answer"] = s+1;
            }
            //console.log(answer);
            //console.log(`click: ${index + 1} in exam, ${answer.ans} in question`);
            dupleBtnHotspotPop(e.target.classList.length,hotspotTemp,answer);
            //console.log("hotspot : ",hotspotTemp);
        });
    });

    // TT07 drag and drop
    let draggables = document.querySelectorAll('.drag');
    let dropArea = document.querySelectorAll('.drop');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
        });
    });
    dropArea.forEach(drop=>{
        setTimeout(()=>{
            drop.addEventListener('drop', function (e) {
                e.preventDefault();
                let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
                //console.log(ancestor);
                let target = (e.target.classList[0] === 'drop') ? e.target.children : e.target.parentElement.children;
                //console.log(target);
                let t=0;
                let goAhead = false;
                let alerttxt = '';
                // 한 칸에 복수개 정답 올렸는지 유효성 검사
                while(t<target.length){
                    if(t+1===target.length){
                        goAhead = true;
                        break;
                    }
                    for(let a=t+1; a<=target.length-1; a++){
                        if(target[t].nodeName === target[a].nodeName){
                            target[a].remove();
                            alerttxt = "한 칸에 하나의 정답만 입력하세요.";
                            break;
                        }
                    }
                    if(alerttxt !== ''){
                        alert(alerttxt);
                        break;
                    }
                    t++;
                }
                // 유효성 검사 통과 경우에만 정답 받기 진행
                if(goAhead){
                    let val = (target.length !==3) ? target[0] : target[1];
                    //console.log(val);
                    if(val.nodeName === 'IMG')
                        val = val.src;
                    else
                        val = val.textContent;
                    let answer = {"qid":ancestor};
                    let siblings = e.target.parentElement.children;
                    for(let s=0; s<siblings.length; s++){
                        if(siblings[s] === e.target){
                            answer["answer"] = [s+1,val];
                        }
                    }
                    //console.log(answer);
                    // 중복 제거
                    if (dragdropTemp.length > 0) {
                        let i = 0;
                        while (i <= dragdropTemp.length) {
                            if (i == dragdropTemp.length) {
                                dragdropTemp.push(answer);
                                break;
                            } else if (dragdropTemp[i].qid === ancestor && dragdropTemp[i].answer[0] === answer.answer[0]) {
                                dragdropTemp[i] = answer;
                                break;
                            }
                            i++;
                        }
                    } else {
                        dragdropTemp.push(answer);
                    }
                    //console.log("drop : ",dragdropTemp);
                }
            });
        },1000);
        // drop 클릭 시 받은 정답 다시 빼기
        drop.addEventListener('click',function (e) {
            for(let j=0; j<dragdropTemp.length; j++){
                if(dragdropTemp[j].answer[1].includes('span')||dragdropTemp[j].answer[1].includes('img'))
                    dragdropTemp.splice(j,1);
            }
            //console.log("dropcancel : ",dragdropTemp);
        });
    });


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