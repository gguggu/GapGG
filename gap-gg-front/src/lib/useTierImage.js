import UNRANK_ICON from 'assets/images/tierImages/Emblem_Unrank.png';
import IRON_ICON from 'assets/images/tierImages/Emblem_Iron.png';
import BRONZE_ICON from 'assets/images/tierImages/Emblem_Bronze.png';
import SILVER_ICON from 'assets/images/tierImages/Emblem_Silver.png';
import GOLD_ICON from 'assets/images/tierImages/Emblem_Gold.png';
import PLATINUM_ICON from 'assets/images/tierImages/Emblem_Platinum.png';
import DIAMOND_ICON from 'assets/images/tierImages/Emblem_Diamond.png';
import MASTER_ICON from 'assets/images/tierImages/Emblem_Master.png';
import GRANDMASTER_ICON from 'assets/images/tierImages/Emblem_Grandmaster.png';
import CHALLENGER_ICON from 'assets/images/tierImages/Emblem_Challenger.png';

const useTierImage = tierName => {
  console.log(tierName);
  if(tierName === 'IRON')
    return IRON_ICON;

  if(tierName === 'BRONZE')
    return BRONZE_ICON;

  if(tierName === 'SILVER')
    return SILVER_ICON;

  if(tierName === 'GOLD')

    return GOLD_ICON;
  if(tierName === 'PLATINUM')
    return PLATINUM_ICON;

  if(tierName === 'DIAMOND')
    return DIAMOND_ICON;
    
  if(tierName === 'MASTER')
    return MASTER_ICON;

  if(tierName === 'GRANDMASTER')
    return GRANDMASTER_ICON;

  if(tierName === 'CHALLENGER')
    return CHALLENGER_ICON;
   
  return UNRANK_ICON;
}

export default useTierImage;