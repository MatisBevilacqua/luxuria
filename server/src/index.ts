import express, { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const paypal = require('@paypal/checkout-server-sdk');

const prisma = new PrismaClient();
const app = express();
const clientId = 'AelpGoErXY2BGwJVAJ7mXHLhCnnbdXBpqMfIodUw7K9vucuV9z8LXfEUJrPAhGIosSqjFT9ASeIHE3Re';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const verifyToken = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { token: token },
    });

    if (!user) {
      return { valid: false, message: 'Invalid token.' };
    }

    await jwt.verify(token, 'lXKq1dUWp7n6xBYfo5ZcT2G8Hm39vLtNJDYU6zvF8Oh3fhAtVw');
    return { valid: true, message: 'Valid token.' };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { valid: false, message: 'Error verifying token.' };
  }
};

const authenticateToken = async (req: Request, res: Response, next: any) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  const result = await verifyToken(authorizationHeader);

  if (!result.valid) {
    return res.status(401).json({ message: result.message });
  }

  next();
};

// Route pour gérer connection au dashboard
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error('Erreur lors de la comparaison des mots de passe :', err);
        return res.status(500).json({ message: 'Erreur lors de la connexion.' });
      }

      if (result) {
        const token = jwt.sign({ userId: user.id, role: 'admin' }, 'lXKq1dUWp7n6xBYfo5ZcT2G8Hm39vLtNJDYU6zvF8Oh3fhAtVw', { expiresIn: '1h' });
        const updateToken = async () => {
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { token: token },
          });
        }
        updateToken();

        return res.status(200).json({ message: 'Connexion réussie.', token: token });
      } else {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
});

// Route pour vérifier la validité du token
app.post('/verify_token', async (req, res) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  const result = await verifyToken(authorizationHeader);

  if (!result.valid) {
    return res.status(401).json({ message: result.message });
  }

  return res.status(200).json({ message: result.message });
});

// Route pour créer une nouvelle voiture
app.post('/car', authenticateToken, async (req, res) => {
  const { name, description, pricePerHour, images, location, city } = req.body;

  try {
    const newCar = await prisma.car.create({
      data: {
        name,
        description,
        pricePerHour,
        location,
        city
      },
    });

    const createdImages = await prisma.image.createMany({
      data: images.map((imageUrl: string) => ({
        url: imageUrl,
        carId: newCar.id
      })),
    });

    res.json({ car: newCar, images: createdImages });
  } catch (error) {
    console.error('Erreur lors de la création de la voiture :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la voiture.' });
  }
});

// Route pour crée un nouveau yacht
app.post('/yacht', authenticateToken, async (req, res) => {
  const { name, description, pricePerHour, images, location, city } = req.body;
  try {
    const newYacht = await prisma.yacht.create({
      data: {
        name,
        description,
        pricePerHour,
        location,
        city
      }
    });

    const createdImages = await prisma.image.createMany({
      data: images.map((imageUrl: string) => ({
        url: imageUrl,
        yachtId: newYacht.id
      })),
    });

    res.json({ yacht: newYacht, images: createdImages });
  } catch (error) {
    console.error('Erreur lors de la création du yacht:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la voiture' });
  }
})

// Route pour récupérer une voiture avec l'id
app.get('/car/:id', async (req, res) => {
  const carId = parseInt(req.params.id);

  try {
    const car = await prisma.car.findUnique({
      where: { id: carId },
      include: { images: true },
    });

    if (!car) {
      return res.status(404).json({ message: 'Voiture non trouvée.' });
    }

    res.json(car);
  } catch (error) {
    console.error('Erreur lors de la récupération de la voiture :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la voiture.' });
  }
});


// Route pour récuérer un yacht avec l'id
app.get('/yacht/:id', async (req, res) => {
  const yachtId = parseInt(req.params.id);

  try {
    const yacht = await prisma.yacht.findUnique({
      where: { id: yachtId },
      include: { images: true },
    });

    if (!yacht) {
      return res.status(404).json({ message: 'Yacht non trouvé' });
    }
    res.json(yacht);
  } catch (error) {
    console.error('Erreur lors de la récupération du yacht :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du yacht' });
  }
});

// Route pour récupérer toutes les voitures
app.get('/cars', async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      include: {
        images: true
      }
    });
    res.json(cars);
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des voitures.' });
  }
});

