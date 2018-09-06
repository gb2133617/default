var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
           // var sources = creep.room.find(FIND_SOURCES);
            //if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
             //   creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                
           // var sources = creep.pos.findClosestByPath(FIND_SOURCES);
        //    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
         //       creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
          //  }
        //    else {
                
            // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            
         /*   let dropped = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            
            // if there is energy dropped
            if (dropped != undefined) {
                if(creep.pickup(dropped) == ERR_NOT_IN_RANGE){
                creep.moveTo(dropped.pos)
                }
            }*/
            
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }
            }
        
           // }
        }
    }
};

module.exports = roleUpgrader;