import React from 'react'
import styles from '../mainpg.module.css';

interface IModal {
    isOpen: boolean
    image: string | null
    alt: string | null;
    onClose: () => void
    downloads: number | null 
    likes: number | null
}

const Modal:React.FC<IModal> = ({isOpen,image,alt,onClose, downloads, likes}) => {
    if(!isOpen) return null
  return (
    <div onClick={onClose}  className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>&times;</button>
        {image && <img src={image} alt={alt || 'selected image'} className={styles.modalImage}/>}
        <p>downloads: {downloads}</p>
        <p>likes:{likes}</p>
      </div>
    </div>
  )
}

export default Modal
