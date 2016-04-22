var quintusOptions = {
    development: true
};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes, Input, Pixels, UI");

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

        this.p.invincibility = {timer:0};
        this.p.flicker = {count:0};
        this.p.speed = 100;
        this.p.hp = 20;
        if (p) {
            this.p.hpText = p.hpText;
            this.p.hpText.p.label = '' + this.p.hp;
        }

        this.on("hit.sprite",function(collision) {
            if (collision.obj.isA("Bullet")) {
                if (this.p.invincibility.timer == 0) {
                    this.p.hp = this.p.hp - 1;
                    this.updateHp(this.p.hp);
                    this.triggerInvincibility(2);
                }
            }
        });
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

        this.step_invincibility(dt);

        this.stage.collide(this);

        this._super(dt);
    },

    step_invincibility: function(dt) {
        var p = this.p;
        if (p.invincibility.timer > 0) {
            p.invincibility.timer = p.invincibility.timer - dt;
            if (p.invincibility.timer < 0) {
                this.endInvincibility()
            } else {
                // Should cause the sprite to flicker
                this.step_flicker(dt);
            }
        }
    },

    step_flicker: function(dt) {
        var p = this.p;
        if (p.flicker.count == 0) {
            this.toggle_opacity();
            p.flicker.count = 2;
        } else {
            p.flicker.count = p.flicker.count - 1;
        }
    },

    toggle_opacity: function() {
        if (this.p.opacity != 0) {
            this.p.opacity = 0;
        } else {
            this.p.opacity = 0.75;
        }
    },

    triggerInvincibility: function(seconds) {
        this.p.invincibility = {timer:seconds};
        this.p.opacity = 1;
    },

    endInvincibility: function() {
        this.p.invincibility = {timer:0};
    },

    updateHp: function(hp) {
        this.p.hpText.p.label = '' + hp;
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
        this.stage.collide(this);
    }
})

Q.MovingSprite.extend("BulletShooter", {
    init: function(p) {
        this._super(p, {
            w: 8,
            h: 8,
            asset: 'bullet.png'
        });
        this.p.timer = 0;
    },

    step: function(dt) {
        var p = this.p;
        p.timer += dt;
        if (p.timer > 1) {
            p.timer = 0;
        }
        if (p.timer == 0) {
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
    var container = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 5,
        shadow: 10,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 35,
        y: 0
    }));
    var hpText = new Q.UI.Text({
        label: "40",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(hpText, container);
    var player = stage.insert(new Q.Player({hpText:hpText}));
    stage.insert(new Q.BulletShooter({x:75, y:75, vx:30}, stage));
    stage.insert(new Q.BulletShooter({x:150, y:125, vx: 30, vy: 15}, stage));
    stage.insert(new Q.BulletShooter({x:225, y:175, vx: 15, vy: -30}, stage));
});

Q.load("bg.png, obstacle.png, player.png, bullet.png", function() {
    Q.stageScene("level1");
});
