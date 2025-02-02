import React, { useEffect, useState } from 'react';
import useFetch from '../Components/useFetch';
import { Iphoto } from '../interfaces/fetch.interface';
import styles from '../mainpg.module.css';
import SearchBar from '../Components/SearchBar';
import Modal from '../Components/Modal';

const MainPage: React.FC = () => {
  const { res, error, loading } = useFetch({
    url: 'https://api.unsplash.com/photos?page=1&per_page=20',
    method: 'GET',
  });

  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<{ term: string; images: Iphoto[] }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLikes, setSelectedLikes] = useState<number | null>(null)
  const [selectedDownloads, setSelectedDownloads] = useState<number | null>(null)


  
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveSearchHistory = (newSearch: string) => {
    if (!newSearch.trim()) return; 
  
    const filteredImages = res.filter((photo: Iphoto) =>
      photo.alt_description?.toLowerCase().includes(newSearch.toLowerCase())
    );
  
    if (filteredImages.length === 0) return; 
  
    const newEntry = { term: newSearch, images: filteredImages };

    const updatedHistory = [
      ...searchHistory.filter(item => item.term !== newSearch),
      newEntry
    ];
  
    setSearchHistory(updatedHistory); 
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); 
  };

  const filteredPhotos = res.filter((photo: Iphoto) =>
    photo.alt_description?.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const openModal = (imageUrl: string, altText: string, downloads: number, likes: number) => {
    setSelectedAlt(altText)
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
    setSelectedLikes(likes)
    setSelectedDownloads(downloads)
  }
  const closeModal = () => {
    setSelectedAlt(null)
    setSelectedImage(null)
    setIsModalOpen(false)
    setSelectedLikes(null)
    setSelectedDownloads(null)
  }

  return (
    <div>
      <SearchBar onSearch={setSearchValue} onSubmitSearch={saveSearchHistory} />
      <div className={styles.wrapper}>
        {filteredPhotos.map((photo: Iphoto) => (
          <div key={photo.id} className={styles.photowrp} onClick={() => openModal(photo.urls.regular, photo.alt_description, photo.downloads, photo.likes)}>
            <img src={photo.urls.regular} alt={photo.alt_description}  className={styles.imgstyle} />
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} image={selectedImage} alt={selectedAlt} onClose={closeModal} downloads={selectedDownloads} likes={selectedLikes}/>
    </div>
  );
};

export default MainPage;
