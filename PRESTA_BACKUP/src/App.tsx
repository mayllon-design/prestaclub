import { AppProviders } from "./core/providers/AppProviders";
import { AppRoutes } from "./core/routes/AppRoutes";

const App = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);

export default App;
