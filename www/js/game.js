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
        //console.log('drag coords: ' + touch.origX + ', ' + touch.origY);
        this.p.x = Math.round(touch.origX + touch.dx);
        this.p.y = Math.round(touch.origY + touch.dy);
    },

    touchEnd: function(touch) {
        //console.log('that\'s over');
    }
});

Q.Sprite.extend("PelletShooter", {
    init: function(p, stage) {
        this._super(p, {
            x:30,
            y:30,
            w:8,
            h:8,
            asset: 'pellet.png'
        });
        this.timer = 0;
        this.stage = stage;
    },

    step: function(dt) {
        var p = this.p;
        var stage = this.stage;
        this.timer += dt;
        if (this.timer > 1) {
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vx:80}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vx:-80}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vy:80}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vy:-80}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vx:40, vy:40}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vx:40, vy:-40}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vx:-40, vy:40}));
            stage.insert(new Q.Pellet({x:p.x, y:p.y, vx:-40, vy:-40}));
            this.timer = 0;
        }
    }
})

Q.MovingSprite.extend("Pellet", {
    init: function(p) {
        this._super(p, {
            x:30,
            y:30,
            w:8,
            h:8,
            vx:0,
            vy:0,
            ax:0,
            ay:0,
            asset: 'pellet.png'
        });
    },

    step: function(dt) {
        this._super(dt);
        var p = this.p;
        if (p.x < 0 || p.x > 454) {
            this.destroy();
        }
        if (p.y < 0 || p.y > 456) {
            this.destroy();
        }
    }
})

Q.scene("level1",function(stage) {
    //var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player());
    var pelletShooter = stage.insert(new Q.PelletShooter({x:100, y:100}, stage));
    var pelletShooter2 = stage.insert(new Q.PelletShooter({x:300, y:200}, stage));
});

Q.load("bg.png, obstacle.png, player.png, pellet.png", function() {
    Q.stageScene("level1");
});
