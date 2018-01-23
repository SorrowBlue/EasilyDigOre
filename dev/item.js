Item.registerUseFunctionForID(ID.GoldPickaxe, function (Coords, Item, Block) {
	if (Block.id === ID.Goldblock && World.getBlockID(Coords.x, Coords.y + 1, Coords.z) === ID.Glowstone) {
		if (Edo.DIGGING) {
			Game.message("他の場所で採掘が行われています。");
		} else {
			Edo.start(Coords, 4);
			Game.message("採掘を開始します。");
		}
	}
});

Item.registerUseFunctionForID(ID.DiamondPickaxe, function (Coords, Item, Block) {
	if (Block.id === ID.Goldblock && World.getBlockID(Coords.x, Coords.y + 1, Coords.z) === ID.Glowstone) {
		if (Edo.DIGGING) {
			Game.message("他の場所で採掘が行われています。");
		} else {
			Edo.start(Coords, 8);
			Game.message("採掘を開始します。");
		}
	}
});
