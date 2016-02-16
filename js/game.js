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

Q.Sprite.extend("BBSprite", {
    init: function(props, defaultProps) {
        this._super(props, defaultProps);
    },

    /**
    The Q.Sprite implementation of draw, with a vertical offset.
    */
    _draw: function(ctx, dy) {
      var p = this.p;
      var drawP = {
          cx: p.cx,
          cy: p.cy + dy,
          frame: p.frame,
          asset: p.asset,
          color: p.color,
          w: p.w,
          h: p.h
      };
      if(drawP.sheet) {
        this.sheet().draw(ctx,-drawP.cx,-drawP.cy,drawP.frame);
      } else if(drawP.asset) {
        ctx.drawImage(Q.asset(drawP.asset),-drawP.cx,-drawP.cy);
      } else if(drawP.color) {
        ctx.fillStyle = drawP.color;
        ctx.fillRect(-drawP.cx,-drawP.cy,drawP.w,drawP.h);
      }
    },

    /**
    Draws the sprite both to the bottom and top battle box
    */
    draw: function(ctx) {
        //this._draw(ctx, 0);
        this._draw(ctx, -50);
    }
})

Q.BBSprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            x: 120,
            y: 300,
            w: 16,
            h: 16,
            asset: 'player.png',
            vx: 5
        });
    },

    step: function(dt) {
        this.p.x += this.p.vx * dt;
    }
})

Q.scene("level1",function(stage) {
    var battleboxes = stage.insert(new Q.Battleboxes());
    var player = stage.insert(new Q.Player());
});

Q.load("battlebox.png, battleboxes.png, obstacle.png, player.png", function() {
    Q.stageScene("level1");
});
