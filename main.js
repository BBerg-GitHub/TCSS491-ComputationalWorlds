var AM = new AssetManager();

function Animation(
    spriteSheet,
    frameWidth,
    frameHeight,
    sheetWidth,
    frameDuration,
    frames,
    loop,
    scale
) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(
        this.spriteSheet,
        xindex * this.frameWidth,
        yindex * this.frameHeight, // source from sheet
        this.frameWidth,
        this.frameHeight,
        x,
        y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale
    );
};

Animation.prototype.currentFrame = function() {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function() {
    return this.elapsedTime >= this.totalTime;
};

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function() {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

Background.prototype.update = function() {};

function Bird(game, spritesheet) {
    this.animation = new Animation(spritesheet, 100, 100, 5, 0.05, 30, true, 1.5);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 670, 215);
}

Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
};

Bird.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function Earth(game, spritesheet) {
    this.animation = new Animation(spritesheet, 105, 105, 5, 0.5, 45, true, 3);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 600, 320);
}

Earth.prototype = new Entity();
Earth.prototype.constructor = Earth;

Earth.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
};

Earth.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function GreenDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 100, 120, 5, 0.2, 42, true, 0.75);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 10, 180);
}

GreenDude.prototype = new Entity();
GreenDude.prototype.constructor = GreenDude;

GreenDude.prototype.update = function() {
    // this.x += this.game.clockTick * this.speed;
    // if (this.x > 800) this.x = -230;

    if (this.y > 400) {
        this.y -= 5;
    }
    if (this.y < 200) {
        this.speed = 0;
        this.y = 199;
    }

    Entity.prototype.update.call(this);
};

GreenDude.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function Kitties(game, spritesheet) {
    this.animation = new Animation(spritesheet, 80, 80, 4, 0.5, 4, true, 1.5);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 425, 15);
}

Kitties.prototype = new Entity();
Kitties.prototype.constructor = Kitties;

Kitties.prototype.update = function() {
    //this.x += this.game.clockTick * this.speed;
    //if (this.x > 800) this.x = -230;
    //if (this.y > 300) this.y = -60;

    this.y += this.game.clockTick * this.speed * 2;
    if (this.x > 250) {
        this.y -= 1;
        this.x += 1;
    }
    if (this.y > 300) {
        this.x -= 15;
    }
    if (this.x < -20) {
        this.x = 425;
        this.y = 15;
    }
    Entity.prototype.update.call(this);
};

Kitties.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function Planet(game, spritesheet) {
    this.animation = new Animation(spritesheet, 100, 60.2, 5, 0.9, 28, true, 1.5);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 750, 30);
}

Planet.prototype = new Entity();
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 900) this.x = -230;

    //This shifts the entity down and then moves horizontal.
    //this.y += this.game.clockTick * this.speed;
    //if (this.y > 150) this.y = 160;

    Entity.prototype.update.call(this);
};

Planet.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function ShootingStar(game, spritesheet) {
    this.animation = new Animation(spritesheet, 60, 100, 3, 0.5, 3, true, 1.5);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 500);
}

ShootingStar.prototype = new Entity();
ShootingStar.prototype.constructor = ShootingStar;

ShootingStar.prototype.update = function() {
    //Original Code.
    this.x += this.game.clockTick * this.speed;
    //if (this.x > 800) this.x = -230;

    // this.x += this.game.clockTick * this.speed;
    // this.y += this.game.clockTick * this.speed;
    // if (this.x >= this.y)(this.x += 3), (this.y += 3);

    //This enables it to fly sideways but does not return.
    this.y += this.game.clockTick * this.speed;
    if (this.y < 800) {
        this.y -= 1;
    }
    // previous code
    if (this.x < 800) {
        this.x += 1;
    } //returns the star to the original position.
    if (this.y < 0) {
        this.y = 500;
        this.x = -10;
    }

    Entity.prototype.update.call(this);
};

ShootingStar.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function SpaceCat(game, spritesheet) {
    this.animation = new Animation(spritesheet, 83, 100, 1, 0.04, 40, true, 1);
    //this.animation = new Animation(spritesheet, 83, 100, 1, 0.04, 40, true, 1); // AM.getAsset();
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 510, 500);
}

SpaceCat.prototype = new Entity();
SpaceCat.prototype.constructor = SpaceCat;

SpaceCat.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;

    //Try to move them back and forth.
    if (this.x < 100) {
        this.speed = 20;
    }
    if (this.x > 500) {
        this.speed = -120;
    }
    //if (this.x > 900) this.x = -230;

    // this.y += this.game.clockTick * this.speed;
    // if (this.y > 150) this.y = 160;

    Entity.prototype.update.call(this);
};

SpaceCat.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

function Swirl(game, spritesheet) {
    this.animation = new Animation(spritesheet, 200, 100, 1, 0.05, 52, true, 0.8);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 400, 300);
}

function Sun(game, spritesheet) {
    this.animation = new Animation(spritesheet, 100, 100, 5, 0.1, 59, true, 3.5);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, -100, -100);
}

Sun.prototype = new Entity();
Sun.prototype.constructor = Sun;

Sun.prototype.update = function() {
    //this.x += this.game.clockTick * this.speed;
    //this.y += this.game.clockTick * this.speed;
    //if (this.x > 800) this.x = -230;
    //if (this.y > 800) this.y = -230;
    Entity.prototype.update.call(this);
};

Sun.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

Swirl.prototype = new Entity();
Swirl.prototype.constructor = Swirl;

Swirl.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
};

Swirl.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

//Entities to be animated
AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/bird.png");
AM.queueDownload("./img/earth.png");
AM.queueDownload("./img/greenDude.png");
AM.queueDownload("./img/kitties.png");
AM.queueDownload("./img/planet.png");
AM.queueDownload("./img/shootingStar.png");
AM.queueDownload("./img/spaceCat.png");
AM.queueDownload("./img/sun.png");
AM.queueDownload("./img/swirl.png");

AM.downloadAll(function() {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(
        new Background(gameEngine, AM.getAsset("./img/background.jpg"))
    );

    gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/bird.png")));

    gameEngine.addEntity(new Earth(gameEngine, AM.getAsset("./img/earth.png")));

    gameEngine.addEntity(
        new GreenDude(gameEngine, AM.getAsset("./img/greenDude.png"))
    );

    gameEngine.addEntity(
        new Kitties(gameEngine, AM.getAsset("./img/kitties.png"))
    );

    gameEngine.addEntity(new Planet(gameEngine, AM.getAsset("./img/planet.png")));

    gameEngine.addEntity(
        new ShootingStar(gameEngine, AM.getAsset("./img/shootingStar.png"))
    );

    gameEngine.addEntity(new Sun(gameEngine, AM.getAsset("./img/sun.png")));

    gameEngine.addEntity(new Swirl(gameEngine, AM.getAsset("./img/swirl.png")));

    gameEngine.addEntity(
        new SpaceCat(gameEngine, AM.getAsset("./img/spaceCat.png"))
    );

    console.log("All Done!");
});
s;