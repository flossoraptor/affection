Q.scene("gameOver", function(stage) {
	var gameOverTextContainer = stage.insert(new Q.UI.Container({
		fill: "black",
		border: 3,
		borderColor: "rgba(255,255,255,255)",
		x: 35,
		y: 0
	}));
	var gameOverText = new Q.UI.Text({
		label: "Game Over",
		color: "white",
		x: 125,
		y: 125
	});
	stage.insert(gameOverText, gameOverTextContainer);
});
