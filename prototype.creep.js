	//resource ID's in a room
	Creep.prototype.getSources = 
		function() {
			let room = this.room;
			creep.room.find(FIND_SOURCES);
		}
	//paired Container and Source
	Creep.prototype.availableContainers = 
		function() {

			let room = this.room;
			let sources = creep.getSources;
            	// iterate over all sources
        	for (let source of sources) {
            	// if the source has no miner
            	//if (!_.some(Game.rooms.find(FIND_MY_CREEPS), c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                	// check whether or not the source has a container
                	/** @type {Array.StructureContainer} */
                	let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                	    filter: s => s.structureType == STRUCTURE_CONTAINER});
                	}
                return containers;
            }
            	
        	
