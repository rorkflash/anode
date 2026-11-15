# Deployment and source layout

## Initial implementation shape

Python modular application; shared domain services with HTTP/CLI/MCP adapters. API, dispatch/reconciliation worker and optional gateway can run as separate processes from the same repository. A broker is not required for the first durable job model; the database outbox is authoritative.

| Proposed path | Responsibility |
| --- | --- |
| `src/anode/api/` | HTTP, authentication and input validation. |
| `src/anode/domain/` | Project, task, history, role and grant invariants. |
| `src/anode/application/` | Transactional use cases shared by all interfaces. |
| `src/anode/storage/` | PostgreSQL/SQLite adapters, migrations and outbox. |
| `src/anode/dispatch/` | Scheduling, delivery, reconciliation and lead turns. |
| `src/anode/repositories/` | Connector contracts and integration attempts. |
| `src/anode/gateway/` | Optional model adapters, streaming and budget ledger. |
| `src/anode/registry/` | Package metadata, releases and revocation. |
| `src/anode/artifacts/` | Filesystem/object-storage adapters and integrity. |
| `src/anode/cli/`, `src/anode/mcp/` | Thin interfaces over the same use cases. |
| `tests/contract/`, `tests/integration/`, `tests/recovery/` | Protocol, domain and failure-path evidence. |

These are proposed source directories, not included application code.

## Deployment modes

| Mode | Services | Storage |
| --- | --- | --- |
| Developer/standalone | Anode API + worker, local Cnode; optional gateway | SQLite and local artifact directory. |
| Shared server | TLS ingress, Anode API + worker; optional gateway | PostgreSQL and object storage. |
| Always-on execution | Shared server plus independently enrolled Cnode host | Separate Cnode SQLite and workspaces. |

Production public listeners require TLS and authentication. Bind local standalone mode to loopback with authentication. Do not put SQLite on a shared network filesystem. Keep migrations controlled by a single deployment step; application replicas must not race to change schema.

## Configuration

[Example configuration](../examples/anode.config.example.yaml) describes the intended shape with placeholders. Resolve database, identity and provider secrets through deployment secret mechanisms. Do not commit real credentials. Validate unknown settings and mode-specific requirements before startup.

Select framework, database driver, migration tool, identity provider and object-store implementation during A01. Versions must be pinned and checked against current official documentation at implementation time. The design does not depend on a particular orchestrator framework.

## Local-to-cloud migration

1. Stop new writes in the standalone project.
2. Export stable IDs, immutable revisions, graph relations, tasks and required artifacts with hashes.
3. Import into an authorized cloud project; validate references and identity mappings.
4. Record ownership cutover and new authoritative origin.
5. Reenroll/rebind workers through explicit grants and resume after reconciliation.

Do not copy raw live SQLite files as a multi-machine synchronization strategy. An origin switch is not a merge operation.

## Upgrade and restore

Pause dispatch as needed, back up authoritative data, apply migrations, deploy compatible API/worker versions, verify negotiated protocol and reconcile active runs. Do not invalidate all active work solely to update a UI field. Breaking protocol changes require a coexistence or drain plan.

Set recovery-time and recovery-point objectives before production. Restore testing must include artifact references, outstanding leases, pending messages and unknown model usage, not just database row counts.
