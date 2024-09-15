import React, { useState } from 'react'
import CardWrapper from '../components/cardWrapper'

const Home = () => {

    const [id, setId] = useState(null)

    return (
        <div className='w-full h-full flex flex-col gap-5 pt-2'>
            {/* <div className='w-[32.5rem] md:w-[49rem] mx-auto'>
                <ColorBar setId={setId} />
            </div> */}
            <div className='w-full overflow-y-scroll'>
                <CardWrapper id={id} />
            </div>
        </div>
    )
}

export default Home