import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Booking from '../Api/User/Booking';
import getBookingDate from '../Api/User/GetBookingDate';

interface ModalProps {
    isOpen: boolean;
    type: string;
    id: number;
    price: number;
    onClose: () => void;
}

const ModalBooking = ({ isOpen, onClose, type, id, price }: ModalProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const [showTimeSlots, setShowTimeSlots] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [isEnglish, setIsEnglish] = useState<boolean>(true);
    const [formData, setFormData] = useState<any>({
        name: '',
        firstName: '',
        address: '',
        phoneNumber: ''
    });
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedSlotsCount, setSelectedSlotsCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            setShowTimeSlots(false);
            setShowForm(false);
        } else {
            setSelectedTimeSlots([]);
            setSelectedSlotsCount(0); // Réinitialiser le nombre de créneaux sélectionnés lorsque la modal est fermée
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedDate) {
            getBookedSlots(type, id, selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        const totalPrice = selectedTimeSlots.length * price;
        setTotalPrice(totalPrice);
    }, [selectedTimeSlots, price]);

    const getBookedSlots = async (type: string, id: number, date: Date) => {
        try {
            const bookingData = await getBookingDate(type, id);

            const filteredBookings = bookingData.filter((booking: any) => {
                const reservationDate = new Date(booking.reservationDate);
                return (
                    reservationDate.getFullYear() === date.getFullYear() &&
                    reservationDate.getMonth() === date.getMonth() &&
                    reservationDate.getDate() === date.getDate()
                );
            });

            const bookedHours: number[] = [];
            filteredBookings.forEach((booking: any) => {
                const startHour = new Date(booking.startTime).getHours();
                const endHour = new Date(booking.endTime).getHours();
                for (let hour = startHour; hour <= endHour; hour++) {
                    bookedHours.push(hour);
                }
            });

            const allHours = [...Array(18).keys()].map(hour => (hour + 10) % 24);

            const availableHours = allHours.filter(hour => !bookedHours.includes(hour));

            const availableSlots = availableHours.map(hour => `${hour < 10 ? '0' : ''}${hour}:00`);

            setAvailableSlots(availableSlots);
        } catch (error) {
            console.error('Erreur lors de la récupération des créneaux réservés :', error);

            const allHours = [...Array(18).keys()].map(hour => (hour + 10) % 24);
            const availableSlots = allHours.map(hour => `${hour < 10 ? '0' : ''}${hour}:00`);
            setAvailableSlots(availableSlots);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setShowTimeSlots(true);
    };

    const toggleTimeSlot = (hour: string) => {
        const updatedTimeSlots = selectedTimeSlots.includes(hour)
            ? selectedTimeSlots.filter(slot => slot !== hour)
            : [...selectedTimeSlots, hour];
        setSelectedTimeSlots(updatedTimeSlots);
        setSelectedSlotsCount(updatedTimeSlots.length); 
    };

    const handleNext = () => {
        setShowForm(true);
    };

    const handleBack = () => {
        setShowForm(false);
        setShowTimeSlots(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const isoStartTime = selectedTimeSlots[0] ? new Date(selectedDate.setHours(parseInt(selectedTimeSlots[0]))).toISOString() : null;
            const isoEndTime = selectedTimeSlots[selectedTimeSlots.length - 1] ? new Date(selectedDate.setHours(parseInt(selectedTimeSlots[selectedTimeSlots.length - 1]))).toISOString() : null;

            const bookingData = {
                startTime: isoStartTime,
                endTime: isoEndTime,
                reservationDate: selectedDate?.toISOString(),
                carId: type === 'car' ? id : null,
                yachtId: type === 'yacht' ? id : null,
                name: formData.name,
                email: formData.email,
                firstName: formData.firstName,
                adress: formData.address,
                phone: formData.phoneNumber,
                total: totalPrice.toString()
            };
            
            const newReservation = await Booking(bookingData);
            window.location.href = newReservation.paypalApprovalUrl;
            onClose();
        } catch (error) {
            console.error('Erreur lors de la création de la réservation :', error);
        }
    };

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-4xl w-full">
                <div className="bg-gray-100 p-4 h-full">
                    <h2 className="text-[40px] text-[#003566] font-bold">{showForm ? (isEnglish ? 'Enter your information' : 'Entrez vos informations') : (isEnglish ? 'Choose a date and hours' : 'Choisir une date et une heure')}</h2>
                    <p className='text-[20px] text-[#003566] mb-[5vh]'>{showForm ? (isEnglish ? 'Please enter your information below.' : 'Veuillez entrer vos informations ci-dessous.') : (isEnglish ? 'You will receive a confirmation e-mail after payment.' : 'Vous recevrez un e-mail de confirmation après le paiement.')}</p>
                    {!showForm && (
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            inline
                            className="w-full"
                        />
                    )}
                    {showTimeSlots && !showForm && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {availableSlots.map(hour => {
                                const isSelected = selectedTimeSlots.includes(hour);
                                return (
                                    <button
                                        key={hour}
                                        className={`p-2 border border-gray-300 rounded ${isSelected ? 'bg-blue-200' : ''}`}
                                        onClick={() => toggleTimeSlot(hour)}
                                    >
                                        {hour}
                                    </button>
                                );
                            })}
                            <div className="w-full flex justify-end">
                                <button
                                    className="p-2 border border-gray-300 rounded"
                                    onClick={handleNext}
                                >
                                    {isEnglish ? 'Next' : 'Suivant'}
                                </button>
                            </div>
                        </div>
                    )}
                    {showForm && (
                        <div className="mt-4 flex flex-col gap-[20px]">
                            <input type="text" name="name" placeholder={isEnglish ? 'Name' : 'Nom'} className="block w-full border border-gray-300 rounded px-3 py-2 mb-2" onChange={handleChange} />
                            <input type="text" name="firstName" placeholder={isEnglish ? 'First Name' : 'Prénom'} className="block w-full border border-gray-300 rounded px-3 py-2 mb-2" onChange={handleChange} />
                            <input type="text" name="address" placeholder={isEnglish ? 'Address' : 'Adresse'} className="block w-full border border-gray-300 rounded px-3 py-2 mb-2" onChange={handleChange} />
                            <input type="text" name="phoneNumber" placeholder={isEnglish ? 'Phone Number' : 'Numéro de téléphone'} className="block w-full border border-gray-300 rounded px-3 py-2 mb-2" onChange={handleChange} />
                            <input type="email" name="email" placeholder={isEnglish ? 'Email' : 'Adresse email'} className="block w-full border border-gray-300 rounded px-3 py-2 mb-2" onChange={handleChange} />
                            <div className="flex justify-between">
                                <button
                                    className="p-2 border border-gray-300 rounded"
                                    onClick={handleBack}
                                >
                                    {isEnglish ? 'Back' : 'Retour'}
                                </button>
                                <button
                                    className="p-2 border border-gray-300 rounded"
                                    onClick={handleSubmit}
                                >
                                    {isEnglish ? 'Submit' : 'Soumettre'}
                                </button>
                            </div>
                        </div>
                    )}
                    <p>{selectedSlotsCount} {isEnglish ? 'slot(s) selected' : 'créneau(x) sélectionné(s)'}</p>
                    {selectedTimeSlots.length > 0 && (
                        <div className='flex'>
                            <p className='mr-[1vw]'>{isEnglish ? 'Selected slots:' : 'Créneaux sélectionnés:'}</p>
                            <ul className='flex gap-[10px]'>
                                {selectedTimeSlots.map(slot => (
                                    <li key={slot}>{slot}</li>
                                ))}
                            </ul>
                            <p className='absolute right-0 mr-[1.5vw]'>{isEnglish ? 'Total Price:' : 'Prix total:'}{totalPrice}€</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalBooking;
