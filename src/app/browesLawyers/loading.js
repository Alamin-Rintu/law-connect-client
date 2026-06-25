import React from 'react';
import { BounceLoader } from 'react-spinners';


const LoadingData = () => {
    return (
        <div className='flex justify-center items-center min-h-screen mx-auto'>
           <BounceLoader/> 
        </div>
    );
};

export default LoadingData;