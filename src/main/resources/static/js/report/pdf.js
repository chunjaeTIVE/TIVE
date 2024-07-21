window.addEventListener('load', function () {
    let print_btn = document.getElementById('print_btn');

    print_btn.addEventListener('click', function () {
        let printArea = document.getElementById('print_area');
        let opt = {
            margin:       0.5,
            filename:     'output.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'in', format: 'b5', orientation: 'portrait' }
        };

        // html2pdf 라이브러리를 사용하여 PDF로 변환
        html2pdf()
            .from(printArea)
            .set(opt)
            .save();
    });
})