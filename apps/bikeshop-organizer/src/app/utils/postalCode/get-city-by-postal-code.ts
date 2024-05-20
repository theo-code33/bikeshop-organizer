import codesPostaux from 'codes-postaux';

const getCityByPostalCode = async (postalCode: string): Promise<string[]> => {
  const cities = await codesPostaux.find(postalCode);
  if (cities.length === 0) {
    return [];
  }
  return cities.map(
    (city: {
      codeCommune: string;
      codePostal: string;
      nomCommune: string;
      libelleAcheminement: string;
    }) => city.nomCommune
  );
};

export default getCityByPostalCode;
