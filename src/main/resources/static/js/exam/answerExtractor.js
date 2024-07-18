let textareaTemp = [];
let textTemp = [];
let selectTemp = [];
let checkboxTemp = [];
let radioTemp = [];
let buttonTemp = [];
let hotspotTemp = [];
let dragdropTemp = [];

function answerExtract(els, el) {
    //console.log(el.type);
    let ancestor = $(el).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
    console.log(ancestor);
    let val = Array.from(els)
        .filter(el => {
            let condition;
            if(el.type === 'text' || el.type === 'textarea' || el.type === 'select')
                condition = el;
            else
                condition = el.checked;
            if (condition && ancestor === $(el).closest('.swiper-slide').eq(0).prop('id'))
                return true;
        })
        .map(el => el.value);
    return [ancestor, val];
}

function dupleElementPop(temp, answer) {
    if (temp.length > 0) {
        let i = 0;
        while (i <= temp.length) {
            if (i == temp.length) {
                temp.push(answer);
                break;
            } else if (temp[i][0] === answer[0]) {
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
                if (temp[i][0] === answer[0] && temp[i][1] === answer[1]) {
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
            console.log("textarea : ",textareaTemp);
        });
    });

    // 단답 - text
    let texts = document.querySelectorAll('.question input[type="text"]');
    texts.forEach(text => {
        text.addEventListener('change', function () {
            let answer = answerExtract(texts,text);
            //console.log(answer);
            dupleElementPop(textTemp,answer);
            console.log("input text : ",textTemp);
        });
    });

    // TT04 select
    let selects = document.querySelectorAll('.question select');
    selects.forEach(select=>{
        select.addEventListener('change', function () {
            let answer = answerExtract(selects,select);
            //console.log(answer);
            dupleElementPop(selectTemp,answer);
            console.log("select : ",selectTemp);
        });
    });

    // IT02(체크박스)
    let checkboxes = document.querySelectorAll('.question input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let answer = answerExtract(checkboxes,checkbox);
            //console.log(answer);
            dupleElementPop(checkboxTemp,answer);
            console.log("checkbox : ",checkboxTemp);
        });
    });

    // IT01(라디오버튼)
    let radios = document.querySelectorAll('.question input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            let answer = answerExtract(radios,radio);
            //console.log(answer);
            dupleElementPop(radioTemp,answer);
            console.log("radio : ",radioTemp);
        });
    });

    //IT02 (버튼)
    let btns = document.querySelectorAll('.text-box button');
    btns.forEach((btn,index)=>{
        btn.addEventListener('click',function (e) {
            //console.log(e.target.textContent);
            e.target.classList.toggle('btn-ans');
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            console.log(ancestor);
            let answer = [ancestor];
            let siblings = e.target.parentElement.children;
            for(let s=0; s<siblings.length; s++){
                if(siblings[s] === e.target){
                    //answer = [...answer,[s+1]];
                    answer.splice(answer.length,0,s+1);
                }
            }
            //console.log(answer);
            console.log(`click: ${index + 1} in exam, ${answer[1]} in question`);
            dupleBtnHotspotPop(e.target.classList.length,buttonTemp,answer);
            console.log("button : ",buttonTemp);
        });
    });

    //TT03 핫스팟
    let svgEle = document.querySelectorAll('svg g');
    svgEle.forEach((group,index)=>{
        group.addEventListener('click', function (e) {
            e.target.classList.toggle('on');
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            console.log(ancestor);
            let answer = [ancestor];
            let siblings = e.target.parentElement.parentElement.children;
            for(let s=0; s<siblings.length; s++){
                if(siblings[s] === e.target.parentElement){
                    //answer = [...answer,[s+1]];
                    answer.splice(answer.length,0,s+1);
                }
            }
            //console.log(answer);
            console.log(`click: ${index + 1} in exam, ${answer[1]} in question`);
            dupleBtnHotspotPop(e.target.classList.length,hotspotTemp,answer);
            console.log("hotspot : ",hotspotTemp);
        });
    });
    // let svgLines = document.querySelectorAll('svg line');
    //
    // svgLines.forEach(function (line) {
    //     line.addEventListener('click', function () {
    //         this.remove();
    //     });
    // });

    // TT07 drag and drop
    let draggables = document.querySelectorAll('.drag');
    let dropArea = document.querySelectorAll('.drop');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
        });
    });
    // dropArea.addEventListener('dragover', function (e) {
    //     e.preventDefault();
    // })
    dropArea.forEach(drop=>{
        drop.addEventListener('drop', function (e) {
            e.preventDefault();
            let ancestor = $(e.target).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            console.log(ancestor);
            let val = e.dataTransfer.getData('text/plain');
            let answer = [ancestor, val];
            let siblings = e.target.parentElement.children;
            for(let s=0; s<siblings.length; s++){
                if(siblings[s] === e.target){
                    console.log("yes : ",s);
                    answer.splice(answer.length,0,s+1);
                }
            }
            console.log(answer);
            if (dragdropTemp.length > 0) {
                let i = 0;
                while (i <= dragdropTemp.length) {
                    if (i == dragdropTemp.length) {
                        dragdropTemp.push(answer);
                        break;
                    } else if (dragdropTemp[i][0] === ancestor && dragdropTemp[i][2] === answer[2]) {
                        dragdropTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                //dragdropTemp = [...dragdropTemp, answer];
                dragdropTemp.push(answer);
                //console.log("0 보다 크지 않음")
            }
            console.log("drop : ",dragdropTemp);
        });
        drop.addEventListener('click',function (e) {
            //console.log(e.target.textContent);
            let val = e.target.textContent;
            for(let j=0; j<dragdropTemp.length; j++){
                if(dragdropTemp[j][1] == val)
                    dragdropTemp.splice(j,1);
            }
            console.log("dropcancel : ",dragdropTemp);
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