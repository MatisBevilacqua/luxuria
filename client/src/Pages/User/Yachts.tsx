import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import getAll from '../../Api/User/GetAll';
import Card from '../../Components/Card';
import { useNavigate } from 'react-router-dom';

export default function Cars() {
  const navigate = useNavigate();
  const [responseYacht, setResponseYacht] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseYachtData = await getAll('yachts') as any[];
        setResponseYacht(responseYachtData);
      } catch (err) {
        console.error('Error lors de la récupération', err);
      }
    };

    fetchData();
  }, []);

  const handleClickRental = (id: number) => {
    navigate(`/yacht/${id}`);
  };

  return (
    <>
      <Header />

      <div className='pt-[15vh] pl-[20px] pr-[20px]'>
        <h2 className='text-[40px] text-[#003566] font-bold'>Yacht</h2>
        <p className='text-[20px] text-[#003566]'> Home / Yacht</p>

        <div className='pb-[15vh] pt-[5vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {responseYacht.map((yacht) => (
            <Card
              key={yacht.id}
              title={yacht.name}
              img={yacht.images[0].url}
              description={yacht.description}
              price={yacht.pricePerHour}
              id={yacht.id}
              type='Yacht'
              city={yacht.city}
              onClick={() => handleClickRental(yacht.id)}
            />
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
}
