status="";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function Start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects.";
    documet.getElementById("status_objects").innerHTML=status_model+"Found";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected!";
            document.getElementById("number_of_objects_detected").innerHTML="Number of Objects Detected Are:"+objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill()
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
    objects=results;
    }
    }