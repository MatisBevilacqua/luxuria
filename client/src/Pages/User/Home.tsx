import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header'
import getAll from '../../Api/User/GetAll';
import Card from '../../Components/Card';
import Footer from '../../Components/Footer';
import { ImagesSlider } from '../../Components/ui/images-slider';
import { motion } from "framer-motion";
import { TextGenerateEffect } from '../../Components/ui/text-generate-effect';
import Contact from '../../Api/User/Contact';
import Logo from '../../Components/Logo';


export default function Home() {

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');;
    const [responseCar, setResponseCar] = useState<any[]>([]);
    const [responseYacht, setResponseYacht] = useState<any[]>([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [contactData, setContactData] = useState({ name: '', phone: '', email: '', message: '' });


    const handleContactChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setContactData({ ...contactData, [name]: value });
    };

    const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await Contact(contactData);
            setContactData({ name: '', phone: '', email: '', message: '' });
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire de contact', error);
        }
    };

    const images = [
        "https://s1.1zoom.me/b5050/392/Monte_Carlo_Monaco_Sea_511220_1920x1080.jpg"
    ];

    const initialData = [
        { question: "Why choose Luxuria Trips for yacht and luxury car rental?", response: "  Luxuria Trips stands out for its holistic approach and expertise in the luxury sector. Our dedicated team is committed to providing you with an unforgettable experience by combining luxury yacht rental with a selection of prestigious cars. Whether you are looking for a romantic getaway or a family vacation, we have the perfect solution for you. " },
        { question: " What are the advantages of renting a yacht and a luxury car with Luxuria Trips?", response: " By choosing Luxuria Trips, you benefit from a multitude of advantages: Tailor-made service: Our team adapts to your needs and desires to create a personalized itinerary.Wide choice of vehicles: We offer you a selection of luxury yachts and prestigious cars from the most renowned brands.Irreproachable comfort and quality: Enjoy high-end service and exceptional attention to detail. Save time and money: We take care of everything, from planning your trip to managing the crew and renting the car." },
        { question: "What types of yachts and luxury cars do you offer?", response: " Luxuria Trips offers a wide range of luxury yachts and prestigious cars to meet all your needs and desires.Yachts: From catamarans to superyachts, with different types of fittings and equipment. Cars: From luxury sedans to SUVs and convertibles, from the most prestigious brands." },
        { question: "How can I book a yacht and a luxury car with Luxuria Trips?", response: " Book your yacht and luxury car in a few clicks on our website or contact our team of experts by email.We are at your disposal to help you choose the ideal vehicles and to answer all your questions.In summary, Luxuria Trips is the ideal partner for an ultimate luxury experience. Our expertise, tailor-made service and wide choice of yachts and luxury cars guarantee you an unforgettable trip.." }
    ];


    const toggleMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleClickRental = (id: number, type: string) => {
        switch (type) {
            case 'car':
                navigate(`/car/${id}`);
                break;
            case 'yacht':
                navigate(`/yacht/${id}`);
                break;
            default:
                console.log(`Type de location inconnu : ${type}`);
                break;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCarData = await getAll('cars') as any[];
                const responseYachtData = await getAll('yachts') as any[];
                setResponseCar(responseCarData);
                setResponseYacht(responseYachtData);
            } catch (err) {
                console.error('Error lors de la récupération', err);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <Header />
            <ImagesSlider className="h-[100vh] pt-[10vh]" images={images}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -80,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="z-50 flex flex-col items-center"
                >
                    <TextGenerateEffect words="A desire for freedom ?" containerClassName="text-[#FFFF] text-2xl leading-snug tracking-wide text-[80px] text-center max-[500px]:text-[30px] max-[992px]:text-[40px]" />
                    <TextGenerateEffect words="Thanks to LuxuriaTrip, your dream rental is just phone call away !" containerClassName=" text-center text-2xl leading-snug tracking-wide font-[400] text-[30px] max-[500px]:text-[18px] max-[992px]:text-[25px]" />
                </motion.div>
            </ImagesSlider>

            <section className="pl-[20px] pt-[30px] mt-[50px] bg-[#e9ecef]">
                <h2 className='text-[40px] text-[#003566] font-bold max-[768px]:text-[30px]'>Our rental cars</h2>
                <p className='text-[20px] text-[#003566]'>Reserve yours now !</p>
                <div className='overflow-x-auto flex gap-[50px] pt-[30px] pb-[20px]'>
                    {responseCar.map((car) => (
                        <Card
                            title={car.name}
                            img={car.images.length > 0 ? car.images[0].url : ''}
                            description={car.description}
                            price={car.pricePerHour}
                            id={car.id}
                            type='Car'
                            city={car.city}
                            onClick={() => handleClickRental(car.id, 'car')}
                        />
                    ))}

                </div>
            </section>

            <section className='pl-[20px] pr-[20px] mt-[50px] pt-[30px] flex flex-col bg-[#e9ecef]'>
                <h2 className='text-[40px] text-[#003566] font-bold text-right max-[768px]:text-[30px]'>Our yachts available for charter</h2>
                <p className='text-[20px] text-[#003566] text-right'>Reserve yours now !</p>
                <div className='overflow-x-auto flex gap-[20px] pt-[30px] pb-[20px] self-end'>
                    {responseYacht.map((yacht) => (
                        <Card
                            title={yacht.name}
                            img={yacht.images.length > 0 ? yacht.images[0].url : ''}
                            description={yacht.description}
                            price={yacht.pricePerHour}
                            type='Yacht'
                            id={yacht.id}
                            city={yacht.city}
                            onClick={() => handleClickRental(yacht.id, 'yacht')}
                        />
                    ))}
                </div>
            </section>

            <div className="w-full h-[40vh] mt-[50px] flex flex-col items-center justify-center bg-[url('../../../public/img/monaco.jpeg')] bg-center bg-cover bg-fixed">
                <p className='text-[30px] font-bold text-white italic text-center max-[768px]:text-[30px]'>"To rent is to temporarily adopt another life"</p>
            </div>

            <section className='w-full flex items-center pl-[20px] pr-[20px] justify-center pt-[50px] pb-[50px] flex'>
                <div className="mt-[20px]  w-[100%] flex flex-col min-[992px]:w-[50%]">
                    <h2 className='text-[40px] text-[#003566] font-bold text-center max-[768px]:text-[30px] '>Why choose luxuria trip ?</h2>
                    <p className='text-center mb-[40px] text-[20px] text-[#003566]'>Frequently asked question</p>
                    {initialData.map((item, index) => (
                        <div key={index} className="mt-4 w-full">
                            <div className="relative text-left flex items-center justify-center flex-col">
                                <button
                                    type="button"
                                    className="w-[90%] p-[10px] rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-200"
                                    aria-expanded={openIndex === index ? 'true' : 'false'}
                                    aria-haspopup="true"
                                    onClick={() => toggleMenu(index)}
                                >
                                    {item.question}
                                </button>
                                {openIndex === index && (
                                    <div
                                        className="origin-top-left left-0 mt-2 w-[90%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="py-1" role="none">
                                            <p className="px-4 py-2 text-sm text-gray-700">{item.response}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-[50%] h-[80vh]  bg-[url('../../../public/img/why.jpeg')] bg-center bg-cover rounded-md hidden min-[992px]:block">

                </div>
            </section>

            <div className='mt-[10vh] pt-[10vh] pb-[10vh] bg-white'>
                <h2 className='text-[40px] text-[#003566] font-bold text-center max-[768px]:text-[30px] '>Contact us</h2>
                <p className='text-center mb-[40px] text-[20px] text-[#003566]'>Fill in this form to contact us</p>
                <form onSubmit={handleSubmitContact} className="w-[50vw] min-w-[400px] mx-auto pr-[30px] pl-[30px]">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={contactData.name}
                            onChange={handleContactChange}
                            placeholder="Your Name"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={contactData.phone}
                            onChange={handleContactChange}
                            placeholder="Your Phone Number"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={contactData.email}
                            onChange={handleContactChange}
                            placeholder="Your Email Address"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                        <textarea
                            name="message"
                            value={contactData.message}
                            onChange={handleContactChange}
                            placeholder="Your Message"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                        />
                    </div>
                    <div className="flex items-center w-full justify-between">
                        <button
                            type="submit"
                            className="bg-[#003566]  w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
