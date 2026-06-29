import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PreLoader from './components/PreLoader.jsx'
import CursorTrail from './components/CursorTrail/CursorTrail.jsx'
import "animate.css"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <CursorTrail />
      <PreLoader/>
      <div className = "container mx-auto px-6">
        <Navbar />
        <App />
        <Footer/>
      </div>
    </ReactLenis>
  </StrictMode>,
)
