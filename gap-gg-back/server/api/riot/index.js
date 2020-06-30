const riot = require('express').Router();
const riotCtrl = require('./riot.ctrl');

//riot.ctrl에서 가공해놓은 후 router로 정의해놓는 곳?

riot.get('/champion', riotCtrl.getChampion);
riot.get('/rotation', riotCtrl.getRotation);
riot.get('/summoner', riotCtrl.searchSummonerName);
riot.get('/matchList', riotCtrl.searchMatchList);
riot.get('/match', riotCtrl.searchMatch);
riot.get('/queue', riotCtrl.getQueue);
riot.get('/spell', riotCtrl.getSpell);

module.exports = riot;