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

module load compiler/gcc-9.5
export PATH=/home2/app/compiler/gcc/9.5.0/bin:$PATH
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
NOTE: --with-verbs (default - auto detect)

```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.x
rm -rf build_ase && mkdir build_ase && cd build_ase

module load compiler/gcc-9.5
export PATH=/home2/app/compiler/gcc/9.5.0/bin:$PATH
export CFLAGS="-gdwarf-2 -gstrict-dwarf"
export myUCX=/home1/p001cao/app/tooldev/ucx-1.15-gcc
export myPREFIX=/home1/p001cao/app/openmpi/4.1.x-gcc9


../configure --with-sge --with-ucx=${myUCX} --prefix=${myPREFIX}

make -j 16 && make install
```

Test
``` sh
module load mpi/ompi4.1.x-gcc9
mpirun --version
```

### Libs need MPI

#### scalapack

```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone -b tags/v2.2.1 https://github.com/Reference-ScaLAPACK/scalapack.git ScaLAPACK-2.2.1
cd ScaLAPACK-2.2.1
rm -rf build && mkdir build && cd build
```

```sh
module load cmake/3.16.2
module load mpi/ompi4.1.x-gcc9

export PATH=/home1/p001cao/app/openmpi/4.1.x-gcc9/bin:$PATH
export CC=mpicc  export CXX=mpic++  export F90=mpif90 export F77=mpif77
export myPREFIX=/home1/p001cao/local/app/mpi/ScaLAPACK-2.2

cmake .. -DUSE_OPTIMIZED_LAPACK_BLAS=on \
    -DCMAKE_INSTALL_PREFIX=${myPREFIX}

make -j 16 && make install
```

#### FFTW

```shell
cd /home1/p001cao/0SourceCode/tooldev
# tar -xvzf fftw-3.3.10.tar.gz
cd fftw-3.3.10
rm -rf build_ase && mkdir build_ase && cd build_ase
```
```sh
module load mpi/ompi4.1.x-gcc9

export PATH=/home1/p001cao/app/openmpi/4.1.x-gcc9/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90
export myPREFIX=/home1/p001cao/app/fftw/3.3.10-ompi4.1.x-gcc9

../configure --enable-sse2 \
--enable-threads --enable-openmp --enable-mpi --enable-shared \
--prefix=${myPREFIX}

make -j 16 && make install
```

### conda env
Install all libs without needed MPI in conda to save time: libxc, matplotlib,..

``` sh
module load conda/conda3
conda create -y -n py11gpaw_source python=3.11  # higher python require newer GLIBC (don't work with py 11)
source activate py11gpaw_source
# conda install -y --revision 0

conda install -y --update-specs -c conda-forge python=3.11 ase libxc pip openblas
```


### GPAW

``` sh
module load fftw/fftw3.3.10-ompi4.1.x-gcc9
module load mpi/ompi4.1.x-gcc9

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc9
export PATH=$OPENMPI/bin:$PATH
export LD_LIBRARY_PATH=$OPENMPI/lib:$LD_LIBRARY_PATH
export LD_LIBRARY_PATH=/home1/p001cao/local/app/tooldev/ScaLAPACK-2.2/lib:$LD_LIBRARY_PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90 export F77=mpif77

module load conda/conda3
source activate py11gpaw_source
```

``` sh
cd /home1/p001cao/0SourceCode/tooldev
git clone -b master https://gitlab.com/gpaw/gpaw.git gpaw-master      # 23.6.1  master
# git pull origin master
cd gpaw-master

pip install -e .
```

Edit `siteconfig.py`
``` py
```



Test
``` sh
gpaw test
```