import axios from 'axios';
import { VERSION, SERVER } from 'config/config.json';

class championRepository{

  async getChampion(){
    try {
      const data = await axios.get(`${SERVER}/api/riot/champion`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRotaition(){
    try {
      const data = await axios.get(`${SERVER}/api/riot/rotation`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async setVersion(){
    try {
      const data = await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new championRepository();