# Publishing Packages to NPM

This document describes how to publish the packages in this monorepo to `npm`.

## Prerequisites

- You must be a member of the `sonagi` organization on `npm`.
- You must have `pnpm` installed and configured on your machine.

## Steps

1.  **Login to npm:**

    ```bash
    npm login
    ```

    Enter your `npm` credentials.

2.  **Build all packages:**
    Make sure all packages are built and ready for publishing.

    ```bash
    pnpm build
    ```

3.  **Publish packages:**
    This project uses `semantic-release` to automatically publish packages when changes are merged into the `main` branch. The versioning and publishing are handled by the CI/CD pipeline.

    **Manual Publishing (if necessary):**

    If you need to publish a package manually, you can run the following command from the root of the project:

    ```bash
    pnpm publish --filter <package-name>
    ```

    For example, to publish the `@sonagi/react` package:

    ```bash
    pnpm publish --filter @sonagi/react
    ```
