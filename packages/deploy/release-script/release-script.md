# Release script

This document is about `release` script.

The script is meant to automate release procedure. So far it doesn't cover full release flow, but gets rid of some tedious procedures.

Here's what script does:

* perform checks if we can release (no uncommitted changes, correct branch);
* update version strings in files;
* add and push commit and tag;
* build vue-book;
* publish vue-book to npm.

To use the script - from project root run:

```bash
yarn release
```
