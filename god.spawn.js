var creepType = require('god.creeptype');
var spawnQueu = [];
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
    
    spawn.memory.order = spawn.memory.spawnQueu[0];
    console.log('Order: ' + spawn.memory.order);


    if(!spawn.spawning) {
            spawn.memory.Ready = true;
            console.log('chilling');
        }
    if(spawn.spawning) {
            spawn.memory.Ready = false;
            console.log('busy');
        }

    if (spawn.memory.Ready == true) {

        var spawn = Game.spawns['Spawn1']
        var newName = spawn.memory.order + Game.time;
        
        if (spawn.memory.order == 'Harvester' && spawn.memory.harvesterQty < spawn.memory.harvesterMax) {
            spawn.spawnCreep(creepType.typeHarvester, newName, {memory: {role: 'harvester'}}); 
            spawn.memory.spawnQueu.shift();  
        }
        if (spawn.memory.order == 'Builder' && spawn.memory.builderQty < spawn.memory.builderMax) {
            spawn.spawnCreep(creepType.typeBuilder, newName, {memory: {role: 'builder'}});
            spawn.memory.spawnQueu.shift();  
        }
        if (spawn.memory.order == 'Upgrader' && spawn.memory.upgraderQty < spawn.memory.upgraderMax) {
            spawn.spawnCreep(creepType.typeUpgrader, newName, {memory: {role: 'upgrader',
                                                                     working: 'false'}});
            spawn.memory.spawnQueu.shift();
        }
        if (spawn.memory.order == 'Miner' && spawn.memory.minerQty  < spawn.memory.minerMax) {
            spawn.spawnCreep(creepType.typeMiner, newName, {memory: {role: 'miner'}});
            spawn.memory.spawnQueu.shift();
        }
        if (spawn.memory.order == 'Lorry' && spawn.memory.lorryQty  < spawn.memory.lorryMax) {
            spawn.spawnCreep(creepType.typeLorry, newName, {memory: {role: 'lorry'}});
            spawn.memory.spawnQueu.shift();
        }
        if (spawn.memory.order == 'W52N57LHD' && spawn.memory.lhdQty  < spawn.memory.lhdMax) {
            spawn.spawnCreep(creepType.lhd, newName, {memory: {role: 'lhd',
                                                                        home: 'W51N57',
                                                                      target: 'W52N57',
                                                                     working: false }});
            spawn.memory.spawnQueu.shift();
        }
            spawn.memory.Ready = false;
    }
    //spawning by role
    if (spawn.memory.spawnQueu.length < 5) {            
        if(spawn.memory.harvesterQty < spawn.memory.harvesterMax) {
            spawn.memory.spawnQueu.push('Harvester');
        }
        if(spawn.memory.builderQty < spawn.memory.builderMax) {
                    spawn.memory.spawnQueu.push('Builder');
        }
        if(spawn.memory.upgraderQty < spawn.memory.upgraderMax) {
                    spawn.memory.spawnQueu.push('Upgrader');
        }
        if(spawn.memory.minerQty  < spawn.memory.minerMax) {
                    spawn.memory.spawnQueu.push('Miner');
        }
        if(spawn.memory.lorryQty  < spawn.memory.lorryMax) {
                    spawn.memory.spawnQueu.push('Lorry');
        }
        if(spawn.memory.lhdQty  < spawn.memory.lhdMax) {
                    spawn.memory.spawnQueu.push('W52N57LHD');
        }
    }
    /*if(spawn.spawning) {

        var spawningCreep = Game.creeps[spawn.spawning.name];
        console.log('Spawning new:' + spawningCreep.memory.role);

        spawn.room.visual.text(
            'Ã°ÂÂÂ Ã¯Â¸Â' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }*/
    
    //console log each type qty
    console.log('Harvester :' + spawn.memory.harvesterQty);
    console.log('Builder   :' + spawn.memory.builderQty);
    console.log('Upgrader  :' + spawn.memory.upgraderQty);
    console.log('Miner     :' + spawn.memory.minerQty);
    console.log('Lorry     :' + spawn.memory.lorryQty);
    console.log('Lhd       :' + spawn.memory.lhdQty);
    console.log('Order que :' + spawn.memory.spawnQueu);
    }
};
module.exports = godSpawn;
