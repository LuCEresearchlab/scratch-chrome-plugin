window.addEventListener("message", function (event) {
	if (
		event.source == window &&
		event.data &&
		event.data.direction == "from-page-script"
	) {
		alert('Content script received message: "' + event.data.message + '"');
        console.log(event.data.message);
        window.postMessage(
            {
                direction: "from-content-script",
                message: "Blockly.getMainWorkspace()",
            },
            "*"
        );
	}
});

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
