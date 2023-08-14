# Sun grid system


## Some errors

The error:
```
/etc/profile.d/modules.sh
: No such file or directory
```
check `End of Line Sequence` of `submit.bash` file. On the Linux system, it must be `LF` but not `CRLF`

When open in VSCode:
