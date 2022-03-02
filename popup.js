// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
	changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setPageBackgroundColor,
	});
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
	/**
	 * injectScript - Inject internal script to available access to the `window`
	 *
	 * @param  {type} file_path Local path of the internal script.
	 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
	 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
	 */
	function injectScript(file_path, tag) {
		var node = document.getElementsByTagName(tag)[0];
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", file_path);
		node.appendChild(script);
	}
	injectScript(chrome.runtime.getURL("content.js"), "body");
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color;
	});
}
