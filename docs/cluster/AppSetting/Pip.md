# Pip

Why pip?

Conda has its GCC compiler. This may cause conflict with GCC of Linux system.

## Build and install Python

Download and extract Python, then navigate into the Python directory:

```sh
cd /home1/p001cao/local/wSourceCode/python

# Specify Python version wnated to install
export PYTHON_VERSION=3.9.13
export PYTHON_MAJOR=3

# Download and extract Python
curl -O https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz
tar -xvzf Python-${PYTHON_VERSION}.tgz
cd Python-${PYTHON_VERSION}

```

!!!? quote "Refs"
    - [install python from source](https://docs.posit.co/resources/install-python-source/)
