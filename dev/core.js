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
	Edo.coords: {x: 0, y: 0,z: 0},
	DIGGING: false,
	DICTIONARY: [14, 15, 16, 21, 56, 73, 74, 89, 153],
};

Edo.start = function(Coords,area) {
	Edo.DIGGING = true;
	Edo.coords.x = Coords.x;
	Edo.coords.y = Coords.y;
	Edo.coords.z = Coords.z;
	Edo.gen = Edo.digGenerator(Coords,area);
	Player.setCarriedItem(0, 0, 0);
	World.destroyBlock(Coords.x, Coords.y+ 1, Coords.z, false);
	World.setBlock(Coords.x, Coords.y, Coords.z, ID.NetherReactorCore, 0);
};

Edo.finish = function() {
	Edo.DIGGING = false;
	World.destroyBlock(Edo.coords.x, Edo.coords.y, Edo.coords.z, false);
};

Edo.digGenerator = function(Coords,area) {
	loop:
	for (let x = Coords.x - area, xl = Coords.x + area; x <= xl; x++) {
		for (let z = Coords.z - area, zl = Coords.z + area; z <= zl; z++) {
			for (let y = 0 , yl = Coords.y ; y <= yl; y++) {
				if (!Edo.DIGGING) break loop;
				Edo.setEmptyBlockAndDrop(Coords, x, y, z);
			}
			yield;
		}
	}
}

Edo.setEmptyBlockAndDrop = function(Coords, x, y, z) {
	const id = World.getBlockID(x, y, z);
	if (Edo.DICTIONARY.indexOf(id) !== -1) {
		World.setBlock(x, y, z, 0, 0);
		const data = World.getBlockData(x, y, z);
		const entity = World.drop(Coords.x + 0.5, Coords.y + 1, Coords.z + 0.5,id, 1, data);
		Entity.setVelocity(entity, Math.random() < 0.5 ? Math.random() * -0.3 : Math.random() * 0.3, 0.6, Math.random() < 0.3 ? Math.random() * -0.3 : Math.random() * 0.3);
	}
};







