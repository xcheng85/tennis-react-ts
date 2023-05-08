// not component
// mimic oauth process
export type User = {
  id: string;
  name: string;
};

// return roles array
export function authenticate(): Promise<User | undefined> {
  return new Promise((resolve) => setTimeout(() => resolve({ id: '0', name: 'Xiao Cheng' }), 1000));
}
