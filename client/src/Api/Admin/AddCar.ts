import { API_URL } from '../config';

async function addCar(carData: {
  name: string;
  description: string;
  pricePerHour: number;
  images: string[];     
  location: string;
  city: string;
}, token: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/car`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` 
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la voiture.');
    }

    const responseData = await response.json();
    console.log('Voiture créée avec succès.', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors de la création de la voiture :', error);
    throw new Error('Erreur lors de la création de la voiture.');
  }
}

export default addCar;
