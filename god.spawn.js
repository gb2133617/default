var creepType = require('god.creeptype');

var godSpawn = {
   
    run: function(){
        
    creepType.run();    
    
   /* //count creeps by type
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var lorrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    var longharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'lhd');
    */

    

    //spawn wrap
    spawn = Game.spawns['Spawn1'];

    //target role qty MAX
    spawn.memory.harvesterMax = 1;
    spawn.memory.builderMax   = 2;
    spawn.memory.upgraderMax  = 4;
    spawn.memory.minerMax     = 2;
    spawn.memory.lorryMax     = 3;
    spawn.memory.lhdMax       = 5;

    //current role qty
    spawn.memory.harvesterQty = (_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')).length;
    spawn.memory.builderQty   = (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder')).length;
    spawn.memory.upgraderQty  = (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')).length;
    spawn.memory.minerQty     = (_.filter(Game.creeps, (creep) => creep.memory.role == 'miner')).length;
    spawn.memory.lorryQty     = (_.filter(Game.creeps, (creep) => creep.memory.role == 'lorry')).length;
    spawn.memory.lhdQty       = (_.filter(Game.creeps, (creep) => creep.memory.role == 'lhd')).length;

    //spawn que
    var spawnQueu[];
    spawn.memory.spawnQueu = spawnQueu;

    spawn.memory.order = spawnQueu[0];

    if (spawn.memory.ready == true) {

        if (spawnQueu[0] == 'Harvester') {
            var newName = spawnQueu[0] + Game.time;
            spawn.spawnCreep(creepType.typeHarvester, newName, {memory: {role: 'harvester'}});   
        }
        if (spawnQueu[0] == 'Builder') {
            var newName = spawnQueu[0] + Game.time;
            spawn.spawnCreep(creepType.typeHarvester, newName, {memory: {role: 'builder'}});  
        }
        if (spawnQueu[0] == 'Upgrader') {
            var newName = spawnQueu[0] + Game.time;
            spawn.spawnCreep(creepType.typeUpgrader, newName, {memory: {role: 'upgrader',
                                                                     working: 'false'}});
        }
        if (spawnQueu[0] == 'Miner') {
            var newName = spawnQueu[0] + Game.time;
            spawn.spawnCreep(creepType.typeUpgrader, newName, {memory: {role: 'miner'}});
        }
        if (spawnQueu[0] == 'Lorry') {
            var newName = spawnQueu[0] + Game.time;
            spawn.spawnCreep(creepType.typeUpgrader, newName, {memory: {role: 'lorry'}});
        }
        if (spawnQueu[0] == 'W52N57LHD') {
            var newName = spawnQueu[0] + Game.time;
            spawn.spawnCreep(creepType.typeUpgrader, newName, {memory: {role: 'lhd',
                                                                        home: 'W51N57',
                                                                      target: 'W52N57',
                                                                     working: false }});
        }

        spawnQueu.shift[0];
    }

    //spawning by role
    if(spawn.memory.harvesterQty < spawn.memory.harvesterMax) {
        spawnQeue.push('Harvester');
    }
    if(spawn.memory.builderQty < spawn.memory.builderMax  && spawn.memory.harvesterMax > 0) {
        spawnQeue.push('Builder');
    }
    if(spawn.memory.upgraderQty < spawn.memory.upgraderMax  && spawn.memory.harvesterMax > 0) {
        spawnQeue.push('Upgrader');
    }
    if(spawn.memory.minerQty  < spawn.memory.minerMax) {
        spawnQeue.push('Miner');
    }
    if(spawn.memory.lorryQty  < spawn.memory.lorryMax) {
        spawnQeue.push('Lorry');
    }
    if(spawn.memory.lhdQty  < spawn.memory.lhdMax) {
        spawnQeue.push('W52N57LHD');
    }

    if(spawn.spawning) {

        spawn.memory.ready == false;

        var spawningCreep = Game.creeps[spawn.spawning.name];
        console.log('Spawning new:' + spawningCreep.memory.role);

        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    //console log each type qty
    console.log('Harvester :' + spawn.memory.harvesterQty);
    console.log('Builder   :' + spawn.memory.builderQty);
    console.log('Upgrader  :' + spawn.memory.upgraderQty);
    console.log('Miner     :' + spawn.memory.minerQty);
    console.log('Lorry     :' + spawn.memory.lorryQty);
    console.log('Lhd       :' + spawn.memory.lhdQty);
    }
};
module.exports = godSpawn;
