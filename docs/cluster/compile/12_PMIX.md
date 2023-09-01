---
sort: 11
---


# PMIX 
```note 
require libevent and hwloc
```

## Compile libevent
```
tar xvf libevent-2.1.11-stable.tar.gz
cd libevent-2.1.11-stable
mkdir build && cd build

module load compiler/llvm-14          # clang + lld

export myCOMPILER=/home1/p001cao/local/app/compiler/llvm-14
export PATH=$PATH:${myCOMPILER}/bin
export CC=clang export CXX=clang++ export FC=flang
export LDFLAGS="-fuse-ld=lld -lrt"

./configure --prefix=/home1/p001cao/local/app/tool_dev/libevent-2.1.11

make -j 16 && make install 
```

## Compile hwloc
[Download](https://www.open-mpi.org/software/hwloc/v2.8/)

```
tar xvf hwloc-2.8.0.tar.gz
cd hwloc-2.8.0
mkdir build && cd build

module load compiler/llvm-14          # clang + lld

export myCOMPILER=/home1/p001cao/local/app/compiler/llvm-14
export PATH=$PATH:${myCOMPILER}/bin
export CC=clang export CXX=clang++ export FC=flang
export LDFLAGS="-fuse-ld=lld -lrt"

../configure --prefix=/home1/p001cao/local/app/tool_dev/hwloc-2.8.0

make -j 16 && make install 
```


## compile PMIX

```
tar xvf pmix-4.1.2.tar.gz
cd pmix-4.1.2
mkdir build && cd build

module load compiler/llvm-14          # clang + lld

export myCOMPILER=/home1/p001cao/local/app/compiler/llvm-14
export PATH=$PATH:${myCOMPILER}/bin
export CC=clang export CXX=clang++ export FC=flang
export LDFLAGS="-fuse-ld=lld -lrt"
export my_libevent=/home1/p001cao/local/app/tool_dev/libevent-2.1.11
export my_hwloc=/home1/p001cao/local/app/tool_dev/hwloc-2.8.0

../configure --with-libevent=${my_libevent} --with-hwloc=${my_hwloc} \
--prefix=/home1/p001cao/local/app/tool_dev/pmix-4.1.2

make -j 16 && make install 
```

Refs: \
https://openpmix.github.io/code/building-the-pmix-reference-server \
