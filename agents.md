# Agent Repository Configuration

This file documents the Git remote mapping and access credential configuration for automated agent sync and deployment routines.

## Repository Mapping
- **Remote URL**: `https://github.com/AshutoshGitMirror/FSD-Final_Project`

## Access & Authentication
- **GitHub Token**: Resolved securely via environment variable `$GITHUB_KEY`
- **Render API Key**: Mapped locally within `opencode.json` via remote MCP authorization configuration
- **Backend Service ID**: `srv-d7p3779kh4rs73brma00`
- **Frontend Service ID**: `srv-d7p3779kh4rs73brm9u0`
- **Chroma Backend Service ID**: `srv-d81ljdtckfvc739v65d0`

> [!IMPORTANT]
> To comply with agent secret-redaction rules, real API keys or token strings must never be hardcoded into plain text files. Maintain authorization exclusively via environment injection or secure local config mapping.

## Render Infrastructure & MCP Skills
The automated agent suite integrates with the **Render MCP Server** (`https://mcp.render.com/mcp`) to manage cloud infrastructure directly. Available operational skills include:

- **`render-mcp`**: Core service catalog, active workspace resolution, and remote state discovery.
- **`render-deploy` / `render-scaling`**: Continuous delivery flows, build triggers, and auto-scaling rules.
- **`render-web-services` / `render-postgres` / `render-keyvalue`**: Provisioning and live updates for web instances, PostgreSQL databases, and Key-Value stores.
- **`render-debug` / `render-monitor`**: Direct querying of structured cloud logs and hardware/HTTP metric polling.
