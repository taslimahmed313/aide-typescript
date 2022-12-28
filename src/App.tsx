import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Router/Routes";

const App: React.FC = () => {
  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
      {/* <Toaster /> */}
    </div>
  );
};

export default App;
