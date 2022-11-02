var song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
song = loadSound("music.mp3");
}

function setup()
{
canvas = createCanvas(600, 500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
Posenet = ml5.poseNet(video, modelLoaded);
Posenet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
    console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("The score for the left wrist is "+scoreLeftWrist);

scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("The score for the right wrist is "+scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("The 'x' coordinate of your left wrist is "+leftWristX+" and the 'y' coordinate of your left wrist is "+leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("The 'x' coordinate of your right wrist is right here and is "+rightWristx+" AND the 'y' coordinate of your right wrist is here too, stop asking Why. It is "+rightWristY);
}
}

function modelLoaded(){
    console.log("Model is loaded. Also, birds are cool.");
}

function draw()
{
image(video, 0, 0, 600, 500);
fill("#FF0000");
stroke("#FF0000");

if(scoreRightWrist>0.2){

    circle(rightWristX, rightWristY, 21);

    if(rightWristY>0 && rightwristY<=100){
        document.getElementById("bottle").innerHTML = "Speed = 0.5x i.e. SLOW. VERY SLOW.";
        song.rate(0.5);
        }
        
        else if ( rightWristY>100 && rightwristY<=200){
            document.getElementById("bottle").innerHTML = "Speed is 1x i.e. NORMAL";
            song.rate(1);
        }
        
        else if( rightWristY>200 && rightWristY<=300){
            document.getElementById("bottle").innerHTML = "Speed is 1.5x i.e. OKAY-FAST";
            song.rate(1.5);
        }
        
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("bottle").innerHTML  = "Speed is 2x i.e. FAST-BUT-NOT-TOO-FAST";
            song.rate(2);
        }
        
        else if(rightwristY>400 && rightWristY<=500){
            document.getElementById("bottle").innerHTML = "Speed is 2.5x i.e. OH-NO!-FAST";
            song.rate(2.5);
        }
}


if(scoreLeftWrist>0.2){
    circle(leftWristX, leftWristY, 20);

    charger = Number(leftWristY);
    notebio = floor(charger);
    volume = notebio/500;
    document.getElementById("keys").innerHTML = "Volume is "+volume;
    song.setVolume(volume);
}



}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}