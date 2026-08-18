import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import ThemeProvider from "./components/theme/ThemeProvider";

const App = () => {
  return (
    <>
      <ThemeProvider />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
