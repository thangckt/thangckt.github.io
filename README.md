# Mkdocs page

This is the repository for a Mkdocs page

Only source code is here.

Mkdocs theme is used to build the `html` files in folder `/site`. Contents in this folder `/site` can be hosted in anywhere.

## Build page automatically

A github.workflow will automatically build the Mkdocs `/site` and put in the `gh-pages` branch.
Then push contents of `gh-pages` branch into the corresponding `gh-pages` branch of another distination_repository named `thangckt.github.io`

Content of `/site` is available at `http://thangckt.github.io`

## Error logs

The error that breakdown header is possible due to:
- `pip install mkdocs-jupyter` in github-action --> conflict 

