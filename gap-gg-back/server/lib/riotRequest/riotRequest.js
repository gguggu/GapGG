const request = require('request-promise-native');
const RIOT_URL = 'https://kr.api.riotgames.com/lol';
const DDRAGON_URL = 'http://ddragon.leagueoflegends.com/cdn';
const DEVELOPER_URL = 'http://static.developer.riotgames.com/docs';
const { API_KEY } = require('../../../config/config.json');
const VERSION = '10.15.1';

const getRotation = async () => {
  try {
    let rotations;
    await request.get(`${RIOT_URL}/platform/v3/champion-rotations?api_key=${API_KEY}`, (err, res, body) => {
      rotations = JSON.parse(body);
    });
    return rotations;
  } catch (error) {
    throw error;
  }
}

const getChampion = async () => {
  try {
    let champions;
    await request.get(`${DDRAGON_URL}/${VERSION}/data/ko_KR/champion.json`, (err, res, body) => {
      champions = JSON.parse(body);
    });
    return champions;
  } catch (error) {
    throw error;
  }
}

const searchSummonerName = async(name) => {
  try {
    let summoner;
    await request.get(`${RIOT_URL}/summoner/v4/summoners/by-name/${encodeURI(name)}?api_key=${API_KEY}`, (err, res, body) => {
      summoner = JSON.parse(body);
    });
    return summoner;
  } catch (error) {
    throw error;
  }
}

const searchMatchList = async(accountId, begin, end) => {
  try {
    let matches = [];
    await request.get(`${RIOT_URL}/match/v4/matchlists/by-account/${accountId}?endIndex=${end}&beginIndex=${begin}&api_key=${API_KEY}`, (err, res, body) => {
      matches = JSON.parse(body);
    });
    return matches;
  } catch (error) {
    throw error;
  }
}

const searchMatch = async(matchId) => {
  try {
    let match;
    await request.get(`${RIOT_URL}/match/v4/matches/${matchId}?api_key=${API_KEY}`, (err, res, body) => {
      match = JSON.parse(body);
    });
    return match;
  } catch (error) {
    throw error;
  }
}

const getQueue = async() => {
  try {
    let queues;
    await request.get(`${DEVELOPER_URL}/lol/queues.json`, (err, res, body) => {
      queues = JSON.parse(body);
    });
    return queues;
  } catch (error) {
    throw error;
  }
}

const getSpell = async() => {
  try {
    let spells;
    await request.get(`${DDRAGON_URL}/${VERSION}/data/ko_KR/summoner.json`, (err, res, body) => {
      spells = JSON.parse(body);
    });
    return spells;
  } catch (error) {
    throw error;
  }
}

const getSummonerTier = async(summonerName) => {
  try {
    let tier;
    await request.get(`${RIOT_URL}/league/v4/entries/by-summoner/${summonerName}?api_key=${API_KEY}`, (err, res, body) => {
      tier = JSON.parse(body);
    })
    return tier;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRotation: getRotation,
  getChampion: getChampion,
  searchSummonerName: searchSummonerName,
  searchMatchList: searchMatchList,
  searchMatch: searchMatch,
  getQueue: getQueue,
  getSpell: getSpell,
  getSummonerTier: getSummonerTier
};