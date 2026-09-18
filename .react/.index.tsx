import { createRoot } from "react-dom/client";
import React from "react";

import TheNameDosntHaveToMatchTheComponentInTheTSXfileAsYouSee_PascalCaseHerePlease from "./.EASY_REACT_COMPONENT";
createRoot(document.getElementById("root")!).render(
	<>
		<h1>.index.tsx: the empty website</h1>


		<TheNameDosntHaveToMatchTheComponentInTheTSXfileAsYouSee_PascalCaseHerePlease>
			<text>i am the child</text>
			hehehehehehehehe, this line is the textContent of this component
			<p className="hehehaha">and this the the child element I pass from ".index.tsx" to ".EASY_REACT_COMPONENT.tsx"</p>
			<text>three of the four children are not visible on the website as you see</text>
		</TheNameDosntHaveToMatchTheComponentInTheTSXfileAsYouSee_PascalCaseHerePlease>
	</>
);