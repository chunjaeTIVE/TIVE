window.onload = function () {
    /*
        let target = document.getElementsByTagName('audio')[0];
        console.log(target.src);
        let path = decodeURIComponent(target.src);
        console.log(path);
        let arr = path.split("http://localhost:8080");
        console.log(arr[0]);
        console.log(arr[1]);
        arr[0] = "https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com";
        target.src = arr[0]+arr[1];
        let newpath = decodeURIComponent(target.src);
        console.log('new',newpath);
    */

// 모든 <audio> 요소를 선택
    let audioElements = document.getElementsByTagName('audio');

// 각 <audio> 요소에 대해 루프를 돌면서 src 속성을 변경
    for (let i = 0; i < audioElements.length; i++) {
        let target = audioElements[i];
        console.log(target.src);
        let path = decodeURIComponent(target.src);
        console.log(path);
        let arr = path.split("http://localhost:8080");
        if (arr.length > 1) {
            console.log(arr[0]);
            console.log(arr[1]);
            arr[0] = "https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com";
            target.src = arr[0] + arr[1];
            let newpath = decodeURIComponent(target.src);
            console.log('new', newpath);
        }
    }
    //img 태그불러오기
    let imgEle = document.getElementsByTagName('img');
    for (let i = 0; i < imgEle.length; i++) {
        let target = imgEle[i];
        console.log(imgEle.src);
        let path = decodeURIComponent(target.src);
        console.log(path);
        let arr = path.split("http://localhost:8080");
        if (arr.length > 1) {
            console.log(arr[0]);
            console.log(arr[1]);
            arr[0] = "https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com";
            target.src = arr[0] + arr[1];
            let newpath = decodeURIComponent(target.src);
            console.log('new', newpath);
        }
    }

    // 모든 <source> 요소를 선택
    let sourceElements = document.getElementsByTagName('source');

// 각 <source> 요소에 대해 루프를 돌면서 src 속성을 변경
    for (let i = 0; i < sourceElements.length; i++) {
        let target = sourceElements[i];
        console.log(target.src);
        let path = decodeURIComponent(target.src);
        console.log(path);

        // 로컬 경로 부분을 분리
        let arr = path.split("http://localhost:8080");
        if (arr.length > 1) {
            console.log(arr[0]);
            console.log(arr[1]);

            // 새 경로 설정
            let newPath = "https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com" + arr[1];
            target.src = newPath;

            let newDecodedPath = decodeURIComponent(target.src);
            console.log('new', newDecodedPath);
        }
    }

// 변경된 src 속성을 가진 <video> 요소 다시 로드
    let videoElements = document.getElementsByTagName('video');
    for (let i = 0; i < videoElements.length; i++) {
        videoElements[i].load();
    }


    // 오디오 중지 불가, 다운 불가능 기능
    let audioList = document.querySelectorAll('audio');
    audioList.forEach((item, index) => {
        item.setAttribute('controlslist', 'nodownload noplaybackrate'); // controlslist 속성 설정

        item.addEventListener('play', (ev) => {
            ev.target.currentTime = 0; // 재생 시간 초기화
            ev.target.style.pointerEvents = 'none'; // pointer events 비활성화
            ev.target.muted = false; // 음소거 해제
        });
    });

    let videoList = document.querySelectorAll('video');

    videoList.forEach((video) => {
        // <video> 요소에 controlslist 속성을 설정합니다.
        video.setAttribute('controlslist', 'nodownload noplaybackrate');

        // Picture-in-Picture 기능을 비활성화합니다.
        video.disablePictureInPicture = true;

        // 비디오가 일시 정지되지 않도록 pause 이벤트를 감지하고 다시 재생합니다.
        video.addEventListener('pause', (event) => {
            video.play(); // 일시 정지된 경우 다시 재생
        });

        // // 비디오 재생을 시작할 때 다른 컨트롤을 비활성화할 수 있습니다.
        // video.addEventListener('play', (event) => {
        //     video.style.pointerEvents = 'none'; // 재생 중에 비디오 컨트롤 비활성화
        // });
    });

    // let videoList = document.querySelectorAll('source');
    // videoList.forEach((item,index)=>{
    //     item.setAttribute('controlslist','nodownload noplaybackrate');
    //     item.disablePictureInPicture = true;
    // })
}