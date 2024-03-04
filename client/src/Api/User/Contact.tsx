import { API_URL } from '../config';

async function Contact(contactData: any) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de lenvoie du formulaire de contact.');
      }
  
      const newContact = await response.json();
      console.log('Contact avec succès', newContact);
      return newContact;
    } catch (error) {
      console.error('Erreur lors de lenvoie du formulaire de contact', error);
      throw new Error('Erreur lors de lenvoie du formulaire de contact');
    }
}

export default Contact;
