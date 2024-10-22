export function addStorage(name: string, data: any) {
  return localStorage.setItem(name, data);
}

export function getStorage(name: string) {
  return localStorage.getItem(name);
}

export function removeStorage(name: string) {
  localStorage.removeItem(name);
  return "remove storage";
}
