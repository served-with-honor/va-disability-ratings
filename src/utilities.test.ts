import { round, getInverseSide, getInverseSideName, filterBilateralMatches } from "./utilities";

describe("Round", () => {
  test("Rounding Up 2 places", () => expect(round(123.456, 2)).toBe(123.46));
  test("Rounding no places", () => expect(round(123.456)).toBe(123));
  test("Rounding no places123", () => expect(round(0.7896, 3)).toBe(0.79));
});

describe("Inverse Side", () => {
  test("left to right", () => expect(getInverseSideName("left")).toBe("right"));
  test("Left to right", () => expect(getInverseSideName("Left")).toBe("right"));
  test("right to left", () => expect(getInverseSideName("right")).toBe("left"));
  test("Right to left", () => expect(getInverseSideName("Right")).toBe("left"));
  
  test("left to right", () => expect(getInverseSide("left leg")).toBe("right leg"));
  test("Left to right", () => expect(getInverseSide("Left foot")).toBe("right foot"));
  test("right to left", () => expect(getInverseSide("right arm")).toBe("left arm"));
  test("Right to left", () => expect(getInverseSide("Right Leg")).toBe("left Leg"));
});

describe("Bilaterals", () => {
  test("No matches", () => {
    const items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Left Arm', value: 0.4 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[], [0.2, 0.4]];
    expect(expectValue).toStrictEqual(value);
  });
  test("1 matching pair", () => {
    const items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[0.2, 0.4], []];
    expect(expectValue).toStrictEqual(value);
  });
  test("2 matching items and some no matches", () => {
    const items = [{ label: 'Left Arm', value: 0.2 },  { label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[0.2, 0.4], [0.2]];
    expect(expectValue).toStrictEqual(value);
  });
  test("3 matching items", () => {
    const items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }, { label: 'Righ Leg', value: 0.2 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[0.2, 0.4, 0.2], []];
    expect(expectValue).toStrictEqual(value);
  });
});

export {}
