# GotAll — Wear OS V1

## Goal

Make the Galaxy Watch the fastest way to run an existing GotAll leaving routine.

The watch is **not** where users configure their items. Configuration remains on the phone.

## Core flow

### Idle

Black screen, white typography.

- GOTALL
- Personal number, large and central.
- `I'M LEAVING` primary action.

### Active session

Show only what is necessary:

- Progress: `1 / 7`
- Current item name.
- Optional simple item symbol where practical.
- Large confirmation target.
- Small skip action.

Confirmation advances immediately to the next item and uses watch haptics.

### Complete

- Large check mark.
- `7 / 7`
- `GOT ALL.`

Return to idle after completion.

## Product constraints

- No item editing on the watch in V1.
- No history browsing on the watch in V1.
- No settings maze.
- No profile system yet.
- No decorative animations that slow the flow.
- Black and white only.
- Targets must remain usable on small round Wear OS displays.

## Data contract

Phone remains source of truth for:

- selected items
- item order
- personal number
- language

Watch needs a synchronized compact representation of the active routine. A session result can later sync back to the phone for history.

## Future compatibility

The data model should allow a future `profileId` so multiple contexts such as Leaving, Gym and Travel can reuse the same watch flow without redesigning the interaction.

## Definition of done for Wear OS V1

1. GotAll can be installed on a Galaxy Watch / Wear OS test device.
2. Watch receives the configured routine from the phone.
3. User can start from the watch in one tap.
4. User can complete/skip every item without touching the phone.
5. Completion is clearly confirmed with haptics.
6. The experience remains legible and usable on supported round watch sizes.
