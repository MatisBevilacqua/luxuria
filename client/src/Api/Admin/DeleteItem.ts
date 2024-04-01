import { API_URL } from '../config';

async function deleteItem(type: 'car' | 'yacht', itemId: string, token: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${type}/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}` 
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du ${type}.`);
    }

    const responseData = await response.json();
    console.log(`${type} supprimé avec succès.`, responseData);
    return responseData;
  } catch (error) {
    console.error(`Erreur lors de la suppression du ${type} :`, error);
    throw new Error(`Erreur lors de la suppression du ${type}.`);
  }
}

export default deleteItem;
