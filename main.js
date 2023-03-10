img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoad);
    document.getElementById("actually_status").innerHTML = "Detectando objetos";
}

function modelLoad(){
    console.log("Modelo cargado.");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } 
    console.log(results);
    objects = results;
}

function preload(){
    img = loadImage("dog_cat.jpg");
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for(
            i = 0;
            i < objects.length;
            i++
        ){
            document.getElementById("actually_status").innerHTML = "Objeto detectado";
            document.getElementById("object_dectet").innerHTML = "Objetos detectados = " + objects.length;
            fill(r, g, b);
            porcent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + porcent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}