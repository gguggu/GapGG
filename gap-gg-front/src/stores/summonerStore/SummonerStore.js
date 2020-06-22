import { autobind } from "core-decorators";
import { observable, action } from "mobx";
import SummonerRepository from "./SummonerRepository";
import { DDRAGON, VERSION } from 'config/config.json';

@autobind
class SummonerStore {
  @observable summoner={};

  @action async searchSummoner(name){
    try {
      const data = await SummonerRepository.searchSummoner(name);
      this.summoner = data.data;
      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action getProfile(profileIconId){
    const src = `${DDRAGON}/${VERSION}/img/profileicon/${profileIconId}.png`
    return src;
  }
}

export default SummonerStore;