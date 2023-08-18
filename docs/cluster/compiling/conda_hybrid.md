# Use conda hybrid

## Centos 6.9 - Tachyon

GLIBC=2.12

### UCX+OMPI

!!! note

    - ucx-infiniband conda does not work
    - create `py9ase` env, but do not install `ucx openmpi`
    - `libibverbs-cos6-x86_64 numactl-cos6-x86_64 librdmacm-cos6-x86_64`
    - `-c rapidsai-nightly rdma-core-devel-cos7-x86_64 librdmacm-devel-cos7-x86_64`. --with-verbs=${envDIR}

#### conda env
``` sh
module load conda/conda3
conda create -y -n py9ase_ucx_ompi python=3.9.0  # higher python require newer GLIBC.
source activate py9ase_ucx_ompi

conda install --update-specs -y --revision 0

conda install --update-specs -y -c conda-forge -c rapidsai-nightly python=3.9.0 \
    gcc=11 gxx=11 gfortran=11 libgcc-ng=11 libgfortran-ng=11 libstdcxx-ng=11 zlib=1.2.11 \
    libibverbs-devel-cos6-x86_64

```
#### libfabric
``` sh
cd /home1/p001cao/0SourceCode/tooldev
# wget https://github.com/ofiwg/libfabric/releases/download/v1.18.1/libfabric-1.18.1.tar.bz2
# tar xf libfabric-1.18.1.tar.bz2
cd libfabric-1.18.1

module load conda/py9ase_ucx_ompi
export envDIR=/home1/p001cao/app/miniconda3/envs/py9ase_ucx_ompi
export PATH=${envDIR}/bin:$PATH
export myPREFIX=${envDIR}

./configure --prefix=${myPREFIX}
```

#### UCX
Don't use gcc>11

``` sh
cd /home1/p001cao/0SourceCode/tooldev
# wget https://github.com/openucx/ucx/releases/download/v1.15.0-rc3/ucx-1.15.0.tar.gz
# tar xvf ucx-1.15.0.tar.gz
cd ucx-1.15.0
rm -rf build_ase && mkdir build_ase  &&  cd build_ase

module load conda/py9ase_ucx_ompi
export envDIR=/home1/p001cao/app/miniconda3/envs/py9ase_ucx_ompi
export PATH=${envDIR}/bin:$PATH
export CC=gcc export CXX=g++ export FC=gfortran
export CFLAGS="-Wno-shadow"
export myPREFIX=${envDIR}

../contrib/configure-release --enable-mt --with-rc --with-dc --with-ud \
    --with-verbs=${envDIR}  --prefix=${myPREFIX}

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
export CC=gcc export CXX=g++ export FC=gfortran
export myPREFIX=${envDIR}

../configure --with-sge --with-ucx=${envDIR} --prefix=${myPREFIX}

make -j 16 && make install
```

#### ASE+GPAW

``` sh
module load conda/conda3
source activate py9ase_ucx_ompi

conda install --update-specs -y -c conda-forge ase gpaw
```
