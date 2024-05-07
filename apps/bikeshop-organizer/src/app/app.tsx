// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter } from 'react-router-dom';
import Pages from './routes/Pages/Pages';

export function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

export default App;
