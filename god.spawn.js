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
    

    //console log each type qty
    console.log(creep.memory.role + spawn.memory.harvesterQty);
    console.log(creep.memory.role + spawn.memory.builderQty);
    console.log(creep.memory.role + spawn.memory.upgraderQty);
    console.log(creep.memory.role + spawn.memory.minerQty);
    console.log(creep.memory.role + spawn.memory.lorryQty);
    console.log(creep.memory.role + spawn.memory.lhdQty);
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
    spawn.memory.harvesterQty = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    spawn.memory.builderQty   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    spawn.memory.upgraderQty  = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    spawn.memory.minerQty     = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    spawn.memory.lorryQty     = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    spawn.memory.lhdQty       = _.filter(Game.creeps, (creep) => creep.memory.role == 'lhd');

    //spawning by role
    if(spawn.memory.harvesterQty < spawn.memory.harvesterMax) {
        var newName = 'Harvester' + Game.time;
        spawn.spawnCreep(creepType.typeHarvester, newName,
            {memory: {role: 'harvester'}});
    }
    if(spawn.memory.builderQty < spawn.memory.builderMax  && harvesters.length > 0) {
        var newName = 'Builder' + Game.time;
        spawn.spawnCreep(creepType.typeBuilder, newName,
            {memory: {role: 'builder'}});
    }
    if(spawn.memory.upgraderQty < spawn.memory.upgraderMax  && harvesters.length > 0) {
        var newName = 'Upgrader' + Game.time;
        spawn.spawnCreep(creepType.typeUpgrader, newName,
            {memory: {role: 'upgrader',
                      working: 'false'
            }});
    }        
    if(spawn.memory.minerQty  < spawn.memory.minerMax) {
        var newName = 'Miner' + Game.time;
        spawn.spawnCreep(creepType.typeMiner, newName,
            {memory: {role: 'miner'
            }});
    }
    if(spawn.memory.lorryQty  < spawn.memory.lorryMax) {
        var newName = 'Lorry' + Game.time;
        spawn.spawnCreep(creepType.typeLorry, newName,
            {memory: {role: 'lorry'}});
    }
    if(spawn.memory.lhdQty  < spawn.memory.lhdMax) {
        var newName = 'W52N57LHD' + Game.time;
        spawn.spawnCreep(creepType.lhd, newName,
            {memory: {role: 'lhd',
                      home: 'W51N57',
                      target: 'W52N57',
                      working: false }});
    }
    if(spawn.spawning) {

        var spawningCreep = Game.creeps[spawn.spawning.name];
        console.log('Spawning new:' + spawningCreep.memory.role);

        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }
    }
};
module.exports = godSpawn;
