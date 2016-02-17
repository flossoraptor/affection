var quintusOptions = {
    development: true
}

var setupOptions = {
    width: 427,
    height: 240,
//    downsampleWidth: 854,
//    downsampleHeight: 480
    scaleToFit: true
};

// setupOptions={maximize:true};

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
    }

/*
    step: function(dt) {
        var p = this.p;
        p.x += p.vx * dt;
    }
    */
});

Q.Sprite.extend("Catty", {
    init: function(p) {
        this._super(p, {
            x: 100,
            y: 100,
            w: 105,
            h: 92,
            asset: 'cattytest.png'
        });
    }
});

Q.scene("level1",function(stage) {
    var battlebox = stage.insert(new Q.Battlebox());
    var player = stage.insert(new Q.Player({ vx : 10 }));
    var cattytest = stage.insert(new Q.Catty());
});

Q.load("bg.png, obstacle.png, player.png, cattytest.png", function() {
    Q.stageScene("level1");
});
