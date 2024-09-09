import React, { createContext, useContext, useState } from 'react';

interface Popup {
  id: string;
  title: string;
  contentComponent: React.ReactNode;
  defaultPosition: { left: number; top: number; width: number; height: number };
}

interface PopupsContextType {
  popups: Map<string, Popup>;
  addPopup: (popup: Popup) => void;
  closePopup: (id: string) => void;
  closeAll: () => void;
  focusedPopup: string | null;
  setFocusedPopup: (id: string | null) => void;
}

const PopupsContext = createContext<PopupsContextType | undefined>(undefined);

export const PopupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [popups, setPopups] = useState<Map<string, Popup>>(new Map());
  const [focusedPopup, setFocusedPopup] = useState<string | null>(null);

  const addPopup = (popup: Popup) => {
    setPopups(prev => new Map(prev).set(popup.id, popup));
  };

  const closePopup = (id: string) => {
    setPopups(prev => {
      const newPopups = new Map(prev);
      newPopups.delete(id);
      return newPopups;
    });
  };

  const closeAll = () => {
    setPopups(new Map());
  };

  return (
    <PopupsContext.Provider value={{ popups, addPopup, closePopup, closeAll, focusedPopup, setFocusedPopup }}>
      {children}
    </PopupsContext.Provider>
  );
};

export const usePopups = () => {
  const context = useContext(PopupsContext);
  if (context === undefined) {
    throw new Error('usePopups must be used within a PopupsProvider');
  }
  return context;
};
