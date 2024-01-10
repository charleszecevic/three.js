import * as THREE from "three";
import { UIPanel, UIText } from "./libs/ui.js";
import { UIButton } from "./libs/ui.js";
import { UIBoolean } from "./libs/ui.three.js";

function MenubarStatus(editor) {
	const strings = editor.strings;
	const signals = editor.signals;

	const container = new UIPanel();
	container.setClass("menu right");

	// -------------------------------------------------- fullscreen --------------------------------------------------

	const displayOutliner = new UIButton(
		strings.getKey("menubar/status/outlinerDisplay")
	);
	displayOutliner.setMarginRight("10px");
	document.getElementById("OutlinePanel").style.display = "block";
	displayOutliner.onClick(() => {
		// const
		const outliner = document.getElementById("OutlinePanel").style;
		const toolbar = document.getElementById("toolbar").style;
		const info = document.getElementById("info").style;
		const viewport = document.getElementById("viewport").style;
		const sidebar = document.getElementById("sidebar").style;

		if (outliner.display === "block") {
			outliner.display = "none";
			sidebar.display = "none";
			toolbar.left = "25px";
			info.left = "25px";
			viewport.left = "0px";
			viewport.right = "0px";
		} else {
			outliner.display = "block";
			sidebar.display = "block";
			toolbar.left = outliner.width
				? parseInt(outliner.width, 10) + 25 + "px"
				: parseInt(toolbar.left, 10) + 200 + "px";
			info.left =
				outliner.width > 200 ? "25px" : parseInt(toolbar.left, 10) - 200 + "px";
			console.log(parseInt(outliner.width, 10) + "px");
			viewport.left = outliner.width
				? parseInt(outliner.width, 10) + "px"
				: "200px";
			viewport.right = sidebar.width
				? parseInt(sidebar.width, 10) + "px"
				: "300px";
		}
		signals.windowResize.dispatch();
	});
	container.add(displayOutliner);

	// -------------------------------------------------- save --------------------------------------------------

	const save = new UIButton(strings.getKey("menubar/status/save"));
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

	// -------------------------------------------------- autosave --------------------------------------------------

	const autosave = new UIBoolean(
		editor.config.getKey("autosave"),
		strings.getKey("menubar/status/autosave")
	);
	autosave.text.setColor("#888");
	autosave.onChange(function () {
		const value = this.getValue();

		editor.config.setKey("autosave", value);

		if (value === true) {
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

	container.add(autosave);

	return container;
}

export { MenubarStatus };
