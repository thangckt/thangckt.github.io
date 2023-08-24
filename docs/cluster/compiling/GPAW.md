# GPAW from source

## UCX+OMPI Centos 6.9 - Tachyon
GLIBC=2.12

!!! note

    - ucx-infiniband conda does not work. So need [compile GPAW from source](https://wiki.fysik.dtu.dk/gpaw/platforms/Linux/centos.html)

### UCX
- Be sure that ucx to recognize IB. `UCT modules:   < ib cma knem >`

``` sh
cd /home1/p001cao/0SourceCode/tooldev
# wget https://github.com/openucx/ucx/releases/download/v1.13.1/ucx-1.13.1.tar.gz    # v1.15.0-rc3/ucx-1.15.0.tar.gz
# tar xvf ucx-1.13.1.tar.gz
cd ucx-1.15.0
rm -rf build_ase && mkdir build_ase  &&  cd build_ase

module load compiler/gcc-11
myGCC=/home1/p001cao/app/compiler/gcc-11
export PATH=$myGCC/bin:$PATH
export CFLAGS="-gdwarf-2 -gstrict-dwarf"
export CFLAGS="-Wno-shadow"
export myPREFIX=/home1/p001cao/app/tooldev/ucx-1.15-gcc

../contrib/configure-release --enable-mt --prefix=${myPREFIX}

make -j 16 && make install
```

Test
``` sh
module load tooldev/ucx-1.15-gcc
ucx_info -d | grep Transport
```

### OMPI
!!! note

   - `--with-verbs` (default - auto detect)

```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.x
rm -rf build_ase && mkdir build_ase && cd build_ase

module load compiler/gcc-11
myGCC=/home1/p001cao/app/compiler/gcc-11
export PATH=$myGCC/bin:$PATH
export CFLAGS="-gdwarf-2 -gstrict-dwarf"
export myUCX=/home1/p001cao/app/tooldev/ucx-1.15-gcc
export myPREFIX=/home1/p001cao/app/openmpi/4.1.x-gcc11

../configure --with-sge --with-ucx=${myUCX} --prefix=${myPREFIX}

make -j 16 && make install
```

Test
``` sh
module load mpi/ompi4.1.x-gcc11
mpirun --version
```

### Libs need MPI

#### scalapack and BLACS
!!! note

    - BLACS is a part of scaLAPACK, don't need to install it separately.
    - sometimes, need `-DMPI_C_COMPILER=$OPENMPI/bin/mpicc -DCMAKE_Fortran_COMPILER=$OPENMPI/bin/mpif90 `

```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone -b master https://github.com/Reference-ScaLAPACK/scalapack.git ScaLAPACK-master  #   v2.2.1  master
cd ScaLAPACK-master
rm -rf build && mkdir build && cd build
```

```sh
module load tooldev/cmake-3.27
module load mpi/ompi4.1.x-gcc11

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export F90=mpif90 export F77=mpif77
export myPREFIX=/home1/p001cao/app/mpi/scaLAPACK-2.2

cmake .. -DUSE_OPTIMIZED_LAPACK_BLAS=on -DBUILD_SHARED_LIBS=on -DCMAKE_INSTALL_PREFIX=${myPREFIX}

make -j 16 && make install
```

#### FFTW

```shell
cd /home1/p001cao/0SourceCode/tooldev
# tar -xvzf fftw-3.3.10.tar.gz
cd fftw-3.3.10
rm -rf build_ase && mkdir build_ase && cd build_ase

module load mpi/ompi4.1.x-gcc11

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90
export myPREFIX=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-gcc11

../configure --enable-sse2 --enable-threads --enable-openmp --enable-mpi --enable-shared --prefix=${myPREFIX}

make -j 16 && make install
```

#### Elpa
```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone -b new_release_2023.05.001 https://gitlab.mpcdf.mpg.de/elpa/elpa.git elpa-2023.05     #   new_release_2023.05.001  master
cd elpa-2023.05

module load conda/py11gpaw_source
module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.sh

rm -rf build && mkdir build && cd build
```

```sh
module load mpi/scaLAPACK-2.2
module load mpi/ompi4.1.x-gcc11

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90
myScaLapack=/home1/p001cao/app/mpi/scaLAPACK-2.2
export SCALAPACK_LDFLAGS="-L$myScaLapack/lib"
export SCALAPACK_FCFLAGS="-L$myScaLapack/lib"
export myPREFIX=/home1/p001cao/app/mpi/elpa2023.05-ompi4.1.x-gcc11
export CFLAGS=" -mmmx -msse -msse2 -mssse3 -msse4.1 -msse4.2 "

../configure --with-mpi=yes --enable-openmp --without-threading-support-check-during-build \
--disable-sse --disable-avx --disable-avx2 --enable-avx512=no --prefix=${myPREFIX}

make -j 16 && make install
```

#### libvdwxc
require FFTW3

https://libvdwxc.gitlab.io/libvdwxc/configuring-libvdwxc.html

```sh
cd /home1/p001cao/0SourceCode/tooldev
git clone https://gitlab.com/libvdwxc/libvdwxc.git
cd libvdwxc
./autogen.sh
rm -rf build && mkdir build && cd build

module load mpi/fftw3.3.10-ompi4.1.x-gcc11
module load mpi/ompi4.1.x-gcc11

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90
export CFLAGS="-O3 -march=native"
export FCFLAGS="-g -O2"
myPREFIX=/home1/p001cao/app/mpi/libvdwxc-ompi4.1.x-gcc11
myFFTW=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-gcc11

../configure --with-mpi --with-fftw3=$myFFTW --prefix=$myPREFIX

make -j 16 && make install
```


### conda env
Install all libs without needed MPI in conda to save time: libxc, matplotlib,..

``` sh
module load mpi/ompi4.1.x-gcc11

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90
```

``` sh
module load conda/conda3
conda create -y -n py11gpaw_source python=3.11  # higher python require newer GLIBC (don't work with py 11)
source activate py11gpaw_source
# conda install -y --revision 0

conda install -y --update-specs -c conda-forge python=3.11 ase libxc pip libgcc-ng=11 libgfortran-ng=11 libstdcxx-ng=11
```


### GPAW

``` sh
module load mpi/fftw3.3.10-ompi4.1.x-gcc11
module load mpi/elpa2023.05-ompi4.1.x-gcc11
module load mpi/scaLAPACK-2.2
module load mpi/ompi4.1.x-gcc11

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export LD_LIBRARY_PATH=$OPENMPI/lib:$LD_LIBRARY_PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90 export F77=mpif77

module load conda/conda3
source activate py11gpaw_source
```

``` sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone -b master https://gitlab.com/gpaw/gpaw.git gpaw-master      # 23.6.1  master
# git pull origin master
cd gpaw-master
```

1. Create file `siteconfig.py`
``` py
mpi = True
mpidir='/home1/p001cao/app/openmpi/4.1.x-gcc11'
compiler = '{}/bin/mpicc'.format(mpidir)
library_dirs = ['{}/lib'.format(mpidir)]
include_dirs = ['{}/include'.format(mpidir)]

fftw = True
libraries = ['xc', 'fftw3']
library_dirs += ['/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-gcc11/lib']
include_dirs += ['/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-gcc11/include']

scalapack = True
libraries += ['scalapack']
library_dirs += ['/home1/p001cao/app/mpi/scaLAPACK-2.2/lib']

elpa = True
elpadir = '/home1/p001cao/app/mpi/elpa2023.05-ompi4.1.x-gcc11'
libraries += ['elpa_openmp']
library_dirs += ['{}/lib'.format(elpadir)]
runtime_library_dirs = ['{}/lib'.format(elpadir)]
include_dirs += ['{}/include/elpa_openmp-2023.05.001'.format(elpadir)]

libvdwxc = True
libraries += ['vdwxc']
library_dirs += ['/home1/p001cao/app/mpi/libvdwxc-ompi4.1.x-gcc11/lib']
```

2. Install
``` sh
pip install -e .
```


3. Test
``` sh
gpaw test
```