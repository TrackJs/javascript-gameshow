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
    id: "e1fc408cc2b74fcc9186e204e35b6d27",
    name: "Jetbrains Product Pack",
    difficulty: 1, // ?
    quantity: 1,
    imageUrl: "/assets/prizes/jetbrains_license.png",
    sponsorName: "Jetbrains",
    sponsorImageUrl: "/assets/sponsors/jetbrains.svg"
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
    id: "ba6ed21c72cb4d3dbe56aa23dd84ff0c",
    name: "Hammock with Net",
    difficulty: 2, // $79
    quantity: 1,
    imageUrl: "/assets/prizes/hammock.png",
    sponsorName: "Enso",
    sponsorImageUrl: "/assets/sponsors/enso.png"
  },
  {
    id: "ae65d72882c842c6ab9c926727d44ef2",
    name: "Lego Marvel Infinity Glove",
    difficulty: 2, // $79
    quantity: 1,
    imageUrl: "/assets/prizes/lego_infinity_glove.png",
    sponsorName: "Elastic",
    sponsorImageUrl: "/assets/sponsors/elastic.svg"
  },
  {
    id: "087f90ccd7ac48fcb31bc3eaab86e1a1",
    name: "Lego Trash Compactor",
    difficulty: 2, // $79
    quantity: 1,
    imageUrl: "/assets/prizes/lego_trash_compactor.png",
    sponsorName: "Octopus Deploy",
    sponsorImageUrl: "/assets/sponsors/octopus_deploy.svg"
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
    id: "fc29aace5f5948cb927c400c4d18a4b7",
    name: "Logitech Keyboard Mouse",
    difficulty: 3, // 250
    quantity: 1,
    imageUrl: "/assets/prizes/logi_keyboard_mouse.png",
    sponsorName: "Contrast Security",
    sponsorImageUrl: "/assets/sponsors/contrast_security.svg"
  },
  {
    id: "9d312ed5f25a47469748f62f9eeab225",
    name: "Nintendo Switch",
    difficulty: 3, // 250
    quantity: 1,
    imageUrl: "/assets/prizes/nintendo_switch.png",
    sponsorName: "Text Control",
    sponsorImageUrl: "/assets/sponsors/text_control.svg"
  },
  {
    id: "8808f3254e7a4382bd574f0f56fd7fc5",
    name: "Lego Motorized Lighthouse",
    difficulty: 3, // 300
    quantity: 1,
    imageUrl: "/assets/prizes/lego_motorized_lighthouse.png",
    sponsorName: "Honeycomb",
    sponsorImageUrl: "/assets/sponsors/honeycomb.svg"
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

  getAllPrizes() : Prize[] {
    return this.getClaimedPrizeInventory();
  }

  releasePrize(gameId: string, prizeId: string) {
    let prizeClaims = this.getPrizeClaims();
    let claimIndex = prizeClaims.findIndex(pc => pc.gameId === gameId && pc.prizeId === prizeId);
    prizeClaims.splice(claimIndex, 1);
    this.savePrizeClaims(prizeClaims);
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

  logPrizes() {
    console.groupCollapsed("Prize Integrity Check");
    console.info(`There are ${PRIZE_INVENTORY.reduce((count, p) => (count + p.quantity), 0)} prizes.`)
    console.info(`${PRIZE_INVENTORY.filter(p => !!PRIZE_INVENTORY.find(pi => pi.id === p.id && pi !== p) ).length} have duplicate ids`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 0).reduce((count, p) => (count + p.quantity), 0)} have difficulty 0`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 1).reduce((count, p) => (count + p.quantity), 0)} have difficulty 1`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 2).reduce((count, p) => (count + p.quantity), 0)} have difficulty 2`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 3).reduce((count, p) => (count + p.quantity), 0)} have difficulty 3`);
    console.groupEnd();
  }
}

export const PrizeController = new _PrizeController();
