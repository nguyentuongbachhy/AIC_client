import React from 'react';
import { InputTags } from '../components';

const ObjectDetection = () => {

    return (
        <div className='w-full h-full flex flex-col'>
            <div>
                <InputTags />
            </div>
            <div>
                Results
                <div className='group relative w-[16rem]'>
                    <img src='https://res.cloudinary.com/djdf9degt/image/upload/v1725323774/aichallenge/kdk5ostfmxdssewltw2k.jpg' alt='test' />
                    <div className='w-full absolute top-0 left-0 items-center justify-between hidden group-hover:flex'>
                        <button className='p-2 border border-white bg-black opacity-50 rounded-md text-white animate-popOut'>Button 1</button>
                        <button className='p-2 border border-white bg-black opacity-50 rounded-md text-white animate-popOut'>Button 2</button>
                        <button className='p-2 border border-white bg-black opacity-50 rounded-md text-white animate-popOut'>Button 3</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObjectDetection