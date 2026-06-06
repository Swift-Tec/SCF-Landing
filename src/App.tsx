import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider"
import ScrollProgress from "@/components/effects/ScrollProgress"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import LearnSection from "@/components/LearnSection"
import AgendaSection from "@/components/AgendaSection"
import PhotoGallery from "@/components/PhotoGallery"
import About from "@/components/About"
import EventDetails from "@/components/EventDetails"
import TeamStructure from "@/components/TeamStructure"
import Prizes from "@/components/Prizes"
import FAQSection from "@/components/FAQSection"
import RegisterCTA from "@/components/RegisterCTA"
import TeamRegisterPage from "@/pages/TeamRegisterPage"

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LearnSection />
        <AgendaSection />
        <PhotoGallery />
        <About />
        <EventDetails />
        <TeamStructure />
        <Prizes />
        <FAQSection />
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
