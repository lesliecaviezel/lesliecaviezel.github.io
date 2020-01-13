window.onload = function () {
    // 1 获取需要的标签
    let list = $('navlist');
    let nav = list.children[0];
    let allItemA = nav.children;
    let timer = null;
    let sliderBar = this.document.getElementsByClassName("wrapper-sidebar")[0];
    console.log(sliderBar);
    console.log(list);
    console.log(nav);
    // 2 遍历
    for (let i = 0; i < allItemA.length; i++) {
        let itemA = allItemA[i];
        console.log(itemA);
        itemA.onmousedown=function(){
            let barWidth = sliderBar.style.width;
            console.log(barWidth)
            if(barWidth > fixWidth(30) || isNaN(parseInt(barWidth))){
                let begin = 100, end = 30;
                // 缓动动画
                timer = setInterval(function () {
                    begin = begin + (end - begin) * 0.1;
                    sliderBar.style.width = fixWidth(begin) + "px";
                    if(parseInt(begin) === 30){
                        clearInterval(timer); 
                    }
                },15);
            }
        }
    }

    //宽度百分比的方法
    function fixWidth(percent) {
        return document.body.clientWidth * percent / 100; //这里你可以自己做调整 
    }

    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : null;
    }
}