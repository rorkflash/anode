# Security and operations

## Required boundaries

| Concern | Server requirement |
| --- | --- |
| Tenant/project isolation | Authorize every resource reference, graph edge, search result, artifact and export. |
| Runner identity | Bind authenticated runner to its workers/runs; do not trust body IDs. |
| Role authority | Check project permissions and current lead generation for management mutations. |
| Capacity sharing | Separate machine-owner contribution from project-owner data access. |
| Credentials | Vault references, short-lived scoped grants, rotation and redacted logs. |
| Repository publication | Current lease/permission, allowed ref and exact integration candidate. |
| Model gateway | Scoped grants, concurrent reservations, bounded streams and usage reconciliation. |
| Package registry | Immutable releases, publisher roles, integrity and explicit revocation. |
| Uploads | Authorize ownership, verify final size/hash and isolate untrusted content. |
| Untrusted instructions | Task/source/package text never grants additional authority. |

One project may involve several users' machines and provider accounts. Do not assume administrative control over a collaborator's OS. Record who requested work, executed it, reviewed it and published it. Server revocation cannot delete code already downloaded by another owner.

## Reliability

Back up database and referenced artifact state consistently. Test restoration into an isolated environment. On restart, reconcile outstanding runs, outbox entries and budget reservations before replacing work or releasing held funds. Every background job must be idempotent or have explicit reconciliation for external effects.

The API health check covers request handling; readiness also checks migrations and critical storage. Worker health covers dispatch lag. Gateway health covers provider readiness separately. A sleeping Cnode is a capacity event, not an Anode outage.

## Metrics

- Queue age and eligible online capacity by project.
- Assignment acknowledgment and result delivery latency.
- Lease expiry, stale command rejection and late result quarantine.
- Lead wait time, review backlog and delegation loops.
- Repository conflict rate and candidate invalidations.
- Gateway reservations, reconciled usage and unknown usage age.
- Artifact transfer failures, storage growth and retention backlog.

Use request/run/task/project correlation IDs without logging full prompts, source or secrets by default. Audit changes to grants, roles, policies, acceptances and publications. Alert on sustained stalls rather than every missed heartbeat.

## Retention and privacy

Define periods separately for current metadata, project history, raw logs, source bundles, transient uploads and audit. Preserve explicit missing/expired evidence markers. Support scoped export, deletion and redaction with authorization. Consent to task delegation does not imply consent to public package publication or training-data reuse.

## Release gates

Cross-project access denial, duplicate delivery, stale lead, sleeping worker, uncertain provider usage, invalid bundle, object-store partial failure, backup restore and privilege-denied publication must pass before unattended shared use.
