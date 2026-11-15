# Anode implementation plan

Each item is a development ticket, not a claim of completion. The first useful release is coordination across two machines with one verified harness. Model sharing and public packages are later milestones.

| ID | Work | Depends on | Completion evidence |
| --- | --- | --- | --- |
| A01 | Domain skeleton, configuration, migrations, identity interface and fake runner | — | Project creation; cross-project denial; clean migration on PostgreSQL and local SQLite profile. |
| A02 | Documents, revisions, tasks, threads and outcomes | A01 | A task pins context; revision change does not rewrite its inputs. |
| A03 | Runner enrollment, command stream, receipts, leases and event journal | A01, protocol | Fake Cnode handles replay, gaps and late results without duplicate authoritative actions. |
| A04 | Scheduler, capacity grants and role generations | A02–A03 | Two Cnodes; owner limits respected; lead handoff rejects stale management. |
| A05 | Development graph and current-state projections | A02 | Fork preserves base; rejected alternative remains queryable; projection rebuild matches. |
| A06 | Artifact service and first repository connector | A03 | Credential-free worker returns a verified change; target movement invalidates integration candidate. |
| A07 | First end-to-end user/lead workflow | A04–A06, Cnode C05 | Create task → run → result → review → accepted history; interruption recovers. |
| A08 | Operational hardening and deployment | A07 | Restore drill, access tests, lease expiry and disk/object-store failures demonstrated. |
| A09 | Optional model gateway and ledger | A08 | Concurrent grants safe; timeout reservations held; no double charge from telemetry. |
| A10 | Package registry and visibility | A08, Cnode C07 | Pinned helper shared between two machines; owner execution permission enforced. |

## First milestone boundary

Support one organization with real per-project authorization, two runners and one verified harness family. Keep the data model tenant-aware from the beginning. Provide CLI/API workflows before building a full visual editor. Store graph semantics now; rich graph UI can follow.

Do not include marketplace payments, automated resale of subscriptions, arbitrary executable package publishing, multi-master sync, automatic wake-on-LAN, every harness adapter or autonomous merges in the first milestone.

## Test strategy

Domain tests cover permissions, revision/fork invariants and transactional accounting. Contract fixtures are shared with Cnode. Recovery tests inject failures around outbox commits, acknowledgment, lease replacement and artifact finalization. Connector tests use exact source refs; gateway tests use a fake provider with uncertain completion modes before paid requests.

## Repository handoff prompt

“Read README.md, AGENTS.md, docs/architecture.md and docs/protocol.md. Implement A01 only, with a concrete test plan for project isolation and storage migrations. Keep all documented later modules behind explicit interfaces; do not claim adapter or gateway functionality that has not been implemented.”
