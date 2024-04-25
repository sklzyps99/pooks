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
        "id": 10792811,
        "name": "Z0bon67"
    },
    {
        "id": 1156835957,
        "name": "C0llinbk"
    },
    {
        "id": 146371438,
        "name": "zyolid"
    },
    {
        "id": 181691619,
        "name": "FunnyRff"
    },
    {
        "id": 746867232,
        "name": "OsoPunisher"
    },
    {
        "id": 92848453,
        "name": "kittenvalcory"
    },
    {
        "id": 3730046266,
        "name": "jumpiAlt1"
    },
    {
        "id": 588552860,
        "name": "Sally_Seahorse"
    },
    {
        "id": 2594214258,
        "name": "Almuzze"
    },
    {
        "id": 4834390663,
        "name": "Mercyeyee"
    },
    {
        "id": 1512548444,
        "name": "WavyJay2431"
    },
    {
        "id": 141527450,
        "name": "CrookedMike1230"
    },
    {
        "id": 106818,
        "name": "knux"
    },
    {
        "id": 3354874057,
        "name": "donbear2"
    },
    {
        "id": 5306083286,
        "name": "BuyItemFromIsland"
    },
    {
        "id": 5310324136,
        "name": "park_cullen"
    },
    {
        "id": 74378193,
        "name": "donbear1"
    },
    {
        "id": 2349456864,
        "name": "pin_boxx"
    },
    {
        "id": 1386548068,
        "name": "Drag00n8"
    },
    {
        "id": 123148614,
        "name": "nopje101"
    },
    {
        "id": 2918007897,
        "name": "SeVonii"
    },
    {
        "id": 2396246362,
        "name": "FennWenn"
    },
    {
        "id": 3071024195,
        "name": "keeds_yt"
    },
    {
        "id": 180754044,
        "name": "kawabouga"
    },
    {
        "id": 1862084959,
        "name": "JOJOTHT0"
    },
    {
        "id": 4303761327,
        "name": "STONEY_NOTTZ"
    },
    {
        "id": 134514775,
        "name": "Ilceto"
    },
    {
        "id": 1527453936,
        "name": "Strekie"
    },
    {
        "id": 694730737,
        "name": "farbror_f"
    },
    {
        "id": 1359717152,
        "name": "juenjuenis"
    },
    {
        "id": 2504615411,
        "name": "cignaljae"
    },
    {
        "id": 2251703695,
        "name": "Lisek_guy"
    },
    {
        "id": 630775569,
        "name": "Vorpism"
    },
    {
        "id": 632814640,
        "name": "NotDoritoDad"
    },
    {
        "id": 746620526,
        "name": "EmperorLeg"
    },
    {
        "id": 1364006688,
        "name": "Valentin25313"
    },
    {
        "id": 328442280,
        "name": "drake140207"
    },
    {
        "id": 1315256380,
        "name": "opmyoshi"
    },
    {
        "id": 994073815,
        "name": "Pooksx10"
    },
    {
        "id": 89629630,
        "name": "thomatys9110"
    },
    {
        "id": 3254488477,
        "name": "OnlyZnider"
    },
    {
        "id": 1221841742,
        "name": "Fallenko_God"
    },
    {
        "id": 1039726785,
        "name": "XavvenTheDruid"
    },
    {
        "id": 563273255,
        "name": "ninjagofansag"
    },
    {
        "id": 1215490854,
        "name": "qeenrollaisanoob"
    },
    {
        "id": 1769174994,
        "name": "DevTree_s"
    },
    {
        "id": 4426362318,
        "name": "Fyyyyyysh"
    },
    {
        "id": 1608012,
        "name": "Teqnition"
    },
    {
        "id": 1701760870,
        "name": "RedFireRoblox_YT"
    },
    {
        "id": 1363711943,
        "name": "gumontop"
    },
    {
        "id": 5719940369,
        "name": "Arctodious"
    },
    {
        "id": 387600604,
        "name": "tomastomas747"
    },
    {
        "id": 1637206409,
        "name": "Iamabignoobforlife09"
    },
    {
        "id": 1567745660,
        "name": "ErasedNightmare"
    },
    {
        "id": 1343778717,
        "name": "Shadowseer66"
    },
    {
        "id": 851188438,
        "name": "TomuSpelar7777"
    },
    {
      "id": 1074446495,
      "name": "RonaldoCr7Pro51"
    },
    {
        "id": 535073200,
        "name": "szimino"
    },
    {
        "id": 3051686914,
        "name": "angusismine"
    },
    {
        "id": 2060725837,
        "name": "gamer_boy292929"
    },
    {
        "id": 1074240937,
        "name": "omer876548"
    },
    {
        "id": 2717676990,
        "name": "h_om40"
    },
    {
        "id": 465545849,
        "name": "UdayllI"
    },
    {
        "id": 1060480074,
        "name": "listofmisery"
    },
    {
        "id": 1366415631,
        "name": "Hapster247"
    },
    {
        "id": 2760858858,
        "name": "1DankoGuy"
    },
    {
        "id": 1750597043,
        "name": "gotejt5"
    },
    {
        "id": 531403907,
        "name": "leongh09"
    },
    {
        "id": 1089770566,
        "name": "lowlowylowed"
    },
    {
        "id": 5351837159,
        "name": "littlepp363"
    },
    {
        "id": 1644409087,
        "name": "hikonan"
    },
    {
        "id": 347237801,
        "name": "Mythicalx_xMoose"
    },
    {
        "id": 2497845949,
        "name": "VriBez"
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