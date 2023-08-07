<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Conda Installation](#conda-installation)
  - [Centos 6 (Tachyon)](#centos-6-tachyon)
    - [Install](#install)
    - [Create Conda module file](#create-conda-module-file)
    - [Update conda](#update-conda)
  - [Centos 7 (Eagle)](#centos-7-eagle)
    - [install](#install-1)
    - [module file](#module-file)
  - [Create Python Environments in conda](#create-python-environments-in-conda)
    - [2. Install Miniconda on Windows](#2-install-miniconda-on-windows)
  - [II. Environments management \& installation packages](#ii-environments-management--installation-packages)
    - [Install \& Update packages in Conda](#install--update-packages-in-conda)
  - [pre-release](#pre-release)
  - [IV. Some useful packages Numpy, scipy, pandas, matplotlib](#iv-some-useful-packages-numpy-scipy-pandas-matplotlib)
      - [reset all packages in an environment](#reset-all-packages-in-an-environment)
  - [Some setting envs](#some-setting-envs)
  - [Using `environment.yml`](#using-environmentyml)

<!-- /TOC -->

# Conda Installation

## Centos 6 (Tachyon)

!!! note

    - Use `llvm` suite, it contains the compiler and linker `clang lld lldb llvm-tools`. The compiler `clang` also include its dependencies (libc++, libcxxabi), so do not need to install `libclang libclangxx`
    - LLVM can be used as a replacement for GCC (GNU Compiler Collection) and G++ (GNU C++ Compiler) to compile C and C++ code, respectively. LLVM includes the Clang C and C++ compilers. Use `clang` and `clang++` in place of `gcc` and `g++`.
    - Can install some packages: `openmpi`, `scalapack`,...
    - Should install all packages from `conda-forge`, then they can link to each other. Avoid using `pip`, since it can not provide a proper link.

Download the Anaconda installer for Linux from [Anaconda repo](https://repo.anaconda.com/miniconda/) `Anaconda3-2019.03-Linux-x86_64.sh`

Consider Miniconda for light, and reduce error

### Install
???+ note

    - Newer `conda` may require higher GLIBC --> use old version. glibc 2.12 only supports up to `Miniconda3-py39_4.9.2-Linux-x86_64.sh`

```sh
cd /home1/p001cao/local/wSourceCode
wget https://repo.continuum.io/miniconda/Miniconda3-py39_4.9.2-Linux-x86_64.sh

sh Miniconda3-py39_4.9.2-Linux-x86_64.sh -u
```

choose a folder to install:
```
/home1/p001cao/local/app/miniconda3
```
running conda init?  --> NO

... finish

### Create Conda module file

``` tcl
set     topdir          /home1/p001cao/local/app/miniconda3
prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    INCLUDE                 $topdir/include
prepend-path    PKG_CONFIG_PATH 	    $topdir/lib/pkgconfig
```

### Update conda

Never use this:
``` sh
conda update -n base -c defaults conda
```

Should use
``` sh
module load conda/conda3
conda activate base
conda install conda
```

Solve update error: update `conda` can cause error: CondaHTTPError: HTTP 000 CONNECTION FAILED --> solved by [this](https://stackoverflow.com/questions/70963033/condahttperror-http-000-connection-failed-for-url-on-centos-6)
    - download 2 files [ca-certificate](https://anaconda.org/conda-forge/ca-certificates/2021.10.8/download/linux-64/ca-certificates-2021.10.8-ha878542_0.tar.bz2) and [openssl](https://anaconda.org/conda-forge/openssl/1.1.1k/download/linux-64/openssl-1.1.1k-h7f98852_0.tar.bz2), and install into base-env
    ```
    conda install openssl-1.1.1k-h7f98852_0.tar.bz2
    conda install ca-certificates-2021.10.8-ha878542_0.tar.bz2
    ```

or download `*.conda` files

``` sh
cd /home1/p001cao/local/wSourceCode
wget --no-check-certificate https://anaconda.org/conda-forge/ca-certificates/2023.5.7/download/linux-64/ca-certificates-2023.5.7-hbcca054_0.conda
wget --no-check-certificate https://anaconda.org/conda-forge/openssl/1.1.1u/download/linux-64/openssl-1.1.1u-hd590300_0.conda

conda install ca-certificates-2023.5.7-hbcca054_0.conda
conda install openssl-1.1.1u-hd590300_0.conda
```

## Centos 7 (Eagle)

!!! note

    - new GLIBC can avoid tons of error
    - apps only run from folder `uhome`, check if out of memory
    - save source-codes in dir `uwork` to save memory of `uhome`

### install

```sh
cd /uwork/p001cao/#SourceCode
wget https://repo.continuum.io/miniconda/Miniconda3-py311_23.5.2-0-Linux-x86_64.sh

sh Miniconda3-py311_23.5.2-0-Linux-x86_64.sh -u
```
choose a folder to install:
```
/uhome/p001cao/app/miniconda3
```
running conda init?  --> NO


### module file

``` tcl
set     topdir          /uhome/p001cao/app/miniconda3
prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    INCLUDE                 $topdir/include
prepend-path    PKG_CONFIG_PATH 	      $topdir/lib/pkgconfig
```
and put this file into the folder:  `/uhome/p001cao/app/1module_files/conda/conda3`


## Centos 7.8 - Dumpo

### install

```sh
cd /gpfs/home/p001c21/tha/#SourceCode
wget https://repo.continuum.io/miniconda/Miniconda3-py311_23.5.2-0-Linux-x86_64.sh

sh Miniconda3-py311_23.5.2-0-Linux-x86_64.sh -u
```

```
/gpfs/home/p001c21/tha/app/miniconda3
```
--> NO

### module file

``` tcl
set     topdir          /gpfs/home/p001c21/tha/app/miniconda3
prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    INCLUDE                 $topdir/include
prepend-path    PKG_CONFIG_PATH 	      $topdir/lib/pkgconfig
```
and put this file into the folder:  `/gpfs/home/p001c21/tha/app/1module_files/conda/conda3`



## Create Python Environments in conda

ref: [environment-modules](https://manjusri.ucsc.edu/2017/09/08/environment-modules)

create 2 environments: python37, python27

```sh
module load conda/conda3
conda create -n py37Lammps python=3.7.5
conda create -n py27env python=2.7
```

create module files for 2 environments

```tcl
set     topdir          /uhome/p001cao/local/Miniconda3/envs/py37ompi

prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    INCLUDE                 $topdir/include
```

References:
<https://stackoverflow.com/questions/22885134/how-to-load-virtualenv-using-environmental-module-file-tcl-script>

1) How To Install the Anaconda Python Distribution on Ubuntu 16.04
2) Installing Anaconda on Linux
3) No .bashrc file in my home directory
4) Using vi, the Unix Visual Editor

## 2. Install Miniconda on Windows

Anaconda: <https://www.anaconda.com/distribution/#windows>
Miniconda: <https://repo.anaconda.com/miniconda/>
make anaconda available in cmd windows, and can double click to open jypyter file
add 3 new environment variable path: Environment Variables --> System Variables --> path --> edit

```sh
C:\DevProgram\miniconda3
C:\DevProgram\miniconda3\Scripts
C:\DevProgram\miniconda3\Library\bin
```

- for environment named py37 (should not use to avoid errors, maybe in tf)

```sh
C:\DevProgram\miniconda3\envs\py37
C:\DevProgram\miniconda3\envs\py37\Scripts
C:\DevProgram\miniconda3\envs\py37\Library\bin
```

- if install location by default

```sh
C:\Users\tha\miniconda3
C:\Users\tha\miniconda3\Scripts
C:\Users\tha\miniconda3\Library\bin
```

- Set default environment in anaconda On Windows: <https://tinyurl.com/y2meq2wm>
right-lick on: Anaconda Powershell Prompt (miniconda3) shorcut --> properties -->Target:

```sh
change: ...; conda activate 'C:\DevProgram\miniconda3'
to : ...; conda activate 'C:\DevProgram\miniconda3\envs\py37'
```

## II. Environments management & installation packages

With conda, you can create, export, list, remove, and update environments that have different versions of Python and/or packages installed in them. Switching or moving between environments is called activating the environment

1. To see list of all environments:
conda info --envs             # or
conda env list
(default just only 1 root environment with name : base) The active environment is marked with an asterisk
Viewing a list of the packages in an environment
conda list -n myenv
conda list -n py37env
If the environment is activated,
conda list

2. Create an environment
To create an environment with a specific version of Python:

```sh
conda create -n py36mpi python=3.6
conda create -n py27env python=2.7
To create an environment with a specific version of a package:
conda create -n py36mpi python=3.6 scipy=1.3.1 numpy=1.16.5
## or:
conda create -n py37env python=3.7
conda install -n py37env scipy=1.3.1 numpy=1.16.5
```

The default packages are installed every time you create a new environment. To create an environment with no install default packages:
conda create --no-default-packages -n myenv python
Cloning an environment You can make an exact copy of an environment by creating a clone of it:
conda create --name NewcloneEnv --clone oldEnv

we can create as many additional environments as you want. And the whole point is that these additional environments can contain different versions of Pythons and other packages.
D:\Miniconda3-64\. It contains the root environment and two important directories (the other directories are irrelevant for now):
\pkgs (it contains the cached packages in compressed and uncompressed formats)
\envs (it contains the environments — except for the root environment — in separate subdirectories)
The most significant executable files and directories inside a Conda environment (placed in the \envs\environmentname directory) are:
\python.exe — the Python executable for command line applications. So for instance, if you are in the directory of the Example App, you can execute it by: python.exe exampleapp.py
\pythonw.exe — the Python executable for GUI applications, or completely UI-less applications
\Scripts — executables that are parts of the installed packages. Upon activation of an environment, this directory is added to the system path, so the executables become available without their full path
\Scripts\activate.exe — activates the environment
And if you’ve installed Jupyter, this is also an important file:
\Scripts\jupyter-notebook.exe— Jupyter notebook launcher (part of the jupyter package).

3. Activating and leaving (deactivating) an environment
the root environment is activated by default, so you can use it without activation. In other cases, if you want to use an environment (for instance manage packages, or run Python scripts inside it) you need to first activate it
conda activate py37env
source activate py37env

- on linux can use module-file (see above)
Remove env:  conda  env  remove   -n  myenv

### Install & Update packages in Conda

install a package also replaces the current package. open Anaconda_Prompt

```sh
### Uninstall all packages
conda clean --yes --all
```

4.1 Searching for packages: To see if a specific package, such as SciPy, is available for installation:

```sh
conda search  scipy
conda search -c conda-forge mpi4py     # find package
conda search -c intel       mpi4py      # in used
conda search -c anaconda    mpi4py
```

4.2 Installing packages: in conda prompt, activated environment

```sh
conda activate  myenv
conda install python=3.6     # to use intel-mpi4py on window
conda install -c intel mpi4py=3.0.0=py36_intel_0
Install into specific environment:
conda install -n py37ompi scipy=1.3.1 numpy=1.16.5 python=3.7.4
```

Ref:
<https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html>
<https://protostar.space/why-you-need-python-environments-and-how-to-manage-them-with-conda>

IV. Useful packages
IV.1 jupyter notebook --> jypyterLab
Jupyter Lab: Evolution of the Jupyter Notebook. JupyterLab is a next-generation web-based user interface for Project Jupyter.
<https://jupyterlab.readthedocs.io/en/stable/user/notebook.html>
<https://jupyterlab.readthedocs.io/en/stable/getting_started/overview.html>
conda install -c conda-forge jupyterlab nodejs
pip install jupyterlab==2.2.0rc1
pip install jupyterlab==3.0.0a4

## pre-release

 pip install jupyterlab --pre
conda install -c conda-forge/label/jupyterlab_rc -c conda-forge/label/jupyterlab_server_rc -c conda-forge jupyterlab=3
conda install -c conda-forge/label/prerelease-jupyterlab jupyterlab

Use jupyter-Lab: right-click on ipynb files --> properties --> opens with: (change) --> jupyter-lab
Use jupyter-clasic: right-click on ipynb files --> properties --> opens with: (change) --> jupyter-notebok

- Monokai++ theme: <https://www.npmjs.com/package/@hokyjack/jupyterlab-monokai-plus>
- consider monokai++, identical-sublime-monokai theme for VScode

## IV. Some useful packages Numpy, scipy, pandas, matplotlib

```sh
conda install numpy scipy scikit-learn pandas matplotlib

# mpi4py with openmpi:
conda install -c conda-forge mpi4py
conda install -c intel mpi4py

# openmpi: (linux)
conda install -c conda-forge openmpi
conda install -c conda-forge openmpi-mpicc openmpi-mpicxx openmpi-mpifort

# Voro++, Ovito, shapely:
https://shapely.readthedocs.io/en/latest/manual.html
pip install tess ovito shapely

# OpenEye toolkit:
https://www.eyesopen.com/
conda search -c openeye openeye-toolkits
conda install -c openeye openeye-toolkits

3. lmfit
python lib for curve fitting
https://lmfit.github.io/lmfit-py/model.html
pip install lmfit
```

#### reset all packages in an environment

```python
conda install --revision 0
```

## Some setting envs

!!! note

- use mamba for faster
- use new python for better performance
- To use multi kernels in jupyterlab:
  - Install in base-env: `conda install -n base nb_conda_kernels`
  - Install jupyterlab in both base-env and sub-env
  - select to open notebook by jupyterlab in base-env
- If use VScode, then don't need jupyterlab, just need `conda install -n base jupyter`
- To solve error: ImportError: DLL load failed while importing shell: Can not find procedure. Downgrade `pywin32` in `base_env`

     ```sh
     conda install -n base pywin32=228
     ```

- Consider using `environment.yml` [see more](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#create-env-from-file)

Install mamba into the base environment:

```sh
conda install -n base nb_conda_kernels jupyterlab git -c conda-forge
```

```sh
pip install -n base git+https://github.com/jupyterlab/jupyterlab@3.6.x
```

**Install in envs**

!!! info "General use"

- env for general use, ovito should use with python=3.11
- `numba` has not supported by py311 yet.

```python
conda create -n py311 python=3.11
conda activate py311
conda install -y -c conda-forge jupyterlab ele numpy pandas matplotlib scipy shapely natsort lmfit
```

!!! info "ovito env"

- error Vers: ovito-3.7.10; 3.7.11
- Should use with python 39 to void unexpect errors.

```sh
conda create -n py39ovito python=3.9
conda activate py39ovito
conda install -y --strict-channel-priority -c https://conda.ovito.org -c conda-forge ovito=3.7.9
conda install -y -c conda-forge jupyterlab numpy ipyevents ipycanvas ipywidgets
```

!!! info "mbuild polymer"

- only suppot to py39
- channel `-c omnia` required for `packmol` on windows
- Error: DLL load failed while importing _openmm, solve by installing `openmm=7.7`

```python
conda create -n py39mbuild python=3.9
conda activate py39mbuild
conda install -y -c conda-forge -c omnia parmed foyer rdkit py3Dmol mdtraj openbabel packmol openmm=7.7 shapely natsort lmfit git
pip install git+https://github.com/thangckt/mbuild.git@thang
```

!!! info "pysimm"

```python
conda create -n py37pysimm python=3.7
conda activate py37pysimm
conda install -c conda-forge ambertools  # just run on linux
```

!!! info "py39video"

```sh
conda create -n py39video python=3.9
conda activate py39video
conda install -y -c conda-forge jupyterlab numpy pandas natsort
pip install gtts pyttsx3 pytube youtube-search-python google_images_download
pip install git+https://github.com/Zulko/moviepy.git
```

## Using `environment.yml`

[see here](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#create-env-from-file)

- The below command can be run everywhere (just need locate to folder contain `environment.yml`), using cmd
- Can specify option `--name myenv` in commanline, or set it in file 'environment.yml'
- Create an identical environment, run:

 ```sh
 conda env create --file environment.yml           # (--name myenv)
 ```

- Install/Update packages into an existing environment, run:

 ```sh
 conda env update --file environment.yml --prune   # (--name myenv)
 ```
