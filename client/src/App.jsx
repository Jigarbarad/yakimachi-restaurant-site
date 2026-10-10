import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Admin from './pages/admin/Admin'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reserve from './pages/Reserve'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Every page is rendered inside Layout (navbar + footer). */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reserve" element={<Reserve />} />
        </Route>
        {/* The admin area has its own layout and isn't linked from the public navbar. */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
