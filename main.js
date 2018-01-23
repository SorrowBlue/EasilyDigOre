/** EasilyDigOre for InnerCore 1.0
 *
 * (c) 2016 SorrowBlue
 *
 * Do NOT redistribute my source code.
 * Do NOT claim my source code as your own.
 */

const EDO = {
	Block: [],
	Yield: null,
	Before: {x: 0,y: 0, z: 0},
	DIGGING: false,
	DICTIONARY: [14, 15, 16, 21, 56, 73, 74, 89, 153],
	setArea: function(Coords, area){
		this.Block.push(Coords.x);
		this.Block.push(Coords.y);
		this.Block.push(Coords.z);
		this.Block.push(area);
	} 
};

Item.registerUseFunctionForID(257, function(Coords, Item, Block){
	if (World.getBlockID(Coords.x, Coords.y + 1, Coords.z) === 89 && // グロウストーン
			Block.id === 41 && Block.data === 0) { // 金ブロック
		if (EDO.DIGGING) {
			Game.message("他の場所で採掘が行われています。");
		} else {
			
			Player.setCarriedItem(0, 0, 0);
			EDO.setArea(Coords,4);
			EDO.DIGGING = true;
			Game.message("採掘を開始します。");
			
		}
	}
}); 

Callback.addCallback("tick",function() {
	if (EDO.Yield != null) {
		try {
			EDO.Yield.next();
		} catch (Error) {
			EDO.Yield = null;
			Game.message("採掘が終了しました。");
		}
	} else if (EDO.Block.length !== 0) {
		EDO.Yield = blockYield(EDO.Block[0],EDO.Block[1],EDO.Block[2],EDO.Block[3]);
		EDO.Block.length = 0;
	}
});

Callback.addCallback("DestroyBlock", function(Coords, Block, Player){
	const x = Coords.x, y = Coords.y, z = Coords.z;
	if (x == EDO.Before.x && (y == EDO.Before.y || y == EDO.Before.y + 1) && z == EDO.Before.z) {
		EDO.DIGGING = false;
	}
	
});




function dropMoveUp(x, y, z, xx, yy, zz, area, id) {
	World.setBlock(x + xx - area, yy, z + zz - area, 0, 0);
	Entity.setVelocity(World.drop (x + 0.5, y + 1, z + 0.5, id, 1, 0) , Math.random(), 0.3, Math.random());
}



function setDesBlock(x,y,z){
	EDO.Before.x = x;
	EDO.Before.y = y;
	EDO.Before.z = z;
	World.destroyBlock(x, y, z, false);
	World.destroyBlock(x, y + 1, z, false);
	World.setBlock(x, y, z, 247, 0);
}

function blockYield(x,y,z,area){
	setDesBlock(x,y,z);
	loop:for(let zz=area*2;zz--;)for(let xx=2*area;xx--;){
		for(let yy=y;yy--;){
			let id=World.getBlockID(x+xx-area,yy,z+zz-area);
			if(!EDO.DIGGING)break loop;
			if(-1!==EDO.DICTIONARY.indexOf(id))
				dropMoveUp(x,y,z,xx,yy,zz,area,id);
		}
		yield;
		
		
	}
	World.destroyBlock(x,y,z,false);
	EDO.DIGGING = false;
	EDO.Before.x=EDO.Before.y=EDO.Before.xz=0;
}