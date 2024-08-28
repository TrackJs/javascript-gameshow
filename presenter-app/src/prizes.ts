import { Level } from "./constants";

export interface Prize {
  quantity: number
  name: string,
  level: Level,
  imageUrl: string
  sponsorName: string,
  sponsorImageUrl: string,
}

export const Prizes: Prize[] = [
  {
    name: "Hand Sanitizer",
    level: 0,
    quantity: 6,
    imageUrl: "/assets/prizes/hand_sanitizer.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics2.svg"
  },
  {
    name: "JavaScript Happpens TShirt",
    level: 1,
    quantity: 6,
    imageUrl: "/assets/prizes/tshirt.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  // {
  //   name: "Squeaky Sloth Keychain",
  //   level: 0,
  //   quantity: 5,
  //   imageUrl: "/assets/prizes/sloth_keychain.png",
  //   sponsorName: "Request Metrics",
  //   sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  // },
  // {
  //   name: "At Least I'm Wearing Pants",
  //   level: 1,
  //   quantity: 5,
  //   imageUrl: "/assets/prizes/jogger.png",
  //   sponsorName: "TrackJS",
  //   sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  // },
  {
    name: "VIP Merch Pack",
    level: 2,
    quantity: 1,
    imageUrl: "/assets/prizes/pieces-prize-pack.png",
    sponsorName: "Pieces for Developers",
    sponsorImageUrl: "/assets/sponsors/pieces.png"
  },
  {
    name: "Lego Land Rover",
    level: 2,
    quantity: 1,
    imageUrl: "/assets/prizes/lego-land-rover.png",
    sponsorName: "NDC Conferences",
    sponsorImageUrl: "/assets/sponsors/ndc.png"
  },
  {
    name: "Lego Rose",
    level: 2,
    quantity: 1,
    imageUrl: "/assets/prizes/lego-rose.png",
    sponsorName: "NDC Conferences",
    sponsorImageUrl: "/assets/sponsors/ndc.png"
  },
  {
    name: "Dakota Powerbank",
    level: 2,
    quantity: 1,
    imageUrl: "/assets/prizes/dakota-powerbank.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  {
    name: "Philips Headphones",
    level: 3,
    quantity: 1,
    imageUrl: "/assets/prizes/philips-headphones.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  {
    name: "Lego Flowers",
    level: 3,
    quantity: 2,
    imageUrl: "/assets/prizes/lego-flowers.png",
    sponsorName: "NDC Conferences",
    sponsorImageUrl: "/assets/sponsors/ndc.png"
  },
  {
    name: "Anker Powerbank",
    level: 3,
    quantity: 1,
    imageUrl: "/assets/prizes/anker_powerbank.png",
    sponsorName: "Prosa",
    sponsorImageUrl: "/assets/sponsors/prosa.png"
  },
  {
    name: "Lego C3PO",
    level: 4,
    quantity: 1,
    imageUrl: "/assets/prizes/lego_c3p0.png",
    sponsorName: "Text Control",
    sponsorImageUrl: "/assets/sponsors/text_control.svg"
  },
  {
    name: "Logitech Gaming Mouse",
    level: 4,
    quantity: 1,
    imageUrl: "/assets/prizes/logitech-g502x.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics2.svg"
  },
  {
    name: "Lego Piranha Plant",
    level: 4,
    quantity: 1,
    imageUrl: "/assets/prizes/lego-piranha.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  {
    name: "Lego Chess Set",
    level: 4,
    quantity: 1,
    imageUrl: "/assets/prizes/lego-chess-set.png",
    sponsorName: "NDC Conferences",
    sponsorImageUrl: "/assets/sponsors/ndc.png"
  }
];
