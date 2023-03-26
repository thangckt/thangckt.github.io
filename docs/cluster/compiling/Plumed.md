# Compile PLUMED

PLUMED 2.4 requires a compiler that supports C++11, and needs one of the following
- gcc 4.8.1      (need to install GCC)
- clang 3.3
- intel 15        (need to install Intel)

Intel alone does not fully support C++11 if the environment is without gcc 4.8 or newer. Installing an external GCC is a solution for this, but this may cause some errors when running Plumed due to cross-compiling.

!!! note
    - Making lepton library faster `--enable-asmjit`


## Dowload
- [github](https://github.com/plumed/plumed2)

```sh
https://github.com/plumed/plumed2/releases/tag/v2.5.2
tar xvzf plumed2-2.5.2.tar.gz
```

# download branch v2.5
git clone https://github.com/plumed/plumed2.git --branch=v2.5   plumed2-2.5.x
cd plumed2-2.5.x
git pull origin v2.5                           # or    git checkout v2.5

# download branch with PYCV
git clone --branch v2.6-pycv-devel  https://github.com/giorginolab/plumed2-pycv.git   plumed2-2.6pycv
cd    plumed2-2.6pycv

# download branch hack-the-tree
git clone   --branch hack-the-tree    https://github.com/plumed/plumed2.git    plumed2-2.7htt
cd plumed2-2.7htt
git pull origin hack-the-tree

git pull origin master

# or Clone a specific tag name using git clone: https://git-scm.com/docs/git-clone
git clone <url> --branch=<tag_name>
I. OMPI + Intel
1. USC1
module load mpi/openmpi4.0.2-Intel2019xe
module load intel/mkl-2019xe

check:  mpiicpc  -v                      (intel C++)
            mpicxx --version             ( gcc C++)

Notes: openMPI must be compile with gcc 4.8 or newer (load gcc/gcc-7.4.0 when compile openMPI)
# Install PLUMED
(to compile with mpi-enable, need to use compiler: CXX=mpic++   CC=mpicc)
chose modules to install: https://www.plumed.org/doc-v2.5/user-doc/html/mymodules.html
enable/disable modules:
./configure --enable-modules=+crystallization-colvar
./configure --enable-modules=all:-colvar-multicolvar
BLAS and LAPACK Libs
a. separate compile Blas & Lapack
b. use Blas & Lapack from intel_mkl
LIBS="-mkl"
c. or use internal link: (blas & lapack is automatically built, need FORTRAN compiler)
--disable-external-blas --disable-external-lapack \

VMD trajectory plugins
https://www.plumed.org/doc-master/user-doc/html/_installation.html


#Configuring PLUMED
./configure --prefix=/uhome/p001cao/local/app/plumed2/2.6htt \
CXX=mpic++ LIBS="-mkl" \
--enable-openmp --enable-modules=all --enable-asmjit

# or
./configure --prefix=/uhome/p001cao/local/app/plumed2/2.6 \
CXX=mpic++ --disable-external-blas --disable-external-lapack \
--enable-openmp --enable-modules=all --enable-asmjit

## create Module file + test
prepend-path PATH $topdir/bin
prepend-path   PATH                $topdir/bin
prepend-path   LD_LIBRARY_PATH     $topdir/lib
prepend-path   INCLUDE             $topdir/include
prepend-path   PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to Lammps can found Plumed

# test:
module load plumed2/2.6.0
plumed help

# USC2:
module load mpi/ompi4.0.3-intel19u5
module load intel/compiler-xe19u5
module load intel/mkl-xe19u5
Configure

./configure CXX=mpic++ CC=mpicc  LIBS="-mkl" \
--enable-openmp --enable-modules=all --enable-asmjit \
--prefix=/home1/p001cao/local/app/plumed2/2.7htt

make -j 8
make install
II. Install PLUMED using lMPI-2019xe
# 1. USC 1:
(use this, bc compilers are available for all clusters)
NOTE: intelMPI on eagle does not work, due to wrong path
1. Module load:
module load intel/compiler-xe19u5
module load mpi/impi-xe19u5
module load intel/mkl-xe19u5
module load compiler/gcc/9.1.0
module load conda/py37

Configure
./configure CXX=mpiicpc CC=mpiicc LIBS="-mkl" \
--enable-openmp --enable-modules=all --enable-asmjit \
--prefix=/uhome/p001cao/local/app/plumed2/2.6httIMPI \




# USC 2


IV. Install PLUMED using openmpi-4.0.1 + GCC-7.4.0 (CAN)
1. Module load:
module load mpi/openmpi4.0.1-gcc7.4.0
module load gcc/gcc-7.4.0

check:  mpic++ --version             ( gcc C++)
2. Install PLUMED
unzip plumed2-hack-the-tree.zip
cd plumed2-hack-the-tree

Configuring PLUMED:
./configure --prefix=/home/thang/local/app/plumed2/2.6.0-gcc \
CXX=mpic++ --disable-external-blas --disable-external-lapack \
--enable-openmp --enable-modules=all




## USC2

### with Conda

Need create conda env and install `ompi`, [see this](https://thangckt.github.io/cluster/compiling/conda_packages/#usc2_tachyon-centos-69)

check MPI compiler:  `mpic++ --version`

```sh
cd /home1/p001cao/local/wSourceCode
git clone  -b master   https://github.com/plumed/plumed2.git    plumed  # hack-the-tree  master
cd plumed
git pull origin master
```

```sh
module load conda/py310lammps
export myCOMPILER=/home1/p001cao/local/app/miniconda3/envs/py310lammps
export PATH=${myCOMPILER}/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort
export myPREFIX=/home1/p001cao/local/app/plumed2/ompi_conda_master

./configure --prefix=${myPREFIX} \
--enable-openmp --enable-modules=all --enable-asmjit \
--disable-external-blas --disable-external-lapack
```

```sh
make -j 16 && make install
```

???+ "see also"
    [1] https://www.plumed.org/doc-master/user-doc/html/_installation.html <br>
    [2] https://groups.google.com/forum/#!topic/plumed-users/x3YKcbDA-AE
