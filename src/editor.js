
// Based on https://github.com/RPGillespie6/codemirror-quickstart
//
// This isn't exactly public, but it's not backend.  Rather, it gets rolled-up
// and minified by build.sh and shipped publicly from ./src/public/3p/

//import {undo} from "@codemirror/history";

import {
	EditorState,
	Prec,
} from '@codemirror/state';

import { highlightSelectionMatches } from '@codemirror/search';
import {
	indentWithTab,
	history,
	defaultKeymap,
	historyKeymap,
	undo,
} from '@codemirror/commands';

import {
	foldGutter,
	indentOnInput,
	indentUnit,
	bracketMatching,
	foldKeymap,
	syntaxHighlighting,
	defaultHighlightStyle,
} from '@codemirror/language';

// TODO: autocomplete in codemirror only works for javascript, not rust.  Maybe
// remove it entirely?
import {
	//closeBrackets,
	autocompletion,
	//closeBracketsKeymap,
	completionKeymap,
} from '@codemirror/autocomplete';

import {
	lineNumbers,
	highlightActiveLineGutter,
	highlightSpecialChars,
	drawSelection,
	dropCursor,
	rectangularSelection,
	crosshairCursor,
	highlightActiveLine,
	keymap,
	EditorView,
} from '@codemirror/view';

// Theme
import { oneDark } from "@codemirror/theme-one-dark";

// Language
import { rust } from "@codemirror/lang-rust";

function createEditorState(initialContents, options = {}) {
	let extensions = [
		lineNumbers(),
		EditorView.lineWrapping,
		highlightActiveLineGutter(),
		highlightSpecialChars(),
		history(),
		foldGutter(),
		drawSelection(),
		indentUnit.of("    "),
		EditorState.allowMultipleSelections.of(true),
		indentOnInput(),
		bracketMatching(),
		//closeBrackets(),
		autocompletion(),
		rectangularSelection(),
		crosshairCursor(),
		highlightActiveLine(),
		highlightSelectionMatches(),
		keymap.of([
			indentWithTab,
			//...closeBracketsKeymap,
			...defaultKeymap,
			...historyKeymap,
			...foldKeymap,
			...completionKeymap,
		]),
		Prec.highest(keymap.of([{
			key: "Ctrl-Enter",
			//run({state}) { return true; },
			run() { return true; },
		}])),
		rust(),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
	];

	if (options.oneDark)
		extensions.push(oneDark);

	return EditorState.create({
		doc: initialContents,
		extensions
	});
}

function createEditorView(state, parent) {
	return new EditorView({
		state,
		parent
	});
}

function undoEditorState(view) {
	//history.undo(view);
	undo(view);
}

export {
	createEditorState,
	createEditorView,
	undoEditorState,
	undo,
};

