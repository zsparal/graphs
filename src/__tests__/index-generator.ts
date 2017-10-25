import { SequentialIndexGenerator } from "../index-generator";

describe("Index Generator", () => {
  describe("Sequential String", () => {
    let generator: SequentialIndexGenerator;
    beforeEach(() => {
      generator = new SequentialIndexGenerator();
    });

    it("generates sequential numbers", () => {
      expect(generator.next()).toBe("0");
      expect(generator.next()).toBe("1");
      expect(generator.next()).toBe("2");
    });

    it("accepts a starting index", () => {
      let seededGenerator = new SequentialIndexGenerator(10);
      expect(seededGenerator.next()).toBe("10");
      expect(seededGenerator.next()).toBe("11");
      expect(seededGenerator.next()).toBe("12");
    });
  });
});
