# [Minecraft-Clone](https://craftclone.netlify.app/)

Dive into a world of creativity and exploration with this basic Minecraft clone developed using React and Three.js.

## Table of Contents

- [Minecraft Clone](#minecraft-clone)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Features](#features)
  - [Deployment](#deployment)
  - [Contribution](#contribution)
  - [Copyright](#copyright)
 
## Introduction

This project allows you to add and remove blocks, enhanced with essential textures that capture the essence of the original game. Navigate freely with movement in all directions and jumping capabilities across varied terrains. Additionally, enjoy the functionality to save your progress or reset the world as you see fit. This clone not only replicates key features of Minecraft but also provides a stable platform for further expansion and customization of your gaming experience.

## Getting Started

[LET'S PLAY](https://craftclone.netlify.app/)

or

To get started locally with "Minecraft Clone", follow these simple steps:

> [!TIP]
> I recommend installing Node Version Manager and using the stable version.

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Check the version of nvm installed
nvm --version

# Install the stable version of Node
nvm install stable

# Check the version of Node installed
node -v
```

### Prerequisites

> [!IMPORTANT]
> **Node.js:** Ensure that you have Node.js installed on your system.

### Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/JorgeSarricolea/Minecraft-Clone
```

2. Navigate to the project directory:

```
cd Minecraft-Clone
```

3. Install Node dependencies:

```
pnpm install
```

4. Run the development server:

```
pnpm run dev
```

## Features

Some of the key features of this project include:

- **Block Manipulation:** Ability to add and remove blocks within the virtual world.
- **Mobility:** Movement in all directions and jumping capabilities.
- **Save and Reset:** Options to save the current world state or reset it entirely.
- Cube: The primary component representing each block in the world. Manages the physical and visual properties of the blocks.
- **TextureSelector:** Interface for selecting different textures or types of blocks before placing them in the world.
- **World Map:** Component that handles the terrain layout and block placement, ensuring the world is coherent and navigable.
- **Player Controls:** Manages user input for movement and interaction with the world, including keys for moving and jumping.
- **Save/Load System:** System to save the current world state to a file and load it later, allowing for game environment persistence.

## Deployment

I have deployed it with [Netlify Platform](https://www.netlify.com/), it provides an easy way to deploy projects using Next.js, Vite, React, etc.

## Contribution

While contributions to this project are welcome. If you would like to contribute, feel free to fork this repository and submit a pull request.

## Copyright

This project was created by [Jorge Sarricolea](https://jorgesarricolea.com). if you have any specific code questions or would like to chat about programming, feel free to contact me on [WhatsApp](https://wa.me/529381095593).
