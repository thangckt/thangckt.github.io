---
hide:
---


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

In file `.vscode/extensions.json`:

```js
{
  // Recommend extensions
  "recommendations": [
    "james-yu.latex-workshop",
    "znck.grammarly",
    "ms-python.python",
    "seansassenrath.vscode-theme-superonedark",

    //"zhuangtongfa.material-theme",
    // "dcasella.monokai-plusplus",
    // "monokai.theme-monokai-pro-vscode",
    // "github.github-vscode-theme"
    ]
}
```

## Thang's Setting

These setting should be applied for `user/setting.json`

Open the command palette (either with `F1` or `Ctrl+Shift+P`)

Type `open settings`

### Editor & Theme

```js
  "window.zoomLevel": 0,
  "security.workspace.trust.enabled": false,
  "workbench.colorTheme": "One Dark Pro Darker",         // "One Dark Pro Darker"  "Super One Dark"
  // "workbench.iconTheme": "vs-minimal",
  // "zenMode.hideLineNumbers": true,
  // "breadcrumbs.enabled": true,
  "debug.console.fontSize": 12,
  "terminal.integrated.fontSize": 12,

  //=== Setting Editor & Theme
  "editor.tabSize": 4,
  // "editor.formatOnSave": true,
  "editor.minimap.enabled": true,
  "editor.rulers": [ 80  ],
  "editor.wordWrap": "on",            //  wordWrapColumn    bounded   on
  "editor.wrappingIndent": "same",
  // "editor.wordWrapColumn": 100,
  "editor.fontFamily": "roboto mono", //  'anonymous pro',   tahoma   consolas   monospace  verdana  monaco
  "editor.fontSize": 13.5,
  "editor.letterSpacing": -0.2,
  // "editor.renderControlCharacters": true,
```

### Grammarly

``` js
  //=== Grammarly
  "grammarly.files.include": [ "**/*.md", "**/*.tex", "**/*.txt"  ],
```

### Files

```js
    //=== Files & Linting
  "files.autoSave": "afterDelay",
  "files.trimTrailingWhitespace": true,
  "files.associations": {
    "*.lmp": "lmps", "*.in": "lmps", "*.mod": "lmps", "*.lmp*": "lmps", "*.lammps": "lmps",
    "*.log": "log", "*.out": "log",
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
    "editor.formatOnSave": true,
    "editor.snippetSuggestions": "none",
  },

  "[latex]": {
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "editor.minimap.enabled": false,
  },

  "[python]": {
    "editor.formatOnSave": false,
    "editor.snippetSuggestions": "none",
    "editor.detectIndentation": true,
    "editor.insertSpaces": true,
  },

  //=== Linting
  "python.analysis.diagnosticSeverityOverrides": {
    "reportUnusedImport": "information",
    "reportMissingImports": "none"
  },

```

### Latex-workshop

```js
  //=== Setting for latex-workshop
  "latex-workshop.latex.recipe.default": "latexmk ➞ copyPDF",
  "latex-workshop.latex.outDir": "Zoutdir",
  "latex-workshop.latex.autoBuild.run": "onSave",
  "latex-workshop.texcount.autorun": "onSave",
  "latex-workshop.message.badbox.show": false,
  // "latex-workshop.linting.chktex.enabled": true,
  // "latex-workshop.linting.lacheck.enabled": true,
  "latex-workshop.synctex.synctexjs.enabled": true,
  "latex-workshop.synctex.afterBuild.enabled": true,
  "latex-workshop.view.pdf.viewer": "tab",
  // "latex-workshop.view.pdf.invert": 1,
  // "latex-workshop.view.pdf.invertMode.grayscale": 0.6,
  // Compile latex
  "latex-workshop.latex.recipes": [
    {
      "name": "latexmk ➞ copyPDF",
      "tools": [
        "latexmk_tha",
        "copyPDFshell"
      ]
    }
  ],
  "latex-workshop.latex.tools": [
    {
      "name": "latexmk_tha",
      "command": "latexmk",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "-pdf",
        "-f",
        "--shell-escape",
        "-outdir=%OUTDIR%",
        "%DOC%",
      ],
      "env": {}
    },
    // Tool to copy PDF
    {
      "name": "copyPDFcmd",
      "command": "cmd.exe",
      "args": [
        "/c",
        "copy",
        "'%OUTDIR%\\%DOCFILE%.pdf'",
        "%DIR%",
      ],
      "env": {}
    },
    {
      "name": "copyPDFshell",
      "command": "powershell.exe",
      "args": [
        "copy '%OUTDIR%\\%DOCFILE%.pdf' %DIR%" //  copy move
      ],
      "env": {}
    }
  ],
```

### Jupyter Notebooks

* [github](https://github.com/microsoft/vscode-jupyter)

```js
    //=== Setting for Jupyter Notebooks
    "notebook.markup.fontSize": 13.5,
    "markdown.preview.fontFamily": "roboto",
    "markdown.preview.fontSize": 14
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
