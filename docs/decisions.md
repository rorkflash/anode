# Decisions and open choices

## Accepted product boundaries

- Anode is server and product name; Cnode is local client; Talo is the independent local capability engine.
- Leads are assigned per project and may move between workers.
- Shared history includes decisions, forks, tasks, short outcomes and evidence.
- Task delegation and model access are separate paths.
- The server owns shared state; local process control stays with Cnode.

## Proposed technical baseline

| Decision | Rationale / consequence |
| --- | --- |
| Python modular server | Fast domain development; isolate gateway/dispatch processes when needed. |
| PostgreSQL cloud, SQLite standalone | Shared concurrency versus single-machine simplicity; same domain semantics. |
| Database outbox + HTTPS long polling first | Durable state with a small operational surface; WebSocket can follow without changing semantics. |
| One active lead with generation fencing | Explicit handoff and rejection of old management authority. |
| Mediated source exchange for external workers | Contributions without distributing Git-host credentials. |
| Canonical protocol in Anode | Two repos can release independently without two competing contracts. |
| Draft schema 0.1 strict fields | Early semantic changes require explicit negotiated versions. |

## Open before implementation or release

Select identity backend, first Git host/connector location, exact API framework and dependencies, public software license, default review/publication authority, storage retention and recovery objectives. Choose strict/soft budget behavior per provider when the gateway is implemented. No unsupported subscription sharing is assumed.

## Provenance

This repository specification derives from the shared Agent Hub Architecture 1.0 and Talo Service Design, plus the Anode/Cnode naming decision. It refines reachability into a separate run attribute and chooses long polling as a proposed first transport. Product boundaries are agreed; protocol details, source layout and ticket order are implementation proposals.
