import { ThemeProvider } from "@/components/ThemeProvider"
import ScrollProgress from "@/components/effects/ScrollProgress"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import PhotoGallery from "@/components/PhotoGallery"
import About from "@/components/About"
import EventDetails from "@/components/EventDetails"
import TeamStructure from "@/components/TeamStructure"
import RegisterCTA from "@/components/RegisterCTA"
import RegistrationForm from "@/components/RegistrationForm"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <PhotoGallery />
          <About />
          <EventDetails />
          <TeamStructure />
          <RegisterCTA />
          <RegistrationForm />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
