import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import getAll from '../../Api/User/GetAll';
import Card from '../../Components/Card';
import { useNavigate } from 'react-router-dom';

export default function Cars() {
  const navigate = useNavigate();
  const [responseCar, setResponseCar] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCarData = await getAll('cars') as any[];
        setResponseCar(responseCarData);
      } catch (err) {
        console.error('Error lors de la récupération', err);
      }
    };

    fetchData();
  }, []);

  const handleClickRental = (id: number) => {
    navigate(`/car/${id}`);
  };

  return (
    <>
      <Header />

      <div className='pt-[15vh] pl-[20px] pr-[20px]'>
        <h2 className='text-[40px] text-[#003566] font-bold'>Cars</h2>
        <p className='text-[20px] text-[#003566]'> Home / Cars</p>

        <div className='pb-[15vh] pt-[5vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center'>
          {responseCar.map((car) => (
            <Card
              key={car.id}
              title={car.name}
              img={car.images[0].url}
              description={car.description}
              price={car.pricePerHour}
              id={car.id}
              type='Car'
              city={car.city}
              onClick={() => handleClickRental(car.id)}
            />
          ))}
        </div>

      </div>
    </>
  );
}
