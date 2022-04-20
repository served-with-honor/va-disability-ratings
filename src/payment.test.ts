import { getRateType, getRateAmount } from "./payment";

describe("Get Rate Type", () => {
  test("Should return `veteran` by default", () => {
    expect(getRateType()).toBe("veteran");
  });
  test("Should return `withspouseonly` when married, no children, no dependant parents", () => {
    expect(getRateType({ isMarried: true })).toBe("withspouseonly");
  });
  test("Should return `withspouseanddependentparent` when married, no children, 1 dependant parent", () => {
    expect(getRateType({ isMarried: true, parents: 1 })).toBe(
      "withspouseandoneparent",
    );
  });
  test("Should return `withspouseandtwoparents` when married, no children, 2 dependant parents", () => {
    expect(getRateType({ isMarried: true, parents: 2 })).toBe(
      "withspouseandtwoparents",
    );
  });
  test("Should return `withoneparent` when not married, no children, 1 dependant parent", () => {
    expect(getRateType({ parents: 1 })).toBe("withoneparent");
  });
  test("Should return `withtwoparents` when not married, no children, 2 dependant parents", () => {
    expect(getRateType({ parents: 2 })).toBe("withtwoparents");
  });
  test("Should return `withspouseandchild` when married, with children, no dependant parents", () => {
    expect(getRateType({ hasChildren: true, isMarried: true })).toBe(
      "withspouseandchild",
    );
  });
  test("Should return `withhchildonly` when not married, with children, no dependant parents", () => {
    expect(getRateType({ hasChildren: true })).toBe("withchildonly");
  });
  test("Should return `withspouseoneparentandchild` when married, with children, 1 dependant parents", () => {
    expect(
      getRateType({ hasChildren: true, isMarried: true, parents: 1 }),
    ).toBe("withspouseoneparentandchild");
  });
  test("Should return `withspousetwoparentsandchild` when married, with children, 2 dependant parents", () => {
    expect(
      getRateType({ hasChildren: true, isMarried: true, parents: 2 }),
    ).toBe("withspousetwoparentsandchild");
  });
  test("Should return `withoneparentandchild` when not married, with children, 1 dependant parents", () => {
    expect(getRateType({ hasChildren: true, parents: 1 })).toBe(
      "withoneparentandchild",
    );
  });
  test("Should return `withtwoparentsandchild` when not married, with children, 2 dependant parents", () => {
    expect(getRateType({ hasChildren: true, parents: 2 })).toBe(
      "withtwoparentsandchild",
    );
  });
});

describe('Get Rate Amount', () => {
  // test('Latest rates', () => {});
  test('Past rates', () => expect(getRateAmount('veteran', 30, 2020)).toBe(435.69));
});


export {};
