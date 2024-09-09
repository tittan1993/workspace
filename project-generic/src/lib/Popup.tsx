// Popup.tsx
import React, { useState, useRef } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import styles from './PopupsProvider.module.scss';
import { usePopups } from './PopupsProvider';

interface PopupProps {
  id: string;
  title: string;
  contentComponent: React.ReactNode;
  defaultPosition: { left: number; top: number; width: number; height: number };
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement>; // Añadir referencia al contenedor
}

const Popup: React.FC<PopupProps> = ({ id, title, contentComponent, defaultPosition, onClose, containerRef }) => {
  const { focusedPopup, setFocusedPopup } = usePopups();
  const [position, setPosition] = useState(defaultPosition);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleStop = (e: DraggableEvent, data: { x: number; y: number }) => {
    const container = containerRef.current;

    if (container && nodeRef.current) {
      const containerRect = container.getBoundingClientRect();
      const popupElement = nodeRef.current;
      const popupRect = popupElement.getBoundingClientRect();

      const newX = Math.max(0, Math.min(data.x, containerRect.width - popupRect.width));
      const newY = Math.max(0, Math.min(data.y, containerRect.height - popupRect.height));

      setPosition(prev => ({
        ...prev,
        left: newX,
        top: newY
      }));
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: position.left, y: position.top }}
      onStop={handleStop}
    >
      <div
        ref={nodeRef}
        className={styles["popup-container"]}
        style={{
          width: position.width,
          height: position.height,
          zIndex: focusedPopup === id ? 1000 : 1
        }}
        onClick={() => setFocusedPopup(id)}
      >
        <div className={styles["popup-header"]}>
          <span>{title}</span>
          <button className={styles["close-btn"]} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles["popup-content"]}>
          {contentComponent}
        </div>
      </div>
    </Draggable>
  );
};

export default Popup;
