import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortfolioPage } from '../pages/portfolio'
import { NotFoundPage } from '../pages/not-found'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

