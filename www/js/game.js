var quintusOptions = {
    development: true
};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes, Input, Touch, Pixels");

var setupOptions = {
    width: 400,
    height: 240,
    scaleToFit: true
};

Q.pixelsSetup(setupOptions)
 .touch(Q.SPRITE_ALL);

Q.Sprite.extend("Battlebox", {
    init: function(p) {
        this._super(p, {
            x: 200,
            y: 120,
            w: 256,
            h: 224,
            asset: 'bg.png'
        });
    }
});

Q.Sprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 50,
            y: 50,
            w: 100,
            h: 100,
            asset: 'player.png'
        });
        //this.p.collisionMask = 32;
        this.on("drag");
        this.on("touchEnd");
    },

    drag: function(touch) {
        console.log('drag coords: ' + touch.origX + ', ' + touch.origY);
        this.p.x = touch.origX + touch.dx;
        this.p.y = touch.origY + touch.dy;
    },

    touchEnd: function(touch) {
        console.log('that\'s over');
    }
});

Q.scene("level1",function(stage) {
    //var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player());
});

Q.load("bg.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
