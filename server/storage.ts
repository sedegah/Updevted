// Simple in-memory storage for user preferences
export const storage = {
  data: new Map<string, any>(),
  get: (key: string) => storage.data.get(key),
  set: (key: string, value: any) => storage.data.set(key, value),
  delete: (key: string) => storage.data.delete(key),
  clear: () => storage.data.clear()
};