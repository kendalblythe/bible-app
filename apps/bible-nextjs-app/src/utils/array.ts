export const popStack = <T>(stack: T[]): T[] => {
  const updatedStack = [...stack];
  updatedStack.pop();
  return updatedStack;
};
