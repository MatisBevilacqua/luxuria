import React, { useState } from 'react';

interface CardProps {
  title: string;
  price: number;
  description: string;
  type: string;
  img: string;
  id: number;
  city: string;
  onClick: (id: number) => void;
}

export default function Card({ title, price, description, type, img, id, city, onClick }: CardProps) {

  const handleClick = () => {
    onClick(id);
  };

  const firstPeriodIndex = description.indexOf('.');

  const shortDescription = firstPeriodIndex !== -1 ? description.substring(0, firstPeriodIndex + 1) : description;


  return (
    <article className="w-[20vw] min-w-[250px] flex-none  rounded overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer" onClick={handleClick}>
      <img className="w-full" src={img} alt="Image rental" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {shortDescription}
        </p>
      </div>
      <div className="px-6 pb-2 flex gap-[10px]">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{price}€ /h</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{type}</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{city}</span>
      </div>
    </article>
  );
}
