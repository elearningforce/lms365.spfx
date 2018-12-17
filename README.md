## lms-365

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options 
Depends on environment you want to package:
``` bash 
npm run package:dev
npm run package:qa 
npm run package:prod 
npm run package:hotfix 
npm run package:usgov 
npm run package:usgovqa 
```
