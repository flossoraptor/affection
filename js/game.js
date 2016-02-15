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

Q.Sprite.extend("Battlebox", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 100,
            w: 240,
            h: 200,
            asset: 'battlebox.png'
        });
    }
});

Q.scene("level1",function(stage) {
    var battlebox = stage.insert(new Q.Battlebox());
});

Q.load("battlebox.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
