Q.Sprite.extend("Cursor", {
    init: function(p) {
        this._super(p, {
            x: 30,
            y: 245,
            w: 16,
            h: 16,
            asset: 'player.png'
        });

        this.p.selection = 0;
        this.p.lastControl = 'none';
    },

    step: function(dt) {
        this.step_controls(dt);
        this.step_place(dt);
        //this._super(dt);
    },

    step_controls: function(dt) {
        var p = this.p;
        // Only move the cursor 'once' for every press of left or right
        if(Q.inputs['left'] && p.lastControl != 'left') {
            p.selection = p.selection - 1;
            p.lastControl = 'left';
        }
        if (Q.inputs['right'] && p.lastControl != 'right') {
            p.selection = p.selection + 1;
            p.lastControl = 'right';
        } else {
            if (!Q.inputs['left'] && !Q.inputs['right']) {
                p.lastControl = 'none';
            }
        }

        if (p.selection == -1) {
            p.selection = 2;
        } else if (p.selection == 3) {
            p.selection = 0;
        }

        if (Q.inputs['period']) {
            if (p.selection == 0) {
                this.selectFight();
            }
        }
    },

    step_place: function(dt) {
        var p = this.p;
        if (p.selection == 0) {
            p.x = 30;
        } else if (p.selection == 1) {
            p.x = 170;
        } else if (p.selection == 2) {
            p.x = 305;
        }
    },

    selectFight: function() {
        Q.stageScene("attack", 0, {attackState:this.stage.options.menuState});
    }
});
