import { autobind } from "core-decorators";
import championRepository from "./championRepository";
import { action, observable } from "mobx";
import { VERSION, DDRAGON } from 'config/config.json';

@autobind
class championStore {
  @observable champion = [];
  @observable rotation = [];

  @action async getChampion() {
    try {
      const data = await championRepository.getChampion();
      const championData = data.data.data.data;

      const championList = Object.keys(championData).map(key => {
        return [String(key), championData[key]];
      });

      this.champion = [];

      let i = 0;
      while(i < Object.keys(championData).length){
        this.champion.push(championList[i][1]);
        i++;
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

  @action async getRotaition() {
    try {
      const data = await championRepository.getRotaition();
      const rotationData = data.data.data.freeChampionIds;

      this.rotation=[];

      this.champion.forEach(champ => {
        const { image, key, name } = champ;
        rotationData.forEach(rotation => {
          if(rotation === parseInt(key)){
            const data = {
              key,
              name,
              src: this.setImageData(image)
            };
            this.rotation.push(data);
          }
        });
      });

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

  @action setImageData(image) {
    const { full, group } = image;
    const src = `${DDRAGON}/${VERSION}/img/${group}/${full}`
    return src;
  }

  @action compareChampion(championIdx){
    let championName = '';
    this.champion.some(data => {
      const { id, key } = data;
      if(championIdx === parseInt(key)){
        championName = id;
        return true;
      }
    });
    return championName;
  }
}

export default championStore;