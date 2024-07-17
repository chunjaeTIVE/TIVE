document.addEventListener('DOMContentLoaded', function () {
    // IT09 - 단답
    let textareaTemp = [];
    let textareas = document.getElementsByName('textarea');

    textareas.forEach(textarea => {
        textarea.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            let val = Array.from(textareas)
                .filter(textarea => {
                    if (textarea && ancestor === $(textarea).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(textarea => textarea.value);
            let answer = [ancestor, val[0]];
            console.log(answer);
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
            console.log(textareaTemp);
        })
    });


    // IT02(체크박스)
    let checkboxTemp = [];
    let checkboxes = document.querySelectorAll('.answer-input-type input[type="checkbox"]');

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
            console.log(answer);
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
            console.log(checkboxTemp);
        })
    })

    // IT01(라디오버튼)
    let radioTemp = [];
    let radios = document.querySelectorAll('.answer-input-type  input[type="radio"]');

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

            let answer = [ancestor, val[0]];
            console.log(answer);
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
            console.log(radioTemp);
        })
    })

    // TT04 select
    let selects = document.querySelectorAll('.select-box select');
    selects.forEach(select=>{
        select.addEventListener('change', function () {
            let ancestor = $(this).closest('.swiper-slide').find('input[type="hidden"]').prop('id');
            console.log(ancestor);
            let val = Array.from(selects)
                .filter(select => {
                    if (select.value && ancestor === $(select).closest('.swiper-slide').eq(0).prop('id'))
                        return true;
                })
                .map(select => select.value);

            let answer = [ancestor, val];
            console.log(answer);
            // if (radioTemp.length > 0) {
            //     let i = 0;
            //     while (i <= radioTemp.length) {
            //         if (i == radioTemp.length) {
            //             radioTemp = [...radioTemp, answer];
            //             break;
            //         } else if (radioTemp[i][0] === ancestor) {
            //             radioTemp[i] = answer;
            //             //console.log("0보다 크고 if")
            //             break;
            //         }
            //         i++;
            //     }
            // } else {
            //     radioTemp = [...radioTemp, answer];
            //     //console.log("0 보다 크지 않음")
            // }
            // console.log(radioTemp);
        })
    });

    //TT03 핫스팟
    let svgEle = document.querySelectorAll('svg g');
    svgEle.forEach(function (group, index) {
        group.addEventListener('click', function () {
            this.classList.toggle('on');
            console.log(`click: ${index + 1} g tag`);
        })
    })
    let svgLines = document.querySelectorAll('svg line');

    svgLines.forEach(function (line) {
        line.addEventListener('click', function () {
            this.remove();
        });
    });

    // TT07 drag and drop
    let draggables = document.querySelectorAll('.drag');
    let dropArea = document.querySelector('.drop-area .drop');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
        });
    });
    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
    })
    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        let data = e.dataTransfer.getData('text/plain');
        console.log('Drop: ', data);
    })

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