export interface IFetch {
    url: string; 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'; 
  }
  

export interface Iphoto {
    id: string; 
    alt_description: string; 
    urls: {
      regular: string; 
      small: string; 
      full: string; 
    };
    downloads: number
    likes: number

  }


export interface ISearch {
  onSearch: (query: string) => void
  onSubmitSearch: (query: string) => void
}