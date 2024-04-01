import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import getById from '../../Api/User/GetById';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ModalBooking from '../../Components/ModalBooking';

export default function RentalDetail() {
    const navigate = useNavigate();
    const [rental, setRental] = useState<any>({});
    const [totalSlides, setTotalSlides] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const location = useLocation();
    const parts = location.pathname.split('/');
    const category = parts[1];
    const id = parseInt(parts[2], 10);

    useEffect(() => {
        const fetchDataById = async () => {
            try {
                const response = await getById(category, id);
                setRental(response);
                setTotalSlides(response.images.length);
            } catch (error) {
                navigate('/');
            }
        }
        fetchDataById();
    }, [category, id]);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Header />
            <section className='p-[20px] pt-[15vh] w-full flex flex-col gap-[30px]'>
                <div>
                    <h2 className='text-[40px] text-[#003566] font-bold'>{rental.name}</h2>
                    <p className='text-[20px] text-[#003566]'> Home / {category.charAt(0).toUpperCase() + category.slice(1)} / {rental.name}</p>
                </div>
                <div className='flex justify-between max-[768px]:flex-col max-[768px]:gap-[40px]'>
                    <div className='w-[50vw] max-[768px]:w-full'>
                        {rental.images && rental.images.length > 0 && (
                            <CarouselProvider
                                naturalSlideWidth={100}
                                naturalSlideHeight={60}
                                totalSlides={totalSlides}
                            >
                                <Slider className='rounded-md'>
                                    {rental.images.map((image: any, index: number) => (
                                        <Slide index={index} key={index}>
                                            <img src={image.url} className='w-full h-full' alt={`Image ${index}`} />
                                        </Slide>
                                    ))}
                                </Slider>
                            </CarouselProvider>
                        )}
                    </div>
                    <div className='w-[45vw] max-[768px]:w-full h-[55vh] bg-[#FFF] rounded-md p-[20px]'>
                        <div className='flex flex-col gap-[20px]'>
                            <div>
                                <h3 className='text-[40px] text-[#003566] font-bold'>{rental.pricePerHour}€ /h</h3>
                                <p>{rental.location}, {rental.city}</p>
                            </div>
                            <p>{rental.description}</p>
                            <button className='w-full h-[50px] bg-[#003566] rounded-md text-white font-bold' onClick={openModal}>Reserv now !</button>
                        </div>
                    </div>
                </div>
            </section>
            <ModalBooking isOpen={isModalOpen} onClose={closeModal} id={id} type={category} price={rental.pricePerHour} />
        </>
    )
}
