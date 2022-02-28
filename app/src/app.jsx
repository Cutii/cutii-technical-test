import { Routes, Route} from 'react-router-dom';
import Form from './form';
import Home from './home';
import Gallery from './gallery';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
      <Route path='form' element={<Form />} />
      <Route path='gallery' element={<Gallery />} />
  </Routes>
)

export default App;