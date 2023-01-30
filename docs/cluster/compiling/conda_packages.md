# Install packages with conda

This way may eliminate some work on installing dependencies

???+ note

    - Use the `clang` compiler
    - Should in all packages available in `conda-forge`
    - Some packages require GLIBC=2.17.
        - May solve by installing `libgcc-ng=12` + `zlib=1.2.11`
    - Remember `ucx` and `openmp` for `openmpi`
    - For infiniBand, use `libibverbs-cos6-x86_64`

## USC2_Tachyon - Centos 6.9

### LAMMPS

!!! note

    - Some dependence require `libgcc-ng=12`
    - If running Lammmps requires `GLIBC>=2.17`, maybe solving by downgrade `zlib=1.2.11`

**Install Lammps** in Conda-env

```shell
module load conda/conda3
conda create -n py310lammps python=3.10
source activate py310lammps

conda install -c conda-forge clang lld llvm-tools libgcc-ng=12 zlib=1.2.11 \
    libibverbs-cos6-x86_64 openmpi ucx openmp \
    plumed lammps
```

**Create a module file** for Lammps

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py310lammps

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

### GPAW

**Install GPAW** in Conda-env

```sh
module load conda/conda3
conda create -n py310gpaw python=3.10
source activate py310gpaw

conda install -c conda-forge clang lld llvm-tools libgcc-ng=12 zlib=1.2.11 \
    libibverbs-cos6-x86_64 openmpi ucx openmp \
    fftw blas libxc scalapack elpa libvdwxc ase gpaw plumed
```

**Create a module file** for GPAW

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py310gpaw

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```

### LAMMPS + GPAW

This is for some convenience in linking and saving space.

clang lld llvm-tools

**Install** in Conda-env

```sh
module load conda/conda3
conda create -n py310gpaw_lammps python=3.10
source activate py310gpaw_lammps

conda install -y -c conda-forge clang lld llvm-tools libgcc-ng=12 zlib=1.2.11 \
    fftw blas libxc scalapack elpa libvdwxc openmpi ucx openmp libibverbs-cos6-x86_64 \
    ase gpaw plumed lammps
```

**Create a module file** for GPAW

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py310gpaw_lammps

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
