/*
 * Object that tracks the duration of the current enemy's attack
 * in the 'under attack' phase. Controls when it is time to move
 * back to the battle menu.
 * This class is a subclass of Sprite because it needs to know how much
 * time has passed in the stage. Maybe there is a better class that it should
 * extend?
 */
Q.TimedPhase.extend("UnderAttackPhase", {
	init: function(duration, player) {
		this._super();
		this.p.duration = duration;
		this.p.player = player;
	},

	callback: function() {
		var menuState = this.stage.options.underAttackState;
		menuState.player = this.p.player.getPlayerState();
		Q.stageScene("battleMenu", 0, {
			menuState: menuState
		});
	}
});

Q.scene("underAttack", function(stage) {
	var underAttackState = stage.options.underAttackState;

	var hpTextContainer = stage.insert(new Q.UI.Container({
		fill: "black",
		border: 0,
		shadow: 0,
		shadowColor: "rgba(0,0,0,0.5)",
		x: 35,
		y: 0
	}));
	var hpText = new Q.UI.Text({
		label: "0",
		color: "white",
		x: 0,
		y: 0
	});
	stage.insert(hpText, hpTextContainer);
	var player = stage.insert(new Q.Player({
		hp: underAttackState.player.hp,
		hpText: hpText
	}));
	stage.insert(new Q.BulletShooter({
		x: 75,
		y: 75,
		vx: 30
	}, stage));
	stage.insert(new Q.BulletShooter({
		x: 150,
		y: 125,
		vx: 30,
		vy: 15
	}, stage));
	stage.insert(new Q.BulletShooter({
		x: 225,
		y: 175,
		vx: 15,
		vy: -30
	}, stage));

	stage.insert(new Q.UnderAttackPhase(underAttackState.enemy.duration, player));
});
