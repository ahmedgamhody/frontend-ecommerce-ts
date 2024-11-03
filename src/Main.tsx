import { createRoot } from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// redux
import { store, persistor } from "@store/store";
import { Provider } from "react-redux";
// redux persisit
import { PersistGate } from "redux-persist/integration/react";

// styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//axios
import "./services/axios-global.js";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
