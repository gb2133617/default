var godAllocate = {
    run: function () {
        
        var harvesterGoal = 2,
            builderGoal = 1,
            upgraderGoal = 2;
            
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        
        //if(Game.rooms.energyCapacity == Game.rooms.energyCapacityAvailable {
        //    harvesters.memory.role = 'upgrader';
        //}
    }
};

module.exports = godAllocate;