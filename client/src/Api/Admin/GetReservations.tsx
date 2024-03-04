import { API_URL } from '../config';

async function GetReservations(token: string, type: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${type}_reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupéaration des reservations');
    }

    const responseData = await response.json();
    console.log('Récupéaration des reservations avec succès.', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors de la recuperation des reservations :', error);
    throw new Error('Erreur lors de la recuperation des reservations.');
  }
}

export default GetReservations;

