import { createContext, useState, useEffect, useCallback } from 'react';
import { TitlesService } from '../services/TitleService';
import { useContext } from 'react';

export const TitleMetaDataProvider = ({ children }) => {

  const [metadata, setMetadata] = useState({
    genres: {},
    titleTypes: {},
    searchModes: {},
    exampleURL: "",
    isLoading: true,
    error: null
  });

  //Create the identiy for syncMetadata do the jobs: make an API call => promises => setMedata
  const syncMetadata = useCallback(async () => {
    setMetadata(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await TitlesService.getSearchOptions();

      setMetadata({
        exampleURL: data.exampleURL,
        genres: data?.filters?.genres?.pattern ?? {},
        titleTypes: data?.filters?.titletype?.pattern ?? {},
        searchModes: data?.mode?.pattern ?? {},
        isLoading: false,
        error: null
      });
      
    } catch (err) {
      console.error("Metadata Sync Error:", err);
      setMetadata(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "Failed to sync with backend"
      }));
    }
  }, []);

  //Execute syncMetadata once 
  useEffect(() => {
    syncMetadata();
  }, []);

  //Create the context and defined the rule: grand my childrens and grandchildrens to acces value{metadata}
  return (
    <TitlesMetadataContext.Provider 
     value={metadata} //return a the object itself (metadata), must descontruct it to use const {genres, ...} = useTitlesMetadata()
    //  value={{metadata}} //return the the warp(wrap object) of the object ({metadata}), destruct the wrap object, so can use const {metadata} = useTitlesMetadata()
    >
      {children}
    </TitlesMetadataContext.Provider>
  );
};

  const TitlesMetadataContext = createContext(); 
//Create a key for who have permission to open the context/common resources 
export const useTitlesMetadata = () => {
  const context = useContext(TitlesMetadataContext); 
  if (!context) {
    throw new Error("useTitlesMetadata must be used within a TitleMetaDataProvider");
  }
  return context;
};