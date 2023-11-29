import * as THREE from "three";

import { UIButton, UIPanel, UIText } from "./libs/ui.js";
import { UIBoolean } from "./libs/ui.three.js";

function MenubarStatus(editor) {
	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass("menu right");

	// ------------------------------old autosave------------------------------

	const autosave = new UIBoolean(
		editor.config.getKey("autosave"),
		strings.getKey("menubar/status/autosave")
	);
	autosave.text.setColor("#888");
	autosave.onChange(function () {
		const value = this.getValue();

		editor.config.setKey("autosave", value);

		if (value === true) {
			console.log(editor.signals.sceneGraphChanged.dispatch());
			editor.signals.sceneGraphChanged.dispatch();
		}
	});
	container.add(autosave);

	editor.signals.savingStarted.add(function () {
		autosave.text.setTextDecoration("underline");
	});

	editor.signals.savingFinished.add(function () {
		autosave.text.setTextDecoration("none");
	});

	// ------------------------------new autosave------------------------------

	// const autosave = new UIButton(strings.getKey("menubar/status/autosave"));
	// autosave.onClick(function () {
	// 	console.log(editor.signals.sceneGraphChanged.dispatch());
	// 	// if (value === true) {
	// 	// 	editor.signals.sceneGraphChanged.dispatch();
	// 	// }
	// });

	container.add(autosave);

	const version = new UIText("r" + THREE.REVISION);
	version.setClass("title");
	version.setOpacity(0.5);
	container.add(version);

	return container;
}

export { MenubarStatus };
