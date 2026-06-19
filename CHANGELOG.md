# Changelog

All notable changes to [One]Log are documented here.

## [0.1.1.0] - 2026-06-18

### Added

- Sector waitlist capture on solution pages with DashCard-style panel and sector-colored border
- Shared form validation and Resend email libraries with honeypot spam protection
- WhatsApp FAB (bottom-right, 48px) when `WHATSAPP_NUMBER` is configured
- Plausible analytics hooks on real contact and waitlist submissions (`tracked` flag)
- Investor deck links on hero, about page, and footer
- Vitest unit tests for form validation

### Changed

- Hero primary CTA now leads to waitlist/contact capture; dashboard is secondary
- Unified logo asset to `onelog-logo.svg` across hero, header, and JSON-LD
- Contact form sector values use stable keys (`finance`, etc.) instead of translated labels
- Locale-aware email subjects and bodies for contact and waitlist submissions

### Fixed

- Message length over 5000 chars now returns `too_long` instead of `missing`
- Resend API failures are logged to server console for Vercel observability