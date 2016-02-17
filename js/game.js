var quintusOptions = {
    development: true
}

var setupOptions = {
    width: 427,
    height: 240,
    scaleToFit: true
};

// setupOptions={maximize:true};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes, Input, Touch, UI")
        .setup(setupOptions)
        .touch();

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

Q.MovingSprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 213,
            y: 120,
            w: 16,
            h: 16,
            asset: 'player.png'
        });
    }

/*
    step: function(dt) {
        var p = this.p;
        p.x += p.vx * dt;
    }
    */
});

Q.Sprite.extend("TouchRegistrant", {
    init: function(p) {
        this._super(p, {
            x: 213,
            y: 120,
            w: 427,
            h: 240,
            asset: 'player.png'
        });
        this.p.collisionMask = 32;
        this.on("drag");
    },

    drag: function(touch) {
        console.log('aww yiss');
        this.p.x = touch.origX + touch.dx;
        this.p.y = touch.origY + touch.dy;
    }
});

Q.scene("level1",function(stage) {
    var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player({ vx : 10 }));
    var touch = stage.insert(new Q.TouchRegistrant());
});

Q.load("bg.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
