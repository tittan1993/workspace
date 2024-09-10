import React from 'react';

const PopupComponentA: React.FC<{ contentIndex: number }> = ({ contentIndex }) => {
  const contents = [
    'Content of Popup A - Option 1',
    'Content of Popup A - Option 2',
    'Content of Popup A - Option 3'
  ];

  return (
    <div style={{ border: '3px solid black', padding: '10px', borderRadius: '5px' }}>
      {contents[contentIndex]}
    </div>
  );
};

export default PopupComponentA;
