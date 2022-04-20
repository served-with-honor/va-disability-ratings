import calculateRating, { calculateBilateral } from "./rating";

describe("Calculate Bilaterals", () => {
  test("Simple", () => {
    expect( calculateBilateral([0.3,0.2]) ).toEqual({ factor: 0.044, percent: 0.48 }); 
  })
  test("Muliple", () => {
    expect( calculateBilateral([0.1, 0.1, 0.1]) ).toEqual({ factor: 0.027, percent: 0.3 }); 
  })
});

describe("Calculate Rating", () => {
  test("Rounding Up", () => expect(calculateRating([0.9, 0.5])).toEqual({ rounded: 1, total: 0.95 }));
  test("Rounding Down", () => expect(calculateRating([0.9, 0.3])).toEqual({ rounded: 0.9, total: 0.93 }));
});

export {};
