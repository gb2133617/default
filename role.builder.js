var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }
        if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repairing');
        }

        if (creep.memory.building) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (targets) {
                if (creep.build(targets) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
            else {
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax
                        && structure.structureType != STRUCTURE_WALL
                        && structure.structureType != STRUCTURE_RAMPART);}});
                    if (creep.repair(targets) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                
            }
        }
//        else {
//            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
//            if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
//                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
//            }
        else {
                // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            
            let dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            
            // if there is energy dropped
            if (dropped != undefined) {
                if(creep.pickup(dropped) == ERR_NOT_IN_RANGE){
                creep.moveTo(dropped.pos)
                }
            }
            
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }    
            }
        }
    }    
};

module.exports = roleBuilder;