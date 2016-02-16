var quintusOptions = {
    development: true
}

var setupOptions = {
    width: 240,
    height: 400,
    scaleToFit: true
};

var Q = Quintus(quintusOptions)
        .include("Sprites, Scenes")
        .setup(setupOptions);

Q.Sprite.extend("Battleboxes", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 200,
            w: 240,
            h: 400,
            asset: 'battleboxes.png'
        });
    }
});

Q.Sprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 300,
            w: 16,
            h: 16,
            asset: 'player.png',
            vx: 1
        });
    },

    step: function(dt) {
        var p = this.p;
        p.x = p.x + p.vx * dt;
    }
})

Q.scene("level1",function(stage) {
    var battleboxes = stage.insert(new Q.Battleboxes());
    var player = stage.insert(new Q.Player());
});

Q.load("battlebox.png, battleboxes.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
