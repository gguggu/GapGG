const request = require('request-promise-native');
const RIOT_URL = 'https://kr.api.riotgames.com/lol';
const DDRAGON_URL = 'http://ddragon.leagueoflegends.com/cdn';
const API_KEY = 'RGAPI-221a2f09-67f5-4b23-bfe6-8021b8c97d53';
const VERSION = '10.12.1';

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

module.exports = {
  getRotation: getRotation,
  getChampion: getChampion,
  searchSummonerName: searchSummonerName
};