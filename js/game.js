var setupOptions = {
    width: 240,
    height: 400,
    scaleToFit: true
};

var Q = Quintus()
        .include("Sprites, Scenes, Input, Touch")
        .setup(setupOptions)
        .controls().touch();

Q.Sprite.extend("Background", {
    init: function(p) {
        this._super(p, {
            asset: "bg.png",
            x: 0,
            y: 0
        });
    }
});

Q.scene("level1",function(stage) {
    var bg = stage.insert(new Q.Background());
});

Q.load("bg.png, obstalce.png, player.png", function() {
    Q.stageScene("level1");
});
