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
        if (p) {
            this.p.hpText = p.hpText;
            this.updateHp(p.hp);
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
        this.step_check(dt);

        this.step_controls(dt);

        this.step_invincibility(dt);

        this.stage.collide(this);

        this._super(dt);
    },

    step_check: function(dt) {
        if (this.p.hp <= 0) {
            this.triggerGameOver();
        }
    },

    step_controls: function(dt) {
        var p = this.p;
        p.vx = 0;
        if(Q.inputs['left']) {
            p.vx = -1 * p.speed;
        }
        if (Q.inputs['right']) {
            p.vx = p.speed;
        }
        p.vy = 0;
        if(Q.inputs['up']) {
            p.vy = -1 * p.speed;
        }
        if (Q.inputs['down']) {
            p.vy = p.speed;
        }
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

    triggerGameOver: function() {
        Q.stageScene("gameOver");
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
        this.p.hp = hp;
    },

    getPlayerState: function() {
        return { hp : this.p.hp };
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
});

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
});

Q.Sprite.extend("Cursor", {
    init: function(p) {
        this._super(p, {
            x: 30,
            y: 245,
            w: 16,
            h: 16,
            asset: 'player.png'
        });

        this.p.selection = 0;
        this.p.lastControl = 'none';
    },

    step: function(dt) {
        this.step_controls(dt);
        this.step_place(dt);
        //this._super(dt);
    },

    step_controls: function(dt) {
        var p = this.p;
        // Only move the cursor 'once' for every press of left or right
        if(Q.inputs['left'] && p.lastControl != 'left') {
            p.selection = p.selection - 1;
            p.lastControl = 'left';
        }
        if (Q.inputs['right'] && p.lastControl != 'right') {
            p.selection = p.selection + 1;
            p.lastControl = 'right';
        } else {
            if (!Q.inputs['left'] && !Q.inputs['right']) {
                p.lastControl = 'none';
            }
        }

        if (p.selection == -1) {
            p.selection = 2;
        } else if (p.selection == 3) {
            p.selection = 0;
        }

        if (Q.inputs['period']) {
            if (p.selection == 0) {
                Q.stageScene("underAttack", 0, {underAttackState:this.stage.options.menuState});
            }
        }
    },

    step_place: function(dt) {
        var p = this.p;
        if (p.selection == 0) {
            p.x = 30;
        } else if (p.selection == 1) {
            p.x = 170;
        } else if (p.selection == 2) {
            p.x = 305;
        }
    }
});

/*
 * Object that tracks the duration of the current enemy's attack
 * in the 'under attack' phase. Controls when it is time to move
 * back to the battle menu.
 * This class is a subclass of Sprite because it needs to know how much
 * time has passed in the stage. Maybe there is a better class that it should
 * extend?
 */
Q.Sprite.extend("UnderAttackPhase", {
    init: function(duration, player) {
        this._super({}, {});
        this.p.duration = duration;
        this.p.timer = 0;
        this.p.player = player;
    },

    step: function(dt) {
        this.p.timer += dt;
        if (this.p.timer >= this.p.duration) {
            this.returnToBattleMenu();
        }
    },

    returnToBattleMenu: function() {
        var menuState = this.stage.options.underAttackState;
        menuState.player = this.p.player.getPlayerState();
        Q.stageScene("battleMenu", 0, {menuState:menuState});
    }
});

Q.scene("battleMenu",function(stage) {
    var fightTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 90,
        y: 230
    }));
    var fightText = new Q.UI.Text({
        label: "FIGHT",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(fightText, fightTextContainer);
    var itemTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 220,
        y: 230
    }));
    var itemText = new Q.UI.Text({
        label: "ITEM",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(itemText, itemTextContainer);
    var runTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 350,
        y: 230
    }));
    var runText = new Q.UI.Text({
        label: "RUN",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(runText, runTextContainer);
    var cursor = stage.insert(new Q.Cursor());
});

Q.scene("underAttack",function(stage) {
    var underAttackState = stage.options.underAttackState;

    var hpTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 35,
        y: 0
    }));
    var hpText = new Q.UI.Text({
        label: "0",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(hpText, hpTextContainer);
    var player = stage.insert(new Q.Player(
        {
            hp:underAttackState.player.hp,
            hpText:hpText
        })
    );
    stage.insert(new Q.BulletShooter({x:75, y:75, vx:30}, stage));
    stage.insert(new Q.BulletShooter({x:150, y:125, vx: 30, vy: 15}, stage));
    stage.insert(new Q.BulletShooter({x:225, y:175, vx: 15, vy: -30}, stage));

    stage.insert(new Q.UnderAttackPhase(underAttackState.enemy.duration, player));
});

Q.scene("gameOver", function(stage) {
    var gameOverTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 3,
        borderColor: "rgba(255,255,255,255)",
        x: 35,
        y: 0
    }));
    var gameOverText = new Q.UI.Text({
        label: "Game Over",
        color: "white",
        x: 125,
        y: 125
    });
    stage.insert(gameOverText, gameOverTextContainer);
});

Q.load("bg.png, obstacle.png, player.png, bullet.png", function() {
    Q.stageScene("battleMenu", 0,
        {
            menuState: {
                player: {hp: 10},
                enemy: {hp: 10, duration: 6}
            }
        }
    );
});
