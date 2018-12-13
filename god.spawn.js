var creepType = require('god.creeptype');
var spawnQueu = [];
var godSpawn = {
   
    run: function(){
        
    creepType.run();    
    
    //spawn wrap
    spawn = Game.spawns['Spawn1'];

    //target role qty MAX
    spawn.memory.harvesterMax = 0;
    spawn.memory.builderMax   = 2;
    spawn.memory.upgraderMax  = 3;
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


    //Spawn plan
    //spawn.memory.harvesterPlan = 

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

        //Emergency rump up for transportation
        if (spawn.memory.lorryQty == 0) {
            spawn.spawnCreep(creepType.typeLorry, newName, {memory: {role: 'lorry'}})
        }
        //Spawn qeue push
        if (spawn.memory.order == 'harvester' && spawn.memory.harvesterQty < spawn.memory.harvesterMax) {
            spawn.spawnCreep(creepType.typeHarvester, newName, {memory: {role: 'harvester'}}); 
            spawn.memory.spawnQueu.shift();
            spawn.memory.population.harvesterQeued--;  
        }
        else if (spawn.memory.order == 'builder' && spawn.memory.builderQty < spawn.memory.builderMax) {
            spawn.spawnCreep(creepType.typeBuilder, newName, {memory: {role: 'builder'}});
            spawn.memory.spawnQueu.shift();
            spawn.memory.population.builderQeued--;    
        }
        else if (spawn.memory.order == 'upgrader' && spawn.memory.upgraderQty < spawn.memory.upgraderMax) {
            spawn.spawnCreep(creepType.typeUpgrader, newName, {memory: {role: 'upgrader',
                                                                     working: 'false'}});
            spawn.memory.spawnQueu.shift();
            spawn.memory.population.upgraderQeued--; 
        }
        else if (spawn.memory.order == 'miner' && spawn.memory.minerQty  < spawn.memory.minerMax) {
            spawn.spawnCreep(creepType.typeMiner, newName, {memory: {role: 'miner'}});
            spawn.memory.spawnQueu.shift();
            spawn.memory.population.minerQeued--; 
        }
        else if (spawn.memory.order == 'lorry' && spawn.memory.lorryQty  < spawn.memory.lorryMax) {
            spawn.spawnCreep(creepType.typeLorry, newName, {memory: {role: 'lorry'}});
            spawn.memory.spawnQueu.shift();
            spawn.memory.population.lorryQeued--; 
        }
        else if (spawn.memory.order == 'W52N57LHD' && spawn.memory.lhdQty  < spawn.memory.lhdMax) {
            spawn.spawnCreep(creepType.lhd, newName, {memory: {role: 'lhd',
                                                                        home: 'W51N57',
                                                                      target: 'W52N57',
                                                                     working: false }});
            spawn.memory.spawnQueu.shift();
            spawn.memory.population.lhdQeued--;     
        } else {spawn.memory.spawnQueu.shift();}

            if (spawn.memory.spawnQueu[0])
                spawn.memory.Ready = false;
    }
    //spawning by role
    if (spawn.memory.spawnQueu.length < 5) {            
        if(spawn.memory.harvesterQty < spawn.memory.harvesterMax) {
            spawn.memory.spawnQueu.push('harvester');
            spawn.memory.population.harvesterQeued++;
        }
        if(spawn.memory.builderQty < spawn.memory.builderMax) {
            spawn.memory.spawnQueu.push('builder');
            spawn.memory.population.builderQeued++;
        }
        if(spawn.memory.upgraderQty < spawn.memory.upgraderMax) {
            spawn.memory.spawnQueu.push('upgrader');
            spawn.memory.population.upgraderQeued++;
        }
        if(spawn.memory.minerQty  < spawn.memory.minerMax) {
            spawn.memory.spawnQueu.push('miner');
            spawn.memory.population.minerQeued++;
        }
        if(spawn.memory.lorryQty  < spawn.memory.lorryMax) {
            spawn.memory.spawnQueu.push('lorry');
            spawn.memory.population.lorryQeued++;
        }
        if(spawn.memory.lhdQty  < spawn.memory.lhdMax) {
            spawn.memory.spawnQueu.push('W52N57LHD');
            spawn.memory.population.lhdQeued++;
        }
    }
    //qeue counter increment
    /*function () {
        spawn.memory.spawnQueu.forEach(function(order) {
            if (order == 'harvester') {
                spawn.memory.harvesterQeued++;
            }
            if (order == 'builder') {
                spawn.memory.builderQeued++;
            }
            if (order == 'upgrader') {
                spawn.memory.upgraderQeued++;
            }
            if (order == 'miner') {
                spawn.memory.minerQeued++;
            }
            if (order == 'lorry') {
                spawn.memory.lorryMQeued++;
            }
            if (order == 'W52N57LHD') {
                spawn.memory.lhdQeued++;
            }
        }
    }*/
    //memory manager
    spawn.memory.population = [
            {role: 'harvester', harvesterMax: '2' , harvesterQty: spawn.memory.harvesterQty, Qeued: spawn.memory.population.harvesterQeued },
            {role: 'builder'  , builderMax:   '2' , builderQty:   spawn.memory.builderQty  , Qeued:   spawn.memory.population.builderQeued },
            {role: 'upgrader' , upgraderMax:  '2' , upgraderQty:  spawn.memory.upgraderQty,  Qeued:  spawn.memory.population.upgraderQeued },
            {role: 'miner'    , minerMax:     '2' , minerQty:     spawn.memory.minerQty,     Qeued:     spawn.memory.population.minerQeued },
            {role: 'lorry'    , lorryMax:     '2' , lorryQty:     spawn.memory.lorryQty,     Qeued:     spawn.memory.population.lorryQeued },
            {role: 'lhd'      , lhdMax:       '2' , lhdQty:       spawn.memory.lhdQty,       Qeued:       spawn.memory.population.lhdQeued }
            ];
    /*if(spawn.spawning) {

        var spawningCreep = Game.creeps[spawn.spawning.name];
        console.log('Spawning new:' + spawningCreep.memory.role);

        spawn.room.visual.text(
            'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }*/
    
    //console log each type qty
    let room = Game.rooms['W51N57'];
    console.log('Room Energy available/Capacity :' + room.energyAvailable + '/' + room.energyCapacityAvailable);
    console.log('Storage Energy Capacity:' + room.storage.store[RESOURCE_ENERGY]);
    console.log('Harvester :' + spawn.memory.harvesterQty + '/' + spawn.memory.harvesterMax  + '/' + spawn.memory.population.harvesterQeued);
    console.log('Builder   :' + spawn.memory.builderQty + '/' + spawn.memory.builderMax + '/' + spawn.memory.population.builderQeued );
    console.log('Upgrader  :' + spawn.memory.upgraderQty + '/' + spawn.memory.upgraderMax + '/' + spawn.memory.population.upgraderQeued );
    console.log('Miner     :' + spawn.memory.minerQty + '/' + spawn.memory.minerMax + '/' + spawn.memory.population.minerQeued);
    console.log('Lorry     :' + spawn.memory.lorryQty + '/' + spawn.memory.lorryMax + '/' + spawn.memory.population.lorryQeued );
    console.log('Lhd       :' + spawn.memory.lhdQty + '/' + spawn.memory.lhdMax + '/' + spawn.memory.population.lhdQeued);
    console.log('Order que :' + spawn.memory.spawnQueu);
    console.log(spawn.memory.population);
    }
};
module.exports = godSpawn;
