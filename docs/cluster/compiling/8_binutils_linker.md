---
sort: 8
---

# Binutils

to use Gold linker (first released in binutils version 2.19), should to avoid link-error
https://mirror.yongbok.net/gnu/binutils/?C=M&O=D
There are three linkers available on modern GNU/Linux systems:
    - ld, maintained by GNU binutils,
    - gold, maintained by GNU binutils, "still in beta test",
    - lld, developed as part of the LLVM project.
For speed benchmarks, see: https://www.phoronix.com/scan.php?page=article&item=lld4-linux-tests&num=2 TL, DR: lld is fastest, followed by gold, followed by ld
check  binutils version:  ld -v

Install: http://www.linuxfromscratch.org/lfs/view/development/chapter06/binutils.html

## UCS2: 
- `binutils-2.40` require to install:
    - [texinfo](https://ftp.gnu.org/gnu/texinfo/?C=M;O=D)
    - [bison](https://ftp.gnu.org/gnu/bison/?C=M;O=D)

```shell
cd /home1/p001cao/local/wSourceCode/tooldev
wget -c --no-check-certificate https://ftp.gnu.org/gnu/binutils/binutils-2.40.tar.gz    
tar zxvf binutils-2.40.tar.gz             
cd binutils-2.40
rm -rf build && mkdir build  &&  cd build

module load compiler/gcc-10.3

export PATH=$PATH:/home1/p001cao/local/app/compiler/gcc-10.3/bin
export CC=gcc export CXX=g++ export FC=gfortran
export CFLAGS="-gdwarf-4 -gstrict-dwarf"                                 # avoid dwarf5 error
export PATH=$PATH:/home1/p001cao/local/app/tooldev/texinfo-7.0.3/bin
export PATH=$PATH:/home1/p001cao/local/app/tooldev/bison-3.8.2/bin

../configure --enable-gold=yes --enable-ld=default --enable-lto \
--enable-plugins --enable-shared --disable-werror  \
--enable-64-bit-bfd --with-system-zlib \
--prefix=/home1/p001cao/local/app/tooldev/binutils-2.40

make -j 16  && make install
```

check:  ld -v


## UCS1: 
- work with binutils-2.36.1, to avoid error in GCC-11

```shell
tar zxvf binutils-2.36.1.tar.gz             
cd binutils-2.36.1
mkdir build  &&  cd build

../configure --enable-gold=yes --enable-ld=default --enable-lto \
--enable-plugins --enable-shared --disable-werror \
--enable-64-bit-bfd --with-system-zlib \
--prefix=/uhome/p001cao/local/app/tool_dev/binutils-2.36
```




## create module file
cd /uhome/p001cao/local/Imodfiles  -->  create file "cmake-3.20.3"
```shell
# for Tcl script use only
set     topdir          /home1/p001cao/local/app/tool_dev/binutils-2.37

prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    INCLUDE 	        $topdir/include
```

## Zlib
```shell
wget -c --no-check-certificate https://zlib.net/zlib-1.2.12.tar.gz
tar zxvf zlib-1.2.12.tar.gz
cd zlib-1.2.12

./configure --enable-shared --prefix=/home1/p001cao/local/app/tooldev/zlib-1.2.12
make -j 16 && make install
```

## texinfo
```shell
wget -c --no-check-certificate https://ftp.gnu.org/gnu/texinfo/texinfo-7.0.3.tar.gz
tar zxvf  texinfo-7.0.3.tar.gz
cd texinfo-7.0.3

./configure  --prefix=/home1/p001cao/local/app/tooldev/texinfo-7.0.3
make -j 16 && make install
```


## bison
```shell
wget -c --no-check-certificate https://ftp.gnu.org/gnu/bison/bison-3.8.2.tar.gz
tar zxvf  bison-3.8.2.tar.gz
cd bison-3.8.2

./configure  --prefix=/home1/p001cao/local/app/tooldev/bison-3.8.2
make -j 16 && make install
```

