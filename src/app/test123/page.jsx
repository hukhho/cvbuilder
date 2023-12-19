'use client';

import React, { useRef, useState } from 'react';

// Wrap your component with React.memo to memoize it
const App = React.memo(() => {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  // Add a console.log to check when the component renders
  console.log('App component rendered');

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
});

export default App;
