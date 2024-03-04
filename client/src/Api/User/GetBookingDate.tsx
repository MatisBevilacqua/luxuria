import { API_URL } from '../config';

async function getBookingDate(type: string, id: number) {
  try {
    const response = await fetch(`${API_URL}/reservations/${type}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des ${type}.`);
    }
    const bookingDate = await response.json();
    return bookingDate;
  } catch (error) {
    console.error(`Erreur lors de la récupération des ${type} :`, error);
    throw new Error(`Erreur lors de la récupération des ${type}.`);
  }
}

export default getBookingDate;
