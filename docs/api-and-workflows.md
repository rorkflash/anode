# Server API and workflows

Proposed domain API. HTTP handlers, CLI and MCP adapters call the same application operations. No surface bypasses authorization, optimistic revisions or audit. The runner transport is specified separately in [protocol](protocol.md).

## Domain operations

| Group | Operations | Required checks |
| --- | --- | --- |
| Project | `project_create`, `project_get`, `project_update` | Organization membership and project permission; expected revision for updates. |
| Knowledge | `document_publish_revision`, `context_get`, `document_get` | Read/write scope on every referenced revision. |
| History | `proposal_create`, `decision_record`, `direction_fork`, `history_query` | Actor authority; typed relation checks; fork base immutable. |
| Work | `task_create`, `task_update`, `task_assign`, `task_accept`, `task_request_changes` | Dependency status, role scope and exact task/outcome revisions. |
| Threads | `thread_read`, `message_send` | Sender identity, task scope, reply links and idempotency. |
| Roles | `lead_assign`, `lead_handoff`, `role_grant` | Owner/delegated administration; atomic generation change. |
| Capacity | `capacity_grant_create`, `capacity_grant_revoke`, `worker_list` | Capacity owner grants use; project owner separately grants data access. |
| Repository | `submission_verify`, `change_publish`, `integration_request` | Connector identity, exact candidate and publication permission. |
| Inference | `usage_grant_create`, `usage_grant_revoke`, `usage_get` | Budget owner, allowed principal/project/provider/model and period. |
| Packages | `package_publish`, `package_search`, `package_release_revoke` | Publisher role, visibility, hashes and immutable versions. |

## Conventions

Use resource routes under `/v1/` and JSON responses. Finalize the complete OpenAPI definition before client generation. Do not infer route names mechanically from operation names without documenting them.

Mutation requests carry an idempotency key. Updates to mutable aggregates also carry an expected revision. Scope idempotency by authenticated principal and operation; retain request hash and original result. A reused key with different input is an error. Paginated queries use opaque cursors and stable order.

A successful `task_assign` queues durable work; it does not mean a process started. Return task/run IDs and queued state. A successful `task_accept` records project acceptance; it does not mean a branch was merged. Repository integration has its own operation and status.

For CLI, reserve `anode` as the command name. Initial proposed groups: `serve`, `project`, `task`, `history`, `lead`, `worker`, `grant`, `package` and `admin`. Machine output is JSON on stdout; diagnostics go to stderr. These commands are not implemented in this starter.

For MCP, expose small discoverable project/context/task/history surfaces and fetch detailed schemas on demand. Bind credentials to the caller's project/run and role generation. A prompt saying “you are lead” is not an authorization grant.

## Capacity sharing

Capacity grants specify owner, eligible projects/requesters, workers, hours, concurrency, runtime and accounting limits. They are revocable. Data access is granted separately by the project owner. A grant reserves eligibility, not guaranteed online availability or provider quota.

Scheduler filters: enabled worker → matching capability revision → project/data permission → owner capacity grant → local reported availability → free slot → supported workspace/policy → budget eligibility. Cnode repeats local checks; reported capacity is advisory until it accepts.

Availability policies are `wait_for_worker`, `prefer_until_deadline` and `any_eligible`. Sleeping machines do not block other eligible capacity when policy allows reassignment. Execution leases prevent accepted stale actions; they do not prevent an isolated old process from computing.

## Review flow

Task result → immutable outcome → configurable verification → reviewer decision → accepted history update. Small changes can use targeted checks and focused review; larger or sensitive changes can require a separate reviewer. Keep review/rework model usage in the same cost picture. Never assume another harness's answer is automatically correct or that a full second implementation is required for every change.

## Lead handoff example

Owner selects worker B → server checks management capabilities and authority → transaction increments lead generation → old lead loses management rights → handoff manifest prepared → B receives lead turn. Existing worker leases remain unless explicitly revoked. Results from an old lead may be retained as proposals but cannot issue authoritative new assignments.
