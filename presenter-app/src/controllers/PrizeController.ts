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

const PRIZE_INVENTORY: InventoryPrize[] = [

  // level 0
  {
    id: "ee2b4d37482543f0b2eeb651b8c4a4f8",
    name: "Hand Sanitizer",
    difficulty: 0,
    quantity: 4,
    imageUrl: "/assets/prizes/hand_sanitizer.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics2.svg"
  },
  {
    id: "ee2b4d37482583f0b2eeb651b8c4a4f8",
    name: "Highcharts Socks",
    difficulty: 0,
    quantity: 1,
    imageUrl: "/assets/sponsors/highcharts.png",
    sponsorName: "Highcharts",
    sponsorImageUrl: "/assets/sponsors/highcharts.png"
  },
  // {
  //   id: "ee2b4d37482543f0b2eeb651b8c4a4f9",
  //   name: "Squeaky Sloth Keychain",
  //   difficulty: 0,
  //   quantity: 5,
  //   imageUrl: "/assets/prizes/sloth_keychain.png",
  //   sponsorName: "Request Metrics",
  //   sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  // },

  // level 1
  {
    id: "b85def0e3d0f4955a1869da68e47bca0",
    name: "At Least I'm Wearing Pants",
    difficulty: 1,
    quantity: 5,
    imageUrl: "/assets/prizes/jogger.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },

  // level 2
  {
    id: "b85de80e2d0f4955a1869da68e47bcb2",
    name: "Cloud Career Journeys Book",
    difficulty: 2,
    quantity: 2,
    imageUrl: "/assets/prizes/cloudcareerbook.jpg",
    sponsorName: "AWS",
    sponsorImageUrl: "/assets/sponsors/aws.png"
  },
  {
    id: "5373650e5fe847d88b4f64ed0804207d",
    name: "JVC Waterproof Bluetooth Speaker",
    difficulty: 2,
    quantity: 3,
    imageUrl: "/assets/prizes/jvc-speaker.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics2.svg"
  },

  // level 3
  {
    id: "087f90ccd7ac48fcb31bc3eaab86e1a1",
    name: "￡100 Amazon GC",
    difficulty: 3,
    quantity: 2,
    imageUrl: "/assets/prizes/amazongc.png",
    sponsorName: "Progress",
    sponsorImageUrl: "/assets/sponsors/progress.jpg"
  },
  {
    id: "5373650e5fe847d88b4f64ed0804207e",
    name: "Ember Mug",
    difficulty: 3,
    quantity: 3,
    imageUrl: "/assets/prizes/embermug.png",
    sponsorName: "Syncfusion",
    sponsorImageUrl: "/assets/sponsors/syncfusion.png"
  },

  // level 4
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
    id: "ba6ed21c72cb4d3dbe56aa23dd84ff1d",
    name: "Apple Airpods",
    difficulty: 4, // $65gbp
    quantity: 1,
    imageUrl: "/assets/prizes/airpods.png",
    sponsorName: "Highcharts",
    sponsorImageUrl: "/assets/sponsors/highcharts.png"
  },
  {
    id: "ba6ed21c72cb4d3dbe56aa23dd84ff0c",
    name: "Sony Noise-Cancelling Headphones",
    difficulty: 4,
    quantity: 3,
    imageUrl: "/assets/prizes/sonyheadphones.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  }


  // {
  //   id: "251e637c340942d389e8ab64cd421e63",
  //   name: "Surface Headphones 2",
  //   difficulty: 3, // 240gbp
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/surfaceheadphones2.png",
  //   sponsorName: "Microsoft",
  //   sponsorImageUrl: "/assets/sponsors/microsoft.png"
  // },
  // {
  //   id: "4f780b6e31d64c77a9d9ae19cea87342",
  //   name: "RODE NT-USB microphone",
  //   difficulty: 3, //130gbp
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/rode_mic.png",
  //   sponsorName: "Kontent.ai",
  //   sponsorImageUrl: "/assets/sponsors/kontentai.png"
  // },



  // {
  //   id: "087f90ccd7ac48fcb31bc3eaab86e1a1",
  //   name: "TBD",
  //   difficulty: 3,
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/TBD.png",
  //   sponsorName: "Octopus Deploy",
  //   sponsorImageUrl: "/assets/sponsors/octopus_deploy.svg"
  // },
  // {
  //   id: "5373650e5fe847d88b4f64ed0804207d",
  //   name: "TBD",
  //   difficulty: 2,
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/TBD.png",
  //   sponsorName: "Couchbase",
  //   sponsorImageUrl: "/assets/sponsors/couchbase.png"
  // },
  // {
  //   id: "ae65d72882c842c6ab9c926727d44ef2",
  //   name: "Lego Marvel Infinity Glove",
  //   difficulty: 3, // $79
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/lego_infinity_glove.png",
  //   sponsorName: "Elastic",
  //   sponsorImageUrl: "/assets/sponsors/elastic.svg"
  // },
  // {
  //   id: "ba6ed21c72cb4d3dbe56aa23dd84ff0c",
  //   name: "Hammock with Net",
  //   difficulty: 3, // $79
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/hammock.png",
  //   sponsorName: "Enso",
  //   sponsorImageUrl: "/assets/sponsors/enso.png"
  // },
  // {
  //   id: "542abd0720f346ce9a5b11c790fb1fee",
  //   name: "Apple TV",
  //   difficulty: 3, // $180
  //   quantity: 2,
  //   imageUrl: "/assets/prizes/appletv.png",
  //   sponsorName: "NDC Conferences",
  //   sponsorImageUrl: "/assets/sponsors/ndc.png"
  // },
  // {
  //   id: "e776911270e44e6085fb4055bed5c864",
  //   name: "Gyldendal Stack",
  //   difficulty: 3, // ?
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/todo.png",
  //   sponsorName: "Gyldendal",
  //   sponsorImageUrl: "/assets/sponsors/todo.png"
  // },
  // {
  //   id: "e1fc408cc2b74fcc9186e204e35b6d27",
  //   name: "Jetbrains Product Pack",
  //   difficulty: 3, // ?
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/jetbrains_license.png",
  //   sponsorName: "Jetbrains",
  //   sponsorImageUrl: "/assets/sponsors/jetbrains.svg"
  // },

  // {
  //   id: "046d9e40a09d4ff6ad67bbb6fcf977ec",
  //   name: "Sony Wireless Headphones",
  //   difficulty: 4, // 300
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/sony_headphones.png",
  //   sponsorName: "KnowIT",
  //   sponsorImageUrl: "/assets/sponsors/knowit.png"
  // },
  // {
  //   id: "8808f3254e7a4382bd574f0f56fd7fc5",
  //   name: "Lego Motorized Lighthouse",
  //   difficulty: 4, // 300
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/lego_motorized_lighthouse.png",
  //   sponsorName: "Honeycomb",
  //   sponsorImageUrl: "/assets/sponsors/honeycomb.svg"
  // },
  // {
  //   id: "9d312ed5f25a47469748f62f9eeab225",
  //   name: "Nintendo Switch",
  //   difficulty: 4, // 250
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/nintendo_switch.png",
  //   sponsorName: "Text Control",
  //   sponsorImageUrl: "/assets/sponsors/text_control.svg"
  // },
  // {
  //   id: "12bcfc382679415b8c53451fffb764b5",
  //   name: "NDC Golden Ticket",
  //   difficulty: 4, // ?
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/ndc_ticket.png",
  //   sponsorName: "NDC Conferences",
  //   sponsorImageUrl: "/assets/sponsors/ndc.png"
  // },
  // {
  //   id: "0a52b3c98b424c809d927ec6427c9ec0",
  //   name: "Sony Wireless Headphones",
  //   difficulty: 4, // 300
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/sony_headphones.png",
  //   sponsorName: "Techpros",
  //   sponsorImageUrl: "/assets/sponsors/techpros.svg"
  // },
  // {
  //   id: "fc29aace5f5948cb927c400c4d18a4b7",
  //   name: "Logitech Keyboard Mouse",
  //   difficulty: 4, // 250
  //   quantity: 1,
  //   imageUrl: "/assets/prizes/logi_keyboard_mouse.png",
  //   sponsorName: "Contrast Security",
  //   sponsorImageUrl: "/assets/sponsors/contrast_security.svg"
  // },
  // {
  //   id: "22bcfc382679415b8c53451fffb764b5",
  //   name: "NDC Golden Ticket",
  //   difficulty: 4, // ?
  //   quantity: 2,
  //   imageUrl: "/assets/prizes/ndc_ticket.png",
  //   sponsorName: "NDC Conferences",
  //   sponsorImageUrl: "/assets/sponsors/ndc.png"
  // }

];

class _PrizeController {

  getPrize(gameId: string, difficulty: number): Prize {
    let claimedPrizeInventory = this.getClaimedPrizeInventory();

    let prize = claimedPrizeInventory
      .find(prize => prize.difficulty === difficulty && prize.claimedQty < prize.quantity);
    if (!prize) {
      throw new Error(`Could not get prize for game ${gameId} at difficulty ${difficulty}`);
    }

    this.claimPrize(gameId, prize.id);
    return prize;
  }

  getAllPrizes(): Prize[] {
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

  private getClaimedPrizeInventory(): ClaimedInventoryPrize[] {
    let prizeClaims = this.getPrizeClaims();
    return PRIZE_INVENTORY.map(p => {
      return {
        ...p,
        claimedQty: prizeClaims.filter(c => c.prizeId === p.id).length
      };
    });
  }

  private getPrizeClaims(): PrizeClaim[] {
    let usageRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return usageRecords;
  }

  private savePrizeClaims(prizeClaims: PrizeClaim[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prizeClaims));
  }

  logPrizes() {
    console.groupCollapsed("Prize Integrity Check");
    console.info(`There are ${PRIZE_INVENTORY.reduce((count, p) => (count + p.quantity), 0)} prizes.`)
    console.info(`${PRIZE_INVENTORY.filter(p => !!PRIZE_INVENTORY.find(pi => pi.id === p.id && pi !== p)).length} have duplicate ids`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 0).reduce((count, p) => (count + p.quantity), 0)} have difficulty 0`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 1).reduce((count, p) => (count + p.quantity), 0)} have difficulty 1`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 2).reduce((count, p) => (count + p.quantity), 0)} have difficulty 2`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 3).reduce((count, p) => (count + p.quantity), 0)} have difficulty 3`);
    console.info(`${PRIZE_INVENTORY.filter(p => p.difficulty === 4).reduce((count, p) => (count + p.quantity), 0)} have difficulty 4`);
    console.groupEnd();
  }
}

export const PrizeController = new _PrizeController();
