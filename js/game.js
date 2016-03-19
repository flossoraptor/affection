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

Q.scene("level1",function(stage) {
    //var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player());
});

Q.load("bg.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
