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
}

export default new SummonerRepository();