import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import EventDetails from "./components/EventDetails"
import TeamStructure from "./components/TeamStructure"
import RegistrationForm from "./components/RegistrationForm"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <EventDetails />
        <TeamStructure />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  )
}
