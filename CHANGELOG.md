# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/Gomah/nuxt-graphql-request/compare/v3.2.1...v4.0.0) (2021-02-22)


### Features

* **docs:** updates readme with multiple client configs ([06a72ed](https://github.com/Gomah/nuxt-graphql-request/commit/06a72ed4ce1d5158fa17f333e1f4d4e5b3e32e01))
* **docs:** updates readme with multiple client configs ([b12e799](https://github.com/Gomah/nuxt-graphql-request/commit/b12e79919b38f016ababc7d17a1ef9e28d14ca99))
* **multiple clients:** add ability to define multiple clients ([e8b3a9d](https://github.com/Gomah/nuxt-graphql-request/commit/e8b3a9dee8936d5cb3bb9d6ec845f8d6ad3f9991))
* **multiple clients:** add ability to define multiple clients ([5790502](https://github.com/Gomah/nuxt-graphql-request/commit/579050212d1899b5a3736797b1f8d646b2f2537a))


### Internal

* **multiple clients:** use reduce instead of reduce + map, and remove clients output ([f9103f9](https://github.com/Gomah/nuxt-graphql-request/commit/f9103f93077c8eb706a927a53f67294f00aa76c1))
* **multiple clients:** use reduce instead of reduce + map, and remove clients output ([3259b0f](https://github.com/Gomah/nuxt-graphql-request/commit/3259b0f1ef257c9ab822f12a5d5c5910558ab974))


### Documentation

* fixed asyncData call ([6268368](https://github.com/Gomah/nuxt-graphql-request/commit/62683682cdbf52ebfda047a1950997abd85ff133))
* update docs for v4 ([25b1191](https://github.com/Gomah/nuxt-graphql-request/commit/25b11915098ce568646651164c411f610136300d))


### Chore

* **deps:** upgrade dependencies ([bc256eb](https://github.com/Gomah/nuxt-graphql-request/commit/bc256ebdf858499f1ccc3487cc1fc8ee87a2cc66))

### [3.2.1](https://github.com/Gomah/nuxt-graphql-request/compare/v3.2.0...v3.2.1) (2021-02-04)


### Bug Fixes

* export graphql-request functions ([1869d3d](https://github.com/Gomah/nuxt-graphql-request/commit/1869d3d5be72b5ed7f30ae5fdba0d8ed8bb5ecb2))
* types import ([538687a](https://github.com/Gomah/nuxt-graphql-request/commit/538687acea5478921ee20dddc48283918680e325))


### Chore

* add .vscode config ([eeac8b6](https://github.com/Gomah/nuxt-graphql-request/commit/eeac8b64c283251d7af067888adb04810799923f))
* **deps:** upgrade dependencies ([004624a](https://github.com/Gomah/nuxt-graphql-request/commit/004624a86dfbfe25695ccbe49eb58b9269977588))


### Documentation

* init documentation ([b3b5702](https://github.com/Gomah/nuxt-graphql-request/commit/b3b57028b016f2dbab4a0cd88315cb0896f8e0ee))

## [3.2.0](https://github.com/Gomah/nuxt-graphql-request/compare/v3.1.3...v3.2.0) (2020-12-17)


### Features

* **config:** allow for runtime config ([49239b6](https://github.com/Gomah/nuxt-graphql-request/commit/49239b651668c5ccd29a059b22b0698c73ed2b3f))
* **docs:** update readme with runtimeConfig ([7807b72](https://github.com/Gomah/nuxt-graphql-request/commit/7807b723f4d18225ed699383f430f2269d8b8b1e))


### Bug Fixes

* **module:** removed logic around endpoint being required ([b9e8fd8](https://github.com/Gomah/nuxt-graphql-request/commit/b9e8fd8799e029507514d01feab6fa907fe97291))


### Styling

* **intentation:** fixes indentation on tests ([fcdc7d4](https://github.com/Gomah/nuxt-graphql-request/commit/fcdc7d4d7a49b5f6e80d9c3ca451d20eda271605))


### Chore

* **deps:** bump graphql-request to 3.4.0 ([39c7ae5](https://github.com/Gomah/nuxt-graphql-request/commit/39c7ae5e66abcc086ef7f002b1fde977b640b255))

### [3.1.3](https://github.com/Gomah/nuxt-graphql-request/compare/v3.1.2...v3.1.3) (2020-10-29)


### Internal

* Use countries public API ([aecf4b6](https://github.com/Gomah/nuxt-graphql-request/commit/aecf4b6ee163dbc6474d04ead514494cd0a5931a))


### Chore

* **deps:** upgrade dependencies ([689e6a8](https://github.com/Gomah/nuxt-graphql-request/commit/689e6a8e5c3d75b947fc4d743000b14a9d7408e7))

### [3.1.2](https://github.com/Gomah/nuxt-graphql-request/compare/v3.1.1...v3.1.2) (2020-09-24)


### Bug Fixes

* **fetch:** import polyfill before plugin initialisation ([0fc22e2](https://github.com/Gomah/nuxt-graphql-request/commit/0fc22e2bffaf630787d44c4095d3eddb73d25dbf))

### [3.1.1](https://github.com/Gomah/nuxt-graphql-request/compare/v3.1.0...v3.1.1) (2020-09-21)


### Bug Fixes

* **polyfills:** use cross-fetch/polyfill, closes [#4](https://github.com/Gomah/nuxt-graphql-request/issues/4) ([4a8eeef](https://github.com/Gomah/nuxt-graphql-request/commit/4a8eeeff5ca0c05e9594d83bd2eed07549c61f45))


### Internal

* Fix fakeql endpoint ([8201cb6](https://github.com/Gomah/nuxt-graphql-request/commit/8201cb69d93511562c9ca9e8260fbe457ae2a15f))

## [3.1.0](https://github.com/Gomah/nuxt-graphql-request/compare/v3.0.0...v3.1.0) (2020-09-11)


### Features

* remove unnecessary isomorphic-unfetch ([30ef32c](https://github.com/Gomah/nuxt-graphql-request/commit/30ef32cafe0f4d9951d3a730ee176d0fa5bcbb9a))
* **graphql-request:** update graphql-request to 3.1.0 ([b0bb0c3](https://github.com/Gomah/nuxt-graphql-request/commit/b0bb0c334ba8242af6cf8674e3e24d57aaabf562))


### Bug Fixes

* **tests:** Usee FakeQL ([75c575f](https://github.com/Gomah/nuxt-graphql-request/commit/75c575fd897c6c499f164a5e166196de885554f0))

## [3.0.0](https://github.com/Gomah/nuxt-graphql-request/compare/v1.0.2...v3.0.0) (2020-08-06)

**BREAKING CHANGES**

`nuxt-graphql-request` now requires `graphql` version 14.x or 15.x as a peer dependency.


### Features

* **loader:** add graphql-tag/loader ([9debee3](https://github.com/Gomah/nuxt-graphql-request/commit/9debee30c410d3ace0a888da7e0a39739f2baac2))


### Bug Fixes

* add isomorphic-unfetch ([bea28c5](https://github.com/Gomah/nuxt-graphql-request/commit/bea28c538b9c9c5446d79a157a5c82eeaf794fc9))


### Chore

* **deps:** bump graphql-request to v3 ([cecc4ff](https://github.com/Gomah/nuxt-graphql-request/commit/cecc4ff50a07b356ed38f49caceab841fd0eb000))
* fix changelog & package.json ([7daff95](https://github.com/Gomah/nuxt-graphql-request/commit/7daff95916af40a985da97913e6e509e61d4c768))
* **deps:** bump graphql-request to 2.0.0 ([3a230bc](https://github.com/Gomah/nuxt-graphql-request/commit/3a230bc6ae6f5af746c4fced65fad89aaa4f407b))
* **release:** 2.0.0 ([88ba52b](https://github.com/Gomah/nuxt-graphql-request/commit/88ba52b42416092ae0717f24f9e2defcc95f16e0))

## [2.0.0](https://github.com/Gomah/nuxt-graphql-request/compare/v1.0.2...v2.0.0) (2020-05-28)

### Bug Fixes

- add isomorphic-unfetch ([bea28c5](https://github.com/Gomah/nuxt-graphql-request/commit/bea28c538b9c9c5446d79a157a5c82eeaf794fc9))

### Chore

- **deps:** bump graphql-request to 2.0.0 ([3a230bc](https://github.com/Gomah/nuxt-graphql-request/commit/3a230bc6ae6f5af746c4fced65fad89aaa4f407b))

### [1.0.2](https://github.com/Gomah/nuxt-graphql-request/compare/v1.0.1...v1.0.2) (2020-04-04)

### Chore

- **deps:** upgrade dependencies ([e3b07da](https://github.com/Gomah/nuxt-graphql-request/commit/e3b07da37b4fbc65b62051d2221de1d544efb710))

### [1.0.1](https://github.com/Gomah/nuxt-graphql-request/compare/v1.0.0...v1.0.1) (2020-02-09)

### Chore

- **deps:** remove consola ([a7d78b6](https://github.com/Gomah/nuxt-graphql-request/commit/a7d78b6f5ee79fe3e559cb154f46998adb6bd0e1))
- **deps:** upgrade dependencies ([5e66f53](https://github.com/Gomah/nuxt-graphql-request/commit/5e66f5390552bee838b3235411494e19e35b5443))
- **readme:** update badges ([dba8610](https://github.com/Gomah/nuxt-graphql-request/commit/dba8610161034dd4515fe75aadd5c604e8689c64))

## 1.0.0 (2019-12-27)
