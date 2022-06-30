import { Box } from '@chakra-ui/react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Premios } from './components/Premios';
import { Testimonials } from './components/Testimonials';

function App() {
  return (
    <Box>
      <Header />
      <Premios />
      <Testimonials />
      <Footer />
    </Box>
  );
}

export default App;
