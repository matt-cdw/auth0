import { environment } from '../environments/environment';

// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

export function App() {
  return (
    <div>
      <span>
        Welcome to AUTH ACUL running in <b>{environment.name}</b> mode!
      </span>
    </div>
  );
}

export default App;
