var quintusOptions = {
    development: true
};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes, Input, Pixels");

var setupOptions = {
    width: 400,
    height: 240,
    scaleToFit: true
};

Q.pixelsSetup(setupOptions).controls();

Q.MovingSprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 50,
            y: 50,
            w: 16,
            h: 16,
            asset: 'player.png'
        });
        this.p.speed = 100;
    },

    step: function(dt) {
        var p = this.p;

        p.vx = 0;
        if(Q.inputs['left']) {
            p.vx -= p.speed;
        }
        if (Q.inputs['right']) {
            p.vx += p.speed;
        }
        p.vy = 0;
        if(Q.inputs['up']) {
            p.vy -= p.speed;
        }
        if (Q.inputs['down']) {
            p.vy += p.speed;
        }
        this._super(dt);
    }
});

Q.MovingSprite.extend("Bullet", {
    init: function(p) {
        this._super(p, {
            w: 8,
            h: 8,
            asset: 'bullet.png'
        });
    },

    step: function(dt) {
        this._super(dt);
        var p = this.p;
        if (p.x < 0 || p.x > 400) {
            this.destroy();
        } else if (p.y < 0 || p.y > 280) {
            this.destroy();
        }
    }
})

Q.MovingSprite.extend("BulletShooter", {
    init: function(p, stage) {
        this._super(p, {
            w: 8,
            h: 8,
            asset: 'bullet.png'
        });
        this.stage = stage;
        this.timer = 0;
    },

    step: function(dt) {
        var p = this.p;
        this.timer += dt;
        if (this.timer > 1) {
            this.timer = 0;
        }
        if (this.timer == 0) {
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vx:80}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vx:-80}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vy:80}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vy:-80}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vx:40, vy:40}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vx:-40, vy:40}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vx:40, vy:-40}));
            this.stage.insert(new Q.Bullet({x:p.x, y:p.y, vx:-40, vy:-40}));
        }

        if (p.x < 0 || p.x > 400) {
            p.vx = -p.vx;
        } else if (p.y < 0 || p.y > 280) {
            p.vy = -p.vy;
        }

        this._super(dt);
    }
})

Q.scene("level1",function(stage) {
    //var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player());
    stage.insert(new Q.BulletShooter({x:75, y:75, vx:30}, stage));
    stage.insert(new Q.BulletShooter({x:150, y:125, vx: 30, vy: 15}, stage));
    stage.insert(new Q.BulletShooter({x:225, y:175, vx: 15, vy: -30}, stage));
});

Q.load("bg.png, obstacle.png, player.png, bullet.png", function() {
    Q.stageScene("level1");
});
