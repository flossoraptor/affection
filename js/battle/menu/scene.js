Q.scene("battleMenu",function(stage) {
    var fightTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 90,
        y: 230
    }));
    var fightText = new Q.UI.Text({
        label: "FIGHT",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(fightText, fightTextContainer);
    var itemTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 220,
        y: 230
    }));
    var itemText = new Q.UI.Text({
        label: "ITEM",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(itemText, itemTextContainer);
    var runTextContainer = stage.insert(new Q.UI.Container({
        fill: "black",
        border: 0,
        shadow: 0,
        shadowColor: "rgba(0,0,0,0.5)",
        x: 350,
        y: 230
    }));
    var runText = new Q.UI.Text({
        label: "RUN",
        color: "white",
        x: 0,
        y: 0
    });
    stage.insert(runText, runTextContainer);
    var cursor = stage.insert(new Q.Cursor());
});
