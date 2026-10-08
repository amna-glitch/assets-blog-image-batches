# Honest Taskers cover series (v6)

Every cover uses one frame, the way Stripe, Mercury and Calendly keep their blog covers consistent. Only the slots below change per article.

## Fixed (never change)
- Background: current blue-to-cyan gradient. Light on the left, electric blue (#1344fd) on the right, cyan wave bottom-right. One direction only.
- Kicker: white pill with a teal dot at x 140, y 64. Uppercase, 17px.
- Headline: Sequel Sans 700, ink #0b1440, x 140, y 116, width 450. 54px, stepping down to 44px only to stay within 3 lines.
- Stage card: white, x 640, y 64, 400×250, radius 24, shadow `0 24px 54px rgba(10,30,140,.24)`.
- Badge: 92px blue circle with a white border and a white subject icon, overlapping the card's top-right corner.
- Logo: bottom-left, y 548. It sits below the listing panel.
- Key content stays inside x 115–1085 and y < 353, the part the honesttaskers.com listing card shows.
- No prices. No question marks.

## Variable (per article)
| Slot | Rule |
|---|---|
| `kicker` | Article type: Software & EHR, Cost guide, Compliance, Comparison, Best of 2026, Practice operations, Complete guide, Role explainer, Delegation, Pay guide |
| `headline` | 3–7 words, a shortened version of the title |
| `icon` | Subject icon from `v3/templates/icons.js` |
| `visual` + `data` | One card type (below) |

## Card types
| visual | Use for |
|---|---|
| note | Software & EHR, workflows |
| cost | Cost and pricing guides (no figures) |
| call | Phones, triage, answering, reception |
| masked | HIPAA, security, compliance |
| versus | X vs Y, in-house vs virtual |
| ranked | Best-of and top-N lists |
| trend | Operations, turnover, stats |
| profile | Complete guides by specialty |
| day | Role explainers (photo strip + timeline) |
| tasks | Tasks to delegate, checklists |
| ranges | Pay by region (no figures) |

Render: `PW_MODULE=/opt/node-tools/node_modules/playwright node templates/render.js` → `renders/`.
Listing check: `node templates/render-ht-listing.js` → `renders/listing/`.
