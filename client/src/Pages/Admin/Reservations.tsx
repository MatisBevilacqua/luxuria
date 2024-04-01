import React, { useState, useEffect } from 'react';
import HeaderDashbaord from '../../Components/Admin/HeaderDashbaord';
import GetReservations from '../../Api/Admin/GetReservations';

interface Reservation {
    startTime: string;
    endTime: string;
    reservationDate: string;
    total: string;
    ClientReservation: {
        name: string;
        adress: string;
        phone: string;
        email: string;
    };
}

export default function Reservations() {
    const [carReservations, setCarReservations] = useState<Reservation[]>([]);
    const [yachtReservations, setYachtReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');

            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const bookingCar: Reservation[] = await GetReservations(token, 'car');
                    const bookingYacht: Reservation[] = await GetReservations(token, 'yacht');

                    // Trier les réservations par date de réservation la plus récente
                    bookingCar.sort((a, b) => new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime());
                    bookingYacht.sort((a, b) => new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime());

                    setCarReservations(bookingCar);
                    setYachtReservations(bookingYacht);
                } catch (err) {
                    setError('Une erreur s\'est produite lors de la récupération des données.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Token non trouvé dans le stockage local');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-full h-[100vh] bg-[#e9ecef]'>
            <HeaderDashbaord />

            <div className="pl-[12vw] pt-[5vh]">
                <h1 className="text-[50px] font-bold">Vos réservations se trouvent ici</h1>
                {loading && <p>Chargement en cours...</p>}
                {error && <p>Erreur: {error}</p>}
                {!loading && !error && (
                    <>
                        <p className="text-[20px]">Yachts</p>
                        <ul>
                            {yachtReservations.map((reservation, index) => (
                                <li key={index}>
                                    <p>Nom: {reservation.ClientReservation.name}</p>
                                    <p>Adresse: {reservation.ClientReservation.adress}</p>
                                    <p>Téléphone: {reservation.ClientReservation.phone}</p>
                                    <p>Email: {reservation.ClientReservation.email}</p>
                                    <p>Heure de début: {reservation.startTime}</p>
                                    <p>Heure de fin: {reservation.endTime}</p>
                                    <p>Date de réservation: {reservation.reservationDate}</p>
                                    <p>Prix total: {reservation.total}</p>
                                </li>
                            ))}
                        </ul>
                        <p className="text-[20px]">Voitures</p>
                        <ul>
                            {carReservations.map((reservation, index) => (
                                <li key={index}>
                                    <p>Nom: {reservation.ClientReservation.name}</p>
                                    <p>Adresse: {reservation.ClientReservation.adress}</p>
                                    <p>Téléphone: {reservation.ClientReservation.phone}</p>
                                    <p>Email: {reservation.ClientReservation.email}</p>
                                    <p>Heure de début: {reservation.startTime}</p>
                                    <p>Heure de fin: {reservation.endTime}</p>
                                    <p>Date de réservation: {reservation.reservationDate}</p>
                                    <p>Prix total: {reservation.total}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
