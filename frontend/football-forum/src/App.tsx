import React from 'react';

import Header from './components/Navbar/Header';
import MemesContainer from './components/Memes/MemesContainer';

function App(): JSX.Element {

  return (
    <>
    <Header/> {/* here will be router */}
    <MemesContainer/>
    </>
  );
}

export default App;