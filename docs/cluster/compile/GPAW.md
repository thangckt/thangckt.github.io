# GPAW from source

## UCX+OMPI Centos 6.9 - Tachyon

GLIBC=2.12

!!! note

    - ucx-infiniband conda does not work. So need [compile GPAW from source](https://wiki.fysik.dtu.dk/gpaw/platforms/Linux/centos.html)
    - Dont use UCX to void error: Caught signal 11 (Segmentation fault: address not mapped)

### UCX

See [compile UCX](./UCX.md)

Test
``` sh
module load tooldev/ucx-1.15
ucx_info -d | grep Transport
```

### OMPI
Use openmpi-4.1.5, dont use higher

See [compile OpenMPI-4](./OpenMPI_4.md)

Test
``` sh
module load mpi/ompi4.1.x-gcc11
mpirun --version
```

### libxc
!!! note

    - `libxc>5.1.5` has different api with no more `XC_FAMILY_HYB_GGA`
    - use `libxc=6.2.2`, not master

GCC
```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone https://gitlab.com/libxc/libxc.git libxc
cd libxc
git checkout 5.1.4        # master  6.2.2  5.1.4
rm -rf build && mkdir build && cd build

module load tooldev/cmake-3.27
module load compiler/gcc-9.5

myGCC=/home2/app/compiler/gcc/9.5.0
export PATH=$myGCC/bin:$PATH
export CC=$myGCC/bin/gcc CXX=$myGCC/bin/g++
myPREFIX=/home1/p001cao/app/tooldev/libxc5.1.4-gcc9

cmake .. -DBUILD_SHARED_LIBS=on -DCMAKE_INSTALL_PREFIX=$myPREFIX

make -j 16 && make install
```

LLVM

NOTE: may avoid using Cmake
```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone https://gitlab.com/libxc/libxc.git libxc
cd libxc
git pull origin master  # master  6.2.2
rm -rf build && mkdir build && cd build

module load tooldev/cmake-3.27
module load compiler/llvm-17

myLLVM=/home1/p001cao/app/compiler/llvm-17
export PATH=$myLLVM/bin:$PATH
export CC=clang export CXX=clang++ export CXX=gfortran
export LDFLAGS="-fuse-ld=lld -lrt"
myPREFIX=/home1/p001cao/app/tooldev/libxc6.2.2-llvm17

cmake .. -DBUILD_SHARED_LIBS=on -DCMAKE_INSTALL_PREFIX=$myPREFIX

make -j 16 && make install
```

### OpenBLAS

See [compile OpenBLAS](./OpenBLAS.md)

To use
```sh
export myBLAS=/home1/p001cao/app/tooldev/openBLAS0.3.23-gcc9/lib64/libopenblas.so

-DBLAS_LIBRARIES=${myBLAS} -DLAPACK_LIBRARIES=${myBLAS}
```

### Libs need MPI

#### scaLAPACK and BLACS

!!! note

    - BLACS is a part of scaLAPACK, don't need to install it separately.

See [compile scaLAPACK and BLACS](./scaLAPACK_BLACS.md)

#### FFTW

See [compile FFTW](./FFTW.md)

#### Elpa
Don't use master

```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone https://gitlab.mpcdf.mpg.de/elpa/elpa.git elpa        #   new_release_2023.05.001  master
cd elpa
git checkout new_release_2023.05.001

module load conda/py11gpaw_source
module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.sh

rm -rf build && mkdir build && cd build
```
GCC 9
```sh
module load mpi/scaLAPACK2.2-ompi4.1.5-gcc9
module load mpi/ompi4.1.5-gcc9

OPENMPI=/home1/p001cao/app/openmpi/4.1.5-gcc9
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc CXX=mpic++ FC=mpifort F90=mpif90

myScaLapack=/home1/p001cao/app/mpi/scaLAPACK2.2-ompi4.1.5-gcc9
export SCALAPACK_LDFLAGS="-L$myScaLapack/lib"
export SCALAPACK_FCFLAGS="-L$myScaLapack/lib"
export CFLAGS=" -mmmx -msse -msse2 -mssse3 -msse4.1 -msse4.2 "
myPREFIX=/home1/p001cao/app/mpi/elpa2023.05-ompi4.1.5-gcc9

../configure --with-mpi=yes --enable-openmp --without-threading-support-check-during-build \
--disable-sse --disable-avx --disable-avx2 --enable-avx512=no --prefix=${myPREFIX}

make -j 16 && make install
```

LLVM
```sh
module load mpi/scaLAPACK-2.2
module load mpi/ompi4.1.x-clang17

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-clang17
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc CXX=mpic++ FC=mpifort F90=mpif90
export LDFLAGS="-fuse-ld=lld -lrt"

myScaLapack=/home1/p001cao/app/mpi/scaLAPACK-2.2
export SCALAPACK_LDFLAGS="-L$myScaLapack/lib"
export SCALAPACK_FCFLAGS="-L$myScaLapack/lib"
export CFLAGS=" -mmmx -msse -msse2 -mssse3 -msse4.1 -msse4.2 "
myPREFIX=/home1/p001cao/app/mpi/elpa2023.05-ompi4.1.x-clang17

../configure --with-mpi=yes --enable-openmp --without-threading-support-check-during-build \
--disable-sse --disable-avx --disable-avx2 --enable-avx512=no --prefix=${myPREFIX}

make -j 16 && make install
```

#### libvdwxc
require FFTW3

https://libvdwxc.gitlab.io/libvdwxc/configuring-libvdwxc.html

```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone https://gitlab.com/libvdwxc/libvdwxc.git
cd libvdwxc
./autogen.sh
rm -rf build && mkdir build && cd build
```

GCC
```sh
module load mpi/fftw3.3.10-ompi4.1.5-gcc9
module load mpi/ompi4.1.5-gcc9

OPENMPI=/home1/p001cao/app/openmpi/4.1.5-gcc9
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort  export F90=mpif90
export CFLAGS="-O3 -march=native"
export FCFLAGS="-g -O2"
myPREFIX=/home1/p001cao/app/mpi/libvdwxc-ompi4.1.5-gcc9
myFFTW=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.5-gcc9

../configure --with-mpi --with-fftw3=$myFFTW --prefix=$myPREFIX

make -j 16 && make install
```

LLVM
```sh
module load mpi/fftw3.3.10-ompi4.1.x-clang17
module load mpi/ompi4.1.x-clang17

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-clang17
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort  export F90=mpif90
export CFLAGS="-O3 -march=native"
export FCFLAGS="-g -O2"
export LDFLAGS="-fuse-ld=lld -lrt"
myPREFIX=/home1/p001cao/app/mpi/libvdwxc-ompi4.1.x-clang17
myFFTW=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-clang17

../configure --with-mpi --with-fftw3=$myFFTW --prefix=$myPREFIX

make -j 16 && make install
```


#### GPAW

!!! note

    - there is a problem with var `XC_FAMILY_HYB_GGA` in `libxc-master` as described in [here](https://gitlab.com/gpaw/gpaw/-/issues/953)
    - libxc cause error:
    - Gpaw may conflict with UCX, so use OpenMPI without UCX.

##### LLVM

!!! note

    - `scipy=1.6 numpy=1.22` cannot install in py=3.11 --> require higher GCC --> use LLVM
    - `python=3.11 libuuid=2.38.1`
    - need to load MPI before install package in conda

``` sh
module load conda/conda3
# conda create -y -n py11gpaw_source python=3.11.5
source activate py11gpaw_source
# conda install -y --revision 0
conda clean -a -y

conda install -y --update-specs -c conda-forge python=3.11.5 libuuid=2.38.1 # pillow
```

``` sh
module load mpi/fftw3.3.10-ompi4.1.x-clang17
module load mpi/elpa2023.05-ompi4.1.x-clang17
module load mpi/libvdwxc-ompi4.1.x-clang17
module load mpi/scaLAPACK2.2-ompi4.1.x-clang17
# module load tooldev/libxc6.2.2-clang17
module load tooldev/openBLAS0.3.23-clang17
module load mpi/ompi4.1.x-clang17-noUCX             # use openmpi-4.1.5

OPENMPI=/home1/p001cao/app/mpi/openmpi4.1.x-clang17-noUCX
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc CXX=mpic++ FC=mpifort F90=mpif90 F77=mpif77
myFFTW=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-clang17
export LD_LIBRARY_PATH=$OPENMPI/lib:$myFFTW/lib:$LD_LIBRARY_PATH
export LD_LIBRARY_PATH=/home1/p001cao/app/compiler/gcc-11/lib64:$LD_LIBRARY_PATH
export LDFLAGS="-fuse-ld=lld -lrt"
```

``` sh
pip install --ignore-installed git+https://gitlab.com/ase/ase.git@master
condadir=/home1/p001cao/app/miniconda3/envs/py11gpaw_source

cd /home1/p001cao/0SourceCode/tooldev                 # this may important
# git clone https://gitlab.com/gpaw/gpaw.git gpaw
cd gpaw
git pull origin master   # 23.6.1  master  22.8.0
rm -rf build

pip install --prefix=$condadir .
```

Test
``` sh
gpaw test         # gpaw -P 4 test

gpaw install-data --register $condadir/share/gpaw
```


NOTE: Create file `siteconfig.py`
``` py
library_dirs = []
include_dirs = []

# condadir = '/home1/p001cao/app/miniconda3/envs/py11gpaw_source'
# library_dirs += [condadir+'/lib']
# include_dirs += [condadir+'/include']

# libraries = ['xc']
# xcdir = '/home1/p001cao/app/tooldev/libxc5.1.4-gcc9'
# library_dirs += [xcdir + '/lib64']
# include_dirs += [xcdir + '/include']
# runtime_library_dirs = [xcdir + '/lib64']

nolibxc = True  # use GPAW's libxc
# xcdir = condadir

mpi = True
mpidir='/home1/p001cao/app/mpi/openmpi4.1.x-clang17'
compiler = mpidir+'/bin/mpicc'
library_dirs += [mpidir+'/lib']
include_dirs += [mpidir+'/include']
undef_macros = ['GPAW_MPI_INPLACE']

fftw = True
libraries = ['fftw3']
library_dirs += ['/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-clang17/lib']
include_dirs += ['/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-clang17/include']

scalapack = True
libraries += ['scalapack']
library_dirs += ['/home1/p001cao/app/mpi/scaLAPACK2.2-ompi4.1.x-clang17/lib']

elpa = True
elpadir = '/home1/p001cao/app/mpi/elpa2023.05-ompi4.1.x-clang17'
libraries += ['elpa_openmp']
library_dirs += [elpadir+'/lib']
include_dirs += [elpadir+'/include/elpa_openmp-2023.05.001']

libvdwxc = True
libraries += ['vdwxc']
library_dirs += ['/home1/p001cao/app/mpi/libvdwxc-ompi4.1.x-clang17/lib']
include_dirs += ['/home1/p001cao/app/mpi/libvdwxc-ompi4.1.x-clang17/include']

extra_compile_args = ['-fopenmp']
extra_link_args = ['-fopenmp']
```

##### test UCX

so far, not work with UCX because error: address not mapped. So use openIB in openMPI

``` sh
module load conda/conda3
conda create -y -n py11gpaw_ucx python=3.11.0
source activate py11gpaw_ucx
# conda install -y --revision 0
conda clean -a -y

conda install -y --update-specs -c conda-forge python=3.11.5 libuuid=2.38.1 pillow
```

``` sh
module load mpi/fftw3.3.10-ompi4.1.x-clang17
module load mpi/elpa2023.05-ompi4.1.x-clang17
module load mpi/libvdwxc-ompi4.1.x-clang17
module load mpi/scaLAPACK2.2-ompi4.1.x-clang17
# module load tooldev/libxc6.2.2-clang17
module load tooldev/openBLAS0.3.23-clang17
module load mpi/ompi5.0.x-clang17            # use openmpi-4.1.5

OPENMPI=/home1/p001cao/app/mpi/openmpi5.0.x-clang17
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc CXX=mpic++ FC=mpifort F90=mpif90 F77=mpif77
export LD_LIBRARY_PATH=$OPENMPI/lib:$LD_LIBRARY_PATH
export LD_LIBRARY_PATH=/home1/p001cao/app/compiler/gcc-11/lib64:$LD_LIBRARY_PATH
export LDFLAGS="-fuse-ld=lld -lrt"
```

``` sh
pip install --ignore-installed git+https://gitlab.com/ase/ase.git@master
condadir=/home1/p001cao/app/miniconda3/envs/py11gpaw_ucx

cd /home1/p001cao/0SourceCode/tooldev                 # this may important
# git clone https://gitlab.com/gpaw/gpaw.git gpaw
cd gpaw
git pull origin master   # 23.6.1  master  22.8.0
rm -rf build

pip install --prefix=$condadir .
```

##### GCC 9
!!! note

    - with gcc9, must use `scipy=1.6 numpy=1.22` --> suitable for py=3.9

``` sh
module load conda/conda3
conda create -y -n py9gpaw_source python=3.9.0
source activate py9gpaw_source
# conda install -y --revision 0
conda clean -a -y

conda install -y --update-specs -c conda-forge python=3.9.0 libzlib=1.2.11 scipy=1.6 numpy=1.22
```

``` sh
condadir=/home1/p001cao/app/miniconda3/envs/py11gpaw_source

module load mpi/fftw3.3.10-ompi4.1.5-gcc9
module load mpi/elpa2023.05-ompi4.1.5-gcc9
module load mpi/libvdwxc-ompi4.1.5-gcc9
module load mpi/scaLAPACK2.2-ompi4.1.5-gcc9
module load tooldev/libxc6.2.2-gcc9
module load tooldev/openBLAS0.3.23-gcc9
module load mpi/ompi4.1.5-gcc9-noUCX             # use openmpi-4.1.5

OPENMPI=/home1/p001cao/app/mpi/openmpi4.1.5-gcc9-noUCX
export PATH=$OPENMPI/bin:$PATH
export CC=$OPENMPI/bin/mpicc CXX=$OPENMPI/bin/mpic++
export MPICC=$OPENMPI/bin/mpicc MPICXX=mpic++
myFFTW=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.5-gcc9
export LD_LIBRARY_PATH=$OPENMPI/lib:$myFFTW/lib:$LD_LIBRARY_PATH
```



``` sh
cd /home1/p001cao/0SourceCode/tooldev      # this may important
# git clone https://gitlab.com/gpaw/gpaw.git gpaw
cd gpaw
git checkout master   # 23.6.1  master  22.8.0
rm -rf build

pip install .  --prefix=$condadir
```

NOTE: Create file `siteconfig.py`
``` py
library_dirs = []
include_dirs = []

# condadir = '/home1/p001cao/app/miniconda3/envs/py11gpaw_source'
# library_dirs += [condadir+'/lib']
# include_dirs += [condadir+'/include']

# libraries = ['xc']
# xcdir = '/home1/p001cao/app/tooldev/libxc6.2.2-gcc9'
# library_dirs += [xcdir + '/lib64']
# include_dirs += [xcdir + '/include']
# runtime_library_dirs = [xcdir + '/lib64']

nolibxc = True  # use GPAW's libxc
# xcdir = condadir

mpi = True
mpidir='/home1/p001cao/app/mpi/openmpi4.1.5-gcc9-noUCX'
compiler = mpidir+'/bin/mpicc'
library_dirs += [mpidir+'/lib']
include_dirs += [mpidir+'/include']

fftw = True
libraries = ['fftw3']
library_dirs += ['/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.5-gcc9/lib']
include_dirs += ['/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.5-gcc9/include']

scalapack = True
libraries += ['scalapack']
library_dirs += ['/home1/p001cao/app/mpi/scaLAPACK2.2-ompi4.1.5-gcc9/lib']

elpa = True
elpadir = '/home1/p001cao/app/mpi/elpa2023.05-ompi4.1.5-gcc9'
libraries += ['elpa_openmp']
library_dirs += [elpadir+'/lib']
include_dirs += [elpadir+'/include/elpa_openmp-2023.05.001']

libvdwxc = True
libraries += ['vdwxc']
library_dirs += ['/home1/p001cao/app/mpi/libvdwxc-ompi4.1.5-gcc9/lib']
include_dirs += ['/home1/p001cao/app/mpi/libvdwxc-ompi4.1.5-gcc9/include']

extra_compile_args = ['-fopenmp']
extra_link_args = ['-fopenmp']
```

### Module file
```sh
module load mpi/fftw3.3.10-ompi4.1.x-clang17
module load mpi/elpa2023.05-ompi4.1.x-clang17
module load mpi/libvdwxc-ompi4.1.x-clang17
module load mpi/scaLAPACK2.2-ompi4.1.x-clang17
module load tooldev/libxc6.2.2-clang17
module load tooldev/openBLAS0.3.23-clang17
# module load mpi/ompi4.1.x-clang17
# module load mpi/ompi4.1.x-clang17-noUCX

# for Tcl script use only
set     topdir          /home1/p001cao/app/miniconda3/envs/py11gpaw_source

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
prepend-path    GPAW_SETUP_PATH     $topdir/share/gpaw  # to see GPAW dataset
```