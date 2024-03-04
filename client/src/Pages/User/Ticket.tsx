import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

export default function Ticket() {
    return (
        <>
            <Header/>
            <div className='pt-[15vh] pb-[15vh] pl-[20px] pr-[20px]'>
                <h2 className='text-[40px] text-[#003566] font-bold'>Tickets</h2>
                <p className='text-[20px] text-[#003566]'> Home / Tickets</p>
                <p className='text-center text-[30px] text-[#003566]'>Coming soon !</p>
            </div>
            <Footer/>
        </>
    )
}
