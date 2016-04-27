Q.MovingSprite.extend("Player", {
	init: function(p) {
		this._super(p, {
			x: 50,
			y: 50,
			w: 16,
			h: 16,
			asset: 'player.png'
		});

		this.p.invincibility = {
			timer: 0
		};
		this.p.flicker = {
			count: 0
		};
		this.p.speed = 100;
		if (p) {
			this.p.hpText = p.hpText;
			this.updateHp(p.hp);
		}

		this.on("hit.sprite", function(collision) {
			if (collision.obj.isA("Bullet")) {
				if (this.p.invincibility.timer == 0) {
					this.p.hp = this.p.hp - 1;
					this.updateHp(this.p.hp);
					this.triggerInvincibility(2);
				}
			}
		});
	},

	step: function(dt) {
		this.step_check(dt);

		this.step_controls(dt);

		this.step_invincibility(dt);

		this.stage.collide(this);

		this._super(dt);
	},

	step_check: function(dt) {
		if (this.p.hp <= 0) {
			this.triggerGameOver();
		}
	},

	step_controls: function(dt) {
		var p = this.p;
		p.vx = 0;
		if (Q.inputs['left']) {
			p.vx = -1 * p.speed;
		}
		if (Q.inputs['right']) {
			p.vx = p.speed;
		}
		p.vy = 0;
		if (Q.inputs['up']) {
			p.vy = -1 * p.speed;
		}
		if (Q.inputs['down']) {
			p.vy = p.speed;
		}
	},

	step_invincibility: function(dt) {
		var p = this.p;
		if (p.invincibility.timer > 0) {
			p.invincibility.timer = p.invincibility.timer - dt;
			if (p.invincibility.timer < 0) {
				this.endInvincibility()
			} else {
				// Should cause the sprite to flicker
				this.step_flicker(dt);
			}
		}
	},

	step_flicker: function(dt) {
		var p = this.p;
		if (p.flicker.count == 0) {
			this.toggle_opacity();
			p.flicker.count = 2;
		} else {
			p.flicker.count = p.flicker.count - 1;
		}
	},

	triggerGameOver: function() {
		Q.stageScene("gameOver");
	},

	toggle_opacity: function() {
		if (this.p.opacity != 0) {
			this.p.opacity = 0;
		} else {
			this.p.opacity = 0.75;
		}
	},

	triggerInvincibility: function(seconds) {
		this.p.invincibility = {
			timer: seconds
		};
		this.p.opacity = 1;
	},

	endInvincibility: function() {
		this.p.invincibility = {
			timer: 0
		};
	},

	updateHp: function(hp) {
		this.p.hpText.p.label = '' + hp;
		this.p.hp = hp;
	},

	getPlayerState: function() {
		return {
			hp: this.p.hp
		};
	}
});
