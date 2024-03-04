import { API_URL } from '../config';

async function Booking(bookingData: any) {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la création de la réservation.');
      }
  
      const newReservation = await response.json();
      console.log('Réservation créée avec succès :', newReservation);
      return newReservation;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation :', error);
      throw new Error('Erreur lors de la création de la réservation.');
    }
}

export default Booking;
