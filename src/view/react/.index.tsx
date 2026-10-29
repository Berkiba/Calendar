import { createRoot } from "react-dom/client";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/default";
import AccountManager, { AccountContext } from "../../controller/AccountManager.ts";

function App() {
	const [account, setAccount] = useState<AccountManager | null>(null);

	return (
		<AccountContext.Provider value={{ account, setAccount }}>
			<RouterProvider router={router} />
		</AccountContext.Provider>
	);
}

createRoot(document.getElementById("root")!).render(
	<App />
);