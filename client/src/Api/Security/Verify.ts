import { API_URL } from '../config';

async function Verify(token: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/verify_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({ token }), 
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la vérification du token.');
    }

    const responseData = await response.json();
    console.log('Token vérifié avec succès.', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error);
    throw new Error('Erreur lors de la vérification du token.');
  }
}

export default Verify;

