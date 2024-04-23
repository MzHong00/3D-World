import ReactDOM from 'react-dom/client';
import App from './app/appEntry';

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
root.render(
  <App />
);