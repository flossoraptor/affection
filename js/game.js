var quintusOptions = {
    development: true
}

var setupOptions = {
    width: 427,
    height: 240,
};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes")
        .setup(setupOptions);

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
    },

    step: function(dt) {
        var p = this.p;
        p.x += p.vx * dt;
    }
})

Q.scene("level1",function(stage) {
    var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player({ vx : 10 }));
});

Q.load("bg.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
