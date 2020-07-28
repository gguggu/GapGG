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

  @observable subSummoner={};
  @observable subMatches=[];
  @observable subDetailMatches=[];

  @action async searchSummoner(name, type){
    try {
      const data = await SummonerRepository.searchSummoner(name);
      if(type === 'sub'){
        this.subSummoner = data.data.data;
        this.subMatches=[];
        this.subDetailMatches=[];
      } else{
        this.summoner = data.data.data;
        this.matches=[]; //새로운 소환사 검색시 초기화 작업
        this.detailMatches=[];
      }
      
      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      const { data } = error.response;
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  }

  @action async searchMatchList(beginIdx, endIdx, summonerType){
    try {
      let accountId;
      if(summonerType === 'sub')
        accountId = this.subSummoner.accountId;
      else
        accountId = this.summoner.accountId;

      const data = await SummonerRepository.searchMatchList(accountId, beginIdx, endIdx);
      if(summonerType === 'sub')
        this.subMatches = data.data.data.matches;
      else
        this.matches = data.data.data.matches;

      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      const { data } = error.response;
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  }

  @action async searchMatch(type){
    try {
      if(type === 'sub'){
        for(let match of this.subMatches){
          const { gameId } = match;
          const data = await SummonerRepository.searchMatch(gameId);
          await this.arrangeDetailMatch(data.data.data, match, type);
        }
      } else {
        for(let match of this.matches){
          const { gameId } = match;
          const data = await SummonerRepository.searchMatch(gameId);
          await this.arrangeDetailMatch(data.data.data, match, type);
        }
      }

      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      const { data } = error.response;
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  }

  @action async getQueue(){
    try {
      const data = await SummonerRepository.getQueue();
      this.queues=data.data.data;
      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      const { data } = error.response;
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  }

  @action async getSpell(){
    try {
      const data = await SummonerRepository.getSpell();
      const spellData = data.data.data.data;
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
      const { data } = error.response;
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  }

  @action async getSummonerTier(){
    try {
      const { id } = this.summoner;
      const data = await SummonerRepository.getSummonerTier(id);
      const tierList = data.data.data;
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

      if(processedTier.length < 2){
        this.tier = this.handleCheckTierList(processedTier);

        return new Promise((resolve, reject) => {
          resolve();
        })
      }

      this.tier=processedTier;

      this.tier = this.tier.sort((prev, next) => {
        return prev.queueType < next.queueType ? 1 : prev.queueType > next.queueType ? -1 : 0;
      });

      return new Promise((resolve, reject) => {
        resolve();
      })
    } catch (error) {
      const { data } = error.response;
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  }

  @action handleCheckTierList(tierList) {
    let checkedTier = tierList;
    let isSoloRank = false;
    let isFlexRank = false;
    for(let data of checkedTier){
      const { queueType } = data;
      if(queueType === 'RANKED_SOLO_5x5')
        isSoloRank = true;

      if(queueType === 'RANKED_FLEX_SR')
        isFlexRank = true;
    }

    if(!isSoloRank){
      const soloData = {
        queueType: 'RANKED_SOLO_5x5',
        tier: 'UNRANK'
      };
      checkedTier.push(soloData);
    }

    if(!isFlexRank){
      const flexData = {
        queueType: 'RANKED_FLEX_SR',
        tier: 'UNRANK'
      };
      checkedTier.push(flexData);
    }

    return checkedTier;
  }

  @action async arrangeDetailMatch(detailData, matchData, type){
    if(type === 'sub'){
      if(this.subDetailMatches.length === 0){
        const addedData = this.addDetailDataAttribute(detailData, matchData);
        this.subDetailMatches.push(addedData);
      } else {
        let idx = 0;
        for(let data of this.subDetailMatches){
          const { gameId } = data;
          if(detailData.gameId === gameId){
            continue;
          } else if(idx === this.subDetailMatches.length-1){
            const addedData = await this.addDetailDataAttribute(detailData, matchData);
            await this.subDetailMatches.push(addedData);
            break;
          }
          idx++;
        }
      }

      const sliceStart = 0;
      const sliceEnd = this.subDetailMatches.length;

      this.subDetailMatches = this.subDetailMatches.slice(sliceStart, sliceEnd).sort((prev, next) => {
        return this.sortDetailMatch(prev.gameCreation, next.gameCreation);
      });
    } else {
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
      const sliceEnd = this.detailMatches.length;

      this.detailMatches = this.detailMatches.slice(sliceStart, sliceEnd).sort((prev, next) => {
        return this.sortDetailMatch(prev.gameCreation, next.gameCreation);
      });
    }
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

  @action setComparingMatch(type){
    // kda, 전체승률, 분당데미지, 평균cs, 죽음당 받은 데미지량, 와드 평균 설치 개수, 와드 평균 삭제 개수
    // 포탑 파괴 개수(평균?)
    const matchCount = 20;

    let summonerData;
    let detailData;

    if(type === 'sub'){
      summonerData = this.subSummoner;
      detailData = this.subDetailMatches;
    } else {
      summonerData = this.summoner;
      detailData = this.detailMatches;
    }

    let winCount = 0;
    let kill = 0;
    let assist = 0;
    let death = 0;
    let KDA = 0;
    let placedWard = 0; //설치한 와드
    let killedWard = 0;
    let killedMinions = 0; //cs개수
    let golds = 0;
    let killedTower = 0; //포탑 파괴 수
    let damageToChampion = 0;
    let damageToTower = 0; //포탑에 부여한 데미지
    let damageToObject = 0; //오브젝트에 부여한 데미지
    let takenDamage = 0; //받은 피해량
    let heals = 0; //힐량
    let livingTime = 0; // 가장 오래 살아남았던 시간

    const { id } = summonerData;
    for(let match of detailData){
      const { participantIdentities, participants } = match;
      for(let identity of participantIdentities){
        const { participantId } = identity;
        const { summonerId } = identity.player;
        if(id === summonerId){
          for(let part of participants){
            const { stats } = part;
            if(participantId === part.participantId){
              const { assists, kills, deaths, damageDealtToObjectives, damageDealtToTurrets,
                damageSelfMitigated, doubleKills, tripleKills, firstBloodKill, totalHeal,
                firstInhibitorKill, firstTowerKill, goldEarned, inhibitorKills, 
                killingSprees, longestTimeSpentLiving, pentaKills, quadraKills,
                totalDamageDealtToChampions, totalDamageTaken, totalMinionsKilled,
                turretKills, win, wardsKilled, wardsPlaced } = stats;
              
              if(win)
                winCount++;

              kill+=kills;
              assist+=assists;
              death+=deaths;

              if(wardsPlaced !== undefined)
                placedWard+=wardsPlaced;
              if(wardsKilled !== undefined)
                killedWard+=wardsKilled;

              killedMinions+=totalMinionsKilled;
              golds+=goldEarned;

              killedTower+=turretKills;
              damageToChampion+=totalDamageDealtToChampions;
              damageToTower+=damageDealtToTurrets;
              damageToObject+=damageDealtToObjectives;
              takenDamage+=totalDamageTaken;

              heals+=totalHeal;
              livingTime+=longestTimeSpentLiving;

              break;
            }
          }
          break;
        }
      }
    }

    winCount = (this.setAverageValue(winCount, matchCount) * 100);
    KDA = this.setAverageValue((kill+assist), death);
    placedWard = this.setAverageValue(placedWard, matchCount);
    killedWard = this.setAverageValue(killedWard, matchCount);
    killedMinions = this.setAverageValue(killedMinions, matchCount);
    golds = this.setAverageValue(golds, matchCount);
    killedTower = this.setAverageValue(killedTower, matchCount);
    damageToChampion = this.setAverageValue(damageToChampion, matchCount);
    damageToTower = this.setAverageValue(damageToTower, matchCount);
    damageToObject = this.setAverageValue(damageToObject, matchCount);
    takenDamage = this.setAverageValue(takenDamage, matchCount);
    heals = this.setAverageValue(heals, matchCount);
    livingTime = this.setAverageValue(livingTime, matchCount);

    const totalData = [
      {
        type: 'winCount',
        title: '승률',
        value: parseInt(winCount),
        unit: '%',
        isHigher: false
      },
      {
        type: 'KDA',
        title: '평균 KDA',
        value: parseInt(KDA),
        unit: ':1',
        isHigher: false
      },
      {
        type: 'placedWard',
        title: '설치한 와드 평균 개수',
        value: parseInt(placedWard),
        unit: '개',
        isHigher: false
      },
      {
        type: 'killedWard',
        title: '처치한 와드 평균 개수',
        value: parseInt(killedWard),
        unit: '개',
        isHigher: false
      },
      {
        type: 'killedMinions',
        title: '평균 CS',
        value: parseInt(killedMinions),
        unit: '개',
        isHigher: false
      },
      {
        type: 'golds',
        title: '평균 골드 획득량',
        value: parseInt(golds),
        unit: '',
        isHigher: false
      },
      {
        type: 'killedTower',
        title: '파괴한 포탑 평균 개수',
        value: parseInt(killedTower),
        unit: '개',
        isHigher: false
      },
      {
        type: 'damageToChampion',
        title: '챔피언에게 가한 평균 데미지',
        value: parseInt(damageToChampion),
        unit: '',
        isHigher: false
      },
      {
        type: 'damageToTower',
        title: '포탑에 가한 평균 데미지',
        value: parseInt(damageToTower),
        unit: '',
        isHigher: false
      },
      {
        type: 'damageToObject',
        title: '오브젝트에 가한 평균 데미지',
        value: parseInt(damageToObject),
        unit: '',
        isHigher: false
      },
      {
        type: 'takenDamage',
        title: '받은 평균 피해량',
        value: parseInt(takenDamage),
        unit: '',
        isHigher: false
      },
      {
        type: 'heals',
        title: '평균 치유량',
        value: parseInt(heals),
        unit: '',
        isHigher: false
      },
      {
        type: 'livingTime',
        title: '평균 생존 시간',
        value: parseInt(livingTime),
        unit: '초',
        isHigher: false
      }
    ];

    return totalData;
  }

  @action compareSummoner(summoner, subSummoner){
    for(let data of summoner){
      let { type, value } = data;
      for(let subData of subSummoner){
        if(type === subData.type){
          if(value > subData.value)
            data.isHigher = true;
          else if(value < subData.value)
            subData.isHigher = true;
          else{
            data.isHigher = true;
            subData.isHigher = true;
          }
          break;
        }
      }
    }

    return [summoner, subSummoner];
  }

  @action setAverageValue(average, allCount){
    return ((average/allCount).toFixed(2)).toString();
  }

}

export default SummonerStore;