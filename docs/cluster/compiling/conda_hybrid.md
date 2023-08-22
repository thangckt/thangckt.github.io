# Use conda hybrid

## Centos 6.9 - Tachyon

GLIBC=2.12

### UCX+OMPI

!!! note

    - ucx-infiniband conda does not work
    - create `py9ase` env, but do not install `ucx openmpi`
    - `-c lcls-ii rdma-core` needed for IB. Then, use `--with-verbs --with-rdmacm` ([see this](https://ucx-py.readthedocs.io/en/latest/install.html))

#### conda env
``` sh
module load conda/conda3
conda create -y -n py9ase_ucx_ompi python=3.9.0  # higher python require newer GLIBC (don't work with py 11)
source activate py9ase_ucx_ompi

conda install -y --revision 0

conda install -y -c conda-forge -c lcls-ii python=3.9 \
    gcc=11.2 gxx=11.2 libgcc-ng=11.2 libstdcxx-ng=11.2 libgfortran-ng=11.2 zlib=1.2.11 sysroot_linux-64=2.12 \
    rdma-core
```

#### rdma-core
- `rdma-core` needed for IB, but package in conda is not available for older GLIBC.

#### UCX
- Be sure that ucx to recognize IB. `UCT modules:   < ib cma knem >`

``` sh
cd /home1/p001cao/0SourceCode/tooldev
# wget https://github.com/openucx/ucx/releases/download/v1.13.1/ucx-1.13.1.tar.gz    # v1.15.0-rc3/ucx-1.15.0.tar.gz
# tar xvf ucx-1.13.1.tar.gz
cd ucx-1.15.0
rm -rf build_ase && mkdir build_ase  &&  cd build_ase

module load conda/py9ase_ucx_ompi
export envDIR=/home1/p001cao/app/miniconda3/envs/py9ase_ucx_ompi
export PATH=${envDIR}/bin:$PATH
export LD_LIBRARY_PATH=${envDIR}/lib:$LD_LIBRARY_PATH
export CFLAGS="-Wno-shadow"
export myPREFIX=${envDIR}

../contrib/configure-release --enable-mt --with-verbs=${envDIR} --prefix=${myPREFIX}

make -j 16 && make install
```
Test
``` sh
ucx_info -d | grep Transport
```

#### OMPI
<!-- ```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.x
rm -rf build_ase && mkdir build_ase && cd build_ase

module load conda/py9ase_ucx_ompi
export envDIR=/home1/p001cao/app/miniconda3/envs/py9ase_ucx_ompi
export PATH=${envDIR}/bin:$PATH
export myPREFIX=/home1/p001cao/app/conda_lib

../configure --with-sge --with-ucx=/home1/p001cao/app/conda_lib --prefix=${myPREFIX}

make -j 16 && make install
``` -->

#### ASE+GPAW
after compile UCX, install gpaw (don't compile ompi)

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