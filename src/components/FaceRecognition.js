import React from 'react'

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div>
          <div className='absolute mt-8'>
            <img id='input-image' alt='' src={imageUrl} width='500px' height='auto'/>

            <div>{
              Object.keys(box).map((face, index) => 
                <div key={index} className='absolute flex flex-wrap justify-center cursor-pointer shadow-face' 
                    style={{top: box[face].topRow, 
                        right: box[face].rightCol, 
                        bottom: box[face].bottomRow, 
                        left: box[face].leftCol}}>
                </div>)
            }</div> 
          </div>
        </div>
    )
}

export default FaceRecognition;