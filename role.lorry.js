var roleLorry = {


    // a function to run the logic for this role
    run: function(creep) {
        
        creep.memory.working = true;
        
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role == 'miner') == 0){
            
        }
        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (structure) => (structure.structureType == STRUCTURE_SPAWN
                             || structure.structureType == STRUCTURE_EXTENSION
                             || structure.structureType == STRUCTURE_TOWER)
                             && structure.energy < structure.energyCapacity
            });

            // if we found one
            if (structure) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            
            if (!structure) {
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER 
                                            && s.store[RESOURCE_ENERGY] < s.storeCapacity
                                        //    && s.findInRange(FIND_SOURCES)[0]
                });
                // try to transfer energy, if it is not in range
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }
                
            }
            
        }
        // if creep is supposed to get energy
        else {
            // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});

            let dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
           
            
            // if there is energy dropped
            if (dropped != undefined) {
                if(creep.pickup(dropped) == ERR_NOT_IN_RANGE){
                creep.moveTo(dropped.pos)
                }
            }
            // if one was found
            else if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }
            }
            else if (!container) {
                if (!container) {
                     let box = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_STORAGE 
                                            && s.store[RESOURCE_ENERGY] > 0
                                    //    && s.findInRange(FIND_SOURCES)[0]
                });
                // try to transfer energy, if it is not in range
                if (creep.withdraw(box, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(box);
                }
                }
            }
        }
    }
};
module.exports = roleLorry;