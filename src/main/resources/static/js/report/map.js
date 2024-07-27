window.onload = function () {

    var map;
    var markers = []; // 마커들을 담을 배열

    let localCode = "7010000";
    if (document.getElementById('localCode').value){
        localCode = document.getElementById('localCode').value; // 시도교육청코드 설정
    }

    console.log("지역코드: ", localCode);

    // Naver Map 초기화
    function loadNaverMap(lat, lng) {
        console.log("네이버 맵 초기화:", lat, lng);
        map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(lat, lng), // 좌표
            zoom: 13, // 지도의 초기 줌 레벨
            minZoom: 6, // 지도의 최소 줌 레벨
            draggable: true, //마우스로 드래그 해서 볼 수 있음
            pinchZoom: true, //터치스크린이나 모바일에서 손가락으로 확대해서 볼 수 있음
            scrollWheel: true, //스크롤로 확대 가능
            disableKineticPan: false, // 관성 드래깅
            scaleControl: false, // 스케일 컨트롤러
            logoControl: true, // 로고 컨트롤러
            logoControlOptions: { //로고 위치
                position: naver.maps.Position.BOTTOM_RIGHT
            },
            mapDataControl: false,
            zoomControl: true, // 줌 컨트롤러
            zoomControlOptions: { //줌 컨트롤러 위치
                position: naver.maps.Position.TOP_LEFT
            },
            mapTypeControl: false
        });
    }

    function fetchData(){

        // 로딩 중인 화면 보이기
        document.getElementById('loading').style.display = 'block';
        document.getElementById('map').style.display = 'none';

        fetch(`/schools?localCode=${localCode}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response);
            if (!response.ok)
                throw new Error('Network response was not ok');
            else
                return response.json();
        }).then(data => {
            console.log("받은 데이터:", data);
            addMarkersFromData(data);

            // 로딩 중인 화면 숨기기, 지도 화면 보이기
            document.getElementById('loading').style.display = 'none';
            document.getElementById('map').style.display = 'block';

        }).catch(error => {
            console.error('Fetch error:', error);
        });
    }

    // 데이터 배열에서 마커 추가
    function addMarkersFromData(data) {
        data.forEach(park => {
            const latitude = parseFloat(park.위도);
            const longitude = parseFloat(park.경도);
            //const schoolName = park.학교명;

            //console.log("[테스트] 위도: ", latitude, " 경도:", longitude);
            addMarker(latitude, longitude);
            //console.log("학교 이름:", schoolName); // 학교 이름 콘솔에 출력
        });
    }

    // 마커 추가 함수
    function addMarker(lat, lng) {
        // 해당 위치에 마커 추가
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: map
        });
        markers.push(marker); // 마커를 배열에 추가
        //console.log("[테스트] 마커 추가됨:", marker);
    }

    //지도 초기화 호출
    let EduLat = 0;
    let EduLng = 0;
    switch (localCode) {
        case "7530000": //경기도교육청일 경우
            EduLat = 37.2835;
            EduLng = 127.0467;
            break;
        case "7150000": // 부산광역시교육청일 경우
            EduLat = 35.1796;
            EduLng = 129.0740;
            break;
        case "7240000": //대구광역시교육청일 경우
            EduLat = 35.8715;
            EduLng = 128.6015;
            break;
        case "7310000": //인천광역시교육청일 경우
            EduLat=37.4484;
            EduLng=126.6573;
            break;
        case "7380000": //광주광역시교육청일 경우
            EduLat=35.1601;
            EduLng=126.8514;
            break;
        case "7430000": //대전광역시교육청일 경우
            EduLat=36.3482;
            EduLng=127.3845;
            break;
        case "7480000": //울산광역시교육청일 경우
            EduLat=35.5397;
            EduLng=129.3114;
            break;
        case "7801000": //강원특별자치도교육청일 경우
            EduLat=37.8662;
            EduLng=127.7430;
            break;
        case "8000000": //충청북도교육청일 경우
            EduLat=36.6342;
            EduLng=127.4560;
            break;
        case "8140000": //충청남도교육청일 경우
            EduLat=36.6554;
            EduLng=126.8031;
            break;
        case "8321000": //전북특별자치도교육청일 경우
            EduLat=35.8242;
            EduLng=127.1084;
            break;
        case "8490000": //전라남도교육청일 경우
            EduLat=34.8115;
            EduLng=126.4418;
            break;
        case "8750000": //경상북도교육청일 경우
            EduLat=36.5788;
            EduLng=128.5050;
            break;
        case "9010000": //경상남도교육청일 경우
            EduLat=35.2371;
            EduLng=128.6926;
            break;
        case "9290000": //제주특별자치도교육청일 경우
            EduLat=33.4987;
            EduLng=126.5312;
            break;
        case "9300000": //세종특별자치시교육청일 경우
            EduLat=36.4821;
            EduLng=127.2894;
            break;
        default: //기본은 서울특별시교육청 좌표
            EduLat = 37.570452;
            EduLng = 126.976792;
    }

    loadNaverMap(EduLat, EduLng);
    fetchData();
}


//유저의 지역 교육청 이름과 순위 목록의 교육청 이름을 비교해서 유저에 해당하는 교육청에 형광펜 칠하는 코드
document.addEventListener('DOMContentLoaded', function() {
    const userLCname = document.getElementById('localName').value; //유저의 지역 교육청 이름
    const rows = document.querySelectorAll('tbody tr'); // 순위 리스트 목록

    rows.forEach(row => { // 순위 리스트 목록을 돌면서
        const localNameSpan = row.querySelector('.localName span').textContent; // 순위 목록에 있는 지역 교육청 이름
        if (localNameSpan === userLCname) { // 유저 지역 교육청 이름과 순위 목록에 있는 교육청 이름이 같다면
            row.classList.add('highlight_pen'); // 강조표시
        }
    });
});