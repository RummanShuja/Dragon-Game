let count=0;
let cross = true;
let gameover = false;
let audioStart = new Audio('music.mp3');
let audioStop = new Audio('gameover.mp3');
// audioStart.loop=true;
setTimeout(()=>{
    audioStart.play();
},100)
document.onkeydown = function(e){
    if(e.code=="ArrowUp"){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },800);
    }
    if(e.code=="ArrowRight"){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
    }
    if(e.code=="ArrowLeft"){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(()=>{
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);

    if(offsetX<230 && offsetY<120){
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        gameover = true;
        // score.innerHTML = "Your Score: "+count-10;
        audioStop.play();
        audioStart.pause();
        setTimeout(()=>{
            audioStop.pause();
        },1500)
    }
    if(offsetX<230 && cross && !gameover){
        count+=10;
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000 )
        score.innerHTML = "Your Score: "+count;
        setTimeout(()=>{
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            let newDur=0;
            if(aniDur>1){
                newDur = aniDur - 0.09;
                obstacle.style.animationDuration = newDur + 's';
            }
        },500)
    }

},50);