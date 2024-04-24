const clanTag = "P0OK";
const apiUrl = "https://biggamesapi.io";

document.addEventListener("DOMContentLoaded", run);

let whatOverlay = 0;

async function getClanDetails(clanName) {
  const url = `${apiUrl}/api/clan/${clanTag}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.status !== 'ok') {
      throw new Error(`Failed to fetch details for clan '${clanName}'`);
    }
    return data.data;
  } catch (error) {
    throw new Error(`Error in getClanDetails: ${error.message}`);
  }
}

async function getChallenges() {
  const url = `${apiUrl}/challenges.json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.status !== 'ok') {
      throw new Error('Failed to fetch challenges');
    }
    return data.data;
  } catch (error) {
    throw new Error(`Error in getChallenges: ${error.message}`);
  }
}

async function getClans(page, pageSize, sort, sortOrder) {
  const url = `${apiUrl}/api/clans?page=1&pageSize=100&sort=Points&sortOrder=desc`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.status !== 'ok') {
      throw new Error('Failed to fetch clans');
    }
    return data.data;
  } catch (error) {
    throw new Error(`Error in getClans: ${error.message}`);
  }
}

let clanRank = 10;


async function run() {
  if (whatOverlay == 0) {
    getClanDetails(clanTag).then(async clanDetails => {
      getClans().then(clans => {
        clans.sort((a, b) => b.Points - a.Points);
        const p0okIndex = clans.findIndex(clan => clan.Name.toLowerCase() === 'p0ok');
        if (p0okIndex > 0) {
          document.getElementById("clan").innerText = `Clan Rank: #${clanRank} | Clan Points: ${Object.values(clanDetails.Battles)[Object.values(clanDetails.Battles).length - 1].Points.toLocaleString()}`;
        } else {
          document.getElementById("clan").innerText = `Clan Rank: #${clanRank} | Clan Points: ${Object.values(clanDetails.Battles)[Object.values(clanDetails.Battles).length - 1].Points.toLocaleString()}`;
        }
      }).catch(error => {
        console.error('Error:', error.message);
      });

      async function getQuestNameFromType(type) {
        const questTypes = {
            7: "Earn Diamonds",
            9: "Break Diamond Breakables",
            12: "Craft Tier III Potions",
            13: "Craft Tier III Enchants",
            14: "Collect Potions",
            20: "Hatch Best Egg",
            21: "Break Breakables in Best Area",
            22: "Complete Classic Obby",
            23: "Complete the Minefield",
            24: "Complete Atlantis",
            25: "Find Chests in Digsite",
            26: "Catch Fish in the Fishing Minigame",
            27: "Complete Ice Obby",
            29: "Complete Jungle Obby",
            34: "Use Tier IV Potions",
            37: "Fill Coin Jars in Best Area",
            38: "Break Comets in Best Area",
            39: "Break Mini Chests in Best Area",
            40: "Make Gold Pets from Best Egg",
            41: "Make Rainbow Pets from Best Egg",
            42: "Hatch Rare Pets from Best Egg",
            43: "Break Pinatas",
            44: "Break Lucky Blocks in Best Area",
            45: "Break Chests in Advanced Digsite",
            46: "Catch Fish in Advanced Fishing",
            73: "Break Breakables in the Treasure Hideout",
            74: "Consume XP Potions"
        };

        try {
          return questTypes[type] || "Unknown Quest";
        } catch {
          return "Unknown Quest";
        }
      }

      
      for (let i = 0; i <= 3; i++) {
        const quest = clanDetails.Battles.GoalBattleTwo.Goals[i];
        const questName = await getQuestNameFromType(quest.Type);
        const progressElement = document.getElementById(`p${i}`);
        const starElement = document.getElementById(`s${i}`);
        const progressBar = document.getElementById(`pb${i}`);
        progressElement.innerText = `${quest.Progress.toLocaleString()}/${quest.Amount.toLocaleString()}`;
        starElement.innerText = `${quest.Stars}`;
        progressBar.style.width = `${(quest.Progress / quest.Amount) * 100}%`;
        document.getElementById(`qc${i}`).innerText = questName;
      }

      document.getElementById("clan").innerText = `Clan Rank: #${clanRank} | Clan Points: ${Object.values(clanDetails.Battles)[Object.values(clanDetails.Battles).length - 1].Points.toLocaleString()}`;
      document.getElementById("updated").innerText = `Last Updated: ${new Date().toLocaleTimeString()}`;

      document.getElementById("qc0").innerText = `${await getQuestNameFromType(clanDetails.Battles.GoalBattleTwo.Goals[0].Type)}`;
      document.getElementById("p0").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[0].Progress.toLocaleString()}/${clanDetails.Battles.GoalBattleTwo.Goals[0].Amount.toLocaleString()}`;
      document.getElementById("s0").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[0].Stars}`;
      document.getElementById("pb0").style.width = `${(clanDetails.Battles.GoalBattleTwo.Goals[0].Progress / clanDetails.Battles.GoalBattleTwo.Goals[0].Amount) * 100}%`;
      document.getElementById("qc1").innerText = `${await getQuestNameFromType(clanDetails.Battles.GoalBattleTwo.Goals[1].Type)}`;
      document.getElementById("p1").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[1].Progress.toLocaleString()}/${clanDetails.Battles.GoalBattleTwo.Goals[1].Amount.toLocaleString()}`;
      document.getElementById("s1").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[1].Stars}`;
      document.getElementById("pb1").style.width = `${(clanDetails.Battles.GoalBattleTwo.Goals[1].Progress / clanDetails.Battles.GoalBattleTwo.Goals[1].Amount) * 100}%`;
      document.getElementById("qc2").innerText = `${await getQuestNameFromType(clanDetails.Battles.GoalBattleTwo.Goals[2].Type)}`;
      document.getElementById("p2").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[2].Progress.toLocaleString()}/${clanDetails.Battles.GoalBattleTwo.Goals[2].Amount.toLocaleString()}`;
      document.getElementById("s2").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[2].Stars}`;
      document.getElementById("pb2").style.width = `${(clanDetails.Battles.GoalBattleTwo.Goals[2].Progress / clanDetails.Battles.GoalBattleTwo.Goals[2].Amount) * 100}%`;
      document.getElementById("qc3").innerText = `${await getQuestNameFromType(clanDetails.Battles.GoalBattleTwo.Goals[3].Type)}`;
      document.getElementById("p3").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[3].Progress.toLocaleString()}/${clanDetails.Battles.GoalBattleTwo.Goals[3].Amount.toLocaleString()}`;
      document.getElementById("s3").innerText = `${clanDetails.Battles.GoalBattleTwo.Goals[3].Stars}`;
      document.getElementById("pb3").style.width = `${(clanDetails.Battles.GoalBattleTwo.Goals[3].Progress / clanDetails.Battles.GoalBattleTwo.Goals[3].Amount) * 100}%`;
      document.getElementById("clan").innerText = `Clan Rank: #${clanRank} | Clan Points: ${Object.values(clanDetails.Battles)[Object.values(clanDetails.Battles).length - 1].Points.toLocaleString()}`;
      document.getElementById("updated").innerText = `Last Updated: ${new Date().toLocaleTimeString()}`;
    }).catch(error => {
      console.error('Error:', error.message);
    });
  }
}

