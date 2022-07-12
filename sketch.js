var dog, dog_running, edges;
var groundImage;
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0

function preload() {
  dog_running = loadAnimation("image.png", "image (1).png");
  dog_collided = loadAnimation("collided.png")
  groundImage = loadImage("ground (1).png")
  treatsImage = loadImage("treats.png")
  bananaImage = loadImage("banana.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  dog = createSprite(width - 50, height - 170, 20, 50);
  dog.addAnimation("running", dog_running);
  dog.addAnimation("collided", dog_collided)
  edges = createEdgeSprites();

  dog.scale = 0.7;
  dog.x = 70

  ground = createSprite(width / 2, height - 141, 800, 5)
  ground.addImage("ground", groundImage)
  ground.scale = 0.6

  invisibleground = createSprite(200, height - 170, 800, 5)
  invisibleground.visible = false


  treatsgroup = new Group()
  bananagroup = new Group()
  score = 0

}


function draw() {


  //set background color 
  background("white");
  dog.bounce(treatsgroup, doghit)
  ground.velocityX = -5
  text("Score = " + score, 10, 10)
  dog.collide(invisibleground)

  if (gamestate == PLAY) {
    spawntreats()
    spawnbanana()
    ground.velocityX = -5

    if (keyDown("space") && dog.y >= 165.5) {
      dog.velocityY = -10;
    }
    dog.velocityY = dog.velocityY + 0.4;

    if (ground.x < 0) {
      ground.x = 300
    }

    if (dog.isTouching(bananagroup)) {
      gamestate = END
    }
  }
  else if (gamestate == END) {
    ground.velocityX = 0
    treatsgroup.setVelocityXEach(0)
    bananagroup.setVelocityXEach(0)
    dog.changeAnimation("collided", dog_collided)
    dog.scale = 0.315
    dog.velocityY = 0
    bananagroup.destroyEach()
  }
  drawSprites();
}

function spawntreats() {
  if (frameCount % 60 === 0) {
    treats = createSprite(600, 100, 20, 10)
    treats.velocityX = -5
    treats.addImage("treats", treatsImage)
    dog.depth = treats.depth
    treats.scale = 0.09
    treats.y = Math.round(random(30, 100))
    treatsgroup.add(treats)
    treats.lifetime = 130
  }
}



function spawnbanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(width - 200, height - 200, 20, 10)
    banana.addImage("banana", bananaImage)
    banana.velocityX = -5
    banana.scale = 0.09
    bananagroup.add(banana)
    treats.lifetime = 150
  }
}

function doghit(dog, treat) {
  treat.velocityX = 0
  dog.velocityX = 0
  treat.destroy()
  score = score + 1
}