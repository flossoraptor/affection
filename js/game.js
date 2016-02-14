var setupOptions = {
    width: 240,
    height: 400,
    downsampleWidth: 480,
    downsampleHeight: 800
};

var Q = Quintus()
        .include("Sprites, Scenes")
        .setup(setupOptions);

Q.Sprite.extend("Background", {
    init: function(p) {
        this._super(p, {
            asset: "bg.png",
            w: 240,
            h: 400
        });
    }
});

Q.scene("level1",function(stage) {
    var bg = stage.insert(new Q.Background());
});

Q.load("bg.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
