import * as THREE from "three";

import { UIPanel, UIText } from "./libs/ui.js";
import { UIButton } from "./libs/ui.js";
import { UIBoolean } from "./libs/ui.three.js";

function MenubarStatus(editor) {
	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass("menu right");

	// --------------------------------------------- autosave (old version) ---------------------------------------------

	// const autosave = new UIBoolean(
	// 	editor.config.getKey("autosave"),
	// 	strings.getKey("menubar/status/autosave")
	// );
	// autosave.text.setColor("#888");
	// autosave.onChange(function () {
	// 	const value = this.getValue();

	// 	editor.config.setKey("autosave", value);

	// 	if (value === true) {
	// 		editor.signals.sceneGraphChanged.dispatch();
	// 	}
	// });
	// container.add(autosave);

	// editor.signals.savingStarted.add(function () {
	// 	autosave.text.setTextDecoration("underline");
	// });

	// editor.signals.savingFinished.add(function () {
	// 	autosave.text.setTextDecoration("none");
	// });

	// container.add(autosave);

	// --------------------------------------------- display oultiner ---------------------------------------------

	const displayOutliner = new UIButton(
		strings.getKey("menubar/status/outlinerDisplay")
	);
	displayOutliner.setMarginRight("10px");
	displayOutliner.onClick(() => {
		const outliner = document.getElementById("OutlinePanel").style;
		const toolbar = document.getElementById("toolbar").style;
		const info = document.getElementById("info").style;
		outliner.display == "" ? (outliner.display = "block") : null;
		if (outliner.display === "block") {
			outliner.display = "none";
			toolbar.left = "25px";
			info.left = "25px";
		} else {
			outliner.display = "block";
			toolbar.left = outliner.width
				? parseInt(outliner.width, 10) + 25 + "px"
				: parseInt(toolbar.left, 10) + 200 + "px";
			info.left = outliner.width
				? parseInt(outliner.left, 10) + "px"
				: parseInt(info.left, 10) + 200 + "px";
		}
	});
	container.add(displayOutliner);

	// --------------------------------------------- autosave (new version) ---------------------------------------------

	const save = new UIButton(strings.getKey("menubar/status/autosave"));
	save.onClick(() => {
		editor.signals.sceneGraphChanged.dispatch();
		editor.signals.savingStarted.dispatch();
		editor.storage.set(editor.toJSON());
		editor.signals.savingFinished.dispatch();
	});
	container.add(save);

	const version = new UIText("r" + THREE.REVISION);
	version.setClass("title");
	version.setOpacity(0.5);
	container.add(version);

	return container;
}

export { MenubarStatus };
