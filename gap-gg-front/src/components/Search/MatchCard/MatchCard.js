import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MatchCard.scss';
import moment from 'moment';
import { DDRAGON, VERSION } from 'config/config.json';
import useTimeDuration from 'lib/useTimeDuration';

const MatchCard = ({ matchData, src, summoner, spells, champions }) => {
  const { queueType, gameCreation,
    participantIdentities, participants, teams, gameDuration } = matchData;

  const [isWin, setIsWin] = useState(false);
  const [inTime, setInTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [type, setType] = useState('');
  const [spellFirst, setSpellFirst] = useState('');
  const [spellSecond, setSpellSecond] = useState('');
  const [KDA, setKDA] = useState('');
  const [averageKDA, setAverageKDA] = useState('');
  const [championLevel, setChampionLevel] = useState();
  const [CS, setCS] = useState('');
  const [multiKill, setMultiKill] = useState('');
  const [items, setItems] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    handleParticipants();
    handleTeamMembers();

    const gameTime = moment().startOf('day').seconds(gameDuration).format('mm분ss초');
    setInTime(gameTime);

    const queueTypeStr = handleQueueTypeStr(queueType);
    setType(queueTypeStr);

    handleDifferenceTime();
  }, []);
  
  const handleParticipants = async() => {
    const { id } = summoner;
    for(let data of participantIdentities){
      const { participantId } = data;
      const { summonerId } = data.player;
      if(summonerId === id){
        await handleSearchSummoner(participantId);
        break;
      }
    }
  }

  const handleSearchSummoner = async(idx) => {
    for(let data of participants){
      const { participantId, teamId, spell1Id, spell2Id, stats } = data;
      if(participantId === idx){
        await handleSearchTeam(teamId);
        await handleSpell(spell1Id, spell2Id);
        await handleStats(stats);
        break;
      }
    }
  }

  const handleSearchTeam = (idx) => {
    teams.some(data => {
      const { win, teamId } = data;
      if(teamId === idx){
        if(win === 'Win')
          setIsWin(true);
        else if(win === 'Fail')
          setIsWin(false);
        return true;
      }
    })
  }

  const handleTeamMembers = () => {
    let teamMembers = [];
    participantIdentities.forEach(identity => {
      const { participantId } = identity;
      const { summonerName } = identity.player;
      participants.forEach(user => {
        const { championId, teamId } = user;
        if(participantId === user.participantId){
          const memberData = {
            summonerName,
            championId,
            teamId
          }
          teamMembers.push(memberData);
        }
      });
    });

    handleTeamMembersChampion(teamMembers);
  }

  const handleTeamMembersChampion = (teamMembers) => {
    let teamChampionList = [];
    
    champions.forEach(champ => {
      const { key } = champ;
      const { full } = champ.image;
      const championKey = parseInt(key);
      teamMembers.forEach(team => {
        const { championId, summonerName, teamId } = team;
        if(championId === championKey){
          const championSrc = `${DDRAGON}/${VERSION}/img/champion/${full}`;
          const memberData = {
            summonerName,
            championSrc,
            teamId
          }
          teamChampionList.push(memberData);
        }
      });
    });

    handleTeamMembersItem(teamChampionList);
  }

  const handleSortTeamMembers = (members) => {
    const sortedMembers = members.sort((prev, next) => {
      return prev.teamId < next.teamId ? -1 : prev.teamId > next.teamId ? 1 : 0;
    });

    return sortedMembers;
  }

  const handleTeamMembersItem = teamChampionList => {
    const sortedTeamMembers = handleSortTeamMembers(teamChampionList);

    const teamChampions = sortedTeamMembers.map((teamChampion, idx) => {
      const { summonerName, championSrc } = teamChampion;
      return (
        <div key={idx} className="MatchCard-teamList-member">
          <img src={championSrc} alt=''/>
          <div className="MatchCard-teamList-member-summonerName" onClick={() => handleTeamMemberLink(summonerName)}>{summonerName}</div>
        </div>
      );
    });

    setTeamMembers(teamChampions);
  }

  const handleTeamMemberLink = (name) => {
    window.open(`http://localhost:3000/search/${name}`);
  }

  const handleSpell = (firstSpell, secondSpell) => {
    spells.some(data => {
      const { image, key } = data;
      const { full } = image;
      const spellKey = parseInt(key);
      if(spellKey === firstSpell){
        const firstSpellSrc = `${DDRAGON}/${VERSION}/img/spell/${full}`;
        setSpellFirst(firstSpellSrc);
      }

      if(spellKey === secondSpell){
        const secondSpellSrc = `${DDRAGON}/${VERSION}/img/spell/${full}`;
        setSpellSecond(secondSpellSrc);
      }
    })
  }

  const handleStats = (stats) => {
    const { champLevel, totalMinionsKilled } = stats;
    handleKDA(stats);
    handleItems(stats);
    setChampionLevel(champLevel);
    setCS(totalMinionsKilled);
    setMultiKill(handleMultiKill(stats));
  }

  const handleKDA = (stats) => {
    const { kills, deaths, assists } = stats;
    const KDAData = `${kills} / ${deaths} / ${assists}`;
    setKDA(KDAData);

    const averaged = ((kills+assists)/deaths).toFixed(2);
    if(averaged === 'Infinity')
      setAverageKDA('perfect');
    else if(averaged === 'NaN')
      setAverageKDA('0.00:1 평점');
    else
      setAverageKDA(averaged + ':1 평점');
  }

  const handleMultiKill = stats => {
    const { doubleKills, tripleKills, quadraKills, pentaKills } = stats;

    if(pentaKills > 0)
      return '펜타킬';
    else if(quadraKills > 0)
      return '쿼드라킬';
    else if(tripleKills > 0)
      return '트리플킬';
    else if(doubleKills > 0)
      return '더블킬';
    else
      return '';
  }

  const handleItems = (stats) => {
    const { item0, item1, item2, item3, item4, item5, item6 } = stats;
    const itemList = [item0, item1, item2, item3, item4, item5, item6];

    const itemContent = itemList.map((item, idx) => {
      const itemSrc = `${DDRAGON}/${VERSION}/img/item/${item}.png`;
      return (
        <img src={itemSrc} className={ item !== 0 ? '' : 'noneItem' } alt='' key={idx} onError={handleErrorImage}/>
      )
    });

    setItems(itemContent);
  }

  const handleErrorImage = e => {
    let { src } = e.target;
    src = '';
  }
  
  const handleDifferenceTime = () => {
    setStartTime(useTimeDuration(gameCreation));
  }

  const handleQueueTypeStr = (queue) => {
    if(queue === '5v5 Ranked Solo games')
      return '솔랭';
    else if(queue === '5v5 Blind Pick games')
      return '일반';
    else if(queue === 'URF games')
      return 'URF';
    else if(queue === '5v5 ARAM games')
      return '무작위 총력전';
    else if(queue === '5v5 Ranked Flex games')
      return '5:5 자유랭크';
    else if(queue === 'Co-op vs. AI Intro Bot games')
      return '봇전';
    else
      return '이벤트';
  }

  return (
    <div className={isWin ? 'MatchCard' : 'MatchCard fail'}>
      <div className="MatchCard-typeWrap">
        <div className="MatchCard-typeWrap-isWin">
          {
            isWin ? '승리' : '패배'
          }
        </div>
        <div className="MatchCard-typeWrap-queueType">{type}</div>
        <div className="MatchCard-typeWrap-startTime">{startTime}</div>
        <div className="MatchCard-typeWrap-gameTime">{inTime}</div>
      </div>
      <div className="MatchCard-championWrap">
        <img src={src} className="MatchCard-championWrap-championImg"/>
        <div className="MatchCard-championWrap-spellWrap">
          <img src={spellFirst} className="MatchCard-championWrap-spellWrap-firstSpell" alt="firstSpell"/>
          <img src={spellSecond} className="MatchCard-championWrap-spellWrap-secondSpell" alt="secondSpell"/>
        </div>
      </div>
      <div className="MatchCard-inGameWrap">
        <div className="MatchCard-inGameWrap-kda">{KDA}</div>
        <div className="MatchCard-inGameWrap-average">{averageKDA}</div>
        {
          multiKill === '' ? <></>
            : <div className="MatchCard-inGameWrap-multiKill">{multiKill}</div>
        }
      </div>
      <div className="MatchCard-dataWrap">
        <div className="MatchCard-dataWrap-level">레벨{championLevel}</div>
        <div className="MatchCard-dataWrap-cs">CS {CS}개</div>
      </div>
      <div className="MatchCard-itemList">
        {items}
      </div>
      <div className="MatchCard-teamList">
        {teamMembers}
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  matchData: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  summoner: PropTypes.object.isRequired,
  spells: PropTypes.array.isRequired,
  champions: PropTypes.array.isRequired
};

export default MatchCard;