window.onload = function () {

    var map;
    var markers = []; // 마커들을 담을 배열

    const localCode = document.getElementById('localCode').value; // 시도교육청코드 설정
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
        }).catch(error => {
            console.error('Fetch error:', error);
        });
    }

    // 데이터 배열에서 마커 추가
    function addMarkersFromData(data) {
        data.forEach(park => {
            const latitude = parseFloat(park.위도);
            const longitude = parseFloat(park.경도);
            const schoolName = park.학교명;

            console.log("[테스트] 위도: ", latitude, " 경도:", longitude);
            addMarker(latitude, longitude);
            console.log("학교 이름:", schoolName); // 학교 이름 콘솔에 출력
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
        console.log("[테스트] 마커 추가됨:", marker);
    }

    //지도 초기화 호출
    let EduLat = 0;
    let EduLng = 0;
    switch (localCode) {
        case "7530000": //경기도 교육청일 경우
            EduLat = 37.2835;
            EduLng = 127.0467;
            console.log("경기도 교육청.............")
            break;
        default:
            EduLat = 37.570452;
            EduLng = 126.976792;
    }

    loadNaverMap(EduLat, EduLng);
    fetchData();
}