var quintusOptions = {
	development: true
};

var Q = Quintus(quintusOptions)
	.include("Sprites, Scenes, Input, Pixels, UI");

var setupOptions = {
	width: 400,
	height: 240,
	scaleToFit: true
};

Q.pixelsSetup(setupOptions).controls();

Q.load("bg.png, obstacle.png, player.png, bullet.png", function() {
	Q.stageScene("battleMenu", 0, {
		menuState: {
			player: {
				hp: 10
			},
			enemy: {
				hp: 10,
				duration: 6
			}
		}
	});
});
