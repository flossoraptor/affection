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

Q.pixelsSetup(setupOptions);

Q.PixelsSprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 400,
            y: 240,
            w: 16,
            h: 16,
            asset: 'player.png'
        });
        this.add('topdownControls');
    },
});

Q.scene("level1",function(stage) {
    //var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player());
});

Q.load("bg.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
