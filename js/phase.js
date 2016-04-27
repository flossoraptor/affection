/**
 * Class for having a phase which ends after a certain amount of time.
 */
Q.Sprite.extend("TimedPhase", {
	init: function(p) {
		this._super(p);
		this.p.timer = 0;
	},

	step: function(dt) {
		this.p.timer += dt;
		if (this.p.timer >= this.p.duration) {
			this.callback();
		}
	},

	callback: function() {
        console.log("You should override TimedPhase.callback()");
    }
});
