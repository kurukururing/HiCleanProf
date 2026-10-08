import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { HowItWorks } from './components/sections/HowItWorks';
import { Features } from './components/sections/Features';
import { Technology } from './components/sections/Technology';
import { Impact } from './components/sections/Impact';
import { Partners } from './components/sections/Partners';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Technology />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;