import { render, screen, fireEvent } from '@testing-library/react';
import { PopupsProvider, usePopups } from '@workspace/project-generic';

// Componente de prueba para acceder al contexto
const TestComponent: React.FC = () => {
  const { addPopup, closePopup, popups } = usePopups();

  return (
    <>
      <button onClick={() => addPopup({
        id: '1',
        title: 'Test Popup',
        contentComponent: <div>Test Content</div>,
        defaultPosition: { left: 100, top: 100, width: 200, height: 150 }
      })}>Add Popup</button>
      <button onClick={() => closePopup('1')}>Close Popup</button>
      {Array.from(popups.values()).map(popup => (
        <div key={popup.id}>{popup.title}</div>
      ))}
    </>
  );
};

describe('PopupsProvider', () => {
  it('should add a popup successfully', () => {
    render(
      <PopupsProvider>
        <TestComponent />
      </PopupsProvider>
    );

    expect(screen.queryByText('Test Popup')).toBeNull();

    fireEvent.click(screen.getByText('Add Popup'));

    expect(screen.getByText('Test Popup')).not.toBeNull();
  });

  it('should close a popup successfully', () => {
    render(
      <PopupsProvider>
        <TestComponent />
      </PopupsProvider>
    );


    fireEvent.click(screen.getByText('Add Popup'));

    expect(screen.getByText('Test Popup')).not.toBeNull();


    fireEvent.click(screen.getByText('Close Popup'));

    expect(screen.queryByText('Test Popup')).toBeNull();
  });
});
