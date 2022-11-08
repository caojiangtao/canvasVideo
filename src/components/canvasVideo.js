

class canvasVideo {
    static PLAY_STATUC = {
        PLAY: 1, //播放
        PAUSE: 0 //暂停
    }
    constructor(data) {
        this.data = data;
        this.statuc = canvasVideo.PLAY_STATUC.PAUSE;
        const wdcVideo = document.getElementById('wdc-video');
        if (wdcVideo) {
            const video = document.createElement("video");
            video.id = 'wdcVideo'
            video.src = data.src
            video.width = data.width
            video.height = data.height
            wdcVideo.appendChild(video)
            this.video = video
        } else {
            console.log('你需要先在页面加入ID为“wdc-video”的DOM元素')
        }
        this.canvas = document.createElement("canvas");
        this.canvas.width = data.width + data.border * 2;
        this.canvas.height = data.height + data.border * 2 + 50;
        this.canvas.id = this.video.id + "Canvas";
        this.video.style.display = "none";
        this.video.parentNode.appendChild(this.canvas);
        this.video.border = data.border
        this.c2d = this.canvas.getContext("2d");
        this.video.addEventListener("play", this.play.bind(this));
        this.video.addEventListener("pause", this.pause.bind(this));

        // Create
        this.videoUi()

    }
    secTotime(s) {
        var t = '';
        if (s > -1) {
            var hour = Math.floor(s / 3600)
            var min = Math.floor(s / 60) % 60
            var sec = s % 60
            if (hour < 10) {
                t = '0' + hour + ":"
            } else {
                t = hour + ":"
            }
            if (min < 10) {
                t += "0"
            }
            t += min + ":"
            if (sec < 10) {
                t += "0"
            }
            t += sec.toFixed(0)
        }
        return t
    }
    render() {
        //绘制进度条
        if (this.statuc == canvasVideo.PLAY_STATUC.PLAY) {
            this.c2d.clearRect(this.data.border / 2,
                this.data.border / 2,
                this.video.width,
                this.video.height);
            this.c2d.drawImage(
                this.video,
                this.data.border / 2,
                this.data.border / 2,
                this.video.width,
                this.video.height
            );
            if (!this.allTime) {
                this.allTime = this.video.duration
            }
            let current = this.video.width * (this.video.currentTime / this.allTime)

            //绘制进度标识
            this.c2d.beginPath();
            this.c2d.fillStyle = 'orange';
            this.c2d.clearRect(this.data.border / 2, this.video.height + 10, this.video.width, 10);
            this.c2d.fillRect(this.data.border / 2, this.video.height + 10, current, 10);
            this.c2d.fill();


            this.c2d.clearRect(this.data.width - 150, this.video.height + 20, 200, 40);
            this.c2d.beginPath();
            this.c2d.fillStyle = '#000';
            this.c2d.fillRect(this.data.width - 150, this.video.height + 20, 156, 36);
            this.c2d.fill();

            this.c2d.font = "14px Arial"
            this.c2d.fillStyle = "#ffffff";
            this.c2d.fillText(this.secTotime(this.video.currentTime) + "/" + this.secTotime(this.allTime), this.data.width - 150, this.video.height + 40)

            console.log('this.video.ended0---->', this.video.ended)

            if (this.video.ended) return
            requestAnimationFrame(this.render.bind(this));
        }


    }
    //绘制播放器
    videoUi() {
        //绘制边框
        this.c2d.fillStyle = '#000';
        this.c2d.fillRect(0, 0, this.data.width + this.data.border, this.video.height + this.data.border + 50);
        this.c2d.fill();

        //绘制进度条底色
        this.c2d.beginPath();
        this.c2d.fillStyle = '#ccc';
        this.c2d.fillRect(this.data.border / 2, this.video.height + 10, this.data.width, 10);
        this.c2d.fill();
        //播放按钮
        this.playImg = new Image();
        console.log('play--->', this.play)
        const playIcon = require('./images/play.png')
        this.palyPosition = {
            x: this.video.width / 2 - 50,
            y: this.video.height / 2 - 50,
            width: 100,
            height: 100,
        }

        this.playImg.onload = () => {
            console.log('play--->111', this.play)
            this.c2d.drawImage(this.playImg, this.palyPosition.x, this.palyPosition.y, this.palyPosition.width, this.palyPosition.height);
            console.log('play--->', this.play)
        }
        this.playImg.src = playIcon;

        // minPlayIcon播放按钮
        this.minPlay = new Image();
        const playIcon2 = require('./images/minPlay.png')
        this.minPalyPosition = {
            x: 10,
            y: this.video.height + 23,
            width: 30,
            height: 30,
        }
        this.minPlay.onload = () => {
            this.c2d.clearRect(this.minPalyPosition.x, this.minPalyPosition.y, this.minPalyPosition.width, this.minPalyPosition.height);
            this.c2d.beginPath();
            this.c2d.fillStyle = '#000';
            this.c2d.fillRect(this.minPalyPosition.x, this.minPalyPosition.y, this.minPalyPosition.width, this.minPalyPosition.height);
            this.c2d.fill();
            this.c2d.drawImage(this.minPlay, this.minPalyPosition.x, this.minPalyPosition.y, this.minPalyPosition.width, this.minPalyPosition.height);
        }

        this.minPlay.src = playIcon2;
    }
    play() {
        console.log("播放", this.video);
        if (this.video.paused) this.video.play();
        this.statuc = canvasVideo.PLAY_STATUC.PLAY;
        const pauseIcon = require('./images/pause.png')
        this.minPlay.src = pauseIcon;
        this.render();
        return this;
    }

    pause() {
        console.log("暂停");
        if (this.video.played) this.video.pause();
        this.statuc = canvasVideo.PLAY_STATUC.PAUSE;
        const playIcon = require('./images/minPlay.png')
        this.minPlay.src = playIcon;
        return this;
    }
}

let initVideo = {
    init(data) {
        let video = new canvasVideo(data)
        console.log('video--->', video);
        let _canvas = document.getElementById('wdcVideoCanvas')
        _canvas.onclick = (e) => {
            function pause(video) {
                if (video.statuc == 0) {
                    return video.play.bind(video)
                } else {
                    return video.pause.bind(video)
                }
            }
            initVideo.playClick(e, video.palyPosition, video.play.bind(video));//播放
            initVideo.playClick(e, video.minPalyPosition, pause(video));//暂停
        }

    },
    enfCallBack(callback) {
        callback()
    },
    getEventPosition(ev) {
        var x, y;
        if (ev.offsetX || ev.offsetX == 0) { // Opera
            x = ev.offsetX;
            y = ev.offsetY;
        }
        return { x: x, y: y };
    },
    playClick(e, position, callback) {
        let p = this.getEventPosition(e)
        console.log('p--->', p, position)
        if (p.x >= position.x && p.y >= position.y && p.x <= position.x + position.width && p.y <= position.y + position.height) {
            callback()
        }
    }
}


export default initVideo