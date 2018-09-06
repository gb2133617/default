var creepType = require('god.creeptype');

var godSpawn = {
   
    run: function(){
        
    creepType.run();    
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('Miners: ' + miners.length);

    var lorrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    console.log('Lorrys: ' + miners.length);
    
    var longharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'lhd');
    console.log('LHD: ' + miners.length);

    if(harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(creepType.typeHarvester, newName,
            {memory: {role: 'harvester'}});
    }
    if(builders.length < 2 && harvesters.length > 0) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(creepType.typeBuilder, newName,
            {memory: {role: 'builder'}});
    }
    if(upgraders.length < 4 && harvesters.length > 0) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(creepType.typeUpgrader, newName,
            {memory: {role: 'upgrader',
                      working: 'false'
            }});
    }        
    if(miners.length < 2) {
        
        var newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(creepType.typeMiner, newName,
            {memory: {role: 'miner'
            }});
    }
    if(lorrys.length < 3) {
        var newName = 'Lorry' + Game.time;
        console.log('Spawning new lorry: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(creepType.typeLorry, newName,
            {memory: {role: 'lorry'}});
    }
    if(longharvesters.length < 5) {
        var newName = 'LHD' + Game.time;
        console.log('Spawning new LHD: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(creepType.lhd, newName,
            {memory: {role: 'lhd',
                      home: 'W51N57',
                      target: 'W52N57',
                      working: false
            }});
    }
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}


};
module.exports = godSpawn;
