/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 4
*/



// file: id.js

const ID = {
	Glowstone: 89,
	Goldblock: 41,
	GoldPickaxe: 285,
	DiamondPickaxe: 278,
	NetherReactorCore: 247
};




// file: core.js

/** EasilyDigOre for InnerCore 1.0
 *
 * (c) 2016 SorrowBlue
 *
 * Do NOT redistribute my source code.
 * Do NOT claim my source code as your own.
 */

const Edo = {
	gen: null,
	range: 0,
	coords: {
		x: 0,
		y: 0,
		z: 0
	},
	DIGGING: false,
	DICTIONARY: [14, 15, 16, 21, 56, 73, 74, 89, 153],
};

Edo.start = function (Coords, area) {
	Edo.DIGGING = true;
	Edo.coords.x = Coords.x;
	Edo.coords.y = Coords.y;
	Edo.coords.z = Coords.z;
	Edo.gen = Edo.digGenerator(Coords, area);
	Player.setCarriedItem(0, 0, 0);
	World.destroyBlock(Coords.x, Coords.y + 1, Coords.z, false);
	World.setBlock(Coords.x, Coords.y, Coords.z, ID.NetherReactorCore, 0);
};

Edo.finish = function () {
	Edo.DIGGING = false;
	World.destroyBlock(Edo.coords.x, Edo.coords.y, Edo.coords.z, false);
};

Edo.digGenerator = function (Coords, area) {
	loop: for (let x = Coords.x - area, xl = Coords.x + area; x <= xl; x++) {
		for (let z = Coords.z - area, zl = Coords.z + area; z <= zl; z++) {
			for (let y = 0, yl = Coords.y; y <= yl; y++) {
				if (!Edo.DIGGING) break loop;
				Edo.setEmptyBlockAndDrop(Coords, x, y, z);
			}
			yield;
		}
	}
}

Edo.setEmptyBlockAndDrop = function (Coords, x, y, z) {
	const id = World.getBlockID(x, y, z);
	if (Edo.DICTIONARY.indexOf(id) !== -1) {
		World.setBlock(x, y, z, 0, 0);
		const data = World.getBlockData(x, y, z);
		const entity = World.drop(Coords.x + 0.5, Coords.y + 1, Coords.z + 0.5, id, 1, data);
		Entity.setVelocity(entity, Math.random() < 0.5 ? Math.random() * -0.3 : Math.random() * 0.3, 0.6, Math.random() < 0.3 ? Math.random() * -0.3 : Math.random() * 0.3);
	}
};

let Pos = {
  x : 1.00052,
  y : 6.54346,
  z : 3.15467
}
Pos = DeleteDecimal(Pos);

function DeleteDecimal(Number){
	if(typeof Number == "number"){
		return Number | 0;
	} else if(typeof Number == "object"){
		this.Object = {};
		for(Key in Number){
			this.Object[Key] = Number[Key] | 0;
		}
		return this.Object;
	}
}






// file: callback.js

Callback.addCallback("tick", function () {
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

Callback.addCallback("DestroyBlock", function (Coords, Block, Player) {
	if (Edo.DIGGING &&
		Coords.x == Edo.coords.x &&
		Coords.y == Edo.coords.y &&
		Coords.z == Edo.coords.z
	) {
		Edo.finish();
	}

});




// file: item.js

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




