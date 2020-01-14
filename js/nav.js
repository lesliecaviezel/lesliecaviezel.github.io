window.onload = function () {
    let webOpenContent = sessionStorage.getItem("webState");
    // 获取需要的标签
    let list = $('navlist');
    let nav = list.children[0];
    let allItemA = nav.children;
    let timer = null;
    let sliderBar = this.document.getElementsByClassName("wrapper-sidebar")[0];

    console.log(webOpenContent)
    // 在当前页面刷新，如果已经是open的，直接设置为30%宽度
    if (webOpenContent === "open") {
        sliderBar.style.width = fixWidth(30) + "px";
        console.log("isOpen")
        return;
    }else{
        sliderBar.style.width = fixWidth(100) + "px";
        console.log("notOpen")
    }

    if (!IsPC()) return;
    // 遍历
    for (let i = 0; i < allItemA.length; i++) {
        let itemA = allItemA[i];
        itemA.onmousedown = function () {
            if (!IsPC()) return;
            console.log("isPC")
            let barWidth = sliderBar.style.width;
            console.log("width "+ parseInt(barWidth) + "  "+fixWidth(30))
            if (parseInt(barWidth) > fixWidth(30)) {
                sessionStorage.setItem("webState", "open");
                console.log("changeOpen")
                let begin = 100, end = 30;
                // 缓动动画
                timer = setInterval(function () {
                    begin = begin + (end - begin) * 0.1;
                    sliderBar.style.width = fixWidth(parseInt(begin)) + "px";
                    if (parseInt(begin) === 30) {
                        clearInterval(timer);
                    }
                }, 15);
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

    function IsPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
}