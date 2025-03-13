import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Toaster } from "./components/ui/toaster";
import tempoRoutes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(tempoRoutes)}
      {useRoutes(routes)}
      <Toaster />
    </AuthProvider>
  );
}

export default App;
