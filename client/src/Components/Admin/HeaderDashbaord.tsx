import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Logo';

export default function HeaderDashbaord() {
    return (
        <nav className="absolute flex flex-col p-[20px] items-center left-0 w-[10vw] h-full bg-[#FFF]">
            <Logo/>
            <ul className="mt-[20px] flex flex-col gap-[50px]">
                <Link to="/dashboard">
                    Voitures & Yacht
                </Link>

                <Link to="/dashboard/ticket">
                    Ticket
                </Link>


                <Link to="/dashboard/reservations">
                    Reservations
                </Link>
            </ul>
        </nav>
    )
}
