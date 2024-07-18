document.addEventListener('DOMContentLoaded',(e)=>{
    let exam = document.querySelectorAll('.wrap');
    exam.forEach(ele=>{
        let eid = ele.id;
        console.log("ExamId: ",eid);
        if(eid==='1'){
            ele.classList.add('class1-korean');
        }
        if(eid==='2'){
            ele.classList.add('class-english');
        }
        if(eid==='3'){
            ele.classList.add('class-math');
        }
        if(eid==='25'){
            ele.classList.add('class-science');
            ele.classList.add('ui-test2-class2-science');
        }
    })

})