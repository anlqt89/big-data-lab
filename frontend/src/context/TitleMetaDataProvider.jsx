import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { TitlesService } from '../services/TitleService';

const TitlesMetadataContext = createContext(); //context 

export const TitleMetaDataProvider = ({ children }) => {

//data will be sync from backend
  const [metadata, setMetadata] = useState({
    genres: [],
    titleTypes: [],
    searchModes: [],
    exampleURL: "",
    loading: true,
    error: null
  });



  const syncMetadata = useCallback(async () => {
    setMetadata(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await TitlesService.getSearchOptions();
     
      setMetadata({
        exampleURL: data.exampleURL,
        genres: data.filters.titletype.pattern || {},
        titleTypes: data.filters.genres.pattern || {},
        searchModes: data.mode.pattern || {},
        loading: false,
        error: null
      });
      
    } catch (err) {
      console.error("Metadata Sync Error:", err);
      setMetadata(prev => ({
        ...prev,
        loading: false,
        error: err.message || "Failed to sync with backend"
      }));
    }
  }, []);

  // 4. Run the sync once on mount
  useEffect(() => {
    syncMetadata();
  }, [syncMetadata]);

  // 5. Provide the state AND the refresh function to the rest of the app
  return (
    <TitlesMetadataContext.Provider value={{ ...metadata, refresh: syncMetadata }}>
      {children}
    </TitlesMetadataContext.Provider>
  );
};

/**
 * Custom Hook: useTitlesMetadata
 * Usage: const { genres, titleTypes, searchModes, loading, refresh } = useTitlesMetadata();
 */
export const useTitlesMetadata = () => {
  const context = useContext(TitlesMetadataContext);
  if (!context) {
    throw new Error("useTitlesMetadata must be used within a TitleMetaDataProvider");
  }
  return context;
};