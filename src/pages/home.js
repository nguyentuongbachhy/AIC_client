import React from 'react'
import CardWrapper from '../components/cardWrapper'

const Home = () => {


    return (
        <div className='w-full h-full flex flex-col gap-5 pt-2'>
            {/* <div className='w-[32.5rem] md:w-[49rem] mx-auto'>
                <ColorBar setId={setId} />
            </div> */}
            <div className='w-full scrollbar-none overflow-y-scroll scroll-smooth'>
                <CardWrapper />
            </div>
        </div>
    )
}

export default Home