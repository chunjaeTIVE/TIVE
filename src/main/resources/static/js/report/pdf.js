
function pdfPrint() {
    let printArea = document.getElementById('print_area');

    var options = {
        scale: 2, // 스케일을 높여 해상도를 개선
        useCORS: true, // 이미지가 다른 서버에 있을 경우 CORS 사용
    };


    html2canvas(printArea, options).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; // A4 사이즈 너비 (mm)
        var pageHeight = imgWidth * 1.414; // A4 사이즈 높이 (mm)
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm'); //페이지 방향, 단위
        var position = 0;

        // 첫 페이지 추가
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 콘텐츠가 여러 페이지에 걸칠 경우 추가 페이지 추가
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }


        //pdf 이름 만들기
        let subject = document.getElementById('subject').value;
        let round = document.getElementById('round').value;
        let name = document.getElementById("user_info").textContent;

        // PDF 저장
        doc.save(`${subject} ${round}회 ${name}.pdf`);
    });
}

window.addEventListener('load', function() {
    if (document.getElementById('print_btn')) {
        let print_btn = document.getElementById('print_btn');
        let select_form = document.getElementById('selectForm');

        print_btn.addEventListener('click', function() {
            select_form.style.visibility="hidden";
            pdfPrint();
            select_form.style.visibility="visible";
        });
    }
});