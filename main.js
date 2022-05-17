function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide(); 

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose', gotresult);
}
function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    
if ( scorerightwrist > 0.2 ) {
    circle(rightWristx,rightWristy,20);
    if ( rightWristy > 0 && rightWristy <= 100 ) {
     document.getElementById("speed").innerHTML="Speed = 0.5x ";
     sound.rate(0.5);
    }
    else if ( rightWristy > 100 && rightWristy <= 200 ) {
        document.getElementById("speed").innerHTML="Speed = 1x ";
        sound.rate(1);
       }
       else if ( rightWristy > 200 && rightWristy <= 300 ) {
        document.getElementById("speed").innerHTML="Speed = 1.5x ";
        sound.rate(1.5);
       }
       else if ( rightWristy > 300 && rightWristy <= 400 ) {
           document.getElementById("speed").innerHTML="Speed = 2x ";
           sound.rate(2);
          }
          else if ( rightWristy > 400 && rightWristy <= 500 ) {
            document.getElementById("speed").innerHTML="Speed = 2.5x ";
            sound.rate(2.5);
           }
}

    if (scoreleftwrist>0.2) {
        circle(leftWristx,leftWristy,20);
        inNumber=Number(leftWristy);
        remove_decimal=floor(inNumber);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume = " + volume;
     sound.setVolume(volume);
    }
}
var sound = "";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreleftwrist=0
scorerightwrist=0
function preload() {
    sound = loadSound("music.mp3");
}
 
function play() {
    sound.play();
    sound.rate(1);
}

function modelloaded() {
    console.log("Model is loaded")
}

function gotresult(results) {
if (results.length > 0)
{
    console.log(results);
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("score left Wrist = " + scoreleftwrist + "Score right wrist = " + scorerightwrist);
leftWristx=results[0].pose.leftWrist.x;
leftWristy=results[0].pose.leftWrist.y;
console.log("leftWristx = " + leftWristx + ", leftWristy= " + leftWristy);

rightWristx=results[0].pose.rightWrist.x;
rightWristy=results[0].pose.rightWrist.y;
console.log("rightWristx = " + rightWristx + ", rightWristy= " + rightWristy);
}
}