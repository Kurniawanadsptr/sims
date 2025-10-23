import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppInitializer from "./AppInitializer";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppInitializer />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
