import React, { useState, useRef, Suspense } from 'react';
import { usePopups, PopupsProvider } from '@workspace/project-generic';
import Popup from '../../../../project-generic/src/lib/Popup';
import PopupComponentB from './PopupComponentB';
import styles from './app.module.scss';


const LazyPopupComponentA = React.lazy(() => import('./PopupComponentA'));

const generateUniqueId = () => Date.now().toString();

const App: React.FC = () => {
  const { addPopup, closeAll, popups, closePopup } = usePopups();
  const containerRef = useRef<HTMLDivElement>(null);

  const [popupAIndex, setPopupAIndex] = useState(0);
  const [popupBIndex, setPopupBIndex] = useState(0);

  const handleAddPopupA = () => {

    setPopupAIndex((prevIndex) => (prevIndex + 1) % 3);


    addPopup({
      id: generateUniqueId(),
      title: `Popup A - ${popupAIndex + 1}`,
      contentComponent: (
        <Suspense fallback={<div>Loading Popup A...</div>}>
          <LazyPopupComponentA contentIndex={popupAIndex} />
        </Suspense>
      ),
      defaultPosition: { left: 100, top: 100, width: 200, height: 150 }
    });
  };

  const handleAddPopupB = () => {

    setPopupBIndex((prevIndex) => (prevIndex + 1) % 3);


    addPopup({
      id: generateUniqueId(),
      title: `Popup B - ${popupBIndex + 1}`,
      contentComponent: <PopupComponentB contentIndex={popupBIndex} />,
      defaultPosition: { left: 300, top: 200, width: 300, height: 150 }
    });
  };

  return (
    <section className={styles.sectionPopup} ref={containerRef}>
      <div className={styles.sectionPopup__contentBtns}>
        <button
          className={styles.btn}
          onClick={handleAddPopupA}
        >
          Add Popup A
        </button>
        <button
          className={styles.btn}
          onClick={handleAddPopupB}
        >
          Add Popup B
        </button>
        <button className={styles.btn} onClick={closeAll}>
          Close All Popups
        </button>
      </div>
      <div className={styles.sectionPopup__contentRender}>
        {Array.from(popups.values()).map(popup => (
          <Popup
            key={popup.id}
            id={popup.id}
            title={popup.title}
            contentComponent={popup.contentComponent}
            defaultPosition={popup.defaultPosition}
            onClose={() => closePopup(popup.id)}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

const AppWithProvider: React.FC = () => {
  return (
    <PopupsProvider>
      <App />
    </PopupsProvider>
  );
};

export default AppWithProvider;
