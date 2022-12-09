import React from 'react'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div className='flex flex-wrap text-xl'>
            <p className='mb-4 mr-4'>Image Link:</p>
            <div className='container flex flex-wrap gap-8'>
                <input className='text-purple-dark bg-pwhite h-10 px-2 rounded-lg' type='text' onChange={onInputChange}></input>
                <button className='w-28 rounded-lg h-10 link bg-pwhite text-pred hover:underline hover:decoration-2' onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;