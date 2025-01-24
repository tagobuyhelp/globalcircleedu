export function parseJsonField<T>(value: string | null | undefined | T): T | null {
  if (!value) return null;
  if (typeof value !== 'string') return value as T;
  
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Error parsing JSON field:', error);
    return null;
  }
}