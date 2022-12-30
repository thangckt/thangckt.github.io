

# Latex in VScode

Can use Latex in VScode with the extension `Latex Workshop`
- Install tex compiler: Tex Live (recommend)
- Install VScode
- Install Latex Workshop extension


## Config Latex Workshop

- [Github](https://github.com/James-Yu/LaTeX-Workshop)
- See how to [setting the compilation](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile#building-the-document)


```
{

  "window.zoomLevel": 0,
  // Setting Editor
  "editor.fontSize": 14,
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",       //  wordWrapColumn    bounded
  // "editor.wrappingIndent": "same",
  // "editor.wordWrapColumn": 120,
  "editor.fontFamily": "arial" ,   //  arial, consolas

  // "editor.renderControlCharacters": true,
  // "zenMode.hideLineNumbers": true,
  // "workbench.iconTheme": "vs-minimal",
  // "workbench.colorTheme": "Srcery-gagbo",
  "breadcrumbs.enabled": true,

  "debug.console.fontSize": 12,
  "terminal.integrated.fontSize": 12,

  "latex-workshop.latex.recipe.default": "latexmk_thang",
  "latex-workshop.latex.outDir": "Zoutdir",
  "latex-workshop.linting.chktex.enabled": true,
  "latex-workshop.synctex.afterBuild.enabled": true,
  "latex-workshop.view.pdf.viewer": "tab",
  

  // Compile latex
  "latex-workshop.latex.recipes": [
      {
        "name": "latexmk ➞ copyPDF",
        "tools": ["latexmk_tha", "copyPDFshell"]
      }
    ],

  "latex-workshop.latex.tools": [
        {
          "name": "latexmk_tha",
          "command": "latexmk",
          "args": [ "-synctex=1",
                      "-interaction=nonstopmode",
                      "-file-line-error",
                      "-pdf",
                      "-outdir=%OUTDIR%",  
                      "%DOC%",
                      "-silent -f",
                      "--shell-escape",
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
              "%OUTDIR%\\%DOCFILE%.pdf", 
              "%DIR%",
          ],
          "env": {}
      },
      {
        "name": "copyPDFshell",
        "command": "powershell.exe",
        "args": [
            "copy '%OUTDIR%\\%DOCFILE%.pdf' %DIR%"
        ],
        "env": {}
    }
  ],
}
```



See [Why to switch from TexStudio to VScode](https://0x0f0f0f.github.io/blog/texnotes/)

## Some problems

- Copy PDF see [here](https://stackoverflow.com/questions/58267000/latex-workshop-recipe-tool-to-copy-pdf-filec)
- from code to pdf:
  - mac: cmd+option+j
  - windows/linux: ctrl+alt+j
- from pdf to code: ctrl+click


## Grammarly in VScode

- [Github](https://github.com/znck/grammarly) 

```
{
  "grammarly.files.include": [ "**/*.md", "**/*.tex", "**/*.txt" ],
}
```

**Grammarly account**
to connect your Grammarly account, run `grammarly.login` in `Command Palette` of VScode
To logout, run `grammarly.logout`

## Some problem in Tex files
- \input vs. \include in Latex [discuss here](https://tex.stackexchange.com/questions/246/when-should-i-use-input-vs-include)
- No `list of table` in `bookmark` [discuss here]()
  ```
  \phantomsection            % thang
  \addcontentsline{toc}{chapter}{List of Figures}    % thang
  \listoffigures{}
  ```
