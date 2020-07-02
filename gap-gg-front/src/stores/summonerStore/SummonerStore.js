import { autobind } from "core-decorators";
import { observable, action } from "mobx";
import SummonerRepository from "./SummonerRepository";
import { DDRAGON, VERSION } from 'config/config.json';
import moment from "moment";

@autobind
class SummonerStore {
  @observable summoner={};
  @observable matches=[];
  @observable detailMatches=[];
  @observable queues=[];
  @observable spells=[];
  @observable tier=[];

  @action async searchSummoner(name){
    try {
      const data = await SummonerRepository.searchSummoner(name);
      this.summoner = data.data;
      this.matches=[]; //새로운 소환사 검색시 초기화 작업
      this.detailMatches=[];
      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action async searchMatchList(){
    try {
      const accountId = this.summoner.accountId;
      const data = await SummonerRepository.searchMatchList(accountId, 0, 10);
      this.matches = data.data.matches;

      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      })
    }
  }

  @action async searchMatch(){
    try {
      for(let match of this.matches){
        const { gameId } = match;
        const data = await SummonerRepository.searchMatch(gameId);
        await this.arrangeDetailMatch(data.data, match);
      }

      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action async getQueue(){
    try {
      const data = await SummonerRepository.getQueue();
      this.queues=data.data;
      
      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      })
    }
  }

  @action async getSpell(){
    try {
      const data = await SummonerRepository.getSpell();
      const spellData = data.data.data;
      
      const spellList = Object.keys(spellData).map(key => {
        return [String(key), spellData[key]];
      });

      this.spells = [];

      let i = 0;
      while(i < Object.keys(spellData).length){
        this.spells.push(spellList[i][1]);
        i++;
      }

      return new Promise((resolve, reject) => {
        resolve();
      })
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      })
    }
  }

  @action async getSummonerTier(){
    try {
      const { id } = this.summoner;
      const data = await SummonerRepository.getSummonerTier(id);
      const tierList = data.data;
      let processedTier = [];

      for(let tierData of tierList){
        const { leaguePoints, losses, wins, tier, rank, queueType, leagueId } = tierData;

        const processedData = {
          leaguePoints,
          losses,
          wins,
          tier,
          rank,
          queueType,
          leagueId
        };

        processedTier.push(processedData);
      }
      this.tier=processedTier;
      console.log(this.tier);

      return new Promise((resolve, reject) => {
        resolve();
      })
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      })
    }
  }

  @action async arrangeDetailMatch(detailData, matchData){
    if(this.detailMatches.length === 0){
      const addedData = this.addDetailDataAttribute(detailData, matchData);
      this.detailMatches.push(addedData);
    } else {
      let idx = 0;
      for(let data of this.detailMatches){
        const { gameId } = data;
        if(detailData.gameId === gameId){
          continue;
        } else if(idx === this.detailMatches.length-1){
          const addedData = await this.addDetailDataAttribute(detailData, matchData);
          await this.detailMatches.push(addedData);
          break;
        }
        idx++;
      }
    }

    const sliceStart = 0;
    const sliceEnd = this.detailMatches.length-1;
    // console.log(sliceEnd);
    // console.log(this.detailMatches.slice(sliceStart, sliceEnd));
    // this.detailMatches = this.detailMatches.slice(sliceStart, sliceEnd).sort((prev, next) => {
    //   return this.sortDetailMatch(prev.gameCreation, next.gameCreation);
    // });

    this.detailMatches = this.detailMatches.sort((prev, next) => {
      return this.sortDetailMatch(prev.gameCreation, next.gameCreation);
    });
  }

  @action getProfile(profileIconId){
    const src = `${DDRAGON}/${VERSION}/img/profileicon/${profileIconId}.png`
    return src;
  }

  @action addDetailDataAttribute(detailData, matchData){
    const { champion, lane, platformId, role, queue } = matchData;

    const queueType = this.setQueueType(queue);

    detailData.queueType = queueType;
    detailData.champion = champion;
    detailData.lane = lane;
    detailData.platformId = platformId;
    detailData.role = role;

    return detailData;
  }

  @action setQueueType(id){
    for(let queue of this.queues){
      const { queueId, description } = queue;
      if(parseInt(queueId) === id){
        return description;
      }
    }
  }

  @action sortDetailMatch(prev, next){
    const prevDate = moment(prev);
    const nextDate = moment(next).format('YYYY-MM-DD HH:mm:ss');

    const diff = moment.duration(prevDate.diff(nextDate)).asMilliseconds();
    return diff < 0 ? 1 : diff > 0 ? -1 : 0;
  }
}

export default SummonerStore;