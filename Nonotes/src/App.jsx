import React from 'react'
import Page from './components/Page'
import Toolbar from './components/Toolbar'

const App = () => {
  return (
    <div>
      <div class="flex justify-center flex-col items-center">
        <Toolbar/>
        <Page/>
      </div>
    </div>
  )
}

export default App
