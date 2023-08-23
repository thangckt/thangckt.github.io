# Use conda hybrid

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

### OMPI --without-verbs
```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.x
rm -rf build_ase && mkdir build_ase && cd build_ase

module load compiler/gcc-9.5
export PATH=/home2/app/compiler/gcc/9.5.0/bin:$PATH
export CFLAGS="-gdwarf-2 -gstrict-dwarf"
export myUCX=/home1/p001cao/app/tooldev/ucx-1.15-gcc
export myPREFIX=/home1/p001cao/app/openmpi/4.1.x-gcc9


../configure --with-sge --with-ucx=${myUCX}  --prefix=${myPREFIX}

make -j 16 && make install
```

### conda env
``` sh
module load conda/conda3
conda create -y -n py11ase_ucx_ompi python=3.11  # higher python require newer GLIBC (don't work with py 11)
source activate py11ase_ucx_ompi

conda install -y --revision 0

# conda install -y -c conda-forge python=3.11 \
```






### GPAW

``` sh
module load conda/conda3
source activate py9ase_ucx_ompi

conda install -y -c conda-forge ase libxc openblas scalapack fftw

pip install git+https://gitlab.com/gpaw/gpaw.git@23.6.1
```

Test
``` sh
gpaw test
```