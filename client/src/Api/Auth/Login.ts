import { API_URL } from '../config';

async function Login(loginData: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion.');
    }

    const responseData = await response.json();
    console.log('Connecté avec succès !', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw new Error('Erreur lors de la connexion.');
  }
}

export default Login;

