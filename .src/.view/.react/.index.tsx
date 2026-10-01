import { createRoot } from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./.router/default";
import Home from "./Home";

createRoot(document.getElementById("root")!).render(
	<>
		<RouterProvider router={router}></RouterProvider>
	</>
);