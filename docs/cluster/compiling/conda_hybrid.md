# Use conda hybrid

## Centos 6.9 - Tachyon

GLIBC=2.12

### UCX+OMPI

!!! note

    - ucx-infiniband conda does not work
    - create `py9ase` env, but do not install `ucx openmpi`
    - `rdma-core` needed for IB. Then, use `--with-verbs --with-rdmacm` ([see this](https://ucx-py.readthedocs.io/en/latest/install.html))

#### conda env
``` sh
module load conda/conda3
conda create -y -n py9ase_ucx_ompi python=3.9.0  # higher python require newer GLIBC.
source activate py9ase_ucx_ompi

conda install --update-specs -y --revision 0

conda install --update-specs -y -c conda-forge -c lcls-ii python=3.9.0 \
    gcc=11 gxx=11 libgcc-ng=11 libstdcxx-ng=11 libgfortran-ng=11 zlib=1.2.11 \
    rdma-core librdmacm-cos7-x86_64  # libfabric
```

#### UCX
Don't install, since ucx does not recognize IB. Use system UCX.

``` sh
cd /home1/p001cao/0SourceCode/tooldev
# wget https://github.com/openucx/ucx/releases/download/v1.13.1/ucx-1.13.1.tar.gz    # v1.15.0-rc3/ucx-1.15.0.tar.gz
# tar xvf ucx-1.13.1.tar.gz
cd ucx-1.15.0
rm -rf build_ase && mkdir build_ase  &&  cd build_ase

module load conda/py9ase_ucx_ompi
export envDIR=/home1/p001cao/app/miniconda3/envs/py9ase_ucx_ompi
export PATH=${envDIR}/bin:$PATH
# export CFLAGS="-Wno-shadow"
export myPREFIX=${envDIR}

../contrib/configure-release --enable-mt --with-verbs=${envDIR} --with-rdmacm=${envDIR} --prefix=${myPREFIX}

make -j 16 && make install
```

#### OMPI
```sh
cd /home1/p001cao/0SourceCode
cd ompi-4.1.x
rm -rf build_ase && mkdir build_ase && cd build_ase

module load conda/py9ase_ucx_ompi
export envDIR=/home1/p001cao/app/miniconda3/envs/py9ase_ucx_ompi
export PATH=${envDIR}/bin:$PATH
export myPREFIX=${envDIR}

../configure --with-sge --with-ucx=/usr --prefix=${myPREFIX}

make -j 16 && make install
```

#### ASE+GPAW

``` sh
module load conda/conda3
source activate py9ase_ucx_ompi

conda install --update-specs -y -c conda-forge ase gpaw
```
