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

    useEffect(() => {
        const fetchDate = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const bookingCar: Reservation[] = await GetReservations('car', token);
                    const bookingYacht: Reservation[] = await GetReservations('yacht', token);
                    setCarReservations(bookingCar);
                    setYachtReservations(bookingYacht);
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error("Token not found in local storage");
            }
        };
        fetchDate();
    }, []);

    return (
        <div className='w-full h-[100vh] bg-[#e9ecef]'>
            <HeaderDashbaord />

            <div className="pl-[12vw] pt-[5vh]">
                <h1 className="text-[50px] font-bold">Vos réservations se trouvent ici</h1>
                <p className="text-[20px]">Yachts</p>
                <ul>
                    {yachtReservations.map((reservation, index) => (
                        <li key={index}>
                            <p>Nom: {reservation.ClientReservation.name}</p>
                            <p>Adresse: {reservation.ClientReservation.adress}</p>
                            <p>Téléphone: {reservation.ClientReservation.phone}</p>
                            <p>Email: {reservation.ClientReservation.email}</p>
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
