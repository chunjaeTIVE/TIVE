//
// function pdfPrint() {
//
//     var printArea = document.getElementById('print_area');
//     var options = {
//         scale: 2, // 스케일을 높여 해상도를 개선
//         useCORS: true, // 이미지가 다른 서버에 있을 경우 CORS 사용
//     };
//
//     html2canvas(printArea, options).then(function(canvas) {
//         var imgData = canvas.toDataURL('image/png');
//         var imgWidth = 210; // A4 size width in mm
//         var pageHeight = imgWidth * 1.414; // A4 size height in mm
//         var imgHeight = canvas.height * imgWidth / canvas.width;
//         var heightLeft = imgHeight;
//
//         var doc = new jsPDF('p', 'mm');
//         var position = 0;
//
//         // Add the first page
//         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//
//         // Add new pages if content spans more than one page
//         while (heightLeft >= 20) {
//             position = heightLeft - imgHeight;
//             doc.addPage();
//             doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;
//         }
//
//         // Save the PDF
//         doc.save('sample.pdf');
//     });
// }
//
// window.addEventListener('load', function () {
//
//     if (document.getElementById('print_btn')){
//         let print_btn = document.getElementById('print_btn');
//
//         print_btn.addEventListener('click', function () {
//             pdfPrint();
//         });
//     }
//
// })


function pdfPrint() {
    var printArea = document.getElementById('print_area');

    // Calculate the full height and width of the content
    var fullWidth = printArea.scrollWidth;
    var fullHeight = printArea.scrollHeight;

    console.log('캡쳐 너비: ', fullWidth);
    console.log('캡쳐 높이: ', fullHeight);
    var options = {
        scale: 2, // 스케일을 높여 해상도를 개선
        useCORS: true, // 이미지가 다른 서버에 있을 경우 CORS 사용
        scrollX: -window.scrollX, // 시작 X 좌표는 0으로 설정
        scrollY: -window.scrollY, // 시작 Y 좌표는 0으로 설정
        width: fullWidth, // 캡처할 영역의 전체 너비
        height: fullHeight, // 캡처할 영역의 전체 높이
    };

    console.log("시작점 X: ", options.scrollX);
    console.log("시작점 Y: ", options.scrollY);

    html2canvas(printArea, options).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; // A4 사이즈 너비 (mm)
        var pageHeight = imgWidth * 1.414; // A4 사이즈 높이 (mm)
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm'); //페이지 방향, 단위
        var position = 10;

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

        // PDF 저장
        doc.save('sample.pdf');
    });
}

window.addEventListener('load', function() {
    if (document.getElementById('print_btn')) {
        let print_btn = document.getElementById('print_btn');

        print_btn.addEventListener('click', function() {
            pdfPrint();
        });
    }
});