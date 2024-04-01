import React, { useState, useEffect } from "react";
import addCar from '../../Api/Admin/AddCar';
import addYacht from "../../Api/Admin/AddYacht";
import VerifyToken from "../../Components/Security/VerfiyToken";
import HeaderDashbaord from "../../Components/Admin/HeaderDashbaord";
import getAll from "../../Api/User/GetAll";
import deleteItem from "../../Api/Admin/DeleteItem";

interface Offer {
  name: string;
  pricePerHour: number;
  description: string;
  images: string[];
  location: string;
  city: string;
}

interface Props { }

const Dashboard = (props: Props) => {

  VerifyToken();

  const [carOffer, setCarOffer] = useState<Offer>({
    name: "",
    pricePerHour: 0,
    description: "",
    images: [],
    location: "",
    city: "",
  });

  const [yachtOffer, setYachtOffer] = useState<Offer>({
    name: "",
    pricePerHour: 0,
    description: "",
    images: [],
    location: "",
    city: "",
  });

  const [message, setMessage] = useState<string>('');
  const [carImageLinks, setCarImageLinks] = useState<string>('');
  const [yachtImageLinks, setYachtImageLinks] = useState<string>('');
  const [responseCar, setResponseCar] = useState<any[]>([]);
  const [responseYacht, setResponseYacht] = useState<any[]>([]);

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

  const handleSubmitCar = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await addCar({ ...carOffer, images: carImageLinks.split(',') }, token);
        setMessage('Voiture ajoutée avec succès !');
        setCarOffer({ name: "", pricePerHour: 0, description: "", images: [], location: "", city: "" });
        setCarImageLinks('');
      }
    } catch (error) {
      setMessage("Erreur lors de l'ajout de la voiture");
      console.error('Erreur lors de la création de la voiture :', error);
    }
  };

  const handleSubmitYacht = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await addYacht({ ...yachtOffer, images: yachtImageLinks.split(',') }, token);
        setMessage('Yacht ajouté avec succès !');
        setYachtOffer({ name: "", pricePerHour: 0, description: "", images: [], location: "", city: "" });
        setYachtImageLinks('');
      }
    } catch (error) {
      setMessage("Erreur lors de l'ajout du yacht");
      console.error('Erreur lors de la création du yacht :', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, offerType: "car" | "yacht") => {
    const { name, value } = e.target;
    const parsedValue = name === 'pricePerHour' ? parseFloat(value) : value;
    if (offerType === "car") {
      setCarOffer({ ...carOffer, [name]: parsedValue });
    } else {
      setYachtOffer({ ...yachtOffer, [name]: parsedValue });
    }
  };

  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>, offerType: "car" | "yacht") => {
    const { value } = e.target;
    if (offerType === "car") {
      setCarImageLinks(value);
    } else {
      setYachtImageLinks(value);
    }
  };

  const removeCar = (id: string) => {
    const token = localStorage.getItem('token');

    if(token){
      const response = deleteItem('car', id, token);
    }
  }

  const removeYacht = (id: string) => {
    const token = localStorage.getItem('token');
    
    if(token){
      const response = deleteItem('yacht', id, token);
    }
  }

  return (
    <div className="w-full bg-[#e9ecef]">
      <HeaderDashbaord />
      <div className="pl-[12vw] pt-[5vh]">
        <h1 className="text-[50px] font-bold">Ajouter des locations</h1>
        <p className="text-[20px]">Ajoutez ici, voitures et yatch</p>
        {message !== '' &&
          <div className="w-[45%] h-[5vh] mt-[5vh] bg-[#2a9134] rounded-md flex items-center justify-center">
            <p className="text-white">{message}</p>
          </div>
        }
        <div className="flex gap-[50px]">
          <div className="w-[45%] mt-[5vh] p-[20px] h-[70vh] bg-[#FFF] rounded-md flex flex-col gap-[20px]">
            <p>Ajoutez des voitures, ici</p>
            <div className="flex space-x-4">
              <input
                className="w-[25vw] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
                type="text"
                placeholder="Nom de l'offre"
                name="name"
                value={carOffer.name}
                onChange={(e) => handleInputChange(e, "car")}
              />
              <input
                className="w-[25vw] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
                type="number"
                placeholder="Prix /h"
                name="pricePerHour"
                value={carOffer.pricePerHour.toString()}
                onChange={(e) => handleInputChange(e, "car")}
              />
            </div>
            <textarea
              className="w-[100%] h-[30vh] pl-[20px] pt-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              placeholder="Description"
              name="description"
              value={carOffer.description}
              onChange={(e) => handleInputChange(e, "car")}
            />


            <input
              className="w-[100%] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              type="text"
              placeholder="Adresse postal"
              name="location"
              value={carOffer.location}
              onChange={(e) => handleInputChange(e, "car")}
            />



            <input
              className="w-[100%] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              type="text"
              placeholder="Ville"
              name="city"
              value={carOffer.city}
              onChange={(e) => handleInputChange(e, "car")}
            />


            <input
              className="w-[100%] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              type="text"
              placeholder="Lien(s) d'image (séparés par des virgules)"
              value={carImageLinks}
              onChange={(e) => handleImageLinkChange(e, "car")}
            />

            <button className="bg-blue-500 hover:bg-blue-700 transition text-white h-[50px] font-bold py-2 px-4 rounded-lg" onClick={handleSubmitCar}>
              Créer une location (Voiture)
            </button>
          </div>

          <div className="w-[45%] mt-[5vh] p-[20px] h-[70vh] bg-[#FFF] rounded-md flex flex-col gap-[20px]">
            <p>Ajoutez des yatch, ici</p>
            <div className="flex space-x-4">
              <input
                className="w-[25vw] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
                type="text"
                placeholder="Nom de l'offre"
                name="name"
                value={yachtOffer.name}
                onChange={(e) => handleInputChange(e, "yacht")}
              />
              <input
                className="w-[25vw] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
                type="number"
                placeholder="Prix /h"
                name="pricePerHour"
                value={yachtOffer.pricePerHour.toString()}
                onChange={(e) => handleInputChange(e, "yacht")}
              />
            </div>
            <textarea
              className="w-[100%] h-[30vh] pl-[20px] pt-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              placeholder="Description"
              name="description"
              value={yachtOffer.description}
              onChange={(e) => handleInputChange(e, "yacht")}
            />

            <input
              className="w-[100%] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              type="text"
              placeholder="Location"
              name="Adresse postal"
              value={yachtOffer.location}
              onChange={(e) => handleInputChange(e, "yacht")}
            />

            <input
              className="w-[100%] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              type="text"
              placeholder="Ville"
              name="city"
              value={yachtOffer.city}
              onChange={(e) => handleInputChange(e, "yacht")}
            />


            <input
              className="w-[100%] h-[50px] pl-[20px] focus:outline-none rounded-lg bg-[#e9ecef]"
              type="text"
              placeholder="Lien(s) d'image (séparés par des virgules)"
              value={yachtImageLinks}
              onChange={(e) => handleImageLinkChange(e, "yacht")}
            />

            <button className="bg-blue-500 hover:bg-blue-700 transition text-white h-[50px] font-bold py-2 px-4 rounded-lg" onClick={handleSubmitYacht}>
              Créer une location (Yacht)
            </button>
          </div>
        </div>
        <div className="mt-[10vh]">
          <h1 className="text-[50px] font-bold">Vos offres</h1>
          <p className="text-[20px] mb-[10vh]">Suprimmer ici, voitures et yatch</p>

          {responseCar.length > 0 && (
            <div className="w-100% flex flex-col gap-[30px]">
              {responseCar.map((car, index) => (
                <div className="flex p-[20px] w-[90%] bg-white gap-[10px] gap-[20px] rounded-md" key={index}>
                  <h2>Voitures</h2>
                  <p>{car.name}</p>
                  <p>{car.description}</p>
                  <p>{car.location}</p>
                  <p>{car.pricePerHour} euros /h</p>
                  <button onClick={() => removeCar(car.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          )}

          {responseYacht.length > 0 && (
            <div className="w-100% flex flex-col gap-[30px] mt-[5vh]">
              {responseYacht.map((yacht, index) => (
                <div className="flex p-[20px] w-[90%] bg-white  gap-[20px] rounded-md" key={index}>
                  <h2>Yachts</h2>
                  <p>{yacht.name}</p>
                  <p>{yacht.description}</p>
                  <p>{yacht.location}</p>
                  <p>{yacht.pricePerHour} euros /h</p>
                  <button onClick={() => removeYacht(yacht.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
