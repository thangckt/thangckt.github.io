
<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Compile GCC](#compile-gcc)
  - [GCC-11](#gcc-11)
    - [1. Download:](#1-download)
    - [2. Install](#2-install)
      - [USC1: (eagle)](#usc1-eagle)
      - [USC 2](#usc-2)
      - [CAN](#can)
    - [CAN\_GPU](#can_gpu)
    - [3. Make module file](#3-make-module-file)
  - [GCC-13](#gcc-13)
    - [USC 2](#usc-2-1)

<!-- /TOC -->

# Compile GCC

<img src="https://gcc.gnu.org/img/gccegg-65.png" style="float:left; margin-right:20px" width="150" />

The [GNU Compiler](https://gcc.gnu.org) Collection includes front ends for C, C++, Objective-C, Fortran, Ada, Go, and D, as well as libraries for these languages (libstdc++,...).


```note
- Some applications require C++11, this is only supported on GCC 4.8 or newer
- [intel 2018 support gcc versions 4.3 - 6.3](https://software.intel.com/en-us/articles/intel-c-compiler-180-for-linux-release-notes-for-intel-parallel-studio-xe-2018)
- compile GCC outside source-dir, to avoid modifying source code when compiling get fail
- cuda does not support gcc > 8
```

## 1. Download:

* check all availabe versions GCC
  - [at this link](https://gcc.gnu.org/releases.html)
  - or check this:
  ```shell
  svn ls svn://gcc.gnu.org/svn/gcc/tags | grep gcc | grep release
  #or http://ftp.tsukuba.wide.ad.jp/software/gcc/releases
  ```
* download
  - use this
  ```shell
  wget http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/gcc-10.3.0/gcc-10.3.0.tar.gz
  tar xvf gcc-10.3.0.tar.gz
  ```
  - or git
  ```shell
  git clone -b releases/gcc-11.2.0 https://github.com/gcc-mirror/gcc gcc-11.2.0
  ```

## 2. Install
Include 2 steps:
- **download prerequisites:**
```shell
cd gcc-11.2.0
./contrib/download_prerequisites
```
- **Configure:** [see this link](https://gcc.gnu.org/install/configure.html)
```note
configure error: uint64_t or int64_t not found     --> need at least gcc-4.5
```

### Eagle - Centos 7.8

```shell
git clone -b releases/gcc-11.2.0 https://github.com/gcc-mirror/gcc gcc-11.2.0
cd gcc-11.2
git checkout releases/gcc-11.2
./contrib/download_prerequisites

mkdir build && cd build
module load compiler/gcc-10.3         # to avoid:  uint64_t or int64_t not found

../configure --enable-languages=c,c++,objc,obj-c++,fortran \
  --enable-shared --disable-multilib --with-system-zlib \
  --enable-checking=release --prefix=/uhome/p001cao/app/compiler/gcc-11.2
```

```make
make  -j 20         # not use -j to know what error
make install
# check: g++ -v
```

### Tachyon - Centos 6.9

``` sh
cd /home1/p001cao/0SourceCode
# git clone -b releases/gcc-11 https://github.com/gcc-mirror/gcc  gcc-11
cd gcc-11
# git checkout releases/gcc-11
./contrib/download_prerequisites
```

``` sh
rm -rf build && mkdir build && cd build

myGCC=/home2/app/compiler/gcc/9.5.0
export PATH=$myGCC/bin:$PATH
export LD_LIBRARY_PATH=$myGCC/lib64:$LD_LIBRARY_PATH

../configure --enable-languages=c,c++,objc,obj-c++,fortran \
  --enable-gold=yes --enable-checking=release --enable-shared --disable-multilib --with-system-zlib \
  --prefix=/home1/p001cao/app/compiler/gcc-11

make -j 16 && make install
```

### CAN
```shell
--prefix=/home/thang/app/compiler/gcc-10.3
```

### CAN_GPU
```shell
module load compiler/gcc-7.4   # cuda note support gcc > 8
--prefix=/home/thang/app/compiler/gcc-10.3'
```


### 3. Make module file
at directory: /uhome/p001cao/local/share/lmodfiles/GCC --> create file "gcc-11.2"

```shell
module load compiler/gcc/9.5.0

# for Tcl script use only
set             topdir          /uhome/p001cao/app/compiler/gcc-11.2

setenv           CC gcc
setenv           CXX g++
setenv           FC gfortran
setenv           F90 gfortran

prepend-path    PATH                    $topdir/bin
prepend-path    INCLUDE 	              $topdir/include/c++/11.2.0
prepend-path    LD_LIBRARY_PATH         $topdir/lib/gcc/x86_64-pc-linux-gnu/11.2.0
prepend-path    LD_LIBRARY_PATH         $topdir/lib64
prepend-path    LD_LIBRARY_PATH         $topdir/libexec/gcc/x86_64-pc-linux-gnu/11.2.0
prepend-path    INFOPATH                $topdir/share/info
```


## GCC-13
- complied, but don't use, since some source code can not recognize

### USC 2

!!! note

    - must run `./contrib/download_prerequisites`
    - To avoid error `uint64_t or int64_t not found`, use `gcc-10.3` (or a newer system-GCC)
    - update newer `binutils` to avoid errors. GCC-12/13 can not be compiled without `binutils`.
    - Error `fatal error: ld terminated with signal 11` may be due to full of memory

``` sh
# wget http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/gcc-12.2.0/gcc-12.2.0.tar.gz
# tar xvf gcc-12.2.0.tar.gz

cd /home1/p001cao/0SourceCode
git clone --branch releases/gcc-13 https://github.com/gcc-mirror/gcc.git  gcc-13
cd gcc-13
# git pull origin releases/gcc-13

./contrib/download_prerequisites
```

``` sh
rm -rf build && mkdir build && cd build

module load tooldev/binutils-2.40
export PATH=/home2/app/compiler/gcc/9.5.0/bin:$PATH

../configure --enable-languages=c,c++,objc,obj-c++,fortran \
--enable-checking=release --enable-shared --disable-multilib --with-system-zlib  \
--prefix=/home1/p001cao/app/compiler/gcc-13

make -j 16 && make install
```



