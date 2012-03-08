PFont f;
float angleA;
float angleB;
float diameterA = 100.0;
float diameterB;
float start = 100.0;
float end = 200.0;
float[] likesA = {5.0, 32.0, 57.0, 80.0, 114.0};
float[] likesB = {43.0, 92.0, 170., 200.0, 294.0};
int[] similarities = {0, 0, 0, 0, 41};
int indexA = 1;
int indexB = 1;
int totalLikesA = 5;
int totalLikesB = 5;

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
  if(indexA < totalLikesA){
  text(similarities[indexA], x, height/7);
    x += textWidth(similarities[indexA]+" ");
  }
  else {
    text(similarities[totalLikesA-1] , x, height/7);
      x += textWidth(similarities[totalLikesA-1]+" ");
  }

  fill(0, 0, 0);
  text("interests", x, height/7);
  
  //left circle
  int circleAX = 400;
  int circleAY = 350;
  //int radiusA = 100;
  //diameterA = 100;
  fill(230, 158, 211, 55);
  strokeWeight(3);
  stroke(230, 158, 211);
  //for(int i = 0; i<5; i++){
   // pushMatrix();
    ellipse(circleAX, circleAY, diameterA, diameterA);
    if(indexA < totalLikesA) {
     // System.out.println("here first if\n");
      float diameterDiff = likesA[indexA]-likesA[indexA-1];
      //System.out.println("diameterDiff:  "+diameterDiff);
      float amplitude = diameterDiff/2.0;
     // System.out.println("amplitude:  "+amplitude);
      float offset = likesA[indexA-1]+amplitude;
     // System.out.println("offset:  "+offset);
      if (diameterA < (likesA[indexA]-1))
      {
       // System.out.println("diameter test:  "+diameterA);
        //System.out.println("angle:  "+angle);
        diameterA = /*50*/amplitude * sin(angleA-PI/2.0) + offset/*150*/;
        //System.out.println("diameter in if:  "+diameterA);
        angleA += 0.02;
        //System.out.println("here if\n");
      }
      else {
        diameterA = likesA[indexA];
        indexA += 1;
        angleA = 0;
       // System.out.println("here else\n");
      }

     // if(angle > (TWO_PI-PI/2.0)) { angle = 0; }
     // System.out.println("diameter:  "+diameterA);
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
  int circleBX = 565;
  int circleBY = 350;
  //int radiusB = 100;
 // diameterB = 100;
  fill(0, 176, 240, 55);
  strokeWeight(3);
  stroke(0, 176, 240);
  ellipse(circleBX, circleBY, diameterB, diameterB);
      if(indexB < totalLikesB) {
      System.out.println("here first if\n");
      float diameterDiff = likesB[indexB]-likesB[indexB-1];
      System.out.println("diameterDiff:  "+diameterDiff);
      float amplitude = diameterDiff/2.0;
      System.out.println("amplitude:  "+amplitude);
      float offset = likesB[indexB-1]+amplitude;
      System.out.println("offset:  "+offset);
      if (diameterB < (likesB[indexB]-1))
      {
       // System.out.println("diameter test:  "+diameterA);
        //System.out.println("angle:  "+angle);
        diameterB = /*50*/amplitude * sin(angleB-PI/2.0) + offset/*150*/;
        System.out.println("diameter in if:  "+diameterB);
        angleB += 0.02;
        System.out.println("here if\n");
      }
      else {
        diameterB = likesB[indexB];
        indexB += 1;
        angleB = 0;
        System.out.println("here else\n");
      }

     // if(angle > (TWO_PI-PI/2.0)) { angle = 0; }
      System.out.println("diameter:  "+diameterB);
    // if(index < totalLikesA) { 
      //index++;
    }
    
    fill(255, 255, 255);
  textFont(f, diameterA/2);
  textAlign(CENTER, CENTER);
  if(indexA < totalLikesA) {
  text((int)likesA[indexA], circleAX, circleAY);
  }
  else {
    text((int)likesA[totalLikesA-1], circleAX, circleAY);
  }
  //textAlign(LEFT, BASELINE);
  
  //fill(255, 255, 255);
  textFont(f, diameterB/2);
  textAlign(CENTER, CENTER);
  if(indexB < totalLikesB) {
  text((int)likesB[indexB], circleBX, circleBY);
  }
  else {
   text((int)likesB[totalLikesB-1], circleBX, circleBY); 
  }
}
