import Image from 'next/image'
import React from 'react'

const Gallery = ({productMedia} : {productMedia: string[] }) => {
  return (
    <div className='flex flex-col gap-3'>
        <Image src={productMedia[0]} width={500} height={500} alt='product'/>
     
    </div>
  )
}

export default Gallery
