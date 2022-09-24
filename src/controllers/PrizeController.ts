export interface Prize {
  id: string,
  name: string,
  difficulty: number,
  imageUrl: string
  sponsorName: string,
  sponsorImageUrl: string,
  isThreshold?: boolean
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

const PRIZE_INVENTORY : InventoryPrize[] = [
  {
    id: "60caf407890f4cb8a50ce146b00a833f",
    name: "Sloth Squishtoy",
    difficulty: 0,
    quantity: 10,
    imageUrl: "/assets/prizes/sloth_avatar.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  },
  {
    id: "b85def0e3d0f4955a1869da68e47bca0",
    name: "Sloth Keychain",
    difficulty: 1,
    quantity: 10,
    imageUrl: "/assets/prizes/sloth_avatar.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  },
  {
    id: "a5f8bf31314441fdbc637a9991534b31",
    name: "Waterbottle",
    difficulty: 2,
    quantity: 20,
    imageUrl: "/assets/prizes/sloth_avatar.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  },
  {
    id: "bbac1c32db4e4fd486998a9d3dea3b41",
    name: "JavaScript Happens Tshirt",
    difficulty: 3,
    quantity: 10,
    imageUrl: "/assets/prizes/sloth_avatar.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  }
];

class _PrizeController {

  constructor() {
    //this.checkPrizes();
  }

  getPrize(gameId: string, difficulty: number) : Prize {
    let claimedPrizeInventory = this.getClaimedPrizeInventory();

    let prize = claimedPrizeInventory
      .find(prize => prize.difficulty === difficulty && prize.claimedQty < prize.quantity);
    if (!prize) {
      throw new Error(`Could not get prize for game ${gameId} at difficulty ${difficulty}`);
    }

    this.claimPrize(gameId, prize.id);
    return prize;
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

  private checkPrizes() {
    console.groupCollapsed("Prize Integrity Check");
    console.info(`There are ${PRIZE_INVENTORY.reduce((count, p) => (count + p.quantity), 0)} prizes.`)
    console.info(`${PRIZE_INVENTORY.filter(p => !!PRIZE_INVENTORY.find(pi => pi.id === p.id && pi !== p) ).length} have duplicate ids`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 0).reduce((count, p) => (count + p.quantity), 0)} have difficulty 0`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 0).reduce((count, p) => (count + p.quantity), 0)} have difficulty 1`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 0).reduce((count, p) => (count + p.quantity), 0)} have difficulty 2`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 0).reduce((count, p) => (count + p.quantity), 0)} have difficulty 3`);
    console.groupEnd();
  }
}

export const PrizeController = new _PrizeController();
