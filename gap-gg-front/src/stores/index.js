import championStore from "./championStore";
import SummonerStore from "./summonerStore";


const stores={
  champion: new championStore(),
  summoner: new SummonerStore()
};

export default stores;