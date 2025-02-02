import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>Search History</h2>
      <div>
        {history.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedImages(item.images)}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginBottom: 5 }}
          >
            {item.term}
          </div>
        ))}
      </div>

      {selectedImages.length > 0 && (
        <div>
          <h3>Images for selected search</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedImages.map((photo) => (
              <img 
                key={photo.id} 
                src={photo.urls.regular} 
                alt={photo.alt_description} 
                style={{ width: 200, margin: 10, borderRadius: 8 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
