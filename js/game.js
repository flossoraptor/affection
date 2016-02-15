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
            w: 240,
            h: 200,
            asset: 'battlebox.png'
        });
    }
});

Q.Battlebox.extend("TopBattlebox", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 100,
        });
    }
});

Q.Battlebox.extend("BottomBattlebox", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 300,
        });
    }
});

Q.scene("level1",function(stage) {
    //var bg = stage.insert(new Q.Background());
    var topbattlebox = stage.insert(new Q.TopBattlebox());
    var bottombattlebox = stage.insert(new Q.BottomBattlebox());
});

Q.load("battlebox.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
