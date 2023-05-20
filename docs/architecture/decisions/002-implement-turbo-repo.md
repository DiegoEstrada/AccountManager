# 002. implement-turbo-repo.

Date: 2023-05-20

## Status

Accepted

## Context

Monorepos are very popular in modern application development because of their immense benefits. A monorepo is a single repository having multiple distinct projects with well-defined associations. Note that monorepo is not a monolith.

Current structure of this project, divides api and frontend application in two separate folders, each folder have their own package.json file and it could be declared in two different repositories as well (multi-repo), which is suitable to be defined as monorepo.

Turborepo is a high-performance build system for JavaScript and TypeScript codebases.

## Decision

Implement [turborepo](https://turbo.build/repo) in this project


## Consequences

Turborepo is designed to be adopted incrementally, so we can add it to our codebase in just a few minutes. It speeds up task with features that it implements such as remote caching, parallel execution, and others. 

Since, there is just development work made in this repository, migrate the project to turborepo will not represent a big effort, just initializing the monorepo and define the structure mentioned above, as well, features changes will need to adapt in the structure that monorepo has, it is not a big deal, it supports incremental builds.
