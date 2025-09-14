import getDate from "./getFormatDate";

describe("getDate function", () => {
  test("should format a valid date string correctly", () => {
    const input = "2023-12-25T15:30:45.123Z";
    const expected = "2023-12-25 15:30:45";
    expect(getDate(input)).toBe(expected);
  });

  test("should return empty string for empty input", () => {
    expect(getDate("")).toBe("");
  });

  test("should return empty string for null or undefined", () => {
    expect(getDate(null as unknown as string)).toBe("");
    expect(getDate(undefined as unknown as string)).toBe("");
  });

  test("should handle different date formats", () => {
    expect(getDate("2023-01-01T00:00:00.000Z")).toBe("2023-01-01 00:00:00");

    expect(getDate("2023-06-15T23:59:59+02:00")).toBe("2023-06-15 21:59:59");
  });

  test("should handle edge cases correctly", () => {
    expect(getDate("2023-12-31T23:59:59.000Z")).toBe("2023-12-31 23:59:59");

    expect(getDate("2023-01-01T00:00:00.000Z")).toBe("2023-01-01 00:00:00");
  });

  test("should handle invalid date strings", () => {
    const invalidDate = getDate("invalid-date-string");

    expect(typeof invalidDate).toBe("string");
  });
});
