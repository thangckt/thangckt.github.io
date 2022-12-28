# Pip

Why pip?

Conda has its GCC compiler. This may cause conflict with GCC of Linux system.

## Install Python from Source

### Download

Download and extract Python, then navigate into the Python directory:

```sh
cd /home1/p001cao/local/wSourceCode/python

# Specify Python version wnated to install
export PYTHON_VERSION=3.9.13

# Download and extract Python
curl -O https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz
tar -xvzf Python-${PYTHON_VERSION}.tgz
cd Python-${PYTHON_VERSION}
```

### Build and install Python

```sh
export myPREFIX=/home1/p001cao/local/app/python/python-${PYTHON_VERSION}

./configure  --prefix=${myPREFIX} --enable-shared \
    --enable-optimizations  --enable-ipv6 \
    LDFLAGS=-Wl,-rpath=${myPREFIX}/lib,--disable-new-dtags


make -j 16 && make install
```

Test:

```sh
${myPREFIX}/bin/python3 --version
${myPREFIX}/bin/python3 pip --version   # there is no pip
```

### Install Pip  (# Error SSL)

Install `pip` into the version of Python that you just installed:

```sh
${myPREFIX}/bin/python3 get-pip.py
```

### Install multiple versions of Python

If you want to install multiple versions of Python on the same server, you can repeat these steps to specify, download, and install a different version of Python alongside existing versions.

???+ quote "Refs"

    - [Install Python From Source](https://docs.posit.co/resources/install-python-source/)
