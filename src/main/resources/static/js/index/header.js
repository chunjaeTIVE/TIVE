window.addEventListener('load', function () {
    let navHeader = document.getElementById('nav_header');
    let mainMenu = navHeader.querySelectorAll('.main_menu');

    // 서브메뉴 토글 기능 추가
    mainMenu.forEach(function(menu) {
        menu.addEventListener('click', function() {

            if (menu){
                document.querySelectorAll('.main_menu').forEach(function (mm) {
                    if (mm !== menu){
                        mm.style.borderBottom='3px solid transparent';
                        mm.style.color='black';
                    }
                });
                // 현재 메뉴의 border-bottom을 토글
                if (menu.style.borderBottom === '3px solid lightskyblue') {
                    menu.style.borderBottom = '3px solid transparent';
                    menu.style.color='black';
                } else {
                    menu.style.borderBottom = '3px solid lightskyblue';
                    menu.style.color='lightskyblue';
                }
            }

            let subMenu = menu.querySelector('.sub_menu');
            if (subMenu) {
                // 다른 서브메뉴를 숨기기
                document.querySelectorAll('.sub_menu').forEach(function(sm) {
                    if (sm !== subMenu) {
                        sm.style.display = 'none';
                    }
                });
                // 클릭한 메뉴의 서브메뉴 토글
                subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // 서브메뉴가 아닌 다른 곳을 클릭하거나 스크롤할 때 서브메뉴 숨기기
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main_menu')) { // mainMenu 요소가 아닌 다른 곳 클릭

            document.querySelectorAll('.main_menu').forEach(function (mm) {
                mm.style.borderBottom='3px solid transparent';
                mm.style.color='black';
            });

            document.querySelectorAll('.sub_menu').forEach(function(sm) {
                sm.style.display = 'none';
            });
        }
    });

    document.addEventListener('scroll', function() {
        document.querySelectorAll('.main_menu').forEach(function (mm) {
            mm.style.borderBottom='3px solid transparent';
            mm.style.color='black';
        });

        document.querySelectorAll('.sub_menu').forEach(function(sm) {
            sm.style.display = 'none';
        });
    });

    //처음 로드할 때 슬라이더 버튼 설정 - 슬라이더 버튼이 화면에 있다면 동작
    if(document.getElementById('up_arrow')){
        updateSliderBtn();
    }
})

