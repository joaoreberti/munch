export function removeNullValues<T>(obj: T): Partial<T> {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      result[key as keyof T] = value;
    }
  }
  return result;
}
