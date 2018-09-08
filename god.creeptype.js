var creepType = {
    run: function(){
        
    var spawnRoom = Game.spawns['Spawn1'].room;
    var controllerLevel = spawnRoom.controller.level;
    
            creepType.typeHarvester = [MOVE,CARRY,WORK,WORK];
            creepType.typeBuilder =   [MOVE,MOVE,CARRY,CARRY,CARRY,WORK,WORK,WORK];
            creepType.typeUpgrader =  [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK];
            creepType.typeMiner =     [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK];
            creepType.typeLorry =     [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
            creepType.lhd =           [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                       CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK];          
    }
    
};
module.exports = creepType;