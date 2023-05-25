import { ClassAssignmentAvans } from "../ClassAssignmentAvans";

describe("ShippingCosts", () => {
  let classAssignmentAvans: ClassAssignmentAvans;

  beforeEach(() => {
    classAssignmentAvans = new ClassAssignmentAvans();
  });

  it("should return 100 for Ground shipping when calculateShippingCosts is true and totalPrice is less than or equal to 1500", () => {
    const result = classAssignmentAvans.ShippingCosts(true, "Ground", 1000);
    expect(result).toEqual(100);
  });

  it("should return 50 for InStore shipping when calculateShippingCosts is true and totalPrice is less than or equal to 1500", () => {
    const result = classAssignmentAvans.ShippingCosts(true, "InStore", 1000);
    expect(result).toEqual(50);
  });

  it("should return 250 for NextDayAir shipping when calculateShippingCosts is true and totalPrice is less than or equal to 1500", () => {
    const result = classAssignmentAvans.ShippingCosts(true, "NextDayAir", 1000);
    expect(result).toEqual(250);
  });

  it("should return 125 for SecondDayAir shipping when calculateShippingCosts is true and totalPrice is less than or equal to 1500", () => {
    const result = classAssignmentAvans.ShippingCosts(
      true,
      "SecondDayAir",
      1000
    );
    expect(result).toEqual(125);
  });

  it("should return 0 when calculateShippingCosts is true and totalPrice is greater than 1500", () => {
    const result = classAssignmentAvans.ShippingCosts(true, "Ground", 2000);
    expect(result).toEqual(0);
  });

  it("should return 0 when calculateShippingCosts is false", () => {
    const result = classAssignmentAvans.ShippingCosts(false, "Ground", 1000);
    expect(result).toEqual(0);
  });

  it("should return 0 when typeOfShippingCosts is not recognized", () => {
    const result = classAssignmentAvans.ShippingCosts(
      true,
      "InvalidShippingType",
      1000
    );
    expect(result).toEqual(0);
  });

  it("should throw error when invalid type for parameter calculateShippingCosts is given", () => {
    expect(() => {
      // @ts-expect-error:
      classAssignmentAvans.ShippingCosts("invalidType", "Ground", 1000)
    }).toThrow("Invalid parameter type")

  });
  it("should throw error when invalid type for parameter typeOfShippingCosts is given", () => {
    expect(() => {
      // @ts-expect-error:
      classAssignmentAvans.ShippingCosts(true, 123, 1000);
    }).toThrow("Invalid parameter type")

  });
  it("should throw error when invalid type for parameter totalPrice is given", () => {
    expect(() => {
      // @ts-expect-error:
      classAssignmentAvans.ShippingCosts(true, "Ground", "invalidType")
    }).toThrow("Invalid parameter type")

  });

});
