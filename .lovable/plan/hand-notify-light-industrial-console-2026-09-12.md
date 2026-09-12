# HAND NOTIFY — Light Industrial Console

## Goal
Replace the blank home screen with a complete, responsive HAND NOTIFY product experience. The uploaded image remains visual inspiration only; no content, imagery, characters, branding, or literal layout will be reused.

## Visual direction
- Build the selected **Industrial utility console** composition with a light Paper & Ink palette: warm off-white `#F5F3EE`, secondary surface `#E8E4DD`, graphite `#202126`, and coral `#FF6B5E` as the single primary signal color.
- Use **Syne** for expressive headings, **Plus Jakarta Sans** for body copy, and a restrained monospace treatment for telemetry labels.
- Use spacious asymmetric bento layouts, 16–24px rounded panels, fine borders, soft dimensional shadows, subtle translucent layers, and precise console-like labels.
- Preserve the polished futuristic tone without resembling a generic dashboard, messaging app, video call, or remote desktop product.

## Page structure
1. **Navigation** — HAND NOTIFY mark, requested page links, live camera indicator, and Open Dashboard action.
2. **Hero bento** — exact tagline and supporting copy beside an original two-machine visual showing webcam hand detection, gesture recognition, a traveling local-network signal, and the notification arriving on the friend’s screen.
3. **Live Hand Detection** — large camera-style panel with a custom animated 21-point hand skeleton, tracking readouts, WAVE result, confidence, FPS, stability, and Notify Friend action.
4. **Your Friends** — three requested online/offline devices with latency, readiness, contextual buttons, and Add Friend.
5. **Gesture System** — four distinct gesture cards for Wave, Open Hand, Point, and Pinch, each with action copy and compact landmark motion.
6. **Notification Preview** — polished incoming-notification examples with Open and Ignore actions.
7. **Completely Unnecessary Statistics** — all requested humorous metrics and explanatory copy in a varied data grid.
8. **Friend Attention Level** — a circular 37% meter with the “Probably ignoring you” state and the supplied status scale.
9. **How It Works** — connected four-step flow from webcam capture through notification delivery.
10. **System Status + Activity Log** — sci-fi status strip and the requested recent timeline entries.
11. **Final CTA and footer** — “Stop Typing. Start Waving.” with requested supporting text, links, and 2026 attribution.

## Interaction and behavior
- Anchor navigation and CTA buttons scroll to their matching sections.
- Notify actions trigger a short visual delivery state and update the notification preview/activity feedback locally.
- Device buttons reflect online/offline availability; notification Open/Ignore controls provide visible state changes.
- Add restrained signal-particle travel, breathing landmark points, pulsing status lights, notification arrival, and subtle card lift/glow effects.
- Respect reduced-motion preferences and keep all controls keyboard accessible with clear focus states.

## Responsive treatment
- Keep the asymmetric 12-column console composition on desktop.
- Reflow complex panels into readable two-column tablet layouts and a single-column mobile sequence.
- Simplify the network diagram and navigation at narrow widths while preserving the hand-to-notification story and keeping text/control sizes stable.

## Technical details
- Implement the page at `/` using the existing TanStack Start structure.
- Define semantic Paper & Ink tokens, typography, animation keyframes, and reusable visual utilities in the global Tailwind v4 stylesheet.
- Load web fonts from the document head, not through remote CSS imports.
- Use React components and Lucide icons for controls; create the hand skeleton and network visualization as original CSS/SVG interface artwork rather than embedding the uploaded reference.
- Add unique home-page metadata for HAND NOTIFY.
- Validate the final screen in Chromium at desktop and mobile widths, checking interactions, overflow, text fit, and animation behavior.
