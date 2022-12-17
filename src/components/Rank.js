import React from 'react'

const Rank = ({onRouteChange, email, faceEntries}) => {
    return (
        <>
            <p className='mt-8 mb-4 text-xl'>{`${email}, your entry count is:`}</p>
            <div className='mb-6 flex items-center'>
                <p className='text-pred text-3xl'>{`${faceEntries}`}</p>
                <button className='ml-8 h-10 rounded-lg w-24 bg-pred hover:underline hover:decoration-2' onClick={() => onRouteChange('signin')}>Sign In</button>
            </div>
        </>
    )
}

export default Rank;