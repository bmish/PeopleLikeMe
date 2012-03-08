PFont f;
float angle;
float diameterA = 100.0;
float diameterB;
float start = 100.0;
float end = 200.0;
float[] likesA = {100.0, 200.0, 300.0};
int index = 1;
int totalLikesA = 3;

void setup() {
  size(1000, 650);
 // background(255, 255, 255);
  f = loadFont("Calibri-48.vlw");
}

void draw() {
  background(255);
  
  String nameA = "Victoria";
  String nameB = "Seth";
  int sharedLikes = 41;
  
  float x = 170.0;
  textFont(f, 40);
  textAlign(LEFT, BASELINE);
  fill(230, 158, 211);
  text(nameA, x, height/7);
  x += textWidth(nameA+" ");
  fill(0, 0, 0);
  text("and", x, height/7);
  x += textWidth("and ");
  fill(0, 176, 240);
  text(nameB, x, height/7);
  x += textWidth(nameB+" ");
  fill(0,0,0);
  text("share", x, height/7);
  x += textWidth("share ");
  fill(167, 138, 207);
  text(sharedLikes, x, height/7);
  x += textWidth(sharedLikes+" ");
  fill(0, 0, 0);
  text("interests", x, height/7);
  
  //left circle
  int circleAX = 440;
  int circleAY = 250;
  //int radiusA = 100;
  //diameterA = 100;
  fill(230, 158, 211, 55);
  strokeWeight(3);
  stroke(230, 158, 211);
  //for(int i = 0; i<5; i++){
   // pushMatrix();
    ellipse(circleAX, circleAY, diameterA, diameterA);
    if(index < totalLikesA) {
      System.out.println("here first if\n");
      float diameterDiff = likesA[index]-likesA[index-1];
      System.out.println("diameterDiff:  "+diameterDiff);
      float amplitude = diameterDiff/2.0;
      System.out.println("amplitude:  "+amplitude);
      float offset = likesA[index-1]+amplitude;
      System.out.println("offset:  "+offset);
      if (diameterA < (likesA[index]-1))
      {
        System.out.println("diameter test:  "+diameterA);
        diameterA = /*50*/amplitude * sin(angle-PI/2) + offset/*150*/;
        System.out.println("diameter in if:  "+diameterA);
        angle += 0.02;
        System.out.println("here if\n");
      }
      else {
        diameterA = likesA[index];
        index += 1;
        System.out.println("here else\n");
      }

      if(angle > TWO_PI) { angle = 0; }
      System.out.println("diameter:  "+diameterA);
    // if(index < totalLikesA) { 
      //index++;
    }
  //}
/*  fill(255, 255, 255);
  textFont(f, 30);
  textAlign(CENTER, CENTER);
  text(114, circleAX, circleAY);
  textAlign(LEFT, BASELINE);*/
  
  //right circle
  int circleBX = 500;
  int circleBY = 250;
  //int radiusB = 100;
  diameterB = 100;
  fill(0, 176, 240, 55);
  strokeWeight(3);
  stroke(0, 176, 240);
  ellipse(circleBX, circleBY, diameterB, diameterB);
  
    fill(255, 255, 255);
  textFont(f, 30);
  textAlign(CENTER, CENTER);
  text(114, circleAX, circleAY);
  //textAlign(LEFT, BASELINE);
  
  //fill(255, 255, 255);
  //textFont(f, 30);
  //textAlign(CENTER, CENTER);
  text(294, circleBX, circleBY);
}
