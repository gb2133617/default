	//resource ID's in a room
	room.prototype.sources = 
		function(): {
			let room = this.room;
			room.find(FIND_SOURCES);
		}
	//paired Container and Source
	room.prototype.availableMine = 
		function(): {

			let room = this.room;
			let sources = room.sources;
            	// iterate over all sources
        	for (let source of sources) {
            	// if the source has no miner
            	if (!_.some(Game.rooms.find(FIND_MY_CREEPS), c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                	// check whether or not the source has a container
                	/** @type {Array.StructureContainer} */
                	let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                	    filter: s => s.structureType == STRUCTURE_CONTAINER
                	});
                	}
            	}
            	return containers;
        	}
    	
    

module.exports = 