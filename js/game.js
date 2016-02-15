var setupOptions = {
    width: 240,
    height: 400,
    scaleToFit: true
};

var Q = Quintus()
        .include("Sprites, Scenes")
        .setup(setupOptions);

Q.Sprite.extend("Background", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 200,
            w: 240,
            h: 400
        });
    },

    draw: function(ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }
});

Q.Sprite.extend("Battleboxes", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 200,
            w: 240,
            h: 200,
            asset: 'battleboxes.png'
        });
    }
});

Q.scene("level1",function(stage) {
    var battleboxes = stage.insert(new Q.Battleboxes());
});

Q.load("battlebox.png, battleboxes.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
