<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [OpenMPI-4](#openmpi-4)
  - [Possible errors](#possible-errors)
  - [1. Download](#1-download)
  - [2. Compiling OpenMPI + GCC](#2-compiling-openmpi--gcc)
    - [USC1: (Cenntos 6.5)](#usc1-cenntos-65)
      - [InfiniBand cluster](#infiniband-cluster)
      - [no InfiniBand cluster](#no-infiniband-cluster)
    - [USC2: (Cenntos 6.9)](#usc2-cenntos-69)
    - [CANlab: (Cenntos 5.8)](#canlab-cenntos-58)
    - [CAN-GPU: (Ubuntu-18)](#can-gpu-ubuntu-18)
      - [Install conda](#install-conda)
      - [compile OpenMPI](#compile-openmpi)
  - [3. Compiling OpenMPI + Intel](#3-compiling-openmpi--intel)
    - [USC1: (Cenntos 6.5)](#usc1-cenntos-65-1)
      - [InfiniBand cluster](#infiniband-cluster-1)
    - [USC2: (Cenntos 6.9)](#usc2-cenntos-69-1)
  - [4. Make module file](#4-make-module-file)
  - [OpenMPI-5](#openmpi-5)
    - [USC1: (Cenntos 6.5)](#usc1-cenntos-65-2)
    - [USC2 (Cenntos 6.9) GCC](#usc2-cenntos-69-gcc)
    - [USC2(Cenntos 6.9) - Clang](#usc2cenntos-69---clang)
  - [2. Compiling OpenMPI + Clang](#2-compiling-openmpi--clang)
    - [USC2(Cenntos 6.9) - OPMI 4](#usc2cenntos-69---opmi-4)
      - [Prepare source code](#prepare-source-code)
      - [Building](#building)

<!-- /TOC -->

# OpenMPI-4

<img src="https://www.open-mpi.org/images/open-mpi-logo.png" style="float:left; margin-right:20px" width="150" />

[Open MPI](https://www.open-mpi.org/) is a Message Passing Interface (MPI) library project combining technologies and resources from several other projects (FT-MPI, LA-MPI, LAM/MPI, and PACX-MPI).

<br>

!!! note

    - OpenIB is an very old Infiband and is not maintained. So newer OpenMPI uses UCX, and openIB will be remove in OpenMPI-5 [see this](https://github.com/open-mpi/ompi/issues/11755)
    - There is also UCC


???+ note

    - Some applications require C++11, this is only supported on GCC 4.8 or newer, which is not always available on system, then newer GCC need to be installed before compiling Openmpi.
    - Make sure to build OpenMPI with 64-bit support. To check whether the currently available OpenMPI do support 64-bit or not, type this:
      `ompi_info -a | grep 'Fort integer size'. If the output is 8, then it supports 64-bit. If output is 4, then it just supports 32-bit.* configuration for 64-bit support:
      - For Intel compilers use: `FFLAGS=-i8 FCFLAGS=-i8 CFLAGS=-m64 CXXFLAGS=-m64`
      - For GNU compilers type: `FFLAGS="-m64 -fdefault-integer-8" FCFLAGS="-m64 -fdefault-integer-8" CFLAGS=-m64 CXXFLAGS=-m64'
    - must keep the source after compiling
    - consider to use [UCX](https://openucx.org/introduction/)
    - consider compile [your own PMIX](https://thangckt.github.io/doc/doc2_Cluster/1_compiling/PMIX.html).
    - consider using linker
      - lld linker:
        ```shell
        module load llvm/llvm-gcc10-lld                   # to use lld
        LDFLAGS="-fuse-ld=lld -lrt"
        ```

      - gold linker:
        ```shell
        module load tool_dev/binutils-2.32
        LDFLAGS="-fuse-ld=gold -lrt"
        ```


## Possible errors

- OpenMPI-4 use UCX by default (openMPI 4.0,3 --> ucx-1.7 or older). Solution: compile [your own UCX](https://thangckt.github.io/doc/doc2_Cluster/1_compiling/6_Compile_UCX.html).
- No components were able to be opened in the pml framework. `PML ucx cannot be selected`. This error may be due to no IB device, check it

```sh
ssh com054
ibv_devinfo
```

- counter exceeded may be solved by compile openMPI with [your own PMIX](https://thangckt.github.io/doc/doc2_Cluster/1_compiling/PMIX.html).

## 1. Download

[See what new in openMPI-4](https://raw.githubusercontent.com/open-mpi/ompi/v4.1.x/NEWS)

[download OpenMPI-4](https://www.open-mpi.org/software/ompi/v4.1/)

```shell
tar xvf openmpi-4.1.3rc1.tar.gz
cd openmpi-4.1.3rc1
```

## 2. Compiling OpenMPI + GCC

Need separated installations for: eagle, lion/leopard, cheetah, taycheon <br>
Installation OPTIONS in README.txt or `./configure -h`

- Sun Grid: `--with-sge`
- InfiniBand: `--with-verbs`
- with KNEM: `--with-knem=path`
- use UCX: `--with-ucx=path`

```shell
export myUCX=/uhome/p001cao/app/tool_dev/ucx-1.9
../configure...  --with-ucx=${myUCX}
```

### USC1: (Cenntos 6.5)

```note
- should use gold-linker to avoid compiling error
- UCX cause error: ib_md.c:329  UCX  ERROR ibv_reg_mr(address=0x145cb580, length=263504, access=0xf) failed: Resource temporarily unavailable. So dont use UCX on this server.
```

```shell
module load tool_dev/binutils-2.36                       # gold, should use to avoid link-error
module load compiler/gcc-11.2
export myKNEM=/uhome/p001cao/app/tool_dev/knem-1.1.4
```

#### InfiniBand cluster

```shell
cd openmpi-4.1.1
mkdir build_eagle && cd build_eagle

../configure CC=gcc CXX=g++ FC=gfortran F77=gfortran LDFLAGS="-fuse-ld=gold -lrt" \
--with-sge --without-ucx --with-verbs --with-knem=${myKNEM} \
--prefix=/uhome/p001cao/app/openmpi/4.1.1-gcc11.2-noUCX-eagle
```

#### no InfiniBand cluster

```shell
cd openmpi-4.1.1
mkdir build_lion && cd build_lion
../configure CC=gcc CXX=g++ FC=gfortran F77=gfortran LDFLAGS="-fuse-ld=gold -lrt" \
--with-sge --without-ucx --without-verbs --with-knem=${myKNEM} \
--prefix=/uhome/p001cao/app/openmpi/4.1.1-gcc11.2-noUCX-lion
```

```make
make  -j 20         # not use -j to know what error
make install
```

### CANlab: (Cenntos 5.8)

```shell
module load gcc/gcc-7.4.0

../configure CC=gcc CXX=g++ FC=gfortran F77=gfortran \
--with-sge --without-verbs --without-ucx  \
--prefix=/home/thang/app/openmpi/4.0.2-gcc7.4.0
```

### CAN-GPU: (Ubuntu-18)

```note
- install Cuda ussing GCC
- cuda-10 only support to gcc-8
- need binutils 2.22 or newer to link cuda
```

#### Install conda

- [CLI install Cuda](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#redhat-installation)
- Download:  `wget http://developer.download.nvidia.com/compute/cuda/10.2/Prod/local_installers/cuda_10.2.89_440.33.01_rhel6.run`
- Install (using Root acc)
  1. disable the graphical target, to update Nvidia driver

  ```shell
  systemctl isolate multi-user.target
  modprobe -r nvidia-drm
  ```

  ```shell
  module load compiler/gcc-7.4
  sh cuda_10.2.89_440.33.01_rhel6.run --toolkitpath=/home/thang/app/cuda-10.2
  ```

  2. after install Cuda, start the graphical environment again

  ```shell
  systemctl start graphical.target
  ```

#### compile OpenMPI

```shell
cd openmpi-4.1.1
mkdir build && cd build

module load compiler/gcc-7.4   # cuda-10 only support to gcc-8
module load binutils-2.35

../configure CC=gcc CXX=g++ FC=gfortran F77=gfortran \
--with-sge --without-ucx \
--with-cuda=/home/thang/app/cuda-10.2 \
--prefix=/home/thang/app/openmpi/4.1.1-gcc7.4-cuda
```

## 3. Compiling OpenMPI + Intel

### USC1: (Cenntos 6.5)

#### InfiniBand cluster

```shell
cd openmpi-4.1.1
mkdir build_eagle && cd build_eagle
```

```shell
module load intel/compiler-xe19u5
module load compiler/gcc/9.1.0
# check: icpc -v
export PATH=/home1/p001cao/app/intel/xe19u5/compilers_and_libraries_2019.5.281/linux/bin/intel64:$PATH
export CC=icc  export CXX=icpc  export FORTRAN=ifort

../configure CC=icc CXX=icpc FC=ifort F77=ifort \
--with-sge --without-ucx --with-verbs --with-knem=${myKNEM} \
--prefix=/uhome/p001cao/app/openmpi/4.1.1-intelxe19u5-noUCX-eagle
```

### USC2: (Cenntos 6.9)

```shell
# use linker lld (include in Intel-bin, require GLIBC >2.15)
module load compiler/gcc-10.1.0
module load intel/compiler-xe19u5       # lld
##
export PATH=/home1/p001cao/app/intel/xe19u5/compilers_and_libraries_2019.5.281/linux/bin/intel64:$PATH
export CC=icc  export CXX=icpc  export FORTRAN=ifort
export myUCX=/home1/p001cao/app/tool_dev/ucx-1.8-intel

../configure CC=icc CXX=icpc FC=ifort F77=ifort LDFLAGS="-fuse-ld=lld -lrt" \
--with-sge --without-verbs --with-ucx=${myUCX} \
--prefix=/home1/p001cao/app/openmpi/4.0.4-intelxe19u5
```

## 4. Make module file

at directory: /uhome/p001cao/local/share/lmodfiles/mpi--> create file "ompi4.1.1-gcc11.2-noUCX"

```shell
# for Tcl script use only
module load compiler/gcc-11.2
module load tool_dev/binutils-2.37

set     topdir          /uhome/p001cao/app/openmpi/4.1.1-gcc11.2-noUCX-eagle

prepend-path   PATH                $topdir/bin
prepend-path   LD_LIBRARY_PATH     $topdir/lib
prepend-path   INCLUDE             $topdir/include

prepend-path   PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required
```

**Check:**

```shell
module load ompi4.1.1-gcc11.2-noUCX
mpic++ -v
```


## USC2(Cenntos 6.9)

!!! note

   - `--with-verbs` (default - auto detect)

```sh
# cd /home1/p001cao/0SourceCode
# wget https://github.com/open-mpi/ompi/releases/tag/v4.1.4/ompi-4.1.4.tar.gz
# tar xvf openmpi-4.1.4.tar.gz
# cd openmpi-4.1.4
```

**Download source code** (now working with this)

???+ note

    - How to build from source code [see here](https://docs.open-mpi.org/en/main/developers/prerequisites.html#sphinx)
    - Now, work with this
    - `./autogen.pl` is the same as `./autogen.sh`

```sh
cd /home1/p001cao/0SourceCode
# wget https://github.com/open-mpi/ompi/releases/download/v4.1.5/ompi-4.1.5.tar.gz
# git clone -b v4.1.x https://github.com/open-mpi/ompi.git  ompi-4.1.x
cd ompi-4.1.x
git pull origin v4.1.x

module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.pl
```

### Using LLVM

???+ note

    - To use clang libc++, use this link `export CPPFLAGS="-nodefaultlibs -lc++ -lc++abi -lm -lc -lgcc_s -lgcc"`. But might not be used?
    - To solve `error: unknown argument: '-soname'` --> [see this](https://github.com/CopernicaMarketingSoftware/PHP-CPP/issues/368)
    - dont use export CFLAGS="-gdwarf-2 -gstrict-dwarf"


#### Building

```sh
rm -rf build_llvm && mkdir build_llvm && cd build_llvm

module load compiler/llvm-17          # clang + lld
module load tooldev/ucc1.2

myLLVM=/home1/p001cao/app/compiler/llvm-17
export PATH=$myLLVM/bin:$PATH
export CC=clang CXX=clang++ FC=gfortran        # flang-new
export LDFLAGS="-fuse-ld=lld -lrt"
myUCX=/home1/p001cao/app/tooldev/ucx1.15-clang17
myUCC=/home1/p001cao/app/tooldev/ucc1.2
myPREFIX=/home1/p001cao/app/mpi/openmpi4.1.x-clang17-ucx1.15

../configure --with-sge --without-verbs --with-ucx=${myUCX} --with-ucc=${myUCC} --prefix=${myPREFIX}

make  -j 16 && make install
```

Test:
```sh
mpicc ../examples/hello_c.c -o ../examples/hello_c.exe
mpirun -np 2 ../examples/hello_c.exe
```

```sh
module load mpi/ompi4.1.x-clang17
mpirun --version
```

Other options
```sh
export my_PMIX=/home1/p001cao/app/tool_dev/pmix-4.1.2
export my_libevent=/home1/p001cao/app/tool_dev/libevent-2.1.11       # require by PMIX
export my_hwloc=/home1/p001cao/app/tool_dev/hwloc-2.8.0

--with-pmix=${my_PMIX} --with-libevent=${my_libevent} --with-hwloc=${my_hwloc}
```

### LLVM - no UCX
```sh
rm -rf build_noUCX && mkdir build_noUCX && cd build_noUCX

module load compiler/llvm-17          # clang + lld

myLLVM=/home1/p001cao/app/compiler/llvm-17
export PATH=$myLLVM/bin:$PATH
export CC=clang CXX=clang++ FC=gfortran        # flang-new
export LDFLAGS="-fuse-ld=lld -lrt"
myPREFIX=/home1/p001cao/app/mpi/openmpi4.1.x-clang17-noUCX

../configure --with-sge --with-verbs --without-ucx --prefix=${myPREFIX}

make -j 16 && make install
```

### GCC 11

```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.x
rm -rf build_ase && mkdir build_ase && cd build_ase

module load compiler/gcc-11
myGCC=/home1/p001cao/app/compiler/gcc-11
export PATH=$myGCC/bin:$PATH
export CFLAGS="-gdwarf-2 -gstrict-dwarf"
myUCX=/home1/p001cao/app/tooldev/ucx-1.15-gcc
myPREFIX=/home1/p001cao/app/mpi/openmpi4.1.x-gcc11

../configure --with-sge --without-verbs --with-ucx=${myUCX} --prefix=${myPREFIX}

make -j 16 && make install
```

Test
``` sh
module load mpi/ompi4.1.x-gcc11
mpirun --version
```

### GCC 9
```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.5
rm -rf build_gcc && mkdir build_gcc && cd build_gcc

module load compiler/gcc-9.5
myGCC=/home2/app/compiler/gcc/9.5.0
export PATH=$myGCC/bin:$PATH
myUCX=/home1/p001cao/app/tooldev/ucx1.15-gcc9
myPREFIX=/home1/p001cao/app/openmpi/4.1.5-gcc9

../configure --with-sge --without-verbs --with-ucx=${myUCX} --prefix=${myPREFIX}

make -j 16 && make install
```

### GCC 9 - no UCX
```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.5
rm -rf build_gcc && mkdir build_gcc && cd build_gcc

module load compiler/gcc-9.5
myGCC=/home2/app/compiler/gcc/9.5.0
export PATH=$myGCC/bin:$PATH
myPREFIX=/home1/p001cao/app/mpi/openmpi4.1.5-gcc9-noUCX

../configure --with-sge --with-verbs --without-ucx --prefix=${myPREFIX}

make -j 16 && make install
```