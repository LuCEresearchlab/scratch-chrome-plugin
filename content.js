// document.addEventListener("click", messageContentScript);

// const json = require('./scratch-expression-blocks.json');

function messageContentScript() {
  window.postMessage(
    {
      direction: 'from-page-script',
      message: 'JSON.parse(JSON.stringify(Blockly.getMainWorkspace()))',
    },
    '*',
  );
}

// Object.values(Blockly.getMainWorkspace().blockDB_).forEach(function (el) {
// 	el.svgPath_.addEventListener("mousedown", () => {
// 		window.postMessage(
// 			{
// 				direction: "from-page-script",
// 				message:
// 					"JSON.parse(JSON.stringify(Blockly.getMainWorkspace()))",
// 			},
// 			"*"
// 		);
// 	});
// });
const svgns = 'http://www.w3.org/2000/svg';

// if (Blocky) {

// }

// eslint-disable-next-line no-undef
const workspace = Blockly.getMainWorkspace();
workspace.addChangeListener((event) => {
	if (event.type === 'create') {
		const { svgGroup_ } = workspace.getBlockById(event.blockId);

		const svgButton = document.createElementNS(svgns, "rect");
        svgButton.setAttribute("data-block", event.blockId);
        svgButton.setAttribute("x", "0");
        svgButton.setAttribute("y", "-10");
        svgButton.setAttribute("width", "100");
        svgButton.setAttribute("height", "100");
        svgButton.setAttribute("fill", "#5cceee");
        // document.createElement("path");
        // svgButton.className = "myName";
		// svgButton.setAttribute('stroke', '#AA0000');
		// svgButton.setAttribute('fill', "#AA0000");
		// svgButton.setAttribute('d', `
        //     M (CX - R), CY
        //     a R,R 0 1,0 (R * 2),0
        //     a R,R 0 1,0 -(R * 2),0
        // `);

        svgButton.addEventListener('mousedown', (ev) => {
            const blockId = ev.target.dataset.block;
            // const block = workspace.getBlockById(blockId);
            console.log(blockId)
        })
        svgGroup_.append(svgButton);
        // console.log(svgGroup_)
	}
});

window.addEventListener("message", function (event) {
	if (
		event.source == window &&
		event.data &&
		event.data.direction == "from-content-script"
	) {
		alert('Content script received message: "' + event.data.message + '"');
	}
});
