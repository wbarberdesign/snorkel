import React, {useState} from 'react'

export const GalleryFilter = ({activeFilter, setActiveFilter}) => {
  return (
    <div className="galleryFilter flex flex-r flex-wrap gap--s">
        <div 
            className={`filter ${activeFilter == 'all' ? 'active' : ''}`} 
            onClick={(e) => setActiveFilter('all')}>All
        </div>
        <div 
            className={`filter ${activeFilter == 'kelp-forests' ? 'active' : ''}`} 
            onClick={(e) => setActiveFilter('kelp-forests')}>Kelp Forests
        </div>
        <div 
            className={`filter ${activeFilter == 'fin-fish' ? 'active' : ''}`} 
            onClick={(e) => setActiveFilter('fin-fish')}>Fin-fish
        </div>
        <div 
            className={`filter ${activeFilter == 'the-new-zealand-sealion' ? 'active' : ''}`} 
            onClick={(e) => setActiveFilter('the-new-zealand-sealion')}>The New Zealand Sealion
        </div>
        <div 
            className={`filter ${activeFilter == 'reef-life' ? 'active' : ''}`} 
            onClick={(e) => setActiveFilter('reef-life')}>Reef life
        </div>
    </div>
  )
}