new Vue({
  el: '#memberList',
  data: {
    searchQuery: '',
    members: [{
      "hasVerifiedBadge": false,
      "id": 10792811,
      "name": "Z0bon67",
      "displayName": "Z0bon"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1156835957,
      "name": "C0llinbk",
      "displayName": "Collinbk"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1512548444,
      "name": "WavyJay2431",
      "displayName": "ImaWinner"
    },
    {
      "hasVerifiedBadge": false,
      "id": 141527450,
      "name": "CrookedMike1230",
      "displayName": "CrookedMike1230"
    },
    {
      "hasVerifiedBadge": false,
      "id": 3354874057,
      "name": "donbear2",
      "displayName": "Amity"
    },
    {
      "hasVerifiedBadge": false,
      "id": 5306083286,
      "name": "BuyItemFromIsland",
      "displayName": "BuyItemFromIsland"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2349456864,
      "name": "pin_boxx",
      "displayName": "pin_boxx"
    },
    {
      "hasVerifiedBadge": false,
      "id": 123148614,
      "name": "nopje101",
      "displayName": "nopje101"
    },
    {
      "hasVerifiedBadge": false,
      "id": 3071024195,
      "name": "keeds_yt",
      "displayName": "keeds_yt"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1862084959,
      "name": "JOJOTHT0",
      "displayName": "JOJOTHT0"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2251703695,
      "name": "Lisek_guy",
      "displayName": "Lisek_guy2"
    },
    {
      "hasVerifiedBadge": false,
      "id": 4426362318,
      "name": "Fyyyyyysh",
      "displayName": "Fysh"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1608012,
      "name": "Teqnition",
      "displayName": "sklzy"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1701760870,
      "name": "RedFireRoblox_YT",
      "displayName": "redfire"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1567745660,
      "name": "ErasedNightmare",
      "displayName": "Shxon"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1343778717,
      "name": "Shadowseer66",
      "displayName": "Seer"
    },
    {
      "hasVerifiedBadge": false,
      "id": 535073200,
      "name": "szimino",
      "displayName": "kxal999"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2060725837,
      "name": "gamer_boy292929",
      "displayName": "DaEpikGamerBoy"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1074240937,
      "name": "omer876548",
      "displayName": "omer876548"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1750597043,
      "name": "gotejt5",
      "displayName": "PapaSmurf"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1089770566,
      "name": "lowlowylowed",
      "displayName": "DUMMY"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1359717152,
      "name": "juenjuenis",
      "displayName": "OO8"
    },
    {
      "hasVerifiedBadge": false,
      "id": 563273255,
      "name": "ninjagofansag",
      "displayName": "Dede19xD"
    },
    {
      "hasVerifiedBadge": false,
      "id": 851188438,
      "name": "TomuSpelar7777",
      "displayName": "KSA_WOOW"
    },
    {
      "hasVerifiedBadge": false,
      "id": 387600604,
      "name": "tomastomas747",
      "displayName": "MrWake"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1060480074,
      "name": "listofmisery",
      "displayName": "provalorantplayerXDD"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1039726785,
      "name": "XavvenTheDruid",
      "displayName": "XavvenTheDruid"
    },
    {
      "hasVerifiedBadge": false,
      "id": 3730046266,
      "name": "jumpiAlt1",
      "displayName": "jumpi"
    },
    {
      "hasVerifiedBadge": false,
      "id": 328442280,
      "name": "drake140207",
      "displayName": "DRAKKA_NAKKA"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2504615411,
      "name": "cignaljae",
      "displayName": "JaeXtapose"
    },
    {
      "hasVerifiedBadge": false,
      "id": 694730737,
      "name": "farbror_f",
      "displayName": "farbror_f"
    },
    {
      "hasVerifiedBadge": false,
      "id": 134514775,
      "name": "Ilceto",
      "displayName": "Ilce"
    },
    {
      "hasVerifiedBadge": false,
      "id": 588552860,
      "name": "Sally_Seahorse",
      "displayName": "Secret"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1769174994,
      "name": "DevTree_s",
      "displayName": "Tree"
    },
    {
      "hasVerifiedBadge": false,
      "id": 5719940369,
      "name": "Arctodious",
      "displayName": "Arc"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1221841742,
      "name": "Fallenko_God",
      "displayName": "Azurq"
    },
    {
      "hasVerifiedBadge": false,
      "id": 106818,
      "name": "knux",
      "displayName": "knux"
    },
    {
      "hasVerifiedBadge": false,
      "id": 181691619,
      "name": "FunnyRff",
      "displayName": "FunnyRff"
    },
    {
      "hasVerifiedBadge": false,
      "id": 5310324136,
      "name": "park_cullen",
      "displayName": "park_cullen"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1364006688,
      "name": "Valentin25313",
      "displayName": "swenxyz"
    },
    {
      "hasVerifiedBadge": false,
      "id": 630775569,
      "name": "Vorpism",
      "displayName": "Vorpism"
    },
    {
      "hasVerifiedBadge": false,
      "id": 4303761327,
      "name": "STONEY_NOTTZ",
      "displayName": "STONEY_NOTTZ"
    },
    {
      "hasVerifiedBadge": false,
      "id": 74378193,
      "name": "donbear1",
      "displayName": "Emity"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1386548068,
      "name": "Drag00n8",
      "displayName": "Drag00n"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1363711943,
      "name": "gumontop",
      "displayName": "Glummyyy"
    },
    {
      "hasVerifiedBadge": false,
      "id": 4834390663,
      "name": "Mercyeyee",
      "displayName": "Mercyeyee"
    },
    {
      "hasVerifiedBadge": false,
      "id": 465545849,
      "name": "UdayllI",
      "displayName": "UdayllI"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1074446495,
      "name": "RonaldoCr7Pro51",
      "displayName": "AdnanPlayz"
    },
    {
      "hasVerifiedBadge": false,
      "id": 180754044,
      "name": "kawabouga",
      "displayName": "kawabouga"
    },
    {
      "hasVerifiedBadge": false,
      "id": 146371438,
      "name": "zyolid",
      "displayName": "zyolid"
    },
    {
      "hasVerifiedBadge": false,
      "id": 994073815,
      "name": "Pooksx10",
      "displayName": "Pooks"
    },
    {
      "hasVerifiedBadge": false,
      "id": 531403907,
      "name": "leongh09",
      "displayName": "Leonwantshoes"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1527453936,
      "name": "Strekie",
      "displayName": "Strekie"
    },
    {
      "hasVerifiedBadge": false,
      "id": 746620526,
      "name": "EmperorLeg",
      "displayName": "Leg"
    },
    {
      "hasVerifiedBadge": false,
      "id": 89629630,
      "name": "thomatys9110",
      "displayName": "SubscribeToLemdy"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2760858858,
      "name": "1DankoGuy",
      "displayName": "1Dankoguy"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2717676990,
      "name": "h_om40",
      "displayName": "Leah"
    },
    {
      "hasVerifiedBadge": false,
      "id": 746867232,
      "name": "OsoPunisher",
      "displayName": "OsoPunisher"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1637206409,
      "name": "Iamabignoobforlife09",
      "displayName": "Crypt_leo"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2918007897,
      "name": "SeVonii",
      "displayName": "SeVonii"
    },
    {
      "hasVerifiedBadge": false,
      "id": 3051686914,
      "name": "angusismine",
      "displayName": "dimsimchim"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1315256380,
      "name": "opmyoshi",
      "displayName": "proudchestmimicowner"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1215490854,
      "name": "qeenrollaisanoob",
      "displayName": "PineconeForPres"
    },
    {
      "hasVerifiedBadge": false,
      "id": 5351837159,
      "name": "littlepp363",
      "displayName": "littlepp363"
    },
    {
      "hasVerifiedBadge": false,
      "id": 3254488477,
      "name": "OnlyZnider",
      "displayName": "OnlyZnider"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2594214258,
      "name": "Almuzze",
      "displayName": "Almuzze"
    },
    {
      "hasVerifiedBadge": false,
      "id": 2396246362,
      "name": "FennWenn",
      "displayName": "Fenn"
    },
    {
      "hasVerifiedBadge": false,
      "id": 632814640,
      "name": "NotDoritoDad",
      "displayName": "DoritoDad"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1644409087,
      "name": "hikonan",
      "displayName": "lil_colonial"
    },
    {
      "hasVerifiedBadge": false,
      "id": 92848453,
      "name": "kittenvalcory",
      "displayName": "ladderking"
    },
    {
      "hasVerifiedBadge": false,
      "id": 1366415631,
      "name": "Hapster247",
      "displayName": "Meh"
    }],
    sortByColumn: '', 
    sortDirection: 'asc' 
  },
  computed: {
    filteredMembers() {
      return this.members.filter(member =>
        (member.name && member.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (member.displayName && member.displayName.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },
    sortedMembers() {
      let sorted = this.filteredMembers.slice();
  
      
      if (this.sortByColumn) {
        sorted.sort((a, b) => {
          const aValue = this.getValueToSort(a);
          const bValue = this.getValueToSort(b);
  
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            
            if (this.sortDirection === 'asc') {
              return aValue.localeCompare(bValue);
            } else {
              return bValue.localeCompare(aValue);
            }
          } else {
            
            if (this.sortDirection === 'asc') {
              return aValue - bValue;
            } else {
              return bValue - aValue;
            }
          }
        });
      }
  
      return sorted;
    }
  },
  methods: {
    sortBy(column) {
      if (this.sortByColumn === column) {
        
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        
        this.sortByColumn = column;
        this.sortDirection = 'asc';
      }
    },
    getValueToSort(member) {
      
      if (this.sortByColumn === 'name') {
        return member.name;
      } else if (this.sortByColumn === 'points') {
        return member.points;
      } else if (this.sortByColumn === 'donated') {
        return parseInt(member.donated); 
      }
    }
  },
  mounted() {
    
    fetch('https://biggamesapi.io/api/clan/p0ok')
      .then(response => response.json())
      .then(data => {
        
        const guildData = data.data;
  
        function formatNumber(number) {
          const suffixes = ['', 'k', 'm', 'b'];
          const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);
          const rounded = Math.floor(number / Math.pow(10, magnitude * 3)); 
          return `${rounded}${suffixes[magnitude]}`;
        }
  
        
        this.members = this.members.map(member => {
          
          const memberDiamonds = guildData.DiamondContributions.AllTime.Data.find(data => data.UserID === member.id);
  
          
          if (memberDiamonds) {
            member.donated = formatNumber(memberDiamonds.Diamonds);
          } else {
            
            member.donated = '0';
          }
  
          const pointContribution = guildData.Battles.GoalBattleTwo.PointContributions.find(point => point.UserID === member.id);
  
  
          if (pointContribution) {
            member.points = pointContribution.Points;
          } else {
            
            member.points = 0;
          }
          
          return member;
        });
          
        
        this.members.sort((a, b) => parseInt(b.donated) - parseInt(a.donated));
  
        
        this.isLoaded = true;
      })
      .catch(error => console.error('Error fetching data:', error));
  }
});

document.getElementById("donateBtn").addEventListener("mouseover", function() {
  document.getElementById("popup").style.display = "block";
});

document.getElementById("donateBtn").addEventListener("mouseout", function() {
  document.getElementById("popup").style.display = "none";
});