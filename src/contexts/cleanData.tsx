const placeholderValues = ["string", "https://url.com/image.jpg"]

export const cleanDataContext = <T extends Record<string, any>>(data: T): T => {
  const cleanData = (value: any): any => {
    if (placeholderValues.includes(value)) return null;
    if (typeof value === "object" && value !== null) {
      return cleanDataContext(value);
    }
    return value;
  };

  const result: Record<string, any> = {};
  for (const key in data) {
    result[key] = cleanData(data[key]);
  }
  return result as T;
};
