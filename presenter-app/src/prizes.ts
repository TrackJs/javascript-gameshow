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
    quantity: 4,
    imageUrl: "/assets/prizes/hand_sanitizer.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics2.svg"
  },
  {
    name: "Squeaky Sloth Keychain",
    level: 0,
    quantity: 5,
    imageUrl: "/assets/prizes/sloth_keychain.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics.svg"
  },
  {
    name: "At Least I'm Wearing Pants",
    level: 1,
    quantity: 5,
    imageUrl: "/assets/prizes/jogger.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  {
    name: "JVC Waterproof Bluetooth Speaker",
    level: 2,
    quantity: 3,
    imageUrl: "/assets/prizes/jvc-speaker.png",
    sponsorName: "Request Metrics",
    sponsorImageUrl: "/assets/sponsors/request_metrics2.svg"
  },
  {
    name: "￡100 Amazon GC",
    level: 3,
    quantity: 2,
    imageUrl: "/assets/prizes/amazongc.png",
    sponsorName: "Progress",
    sponsorImageUrl: "/assets/sponsors/progress.jpg"
  },
  {
    name: "Ember Mug",
    level: 3,
    quantity: 3,
    imageUrl: "/assets/prizes/embermug.png",
    sponsorName: "Syncfusion",
    sponsorImageUrl: "/assets/sponsors/syncfusion.png"
  },
  {
    name: "Nintendo Switch",
    level: 4,
    quantity: 1,
    imageUrl: "/assets/prizes/nintendo_switch.png",
    sponsorName: "Text Control",
    sponsorImageUrl: "/assets/sponsors/text_control.svg"
  },
  {
    name: "Apple Airpods",
    level: 4,
    quantity: 1,
    imageUrl: "/assets/prizes/airpods.png",
    sponsorName: "Highcharts",
    sponsorImageUrl: "/assets/sponsors/highcharts.png"
  },
  {
    name: "Sony Noise-Cancelling Headphones",
    level: 4,
    quantity: 3,
    imageUrl: "/assets/prizes/sonyheadphones.png",
    sponsorName: "TrackJS",
    sponsorImageUrl: "/assets/sponsors/trackjs.svg"
  },
  {
    name: "Surface Headphones 2",
    level: 3, // 240gbp
    quantity: 1,
    imageUrl: "/assets/prizes/surfaceheadphones2.png",
    sponsorName: "Microsoft",
    sponsorImageUrl: "/assets/sponsors/microsoft.png"
  },
  {
    name: "RODE NT-USB microphone",
    level: 3, //130gbp
    quantity: 1,
    imageUrl: "/assets/prizes/rode_mic.png",
    sponsorName: "Kontent.ai",
    sponsorImageUrl: "/assets/sponsors/kontentai.png"
  }
];
