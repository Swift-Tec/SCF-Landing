import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider"
import ScrollProgress from "@/components/effects/ScrollProgress"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import PhotoGallery from "@/components/PhotoGallery"
import About from "@/components/About"
import EventDetails from "@/components/EventDetails"
import TeamStructure from "@/components/TeamStructure"
import Prizes from "@/components/Prizes"
import RegisterCTA from "@/components/RegisterCTA"
import TeamRegisterPage from "@/pages/TeamRegisterPage"

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <PhotoGallery />
        <About />
        <EventDetails />
        <TeamStructure />
        <Prizes />
        <RegisterCTA />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<TeamRegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
