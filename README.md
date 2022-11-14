<!--
parent:
  order: false
-->

<div align="center">
  <h1>MeshX UI</h1>
</div>

<!-- Header -->
<p align="center">
    <img src="./docs/images/meshx-ui-header.png" alt="MeshX UI">
</p>

<!-- Badges -->

<div align="center">

[![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/meshx-org/meshx-ui/packages/mxui)](https://img.shields.io/github/package-json/v/meshx-org/meshx-ui?filename=packages%2Fmxui%2Fpackage.json)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![Continous Integration](https://github.com/meshx-org/meshx-ui/actions/workflows/ci.yaml/badge.svg?branch=main&event=push)](https://github.com/meshx-org/meshx-ui/actions/workflows/ci.yaml)
[![License: Apache-2.0](https://img.shields.io/github/license/meshx-org/sidetree-sdk)](https://opensource.org/licenses/Apache-2.0)

</div>

---

## 👋 Welcome

MeshX UI is an open-source component library heavily influenced by the also open-sourced [Fluent Design System](https://www.microsoft.com/design/fluent) by Microsoft.

It is used across the MeshX ecosystem to provide a consistent UI across all MeshX apps and services.

## 🌱 Getting Started

### Install

This repository is distributed with npm. After installing npm, you can install @meshx-org/ui with this command:

```
$ npm install         # install npm dependencies
```

### Import

You can import individual UI components directly from the @meshx-org/ui package:

```tsx
import { Button } from '@meshx-org/mxui'; // or import { Button } from '@meshx-org/mxui-button';

// in your component
function MyApp() {
    return <Button />
}
```

## 📙 Code of Conduct

This project has adopted the [Contributor Covenant Code of Conduct v2.1](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://www.contributor-covenant.org/faq), or contact [opensource@meshx.co](mailto:opensource@meshx.co) with any additional questions or comments.

## 👮 Security Policy

Please see our [security policy](./SECURITY.md) for additional details about responsible disclosure of security related issues.

## 📜 License

This project is licensed under the [Apache v2.0 License](LICENSE.txt).

## ©️ Copyright

Copyright MeshX UI Contributors. See [NOTICE](NOTICE.txt) for details.
