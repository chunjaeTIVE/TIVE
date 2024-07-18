document.addEventListener('DOMContentLoaded', function () {
    // IT09 - 단답 (textarea)
    let textareaTemp = [];
    let textareas = document.querySelectorAll('.question textarea');

    textareas.forEach(textarea => {
        textarea.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            let val = Array.from(textareas)
                .filter(textarea => {
                    if (textarea && ancestor === $(textarea).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(textarea => textarea.value);
            let answer = [ancestor, val];
            //console.log(answer);
            if (textareaTemp.length > 0) {
                let i = 0;
                while (i <= textareaTemp.length) {
                    if (i == textareaTemp.length) {
                        textareaTemp = [...textareaTemp, answer];
                        break;
                    } else if (textareaTemp[i][0] === ancestor) {
                        textareaTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                textareaTemp = [...textareaTemp, answer];
                //console.log("0 보다 크지 않음")
            }
            console.log("textarea : ",textareaTemp);
        });
    });

    // 단답 - text
    let textTemp = [];
    let texts = document.querySelectorAll('.question input[type="text"]');

    texts.forEach(text => {
        text.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            let val = Array.from(texts)
                .filter(text => {
                    if (text && ancestor === $(text).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(text => text.value);
            let answer = [ancestor, val];
            //console.log(answer);
            if (textTemp.length > 0) {
                let i = 0;
                while (i <= textTemp.length) {
                    if (i == textTemp.length) {
                        textTemp = [...textTemp, answer];
                        break;
                    } else if (textTemp[i][0] === ancestor) {
                        textTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                textTemp = [...textTemp, answer];
                //console.log("0 보다 크지 않음")
            }
            console.log("input text : ",textTemp);
        });
    });

    // IT02(체크박스)
    let checkboxTemp = [];
    let checkboxes = document.querySelectorAll('.question input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            let val = Array.from(checkboxes)
                .filter(checkbox => {
                    if (checkbox.checked && ancestor === $(checkbox).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(checkbox => checkbox.value);

            let answer = [ancestor, val];
            //console.log(answer);
            if (checkboxTemp.length > 0) {
                let i = 0;
                while (i <= checkboxTemp.length) {
                    if (i == checkboxTemp.length) {
                        checkboxTemp = [...checkboxTemp, answer];
                        break;
                    } else if (checkboxTemp[i][0] === ancestor) {
                        checkboxTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                checkboxTemp = [...checkboxTemp, answer];
                //console.log("0 보다 크지 않음")
            }
            console.log("checkbox : ",checkboxTemp);
        });
    });

    // IT01(라디오버튼)
    let radioTemp = [];
    let radios = document.querySelectorAll('.question input[type="radio"]');

    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            console.log(ancestor);
            let val = Array.from(radios)
                .filter(radio => {
                    if (radio.checked && ancestor === $(radio).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(radio => radio.value);

            let answer = [ancestor, val];
            //console.log(answer);
            if (radioTemp.length > 0) {
                let i = 0;
                while (i <= radioTemp.length) {
                    if (i == radioTemp.length) {
                        radioTemp = [...radioTemp, answer];
                        break;
                    } else if (radioTemp[i][0] === ancestor) {
                        radioTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                radioTemp = [...radioTemp, answer];
                //console.log("0 보다 크지 않음")
            }
            console.log("radio : ",radioTemp);
        });
    });

    // TT04 select
    let selectTemp = [];
    let selects = document.querySelectorAll('.question select');
    selects.forEach(select=>{
        select.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            console.log(ancestor);
            let val = Array.from(selects)
                .filter(select => {
                    if (select && ancestor === $(select).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(select => select.value);

            let answer = [ancestor, val];
            //console.log(answer);
            if (selectTemp.length > 0) {
                let i = 0;
                while (i <= selectTemp.length) {
                    if (i == selectTemp.length) {
                        selectTemp = [...selectTemp, answer];
                        break;
                    } else if (selectTemp[i][0] === ancestor) {
                        selectTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                selectTemp = [...selectTemp, answer];
                //console.log("0 보다 크지 않음")
            }
            console.log("select : ",selectTemp);
        });
    });

    //IT02 (버튼)
    let buttonTemp = [];
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
                    //console.log("yes : ",s);
                    //answer = [...answer,[s+1]];
                    answer.splice(answer.length,0,s+1);
                }
            }
            console.log(e.target.classList.length);
            if(e.target.classList.length>0){
                buttonTemp = [...buttonTemp, answer];
            } else {
                if(buttonTemp.length>0){
                    for(let i=0; i < buttonTemp.length; i++) {
                        if (buttonTemp[i][0] === ancestor && buttonTemp[i][1] === answer[1]) {
                            buttonTemp.splice(i,1);
                            break;
                        }
                    }
                }
            }
            //console.log(answer);
            console.log(`click: ${index + 1} in exam, ${answer[1]} in question`);
            console.log("button : ",buttonTemp);
        });
    });

    //TT03 핫스팟
    let hotspotTemp = [];
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
                    //console.log("yes : ",s);
                    //answer = [...answer,[s+1]];
                    answer.splice(answer.length,0,s+1);
                }
            }
            console.log(e.target.classList.length);
            if(e.target.classList.length>0){
                hotspotTemp = [...hotspotTemp, answer];
            } else {
                if(hotspotTemp.length>0){
                    for(let i=0; i < hotspotTemp.length; i++) {
                        if (hotspotTemp[i][0] === ancestor && hotspotTemp[i][1] === answer[1]) {
                            hotspotTemp.splice(i,1);
                            break;
                        }
                    }
                }
            }
            //console.log(answer);
            console.log(`click: ${index + 1} in exam, ${answer[1]} in question`);
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

    // TT07 drag and drop  if 처리를 통해 이 유형이 있는 경우에만 동작해야함
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
    let dragdropTemp = [];
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
                        dragdropTemp = [...dragdropTemp, answer];
                        break;
                    } else if (dragdropTemp[i][0] === ancestor && dragdropTemp[i][2] === answer[2]) {
                        dragdropTemp[i] = answer;
                        //console.log("0보다 크고 if")
                        break;
                    }
                    i++;
                }
            } else {
                dragdropTemp = [...dragdropTemp, answer];
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