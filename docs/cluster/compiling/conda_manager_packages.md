<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Install packages with conda](#install-packages-with-conda)
  - [Centos 6 - Tachyon](#centos-6---tachyon)
    - [LAMMPS](#lammps)
    - [GPAW](#gpaw)
    - [LAMMPS + GPAW](#lammps--gpaw)
  - [Centos 7 - Eagle](#centos-7---eagle)

<!-- /TOC -->

# Install packages with conda

This way may eliminate some work on installing dependencies

Some options for MPI

    - Openmpi: `conda install -y -c conda-forge openmpi`.
    - MPICH: `conda install -c conda-forge mpich`

Some hints to work around old GLIBC

    - Should update `conda` for better linking (important) --> use: `conda install conda`
    - This is for some convenience in linking and saving space.
    - old conda have many problems, but new conda require newer GLIBC, use these to avoid this requirement
        - `zlib=1.2.11 libgcc-ng=12 libgfortran-ng=12 libstdcxx-ng=12`, can use `gcc_linux-64=12`
        - `libffi=3.3  libblas=3.8`
        - new `openmpi` is not recognized in old GLIBC, so must downgrade thia package
    - `clang lld llvm-tools` can avoid requiring higher GLIBC ?
    - Python version: (3.9.4 or 3.11.0, don't use higher)
        - `gpaw` requires `numpy`, but `numpy` may require high GLIBC.
        = `python=3.11.1` require `libffi>=3.4`
    - Use `libblas=*=*mkl`
    - Some libs to consider:
        - c-compiler cxx-compiler
        - clang libclang clangxx libclang-cpp lld llvm-tools
    - Try to use the Intel [oneAPI Toolkits](https://www.intel.com/content/www/us/en/docs/oneapi/installation-guide-windows/2023-0/conda.html)
    - Consider `clang` compiler.
    - Don't use `mamba`, will cause the crash
    - Some packages require GLIBC=2.17.
        - May solve by installing `libgcc-ng=12` + `zlib=1.2.11`
    - `libibverbs-cos7-x86_64` is required for infiniBand

Install `glibc` (may not work)
```
conda install -y -c conda-forge -c neok.m4700 patchelf glibc
```

UCX usage:

    - check if InfiniBand support is active: `ls -l /dev/infiniband/{rdma_cm,uverbs*}`
        ```
        crw-rw-rw- 1 root root  10,  56 Aug 20  2022 /dev/infiniband/rdma_cm
        crw-rw-rw- 1 root root 231, 192 Aug 20  2022 /dev/infiniband/uverbs0
        ```
    - `numactl-libs-cos7-x86_64` needed for ucx.
    - `libibverbs-cos7-x86_64` needed for Infiniband libs.
    - To see ucx transports: `ucx_info -d | grep Transport`
    - use UCX with Open MPI: `export OMPI_MCA_pml=ucx export OMPI_MCA_osc=ucx`
    - set InfiniBand transports: `export UCX_TLS=self,rc_verbs,ud_verbs`  [see more](https://docs.nvidia.com/networking/display/HPCXv215/Unified+Communication+-+X+Framework+Library)



## Centos 6.9 - Tachyon

GLIBC=2.12

### LAMMPS

!!! note

    - Some dependence require `libgcc-ng=12`
    - If running Lammmps requires `GLIBC>=2.17`, maybe solving by downgrade `zlib=1.2.11`
    - `Plumed` in conda does not support MPI and may have [limited features](https://www.plumed.org/doc-v2.8/user-doc/html/_installation.html). Therefore, compile PLUMED separately, using MPI in [conda evironment](https://thangckt.github.io/cluster/compiling/Plumed/)
    - LAMMPS in conda may have [limited features?](https://docs.lammps.org/Install_conda.html). LAMMPS in conda also included Plumed
    - `lammps=2022.06.23` may have many conflicts.

**Install Lammps** in Conda-env

```shell
module load conda/conda3
conda create -n py310lammps python=3.10
source activate py310lammps

conda install -c conda-forge -y clang lld llvm-tools libclang libclang-cpp libgcc-ng=12 \
        libgfortran-ng=12 libstdcxx-ng=12 zlib=1.2.11 libibverbs-cos6-x86_64 \
        openmpi ucx openmp  lammps=2022.06.23
```

**Create a module file** for Lammps

```tcl
set     topdir          /home1/p001cao/app/miniconda3/envs/py310lammps

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```

```sh
fileLAMMPS=text.lmp

### mpirun /shmemrun
mpirun -np $NSLOTS -hostfile $TMPDIR/machines    lmp_mpi  -in ${fileLAMMPS}  -log LOG_${fileLAMMPS//.lmp/}_np$NSLOTS.log
```

### ASE

!!! note

    - higher python (>3.9.2) require newer GLIBC, and have many conflicts.
    - `ucx=1.14` does not recognize Infiniband, use `ucx=1.13`, check `ucx_info -d | grep Transport`
    - `libffi=3.3` to avoid higher GLIBC
    - `-c rapidsai-nightly rdma-core-devel-cos7-x86_64 librdmacm-devel-cos7-x86_64`
    - `gfortran=12 libgfortran-ng=12`

**Install** in Conda-env

``` sh
module load conda/conda3
conda create -n py9ase python=3.9.0   # higher python require newer GLIBC.
source activate py9ase

conda install --update-specs -y --revision 0

conda install --update-specs -y -c conda-forge -c lcls-ii python=3.9.0 \
    gcc=12 gxx=12 libgcc-ng=12 libstdcxx-ng=12 libgfortran-ng=12 zlib=1.2.11 \
    rdma-core libibverbs-devel-cos6-x86_64 numactl-devel-cos6-x86_64 libnuma libffi=3.3 ucx=1.13 openmpi=4.1.1 ase gpaw  # lammps
```

To see ucx transports: `ucx_info -d | grep Transport`

**Create a module file** for GPAW

``` tcl
set     topdir          /home1/p001cao/app/miniconda3/envs/py9ase

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
prepend-path    GPAW_SETUP_PATH     $topdir/share/gpaw      # to see GPAW dataset
```



## Centos 6.8 - CAN-GPU
GLIBC=2.12

!!! note
    Python 3.10 require newer GLIBC.

**Install** in Conda-env

``` sh
module load conda/conda3
conda create -n py9ase python=3.9.0   # higher python require newer GLIBC.
source activate py9ase

conda install -y -c conda-forge cudatoolkit openmpi ase gpaw  # lammps
```

``` sh
gpaw test
```

**Create a module file** for GPAW

``` tcl
set     topdir          /home/thang/app/miniconda3/envs/py9ase
```


## Centos 7 - Eagle

!!! note

    - new GLIBC can void tons of errors due to old GLIBC
    - use python 3.11
    - to use infiniband `libibverbs-cos7-x86_64`
    - `ucx=1.14` is not recognized, use `--update-specs` to solve this (or use `ucx=1.13`)

**Install**
``` sh
module load conda/conda3
conda  create -n py11ase python=3.11
source activate py11ase
```

``` sh
conda install --update-specs -y -c conda-forge  libibverbs-cos7-x86_64 numactl-libs-cos7-x86_64 \
     ucx openmpi ase gpaw  lammps
```

Test
``` sh
gpaw test
```

To see ucx transports: `ucx_info -d | grep Transport`

**module file**
``` tcl
set     topdir          /uhome/p001cao/app/miniconda3/envs/py11ase

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
prepend-path    GPAW_SETUP_PATH     $topdir/share/gpaw  # to see GPAW dataset
```

To consider:
```
conda install -y -c conda-forge -c rapidsai-nightly  c-compiler cxx-compiler  ucx-py
```

## Centos 7 GPU - Dumpo

!!! note

  Open MPI is built with CUDA awareness but this support is disabled by default.
  To enable it, please set the environment variable OMPI_MCA_opal_cuda_support=true before
  launching your MPI processes. Equivalently, you can set the MCA parameter in the command line:
  mpiexec --mca opal_cuda_support 1 ...

  In addition, the UCX support is also built but disabled by default.
  To enable it, first install UCX (conda install -c conda-forge ucx). Then, set the environment
  variables OMPI_MCA_pml="ucx" OMPI_MCA_osc="ucx" before launching your MPI processes.
  Equivalently, you can set the MCA parameters in the command line:
  mpiexec --mca pml ucx --mca osc ucx ...
  Note that you might also need to set UCX_MEMTYPE_CACHE=n for CUDA awareness via UCX.

```
export OMPI_MCA_opal_cuda_support=true
```

**Install**
``` sh
module load conda/conda3
conda  create -n py11ase python=3.11
source activate py11ase
```

``` sh
conda install -y -c conda-forge libibverbs-cos6-x86_64 cudatoolkit openmpi ase gpaw
```

Test
``` sh
gpaw test
```
