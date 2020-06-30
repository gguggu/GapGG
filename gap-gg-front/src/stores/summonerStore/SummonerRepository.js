import axios from "axios";
import { SERVER, DDRAGON, VERSION } from 'config/config.json';

class SummonerRepository{

  async searchSummoner(name){
    try {
      const data = await axios.get(`${SERVER}/api/riot/summoner?name=${name}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async searchMatchList(accountId, beginIndex, endIndex){
    try {
      const data = await axios.get(`${SERVER}/api/riot/matchList?accountId=${accountId}&beginIndex=${beginIndex}&endIndex=${endIndex}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async searchMatch(matchId){
    try {
      const data = await axios.get(`${SERVER}/api/riot/match?matchId=${matchId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getQueue(){
    try {
      const data = await axios.get(`${SERVER}/api/riot/queue`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSpell(){
    try {
      const data = await axios.get(`${SERVER}/api/riot/spell`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SummonerRepository();