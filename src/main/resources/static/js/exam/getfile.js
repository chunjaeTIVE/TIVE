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

    // let sourceEle = document.getElementsByTagName('source');
    // for (let i = 0; i < sourceEle.length; i++) {
    //     let target = sourceEle[i];
    //     console.log(sourceEle.src);
    //     let path = decodeURIComponent(target.src);
    //     console.log(path);
    //     let arr = path.split("http://localhost:8080");
    //     if (arr.length > 1) {
    //         console.log(arr[0]);
    //         console.log(arr[1]);
    //         arr[0] = "https://kdt-java-5-2.s3.ap-northeast-2.amazonaws.com";
    //         target.src = arr[0] + arr[1];
    //         let newpath = decodeURIComponent(target.src);
    //         console.log('new', newpath);
    //     }
    // }
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


    // let imgtarget = document.getElementsByTagName('img')[0];
        // console.log(imgtarget.src);
        // //한글경로를 decode
        // let imgpath = decodeURIComponent(imgtarget.src);
        // console.log(imgpath);
        // let imgarr = path.split("/img");
        // console.log(imgarr);

    }

// audiolist, videolist 메서드 여기서 활용