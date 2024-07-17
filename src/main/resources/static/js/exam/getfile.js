window.onload=function () {
    let target = document.getElementsByTagName('audio')[0];
    console.log(target.src);
    let path = decodeURIComponent(target.src);
    console.log(path);
    let arr = path.split("/audio");
    console.log(arr);
    target.src = arr[0]+arr[1];


}

// audiolist, videolist 메서드 여기서 활용