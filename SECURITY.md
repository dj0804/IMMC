# Security

## This is a demo, not a product

This repository is a **frontend-only pitch demo**. It has no backend, no database, and no
persistence. Understand these properties before deploying or reusing any of it.

### The staff login is not authentication

`/admin` is gated by [`src/admin/Login.jsx`](src/admin/Login.jsx), which accepts **any**
non-empty username and password. It is a stage prop for demonstrating the portal, not an
access control. The login screen says so on screen.

There is no session, no token, and no server check. **Do not deploy this to a public URL
believing the admin portal is protected** — anyone who visits `/admin` gets full access to
every screen.

### All data is fake and client-side

Members, leads, payments, trainers, and equipment in [`src/data/`](src/data/) are fabricated
seed values. They live in browser memory via [`src/store/AppStore.jsx`](src/store/AppStore.jsx)
and reset on every page refresh. No real person's details are in this repository.

If you replace the seed data with real member records, note that everything in `src/` is
shipped to the browser and visible to anyone. Real member data must never live in this
repository.

### No payments are processed

The registration flow's payment step records a *chosen method* only. It does not collect card
numbers, UPI IDs, CVVs, or any payment credential, and it contacts no payment processor.

## Reporting a vulnerability

Open an issue, or contact the repository owner directly for anything sensitive. Please do not
open a public issue containing real member data.

## For contributors

### Keep the dev server local

[`vite.config.js`](vite.config.js) binds the dev server to `127.0.0.1` with `allowedHosts`
restricted and `fs.strict` enabled. This guards against DNS-rebinding attacks and stops the
server being reachable from other machines on a shared network.

**Do not add `--host` to the dev script** or widen `allowedHosts` without understanding that
it exposes your local filesystem-backed dev server to your entire network.

### Keep dependencies patched

Run `npm audit` before opening a pull request. This project previously carried
[GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) via an old esbuild,
which let any visited website read responses from a running dev server. Vite is now pinned to
a patched major.

### No CI secrets

This repository intentionally has **no GitHub Actions workflows**. If you add one, never use
`pull_request_target` with a checkout of untrusted PR code, and never expose repository
secrets to workflows that build forked pull requests.

### Local tooling stays out of the repo

`.claude/`, `.cursor/`, `.aider*`, `.env*`, and `node_modules/` are gitignored. Machine-specific
config and anything resembling a credential must not be committed.
