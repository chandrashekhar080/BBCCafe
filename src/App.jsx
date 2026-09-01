import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Snooker from './pages/Snooker'
import Restaurant from './pages/Restaurant'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="snooker" element={<Snooker />} />
        <Route path="restaurant" element={<Restaurant />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
