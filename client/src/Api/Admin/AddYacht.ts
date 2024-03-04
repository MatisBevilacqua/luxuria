import { API_URL } from '../config';

async function addYacht(yachtData: {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  city: string;
 }, token: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/yacht`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` 
      },
      body: JSON.stringify(yachtData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du yatch');
    }

    const responseData = await response.json();
    console.log('Voiture créée avec succès.', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors de la création du yatch :', error);
    throw new Error('Erreur lors de la création du yatch.');
  }
}

export default addYacht;