// Route pour récupérer tous les yachts
app.get('/yachts', async (req, res) => {
  try {
    const yachts = await prisma.yacht.findMany({
      include: {
        images: true
      }
    });
    res.json(yachts);
  } catch (error) {
    console.error('Erreur lors de la récupération des yachts :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des yachts.' });
  }
});

// Route pour réserver
app.post('/reservations', async (req, res) => {
  const { startTime, endTime, reservationDate, carId, yachtId, name, phone, adress, email, total } = req.body;

  try {
    const newClientReservation = await prisma.clientReservation.create({
      data: {
        name,
        phone,
        adress,
        email
      },
    });

    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    paypalRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: total.toString()
        }
      }]
    });

    const paypalResponse = await client.execute(paypalRequest);
    const paypalOrderId = paypalResponse.result.id;

    const newReservation = await prisma.reservation.create({
      data: {
        startTime,
        endTime,
        reservationDate,
        carId,
        yachtId,
        total,
        clientReservationId: newClientReservation.id,
      },
      include: {
        ClientReservation: true,
      },
    });

    const approvalLink = paypalResponse.result.links.find((link: any) => link.rel === 'approve');
    const paypalApprovalUrl = approvalLink ? approvalLink.href : '';
    res.json({ reservationId: newReservation.id, paypalApprovalUrl });

  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Error creating reservation.' });
  }
});

// Route pour récupérer une réservation par ID et type (car ou yacht)
app.get('/reservations/:type/:id', async (req, res) => {
  const { id, type } = req.params;

  try {
    let reservations;

    if (type === 'car') {
      reservations = await prisma.reservation.findMany({
        where: {
          carId: parseInt(id)
        },
        include: {
          ClientReservation: true
        }
      });
    } else if (type === 'yacht') {
      reservations = await prisma.reservation.findMany({
        where: {
          yachtId: parseInt(id)
        },
        include: {
          ClientReservation: true
        }
      });
    } else {
      return res.status(400).json({ message: 'Invalid type. Type must be either "car" or "yacht".' });
    }

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for the specified type and ID.' });
    }

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations.' });
  }
});

app.get('/car_reservations', authenticateToken, async (req, res) => {
  try {
    const carReservations = await prisma.reservation.findMany({
      where: {
        carId: { not: null }
      },
      select: {
        startTime: true,
        endTime: true,
        reservationDate: true,
        total: true,
        ClientReservation: {
          select: {
            name: true,
            adress: true,
            phone: true,
            email: true
          }
        }
      }
    });
    res.json(carReservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations de voiture :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations de voiture.' });
  }
});

app.get('/yacht_reservations', authenticateToken, async (req, res) => {
  try {
    const yachtReservations = await prisma.reservation.findMany({
      where: {
        yachtId: { not: null }
      },
      select: {
        startTime: true,
        endTime: true,
        reservationDate: true,
        total: true,
        ClientReservation: {
          select: {
            name: true,
            adress: true,
            phone: true,
            email: true
          }
        }
      }
    });
    res.json(yachtReservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations de yacht :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations de yacht.' });
  }
});


app.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const newContact = await prisma.contact.create({
      data: {
        name,
        phone,
        email,
        message
      }
    });
    res.status(201).json({ message: 'Contact créé avec succès', contact: newContact });
  } catch (error) {
    console.error('Erreur lors de la création du contact :', error);
    res.status(500).json({ message: 'Erreur lors du traitement de la requête' });
  }
});


// Route pour supprimer une voiture
app.delete('/car/:id', authenticateToken, async (req, res) => {
  const carId = parseInt(req.params.id);

  try {
    const deletedCar = await prisma.car.delete({
      where: {
        id: carId,
      },
    });

    await prisma.image.deleteMany({
      where: {
        carId: carId,
      },
    });

    res.json({ message: 'Voiture supprimée avec succès', car: deletedCar });
  } catch (error) {
    console.error('Erreur lors de la suppression de la voiture :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la voiture.' });
  }
});

// Route pour supprimer un yacht
app.delete('/yacht/:id', authenticateToken, async (req, res) => {
  const yachtId = parseInt(req.params.id);

  try {
    const deletedYacht = await prisma.yacht.delete({
      where: {
        id: yachtId,
      },
    });

    await prisma.image.deleteMany({
      where: {
        yachtId: yachtId,
      },
    });

    res.json({ message: 'Yacht supprimé avec succès', yacht: deletedYacht });
  } catch (error) {
    console.error('Erreur lors de la suppression du yacht :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du yacht.' });
  }
});


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);
