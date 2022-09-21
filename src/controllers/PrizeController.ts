export interface Prize {
  id: string,
  name: string,
  questionIdx: number,
  // sponsorName: string,
  // sponsorLogo: string,
}

interface InventoryPrize extends Prize {
  quantity: number
}

interface ClaimedInventoryPrize extends InventoryPrize {
  claimedQty: number
}

interface PrizeClaim {
  gameId: string,
  prizeId: string
}

const STORAGE_KEY = "prize-claims";

class _PrizeController {

  getPrizeStack(gameId: string) : Prize[] {

    let prizeStack: Prize[] = [];
    let claimedPrizeInventory = this.getClaimedPrizeInventory();

    for(var i = 0; i < 10; i++) {
      let prize = claimedPrizeInventory.find(p => p.questionIdx === i && p.claimedQty < p.quantity) as Prize;
      if (!prize) {
        alert("TODO No Prizes found");
      }

      this.claimPrize(gameId, prize.id);
      prizeStack[i] = prize
    }

    return prizeStack;
  }

  private claimPrize(gameId: string, prizeId: string) {
    let prizeClaims = this.getPrizeClaims();
    prizeClaims.push({ gameId, prizeId });
    this.savePrizeClaims(prizeClaims);
  }

  private getClaimedPrizeInventory() : ClaimedInventoryPrize[] {
    let prizeClaims = this.getPrizeClaims();
    return PRIZE_INVENTORY.map(p => {
      return {
        ...p,
        claimedQty: prizeClaims.filter(c => c.prizeId === p.id).length
      };
    });
  }

  private getPrizeClaims() : PrizeClaim[] {
    let usageRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return usageRecords;
  }

  private savePrizeClaims(prizeClaims: PrizeClaim[]) : void  {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prizeClaims));
  }
}

export const PrizeController = new _PrizeController();

const PRIZE_INVENTORY : InventoryPrize[] = [
  {
    id: "60caf407890f4cb8a50ce146b00a833f",
    name: "Sloth Squishtoy",
    questionIdx: 0,
    quantity: 1
  },
  {
    id: "b85def0e3d0f4955a1869da68e47bca0",
    name: "Sloth Keychain",
    questionIdx: 0,
    quantity: 1
  },
  {
    id: "a5f8bf31314441fdbc637a9991534b31",
    name: "Waterbottle",
    questionIdx: 1,
    quantity: 2
  },
  {
    id: "bbac1c32db4e4fd486998a9d3dea3b41",
    name: "JavaScript Happens Tshirt",
    questionIdx: 2,
    quantity: 2
  },
  {
    id: "e8f284abac1e457283d283eefb4d868c",
    name: "3",
    questionIdx: 3,
    quantity: 2
  },
  {
    id: "7ef31c6fce004410be685477acdac0d2",
    name: "4",
    questionIdx: 4,
    quantity: 2
  },
  {
    id: "68fe0989d04c4a36aed85dfb619e2f21",
    name: "5",
    questionIdx: 5,
    quantity: 2
  },
  {
    id: "9d19d0ce6b034dcf84b4f98d37f0b361",
    name: "6",
    questionIdx: 6,
    quantity: 2
  },
  {
    id: "f08b9a1d6e0549b8b170547abd54c5f9",
    name: "7",
    questionIdx: 7,
    quantity: 2
  },
  {
    id: "d554da71d3364b24af9046322e01a637",
    name: "8",
    questionIdx: 8,
    quantity: 2
  },
  {
    id: "3b5f0a7c6fee4d2a9062cb7aa1243c65",
    name: "9",
    questionIdx: 9,
    quantity: 2
  }
];