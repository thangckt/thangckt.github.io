

# Latex in VScode

Can use Latex in VScode with the extension `Latex Workshop`
- Install tex compiler: Tex Live (recommend)
- Install VScode
- Install Latex Workshop extension


## Config Latex Workshop

 Use latexmk

 ```json
 {
"latex-workshop.latex.tools": [
 {
  "name": "latexmk",
  "command": "latexmk",
  "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "-pdf",
        "-outdir=%OUTDIR%",
        "%DOC%"
        ],
  "env": {}
 },
 {
  "name": "xelatex",
  "command": "xelatex",
  "args": [
   "-synctex=1",
   "-interaction=nonstopmode",
   "-file-line-error",
   "%DOC%"
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
 }
],

 }

 ```

See how to [setting the compilation](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile#building-the-document)

See [Why to switch from TexStudio to VScode](https://0x0f0f0f.github.io/blog/texnotes/)

