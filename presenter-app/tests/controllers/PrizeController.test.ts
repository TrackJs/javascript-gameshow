import { PrizeController, PrizeLookup } from '../../src/controllers/PrizeController';

jest.mock('browserMocks');

describe("PrizeController", () => {

  beforeEach(() => {
    PrizeController.prototype._loadUsage = jest.fn(() => []);
    PrizeController.prototype._updateUsage = jest.fn();
  });

  describe("constructor()", () => {

    it("constructs with empty storage", () => {
      PrizeController.prototype._loadUsage = jest.fn(() => []);
      let prizeController = new PrizeController();

      expect(prizeController._prizeUsage).toEqual([]);
      expect(prizeController._prizeMap[0]).toMatchObject({
        prizeIdx: 0,
        claimedQty: 0,
        name: expect.any(String)
      });
    });

    it("constructs with state in storage", () => {
      let usage = [
        {
          gameId: "0",
          askIdx: 0,
          prizeIdx: 0
        },
        {
          gameId: "0",
          askIdx: 1,
          prizeIdx: 1
        },
        {
          gameId: "0",
          askIdx: 2,
          prizeIdx: 2
        },
        {
          gameId: "0",
          askIdx: 3,
          prizeIdx: 3
        },
        {
          gameId: "0",
          askIdx: 4,
          prizeIdx: 9
        }
      ];
      PrizeController.prototype._loadUsage = jest.fn(() => usage);

      let prizeController = new PrizeController();

      expect(prizeController._prizeUsage).toEqual(usage);
      expect(prizeController._prizeMap[0]).toMatchObject({
        prizeIdx: 0,
        claimedQty: 1,
        name: expect.any(String)
      });
    });

  });

  describe("getPrize()", () => {

    it("returns available prize from correct level", () => {
      let prizeController = new PrizeController();
      prizeController._prizeMap = [
        {
          prizeIdx: 0,
          level: 0,
          quantity: 2,
          claimedQty: 2,
          name: "foo"
        } as PrizeLookup,
        {
          prizeIdx: 1,
          level: 0,
          quantity: 2,
          claimedQty: 1,
          name: "bar"
        } as PrizeLookup,
        {
          prizeIdx: 2,
          level: 1,
          quantity: 2,
          claimedQty: 0,
          name: "baz"
        } as PrizeLookup,
        {
          prizeIdx: 3,
          level: 2,
          quantity: 1,
          claimedQty: 0,
          name: "boof"
        } as PrizeLookup
      ];

      let prize1 = prizeController.getPrize("0", 0);
      let prize2 = prizeController.getPrize("0", 1);
      let prize3 = prizeController.getPrize("0", 2);

      expect(prize1?.prizeIdx).toBe(1);
      expect(prize1?.name).toBe("bar");

      expect(prize2?.prizeIdx).toBe(2);
      expect(prize2?.name).toBe("baz");

      expect(prize3?.prizeIdx).toBe(3);
      expect(prize3?.name).toBe("boof");
    });

  });

});

