import React, { useEffect, useState } from 'react';
import styles from '../historypg.module.css';

interface Image {
  id: string;
  urls: { regular: string };
  alt_description: string;
}

interface SearchHistoryItem {
  term: string;
  images: Image[];
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1)
  


  useEffect (() => {
    const handleScroll = () => {
      if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.
        documentElement.scrollHeight) {
          setPage(prev => prev + 1)
        }
    }
  }, [page])

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  return (
    <div className={styles.pgwrapper}>
      <h2 className={styles.title}>Search History</h2>
      <div className={styles.txtwrp}>
        {history.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedImages(item.images)}
            className={styles.txt}
          >
            {item.term}
          </div>
        ))}
      </div>

      {selectedImages.length > 0 && (
        <div>
          <h3>Images for selected search</h3>
          <div className={styles.imageswrp}>
            {selectedImages.map((photo) => (
              <img 
                key={photo.id} 
                src={photo.urls.regular} 
                alt={photo.alt_description} 
                className={styles.imagestyle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
