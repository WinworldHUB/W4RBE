import { Packaging} from "../types/packagings"

const PACKAGING: Packaging[] = [];

export const getPackaging = (): Packaging[] => PACKAGING;

export const getPackagingById = (id: string): Packaging | undefined => {
  return PACKAGING.find((packaging) => packaging.id === id);
};

export const insertPackaging = (packaging: Packaging): Packaging => {
  PACKAGING.push(packaging);
  return packaging;
};

export const updatePackaging = (packaging: Packaging): Packaging | undefined => {
  const index = PACKAGING.findIndex((p) => p.id === packaging.id);

  if (index < 0) {
    return undefined;
  }

  PACKAGING[index] = packaging;

  return packaging;
};

export const deletePackaging = (id: string): Packaging | undefined => {
  const index = PACKAGING.findIndex((p) => p.id === id);

  if (index < 0) {
    return undefined;
  }

  return PACKAGING.splice(index, 1)[0];
};
