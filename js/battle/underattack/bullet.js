Q.MovingSprite.extend("Bullet", {
	init: function(p) {
		this._super(p, {
			w: 8,
			h: 8,
			asset: 'bullet.png'
		});
	},

	step: function(dt) {
		this._super(dt);
		var p = this.p;
		if (p.x < 0 || p.x > 400) {
			this.destroy();
		} else if (p.y < 0 || p.y > 280) {
			this.destroy();
		}
		this.stage.collide(this);
	}
});

Q.MovingSprite.extend("BulletShooter", {
	init: function(p) {
		this._super(p, {
			w: 8,
			h: 8,
			asset: 'bullet.png'
		});
		this.p.timer = 0;
	},

	step: function(dt) {
		var p = this.p;
		p.timer += dt;
		if (p.timer > 1) {
			p.timer = 0;
		}
		if (p.timer == 0) {
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vx: 80
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vx: -80
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vy: 80
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vy: -80
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vx: 40,
				vy: 40
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vx: -40,
				vy: 40
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vx: 40,
				vy: -40
			}));
			this.stage.insert(new Q.Bullet({
				x: p.x,
				y: p.y,
				vx: -40,
				vy: -40
			}));
		}

		if (p.x < 0 || p.x > 400) {
			p.vx = -p.vx;
		} else if (p.y < 0 || p.y > 280) {
			p.vy = -p.vy;
		}

		this._super(dt);
	}
});
