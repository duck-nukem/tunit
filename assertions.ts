export function assertEquals(a: any, b: any): boolean {
  if (a !== b) {
    throw new Error(`expected ${typeof a} '${a}' to equal ${typeof b} '${b}'`);
  }

  return true;
}

export function assertTrue(value: any): boolean {
  return !!value === true;
}

export function fail(message?: string): void {
  throw new Error(message || '');
}