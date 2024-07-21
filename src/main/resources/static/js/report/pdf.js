
function pdfPrint() {

    var printArea = document.getElementById('print_area');
    var options = {
        scale: 2, // 스케일을 높여 해상도를 개선
        useCORS: true, // 이미지가 다른 서버에 있을 경우 CORS 사용
    };

    html2canvas(printArea, options).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; // A4 size width in mm
        var pageHeight = imgWidth * 1.414; // A4 size height in mm
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 0;

        // Add the first page
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if content spans more than one page
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF
        doc.save('sample.pdf');
    });
}

window.addEventListener('load', function () {

    if (document.getElementById('print_btn')){
        let print_btn = document.getElementById('print_btn');

        print_btn.addEventListener('click', function () {
            pdfPrint();
        });
    }

})