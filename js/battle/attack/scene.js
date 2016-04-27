Q.TimedPhase.extend("AttackPhase", {
	init: function(player) {
		this._super({}, {});
		this.p.duration = 3;
		this.p.player = player;
	},

	callback: function() {
		var underAttackState = this.stage.options.attackState;
		Q.stageScene("underAttack", 0, {
			underAttackState: underAttackState
		});
	}
});

Q.scene("attack", function(stage) {
	var attackState = stage.options.attackState;

	var hpTextContainer = stage.insert(new Q.UI.Container({
		fill: "black",
		border: 0,
		shadow: 0,
		shadowColor: "rgba(0,0,0,0.5)",
		x: 35,
		y: 0
	}));
	var hpText = new Q.UI.Text({
		label: "Attacked and did X damage",
		color: "white",
		x: 0,
		y: 0
	});
	stage.insert(hpText, hpTextContainer);
	stage.insert(new Q.AttackPhase());
});
