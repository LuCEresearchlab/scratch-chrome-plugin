document.addEventListener("click", messageContentScript);

function messageContentScript() {
	window.postMessage(
		{
			direction: "from-page-script",
			message: "Blockly.getMainWorkspace()",
		},
		"*"
	);
}
