## Angular 9 ivy lerna/multi-package in mono issue


#### How to replicate

```bash
git clone https://github.com/marcj/angular-ivy-issue1
cd angular-ivy-issue1

# necessary to not use `npm install` but our own install script
# so links are established between packages.
npm run install
```

Build angular

```
cd packages/app
ng build
```

Check the damage

```
git diff
diff --git a/packages/core/package.json b/packages/core/package.json
index 2a40258..a91d774 100644
--- a/packages/core/package.json
+++ b/packages/core/package.json
@@ -7,6 +7,16 @@
   "license": "ISC",
   "main": "index.ts",
   "scripts": {
-    "test": "echo \"Error: run tests from root\" && exit 1"
+    "test": "echo \"Error: run tests from root\" && exit 1",
+    "prepublishOnly": "node --eval \"console.error('ERROR: Trying to publish a package that has been compiled by NGCC. This is not allowed.\\nPlease delete and rebuild the package, without compiling with NGCC, before attempting to publish.\\nNote that NGCC may have been run by importing this package into another project that is being built with Ivy enabled.\\n')\" && exit 1"
+  },
+  "__processed_by_ivy_ngcc__": {
+    "fesm2015": "9.0.0-rc.3",
+    "fesm5": "9.0.0-rc.3",
+    "es2015": "9.0.0-rc.3",
+    "esm2015": "9.0.0-rc.3",
+    "esm5": "9.0.0-rc.3",
+    "main": "9.0.0-rc.3",
+    "module": "9.0.0-rc.3"
   }
 }
```

### Result

1. Unexpected changes in `packages/core/package.json`
2. Can not publish `lerna publish` anymore since `packages/core/package.json`'s `prepublishOnly` forbids it
