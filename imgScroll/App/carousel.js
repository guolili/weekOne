let defaultD = {
    flag: true
} 
class loadPage {
    constructor(config = defaultD) { // 构造函数 
        Object.assign(defaultD, config);// 参数设置
        this.flag = config.flag;// 实例属性
        this.count = 0;
        this.startY = 0;
        this.moveY = 0;
        this.newImg = [];// 存储img
        this.init();
    }
    init() {// 实例方法
        this.responseJson();
        this.mobileFn();
    }
    initPage() {//初始加载图片
        if (this.flag) {
            this.count++;
            if (this.count > this.newImg.length - 1) {
                this.count = 0;
            }
            this.getImage(this.newImg[this.count]).then((images) => {
                document.body.appendChild(images);
            })
        } else {
            this.count++;
            if (this.count > this.newImg.length -1 ) {return;}// 图片的
            this.getImage(this.newImg[this.count]).then((images) => {
                document.body.appendChild(images);
            })
        }
    }
    judge() {//判断
        if (this.flag) {
            Promise.all(this.newImg).then((img) => {//全部图片
                img.map((imgs) => {
                    this.getImage(imgs).then((images) => {
                        document.body.appendChild(images)
                    })
                })
            })
        } else {
            this.getImage(this.newImg[this.count]).then((images) => {
                document.body.appendChild(images);//一张图片
            })
        }
    }
    mobileFn() {//触发时动态加载
        document.addEventListener("touchstart", (e) => {
            this.startY = e.touches[0].clientY;
        })
        document.addEventListener("touchmove", (e) => {
            this.moveY = e.touches[0].clientY;
        })
        document.addEventListener("touchend", () => {
            if (this.moveY - this.startY < -150) { // 加载的条件
                this.initPage();
            }
        })
    }
    responseJson() {//ajax请求调用
        this.ajaxFn("http://localhost:8080/data").then((result) => {
            let imgSrc = JSON.parse(result);
            imgSrc.map((item) => {
                this.newImg.push(item);
            })
            this.judge();// 加载图片判断
        })
    }
    getImage(url) {//加载图片
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image)
            }
            image.onerror = () => {
                reject(new Error("error"))
            }
            image.src = url;
        })
    }
    ajaxFn(url) { //ajax
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("get", url, true);
            xhr.send(null);
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4){ 
                    return;
                }
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error('error : 400'))
                }
            }
        })
    }
}