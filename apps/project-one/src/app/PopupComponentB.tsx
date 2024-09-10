import React from 'react';

const PopupComponentB: React.FC<{ contentIndex: number }> = ({ contentIndex }) => {
  const contents = [
    'Content of Popup B - Option 1',
    'Content of Popup B - Option 2',
    'Content of Popup B - Option 3'
  ];

  return (
    <div style={{ border: '3px solid blue', padding: '10px', borderRadius: '5px' }}>
      {contents[contentIndex]}
    </div>
  );
};

export default PopupComponentB;
