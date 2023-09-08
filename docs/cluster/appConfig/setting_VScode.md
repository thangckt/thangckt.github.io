---
hide:
---
<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [I. [Windows](https://code.visualstudio.com/docs/setup/windows)](#i-windowshttpscodevisualstudiocomdocssetupwindows)
  - [Python in Visual Studio Code](#python-in-visual-studio-code)
- [II. To change the indentation based on programming language](#ii-to-change-the-indentation-based-on-programming-language)
- [IV. Workspace settings](#iv-workspace-settings)
  - [Useful extensions](#useful-extensions)
- [Thang's Setting](#thangs-setting)
  - [Editor & Theme](#editor-theme)
  - [Grammarly](#grammarly)
  - [Files](#files)
  - [Latex-workshop](#latex-workshop)
  - [Jupyter Notebooks](#jupyter-notebooks)
  - [Python & Conda envs](#python-conda-envs)

<!-- /TOC -->

# VScode setting

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/113px-Visual_Studio_Code_1.35_icon.svg.png"
style="float:left; margin-right:20px" width="190" />

[Visual Studio Code](https://code.visualstudio.com/) is free, lightweight, and platform-independent.

## I. [Windows](https://code.visualstudio.com/docs/setup/windows)

Can install the Visual Studio Code installer for Windows, or use Zip archive, extract it and run Code from there.

By default, VS Code is installed under C:\users\{username}\AppData\Local\Programs\Microsoft VS Code.

### Python in Visual Studio Code

* Install the Python extension for VS Code (Microsoft)
* Install a Python interpreter

a. Select and Activate an environment

* Select Interpreter: Command Palette (Ctrl+Shift+P) --> Python: Select Interpreter
with Anaconda distribution, use ('base':conda)
__this sets the python.pythonPathvalue in workspace settings to the path of the interpreter. To see the setting, select File > Preferences > Settings > Workspace Settings tab.

* Set default interpreter: to set up a default interpreter for your applications, you can instead add an entry for python.pythonPath manually inside your User Settings.
Command Palette (Ctrl+Shift+P) > Preferences: Open User Settings > python.pythonPath

* Manually specify an interpreter
If VS Code does not automatically locate an interpreter you want to use, you can set the path to it manually in your Workspace Settings settings.json file
File (Code on macOS) > Preferences > Setting > Workspace
Then do any of the following steps:

Create or modify an entry for `python.pythonPath` with the full path to the Python executable (if you edit settings.json directly, add the line below as the setting):

        Windows: "python.pythonPath": "c:/python36/python.exe",
        macOS/Linux: "python.pythonPath": "/home/python36/python",

## II. To change the indentation based on programming language

<https://stackoverflow.com/questions/34174207/how-to-change-indentation-in-visual-studio-code>

<https://code.visualstudio.com/docs/editor/intellisense>

Open the Command Palette (CtrlShiftP | macOS: ⇧⌘P)
Preferences: Configure language-specific settings... (command id: workbench.action.configureLanguageBasedSettings)
Select programming language (for example: lammps)
Add this code:

```js
"[lammps]": {
    "editor.tabSize": 2
}
```

Setting.json
Open the command palette (either with F1 or Ctrl+Shift+P)
Type `open settings`

## IV. Workspace settings

Official guide [here](https://code.visualstudio.com/docs/editor/workspaces)

* In `root_folder`, create folder `.vscode`, then create files:
  * create file `.vscode/settings.json` for all settings will be applied in a `workspace`
  * create file `.vscode/extensions.json` for some suggested extensions

* In the VScode, navigate to `File --> Open Folder --> root_folder`, then all settings in the `.json` files will be applied

### Useful extensions

In file `.vscode/extensions.json`:

```js
{
  // Recommend extensions
  "recommendations": [
    "james-yu.latex-workshop",         // [Latex]()
    "znck.grammarly",                  // [Grammarly]()
    "ms-python.python",               // python
    "ms-python.vscode-pylance",
    "thfriedrich.lammps",             // Lammps
    "akamud.vscode-theme-onedark",   // [theme: Atom One Dark]()
    "executablebookproject.myst-highlight",  // MyST syntax

    // "gencay.vscode-chatgpt",        // [chatGPT](https://github.com/gencay/vscode-chatgpt)
    // "zhuangtongfa.material-theme",    // [theme: One Dark Pro]()
  ]
}
```

## Thang's Setting

These setting should be applied for `user/setting.json`

Open the command palette (either with `F1` or `Ctrl+Shift+P`)

Type `open settings`

### Editor & Theme

```js
	///==== Theme
	"workbench.colorTheme": "One Dark Pro",
	"terminal.integrated.tabFocusMode": false,
	"debug.console.fontSize": 12,
	"terminal.integrated.fontSize": 12,
	//==== Editor
	"editor.fontFamily": "roboto mono, monospace",
	"editor.tabSize": 4,
	"editor.formatOnSave": true,
	"editor.minimap.enabled": true,
	"editor.rulers": [
		80
	],
	"editor.wordWrap": "on", //  wordWrapColumn    bounded   on
	"editor.wrappingIndent": "same", //  none  same  indent
	"editor.fontSize": 14,
	"editor.letterSpacing": -0.5,
```


### Files

```js
"files.autoSave": "afterDelay",
	"files.trimTrailingWhitespace": true,
	"files.eol": "\n",
	"files.associations": {
		"*.lmp": "lmps",
		"*.in": "lmps",
		"*.mod": "lmps",
		"*.lmp*": "lmps",
		"*.lammps": "lmps",
		"*.log": "log",
		"*.out": "log",
		"*.txt": "txt",
	},
	"[lmps]": {
		"editor.tabSize": 2,
		"editor.snippetSuggestions": "none",
		"editor.quickSuggestions": {
			"other": false,
			"comments": false,
			"strings": false
		}
	},
	"[markdown]": {
		"editor.snippetSuggestions": "none",
	},
	"[latex]": {
		"editor.tabSize": 2,
		"editor.minimap.enabled": false,
	},
	"[python]": {
		"editor.formatOnSave": false,
		"editor.snippetSuggestions": "none",
		"editor.detectIndentation": true,
		"editor.insertSpaces": true,
	},
```

### Grammarly

``` js
	//==== Grammarly
	"grammarly.files.include": [
		"**/*.md",
		"**/*.tex",
		"**/*.txt"
	],
```

### Latex-workshop

```js
	//==== Latex-workshop
	"latex-workshop.latex.clean.fileTypes": [
		"*.aux",
	],
	"latex-workshop.latex.recipe.default": "latexmk -> copy_pdf_Windows",
	"latex-workshop.latex.outDir": "_texdir_",
	"latex-workshop.latex.autoBuild.run": "onSave",
	"latex-workshop.texcount.autorun": "onSave",
	"latex-workshop.message.badbox.show": false,
	// "latex-workshop.linting.chktex.enabled": true,
	// "latex-workshop.linting.lacheck.enabled": true,
	"latex-workshop.synctex.synctexjs.enabled": true,
	"latex-workshop.synctex.afterBuild.enabled": true,
	"latex-workshop.view.pdf.viewer": "tab",
	"latex-workshop.latex.autoClean.run": "onBuilt",
	"latex-workshop.latex.clean.subfolder.enabled": true,
	//== pdf dark mode (2 first lines of 3 last lines)
	// "latex-workshop.view.pdf.invert": 1,
	// "latex-workshop.view.pdf.invertMode.grayscale": 0.6,
	// "latex-workshop.view.pdf.color.dark.pageColorsBackground": "#171717", // For Dark Viewwer
	// "latex-workshop.view.pdf.color.dark.pageColorsForeground": "#FFFFFF", // For Dark Viewer
	// "latex-workshop.view.pdf.color.dark.backgroundColor": "#171717", // For Dark Viewer
	//== Compile latex : https://tex.stackexchange.com/questions/615318/vs-code-latex-change-only-pdf-out-dir
	"latex-workshop.latex.recipes": [
		{
			"name": "latexmk -> copy_pdf_Windows",
			"tools": [
				"latexmk",
				"copy_pdf_Windows"
			] // or "copy_pdf_LinuxMac" if you are on linux or mac
		},
		{
			"name": "latexmk -> copy_pdf_LinuxMac",
			"tools": [
				"latexmk",
				"copy_pdf_LinuxMac"
			] // or "copy_pdf_LinuxMac" if you are on linux or mac
		},
		{
			"name": "pdflatex -> bibtex -> pdflatex * 2",
			"tools": [
				"pdflatex",
				"bibtex",
				"pdflatex",
				"pdflatex",
				"copy_pdf_Windows"
			] // or "copy_pdf_LinuxMac" if you are on linux or mac
		}
	],
	"latex-workshop.latex.tools": [
		{
			"name": "latexmk",
			"command": "latexmk",
			"args": [
				"--shell-escape",
				"-f",
				"-synctex=1",
				"-interaction=nonstopmode",
				"-file-line-error",
				"-pdf",
				"-outdir=%OUTDIR%",
				"%DOC%",
			],
			"env": {}
		},
		{
			"name": "pdflatex",
			"command": "pdflatex",
			"args": [
				"-synctex=1",
				"-interaction=nonstopmode",
				"-file-line-error",
				"%DOC%"
			],
			"env": {}
		},
		{
			"name": "bibtex",
			"command": "bibtex",
			"args": [
				"%DOCFILE%"
			],
			"env": {}
		},
		//== Tool to copy PDF
		{
			"name": "copy_pdf_Windows",
			"command": "copy",
			"args": [
				"%OUTDIR_W32%\\%DOCFILE%.pdf",
				"%DIR_W32%\\"
			]
		},
		{
			"name": "copy_pdf_LinuxMac",
			"command": "cp",
			"args": [
				"%OUTDIR%/%DOCFILE%.pdf",
				"%DIR%/"
			]
		}
	],
```

### Jupyter Notebooks

* [github](https://github.com/microsoft/vscode-jupyter)

```js
	//==== Jupyter Notebooks
	"notebook.lineNumbers": "on",
	"notebook.showCellStatusBar": "hidden",
	"notebook.cellFocusIndicator": "border",
	"markdown.preview.fontFamily": "roboto",
	"notebook.markup.fontSize": 14,
	"markdown.preview.fontSize": 14,
```

1. Extensions:

    * Python (author: Microsoft)
    * Pylance (author: Microsoft)
    * Live Server (author: Ritwick Dey)
    * Jupyter Keymap (author: Microsoft)
    * Jupyter (author: Microsoft) (auto install)
    * Jupyter Notebook Renderers (author: Microsoft) (auto install)

2. Create a Python Environment and Install the Jupyter

```
conda create --name py311 python=3.11
conda install jupyter
```

Why VScode for Jupyter Notebooks refs:

    - [here](https://pbpython.com/vscode-notebooks.html)
    - [here](https://pbpython.com/vscode-notebooks.html)

### Python & Conda envs

```js
	//==== Python and Conda envs
	//  "python.defaultInterpreterPath": "C:/DevProgram/miniconda3/python.exe",
	//  "python.condaPath": "C:/DevProgram/miniconda3/Scripts/conda.exe",
	"python.terminal.activateEnvironment": true,
	"python.analysis.diagnosticSeverityOverrides": {
		"reportUnusedImport": "information",
		"reportMissingImports": "none"
	},
```
### Output
```js
	//==== Output
	"security.workspace.trust.enabled": false,
	"git.enableSmartCommit": true,
	"window.zoomLevel": 0,
	//==== Git
	"git.enableSmartCommit": true,
	"git.confirmSync": false,
	"git.autofetch": true,
	"git.openRepositoryInParentFolders": "never",
	"github.copilot.enable": {
		"*": true,
		"plaintext": true,
		"markdown": true,
		"scminput": false
	},
	"githubPullRequests.pullBranch": "never",
```

???+ tip "See also"

  1. [python/environments](https://code.visualstudio.com/docs/python/environments)
  2. [Efficient Way to Activate Conda in VSCode](https://medium.com/analytics-vidhya/efficient-way-to-activate-conda-in-vscode-ef21c4c231f2)
