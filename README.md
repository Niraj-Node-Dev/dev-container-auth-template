
# Task Project with DevContainer

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/) with the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [pnpm](https://pnpm.io/)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine and set env.

```bash
git clone https://github.com/Niraj-Node-Dev/dev-container-auth-template.git
cd dev-container-auth-template
cp .env.example .env
```

### 2. Open the project in DevContainer

This project uses a development container to set up a consistent environment. To open it in Visual Studio Code:

1. Open the project folder in VS Code.
2. If you have the "Remote - Containers" extension installed, VS Code will prompt you to reopen the project in the DevContainer. Click "Reopen in Container."

Alternatively, you can manually build and open the container with the following command:

```bash
devcontainer build --workspace-folder .
devcontainer up --workspace-folder .
```

This will build the container and set up the project environment with all necessary dependencies.

### 3. Install dependencies

Once inside the DevContainer, the dependencies will automatically be installed. If you want to install them manually, run:

```bash
pnpm install
```

### 4. Run the project

To start the NestJS application, run the following command:

```bash
pnpm start:debug
```

Your NestJS application should now be running on the default port ( `7007`).

## Available Scripts

- `pnpm start:debug`: Starts the NestJS application.
- `pnpm build`: Builds the NestJS application.
- `pnpm test`: Runs tests for the project.
- `pnpm lint`: Runs the linter for the project.

## Docker DevContainer

The DevContainer is pre-configured with all necessary dependencies, including Node.js, pnpm, and any other required tools for the project. It helps provide a consistent environment for development, regardless of the host machine.

### DevContainer Features:
- Automatic container setup using the `devcontainer.json` configuration.
- Runs the application in a controlled, isolated environment.
- Can be easily shared across teams to ensure everyone is working with the same dependencies.

## Notes

- Ensure you have Docker running on your machine to build and run the DevContainer.
- You can open the project in VS Code using the Remote - Containers extension to automatically build the container.
- If you encounter any issues with the DevContainer, ensure that your Docker setup is correctly configured.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
