>CAUTION: If you open a DMG file or the APP file from this build on the same machine that built it you will experience a build failure on the next build. 
>There is a bug in the hdiutil that remembers that it has opened this file and it reports it is still in use even if you have ejected the file or closed the app.

```diff
- Error: hdiutil exited with code 1  
- Error output:  
- hdiutil: create failed - Resource busy 
```
>The fix is to reboot your machine


