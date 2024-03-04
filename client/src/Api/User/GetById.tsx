import { API_URL } from '../config';

async function getById(endpoint: string, id: number) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des ${endpoint}.`);
    }

    const itemsData = await response.json();
    console.log(`${endpoint} récupérés avec succès !`, itemsData);
    return itemsData;
  } catch (error) {
    console.error(`Erreur lors de la récupération des ${endpoint} :`, error);
    throw new Error(`Erreur lors de la récupération des ${endpoint}.`);
  }
}

export default getById;
