import React, {useState} from 'react'

export const GalleryFilter = () => {
    const [activeFilter, updateActiveFilter] = useState('All')
  return (
    <div className="galleryFilter flex flex-r flex-wrap gap--s">
        <div 
            className={`filter ${activeFilter == 'All' ? 'active' : ''}`} 
            onClick={(e) => updateActiveFilter('All')}>All
        </div>
        <div 
            className={`filter ${activeFilter == 'Fin-fish' ? 'active' : ''}`} 
            onClick={(e) => updateActiveFilter('Fin-fish')}>Fin-fish
        </div>
    </div>
  )
}
