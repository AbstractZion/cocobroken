song=" ";
status1=" ";
objects=[];

function preload(){
    song=loadSound('ye@.mp3');
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting baby";
}

function modelLoaded(){
    console.log("model is being loadedddd");
    status1=true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,380,380);
    if(status1 !=" "){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: object detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Baby found!";
                console.log("Stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby not found D:";
                console.log("play");
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML="Baby not found D:";
            console.log("play");
            song.play();
        }
    }
} 