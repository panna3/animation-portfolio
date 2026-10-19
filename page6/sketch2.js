// version 2: Ino-kun rides the back hump and Non-chan the front one (instead of Panna)
let wave;
let tx,ty;
let bg;
let camel;
let parasol;
let desert;
let night;
let ino, non;
let shower;
let rescue;
let storm;
let sound;
let lastSeatPts = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
const PARASOL_HOME = () => ({ x: width/2, y: height/2-65 });
let drinkImgs;
let inoImg, nonImg, inoSleep, nonSleep, inoSide, nonSide, inoBack, nonBack;
function preload() {
  inoImg = loadImage(INO_FRONT);  inoSleep = loadImage(INO_SLEEP);   // awake: facing us, like the moonlit-river dogs
  nonImg = loadImage(NON_FRONT);  nonSleep = loadImage(NON_SLEEP);
  inoSide = loadImage(INO_SIDE); inoBack = loadImage(INO_BACK);    // for the twirl
  nonSide = loadImage(NON_SIDE); nonBack = loadImage(NON_BACK);
  drinkImgs = [loadImage(INO_DRINK1), loadImage(INO_DRINK2), loadImage(NON_DRINK1), loadImage(NON_DRINK2)];   // lapping up the shower
}
function setup() {
  if (window.REC) {
    createCanvas(REC.w, REC.h).parent('sketch-container'); pixelDensity(2); randomSeed(REC.seed); noLoop();
  } else {
    createCanvas(windowWidth, windowHeight).parent('sketch-container');
  }
  wave = new Wave(random(10, 11), random(3, 5), random(10,13));
  bg = new Bg(0,height/2+150);
  camel = new Camel(width/2+30,height/2);
  parasol = new Parasol(width/2,height/2-65);     // a little higher than in version 1, clear of the dogs' heads when they hop
  desert = new Desert();
  night = new Night();
  shower = new Shower();
  rescue = new Rescue();
  storm = new Storm();
  if (!window.REC) sound = new Sound();   // ♪ button (sound only after a tap)
  ino = new Pom('Ino', inoImg, inoSleep, 0.33, inoSide, inoBack);                  // big and white
  non = new Pom('Non', nonImg, nonSleep, 0.33, nonSide, nonBack);
  ino.drinkImgs = drinkImgs.slice(0, 2); non.drinkImgs = drinkImgs.slice(2, 4);                  // small and cream
}
function draw() {
  background('#795548');
  bg.update();
  bg.show();
  desert.update();
  desert.showFar();   // cacti on the horizon, behind the camel
  desert.camelShadow(); // the camel's shadow on the sand
  desert.showPrints();
  storm.showTornado();   // a little tornado in the sandstorm (behind the camel)
  night.farGlow();    // far cactus flowers glow at night, behind the camel

  const seats = [];
  for (let i = 0; i < PI/2; i++) {
    let y = 0;
    let secondHump = i % 2;
    y += wave.evaluateY(i);
    if(secondHump == 1){
      tx = width/2-35+i;
      ty = y - 15;
    }
    else{
      tx = width/2+15+i;
      ty = y;
    }
    camel.hump(tx,ty+ height/2);
    seats.push([tx, ty + height/2]);     // [0] = back hump, [1] = front hump
  }
  wave.update();

  // during the shower the camel lifts its head to drink the drops (camel_drink.js)
  const day = night.amount() < 0.05;
  camel.drinking = day && shower.drinking(28);          // mouth goes once the arcing drops get there
  const headUp = day && shower.showering(48);           // the head goes up as soon as the shower starts
  camel.lift = (camel.lift || 0) + ((headUp ? 1 : 0) - (camel.lift || 0)) * 0.12;
  shower.mouth = camel.mouthAt(width/2+30, height/2);
  camel.show(width/2+30,height/2);

  parasol.update();
  rescue.update(lastSeatPts, PARASOL_HOME());   // at night, the drone may fly off to catch a falling dog
  storm.update();
  storm.showParasol();   // (spins round when a sandstorm blows)

  // each sits right on top of its hump: the curve peaks at (tx + 17.5, ty + 20), and its thick outline
  // (15 wide) makes the visible top about 7 higher still
  ino.update(seats[0][1]); non.update(seats[1][1]);
  const seatPts = [{ x: seats[0][0] + 18, y: seats[0][1] + 13 }, { x: seats[1][0] + 17, y: seats[1][1] + 13 }];
  rescue.showLine(seatPts);
  storm.showLine(seatPts);
  lastSeatPts = seatPts;
  ino.show(seatPts[0].x, seatPts[0].y);
  non.show(seatPts[1].x, seatPts[1].y);

  shower.update(parasol);
  shower.show();      // now and then a little shower from the parasol (daytime)

  desert.showNear();  // nearer cacti, rocks and a tumbleweed pass in front
  storm.show();       // sand blowing across now and then

  night.update();
  night.show();
  ino.showZ(); non.showZ();   // sleepy z's float up at night
  if (sound) sound.update();
  showPomHearts();            // a little heart each time they hop
}
