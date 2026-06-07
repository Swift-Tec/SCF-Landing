import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider"
import ScrollProgress from "@/components/effects/ScrollProgress"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import LearnSection from "@/components/LearnSection"
import AgendaSection from "@/components/AgendaSection"
import PhotoGallery from "@/components/PhotoGallery"
import About from "@/components/About"
import Prizes from "@/components/Prizes"
import FAQSection from "@/components/FAQSection"
import WeAreScroll from "@/components/effects/WeAreScroll"
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
        {/* <Prizes /> */}
        <FAQSection />
        <WeAreScroll />
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
