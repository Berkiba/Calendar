import React from "react"

export default function youCanNameItWhatEverYouWant(prop: any) {
	/**
	 * Helper function to find the child in the prop that has the className "hehehaha".
	 */
	function findChildWithClassName(child: any) {
		child as React.ReactElement<{ className?: string }>; /** some typescript bullshit this line, basically is type cast in C, bruh 🔞 */
		return child.props?.className?.includes("hehehaha")
	}
	/** save the found child as variable, display it in the return. */
	const childElementFromIndexTSX = React.Children.toArray(prop.children).find(findChildWithClassName);

	return (
		<>
			<h1> .EASY_REACT_COMPONENT.tsx: Delete this file once your guys know how to create a react component </h1>
			<button>.EASY_REACT_COMPONENT.tsx: Okey</button>
			<button>.EASY_REACT_COMPONENT.tsx: Objection</button>
			<img style={{ display: "block" }} src="https://www.heyuguys.com/images/2011/05/phoenix-wright.jpg"></img >
			{childElementFromIndexTSX}
			{prop.children[2]}
		</>
	)
}