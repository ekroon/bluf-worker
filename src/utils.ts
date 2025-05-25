export async function parseJSON<T>(request: Request): Promise<T> {
  try {
    return await request.json();
  } catch {
    throw new Error('Invalid JSON');
  }
}
