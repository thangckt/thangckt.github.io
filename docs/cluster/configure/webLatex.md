# webLatex

A complete alternative for Overleaf with VSCode + Web + Git Integration + GitHub Copilot + Grammarly/LanguageTool + Live Collaboration Support

[Github repo](https://github.com/sanjib-sen/WebLaTex)

Just need to create file `.devcontainer/devcontainer.json` in root folder of the repo:

``` js
// For format details, see https://aka.ms/devcontainer.json. For config options, see the README at:
// https://github.com/microsoft/vscode-dev-containers/tree/v0.245.2/containers/ubuntu
{
    "name": "weblatex",
    "image": "sanjibsen/weblatex:latest", // https://github.com/sanjib-sen/weblatex-docker
    "remoteUser": "root", // Do not change this
    "features": {},
    "customizations": {
        "vscode": {
            "settings": { // other setting are synced from github account
                "latex-workshop.latex.recipe.default": "latexmk -> copy_pdf_LinuxnMac",
                "latex-workshop.latex.autoBuild.run": "never",
                "latex-workshop.latex.pdfWatch.delay": 500,
                //"latex-workshop.latex.watch.delay": 500, // Deprecated. See here: https://github.com/sanjib-sen/WebLaTex/issues/8
                "latex-workshop.codespaces.portforwarding.openDelay": 20000
            },
            "extensions": [ // other extensions are synced from github account
                "James-Yu.latex-workshop",
                "GitHub.copilot",
                // Remove the line below if you do not want Live-Collaboration Feature
                "ms-vsliveshare.vsliveshare",
                // Uncomment the line below if you do not want LanguageTool Support
                // "valentjn.vscode-ltex",
                // Remove the line below if you do not want Grammarly
                "znck.grammarly"
            ]
        }
    }
}
```

Note that, WeLatex only work in Codespace. What is difference between `github.dev` and `Codespace` [see here](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)

We can connect to Codespace from github.dev: Run and Debug -> work on...

- Create new Codespace
- Clone and open locally
- Open remote repo without cloning it (extension Remote repo)