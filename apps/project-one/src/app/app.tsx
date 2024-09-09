// App.tsx
import React, { useRef } from 'react';
import { usePopups, PopupsProvider } from '@workspace/project-generic';
import Popup from '../../../../project-generic/src/lib/Popup';
import styles from './app.module.scss';

const PopupComponentA = () => (
  <div style={{ border: '3px solid black', padding: '10px', borderRadius: '5px' }}>
    Content of Popup A
  </div>
);

const PopupComponentB = () => (
  <div style={{ border: '3px solid blue', padding: '10px', borderRadius: '5px' }}>
    Content of Popup B
  </div>
);

const App: React.FC = () => {
  const { addPopup, closeAll, popups, closePopup } = usePopups();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.sectionPopup} ref={containerRef}>
      <div className={styles.sectionPopup__contentBtns}>
        <button
          className={styles.btn}
          onClick={() => addPopup({
            id: '1',
            title: 'Popup A',
            contentComponent: <PopupComponentA />,
            defaultPosition: { left: 100, top: 100, width: 200, height: 150 }
          })}
        >
          Add Popup A
        </button>
        <button
          className={styles.btn}
          onClick={() => addPopup({
            id: '2',
            title: 'Popup B',
            contentComponent: <PopupComponentB />,
            defaultPosition: { left: 300, top: 200, width: 300, height: 150 }
          })}
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
            containerRef={containerRef} // Pasar la referencia del contenedor
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
