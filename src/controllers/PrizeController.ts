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
    id: "ee2b4d37482543f0b2eeb651b8c4a4f8",
    name: "Hand Sanitizer",
    difficulty: 0,
    quantity: 5,
    imageUrl: "/assets/prizes/hand_sanitizer.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  },
  {
    id: "5373650e5fe847d88b4f64ed0804207d",
    name: "Sloth Stressball",
    difficulty: 0,
    quantity: 5,
    imageUrl: "/assets/prizes/sloth_stressball.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  },

  {
    id: "4f780b6e31d64c77a9d9ae19cea87342",
    name: "NDC Hat",
    difficulty: 1,
    quantity: 10,
    imageUrl: "/assets/prizes/ndc_hat.png",
    sponsorName: "NDC Conferences",
    sponsorImageUrl: "/assets/sponsors/ndc.png"
  },

  {
    id: "d8fa0d9610ba4c94a9ed3c5339fdb36e",
    name: "JavaScript Happens TShirt",
    difficulty: 2,
    quantity: 5,
    imageUrl: "/assets/prizes/tshirt.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  {
    id: "b85def0e3d0f4955a1869da68e47bca0",
    name: "At Least I'm Wearing Pants Joggers",
    difficulty: 2,
    quantity: 4,
    imageUrl: "/assets/prizes/jogger.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },

  {
    id: "ae65d72882c842c6ab9c926727d44ef2",
    name: "Lego Marvel Infinity Glove",
    difficulty: 3, // $79
    quantity: 1,
    imageUrl: "/assets/prizes/lego_infinity_glove.png",
    sponsorName: "Elastic",
    sponsorImageUrl: "/assets/sponsors/elastic.svg"
  },
  {
    id: "087f90ccd7ac48fcb31bc3eaab86e1a1",
    name: "Lego Trash Compactor",
    difficulty: 3, // $79
    quantity: 1,
    imageUrl: "/assets/prizes/lego_trash_compactor.png",
    sponsorName: "Octopus Deploy",
    sponsorImageUrl: "/assets/sponsors/octopus_deploy.svg"
  },
  {
    id: "ba6ed21c72cb4d3dbe56aa23dd84ff0c",
    name: "Hammock with Net",
    difficulty: 3, // $79
    quantity: 1,
    imageUrl: "/assets/prizes/hammock.png",
    sponsorName: "Enso",
    sponsorImageUrl: "/assets/sponsors/enso.png"
  },
  {
    id: "e776911270e44e6085fb4055bed5c864",
    name: "Gyldendal Stack",
    difficulty: 3, // ?
    quantity: 1,
    imageUrl: "/assets/prizes/todo.png",
    sponsorName: "Gyldendal",
    sponsorImageUrl: "/assets/sponsors/todo.png"
  },
  {
    id: "e1fc408cc2b74fcc9186e204e35b6d27",
    name: "Jetbrains Product Pack",
    difficulty: 3, // ?
    quantity: 1,
    imageUrl: "/assets/prizes/jetbrains_license.png",
    sponsorName: "Jetbrains",
    sponsorImageUrl: "/assets/sponsors/jetbrains.svg"
  },

  {
    id: "12bcfc382679415b8c53451fffb764b5",
    name: "NDC Golden Ticket",
    difficulty: 4, // ?
    quantity: 3,
    imageUrl: "/assets/prizes/ndc_ticket.png",
    sponsorName: "NDC Conferences",
    sponsorImageUrl: "/assets/sponsors/ndc.png"
  },
  {
    id: "046d9e40a09d4ff6ad67bbb6fcf977ec",
    name: "Sony Wireless Headphones",
    difficulty: 4, // 300
    quantity: 1,
    imageUrl: "/assets/prizes/sony_headphones.png",
    sponsorName: "KnowIT",
    sponsorImageUrl: "/assets/sponsors/knowit.png"
  },
  {
    id: "8808f3254e7a4382bd574f0f56fd7fc5",
    name: "Lego Motorized Lighthouse",
    difficulty: 4, // 300
    quantity: 1,
    imageUrl: "/assets/prizes/lego_motorized_lighthouse.png",
    sponsorName: "Honeycomb",
    sponsorImageUrl: "/assets/sponsors/honeycomb.svg"
  },
  {
    id: "0a52b3c98b424c809d927ec6427c9ec0",
    name: "Sony Wireless Headphones",
    difficulty: 4, // 300
    quantity: 1,
    imageUrl: "/assets/prizes/sony_headphones.png",
    sponsorName: "Techpros",
    sponsorImageUrl: "/assets/sponsors/techpros.svg"
  },
  {
    id: "9d312ed5f25a47469748f62f9eeab225",
    name: "Nintendo Switch",
    difficulty: 4, // 250
    quantity: 1,
    imageUrl: "/assets/prizes/nintendo_switch.png",
    sponsorName: "Text Control",
    sponsorImageUrl: "/assets/sponsors/text_control.svg"
  },
  {
    id: "fc29aace5f5948cb927c400c4d18a4b7",
    name: "Logitech Keyboard Mouse",
    difficulty: 4, // 250
    quantity: 1,
    imageUrl: "/assets/prizes/logi_keyboard_mouse.png",
    sponsorName: "Contrast Security",
    sponsorImageUrl: "/assets/sponsors/contrast_security.svg"
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
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 4).reduce((count, p) => (count + p.quantity), 0)} have difficulty 4`);
    console.groupEnd();
  }
}

export const PrizeController = new _PrizeController();
