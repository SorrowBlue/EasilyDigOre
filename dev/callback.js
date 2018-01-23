Callback.addCallback("tick", function() {
	if (Edo.gen != null) {
		try {
			Edo.gen.next();
		} catch (Error) {
			Edo.gen = null;
			Edo.finish();
			Game.message("採掘が終了しました。");
		}
	}
});

Callback.addCallback("DestroyBlock", function(Coords, Block, Player){
	if (Edo.DIGGING
		&& Coords.x == Edo.coords.x
		&& Coords.y == Edo.coords.y
		&& Coords.z == Edo.coords.z
	) {
		Edo.finish();
	}
	
});

