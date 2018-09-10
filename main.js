var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var godSpawn = require('god.spawn');
var godAllocate = require('god.allocate');
var roleMiner = require('role.miner');
var roleLorry = require('role.lorry');
var roleLongharvest = require('role.longharvest');
//require('prototype.creep');
module.exports.loop = function () {
    
    godSpawn.run();
    godAllocate.run();
    
    //
    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (var tower of towers) {
        // run tower logic
        // find closes hostile creep
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            tower.attack(target);
        }
    }
    //
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'lorry') {
            roleLorry.run(creep);
        }
        if(creep.memory.role == 'lhd') {
            roleLongharvest.run(creep);
        }
    }
}