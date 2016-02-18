var quintusOptions = {
    development: true
};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes, Input, Touch");

var setupOptions = {
    width: 427,
    height: 240,
    scaleToFit: true
};

Q.setup(setupOptions)
 .touch(Q.SPRITE_ALL);

Q.Sprite.extend("Battlebox", {
    init: function(p) {
        this._super(p, {
            x: 213,
            y: 120,
            w: 427,
            h: 240,
            asset: 'bg.png'
        });
    }
});

Q.Sprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 213,
            y: 120,
            w: 16,
            h: 16,
            asset: 'player.png'
        });
        //this.p.collisionMask = 32;
        this.on("drag");
        this.on("touchEnd");
    },

    drag: function(touch) {
        console.log('aww yiss');
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
