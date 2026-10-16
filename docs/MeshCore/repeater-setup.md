---
id: repeater-setup
title: MeshCore Repeater Setup
sidebar_label: Repeater Setup
---

# MeshCore Repeater Setup

This page pulls together everything you need to bring a MeshCore repeater onto the **NEO Mesh**, in one place. It assumes you have already read [MeshCore Getting Started](./meshcore-getting-started.md) and know what a [repeater](./meshcore-getting-started.md#repeater-infrastructure) is.

If you want to host a repeater without getting deeply involved in the community, read [Host a Node](/docs/host-a-node) instead — volunteers can help with hardware and setup.

**Ask in the [NEO Mesh Discord](https://discord.gg/hDCxm47JSF) before deploying.** Repeaters affect everyone around them, and the community can help you pick a location, a prefix, and hardware.

---

## Before you start

### Location and power

A repeater is only as good as its placement. Height and a clear horizon matter more than transmit power or antenna gain.

- Mount it as high as practical, ideally outdoors and above your roofline. Indoor repeaters perform significantly worse.
- Use stable power: mains with a UPS, or solar with a battery sized for Ohio winters. Typical draw is about **2–5 watts**.
- Check the [Live Map](https://corescope.neomesh.org) for nearby repeaters, and use **Tools → Line of Sight** in the MeshCore mobile app to evaluate paths. Line of sight tools account for terrain, but not buildings.
- Test a temporary setup before committing to a permanent mount.

### Hardware

- A supported LoRa board. [Heltec v4](https://heltec.org/project/wifi-lora-32-v4/) boards are our current recommendation; ask in Discord for other known-good options.
- An antenna designed for **902–928 MHz**. Antennas advertised for the wrong band may perform poorly even if they fit.
- A weatherproof enclosure if mounting outdoors.
- A USB cable and a computer with Chrome or Edge for flashing and serial configuration.

A higher gain antenna can increase distance but flattens the radiation pattern. A better antenna does not fix a bad location.

---

## Step 1: Flash the firmware

Flash the **Repeater** role using the official [MeshCore Web Flasher](https://meshcore.io/flasher):

1. Connect the board to your computer over USB
2. Open the web flasher
3. Select your device (or detected port)
4. Choose the **Repeater** role
5. Flash, then power-cycle the board

Use the latest firmware. Firmware **1.14 or newer** is required for 2-byte path hashes (see [Step 5](#step-5-switch-to-2-byte-path-hashes)).

Many repeaters in the NEO region run IoTThinks' [Easy SkyMesh](https://github.com/IoTThinks/EasySkyMesh) custom firmware, which improves power savings. This is worth considering for solar installs.

---

## Step 2: Open the console

All settings below are entered at the repeater command line. Over USB, go to the [MeshCore Web Flasher](https://meshcore.io/flasher), click **Console**, and select the device. Once the repeater is configured, most commands can also be sent remotely by logging in as admin from the MeshCore app.

Confirm the firmware version:

```txt
ver
```

---

## Step 3: Apply NEO Mesh settings

### Radio

Use the [USA/Canada preset](https://neome.sh/meshcore#contact):

| Setting          | Value        |
| ---------------- | ------------ |
| Frequency        | `910.525` MHz |
| Bandwidth        | `62.5` kHz   |
| Spreading Factor | `7`          |
| Coding Rate      | `8`          |

```txt
set radio 910.525,62.5,7,8
```

If the frequency, bandwidth, or spreading factor do not match, your repeater cannot communicate with the NEO Mesh.

### Transmit power

Set TX power to match what your board supports (1–22 dBm at the LoRa chip). For example, if your board supports 22 dBm:

```txt
set tx 22
```

Some boards have an extra power amplifier stage, so the chip setting is not the total output. Check your board's documentation. Running above **1W** requires proper licensing (for example, under amateur radio rules).

### Adverts

```txt
set advert.interval 240
set flood.advert.interval 47
```

- **Zero-hop advert: 240 minutes.** Allowed range is 60–240 minutes. Set this explicitly — a factory-fresh node defaults to 2 minutes, and saving any setting resets an out-of-range value to `0` (disabled).
- **Flood advert: 47 hours.** Allowed range is 3–168 hours.

More power or more frequent adverts is not better. Consistent settings keep RF noise down for everyone.

Reboot to apply radio and TX power changes:

```txt
reboot
```

---

## Step 4: Identity, name, and security

### Pick a unique prefix

MeshCore uses the first hex characters of the public key as a short node ID. Two repeaters sharing a prefix make paths and debugging confusing. Check prefixes already in use (the `CLE` region on the [analyzer repeater list](https://analyzer.letsmesh.net/nodes/repeaters), or `/prefix-list` in `#meshcore-general` on Discord), then generate and set a non-colliding key.

The full procedure is in [MeshCore Repeater Collisions](./meshcore-collisions.md). Do this **before** deploying — changing the key later changes the repeater's identity, and anything that references the old public key will need updating.

### Name

```txt
set name CLE - Tower 1 NE
```

Choose something descriptive and reasonably unique; town or neighborhood names are common. Avoid very short or generic names. Names are limited to 23 bytes when location is included (31 bytes otherwise), and longer names are truncated.

### Location (optional)

```txt
set lat 41.4993
set lon -81.6944
```

Decimal degrees. Publishing location helps the community map coverage. Leave it at `0` if you prefer not to share it.

### Owner info (optional)

```txt
set owner.info Your callsign or Discord handle
```

Requires firmware 1.12+. A `|` character is displayed as a newline.

### Admin password

**Change the default admin password.** The default is `password`, and anyone who logs in with the admin password can reconfigure your repeater remotely.

```txt
password <new-admin-password>
```

Store it in a password manager rather than a plain text file.

---

## Step 5: Switch to 2-byte path hashes

2-byte path hashes make nodes easier to tell apart on the mesh. This requires firmware 1.14+. Older firmware silently drops these packets.

```txt
set path.hash.mode 1
get path.hash.mode
```

The reply is `> 1`. No reboot is needed. See [Switch to 2-Byte Hashes](/2byte) for companion settings and current adoption across the mesh.

---

## Step 6: Verify

Send a flood advert so the mesh learns about the repeater:

```txt
advert
```

Then check from the field:

- **Neighbors:** run `neighbors` on the repeater to list nearby nodes it has heard (8 most recent adverts).
- **Trace:** from your companion, use **Tools → Trace** to your repeater, then to a known nearby repeater with yours as the final hop (`Your Repeater → Target Repeater → Your Repeater`).
- **Repeats heard:** send a message in `#test` and confirm repeats are heard.
- **Analyzers:** look for your repeater and its traffic on the [LetsMesh analyzer](https://analyzer.letsmesh.net/packets?region=CLE) and the [Live Map](https://corescope.neomesh.org).

Not appearing on a map does not necessarily mean the repeater is not transmitting. Trust trace results and repeats heard first. If something is off, see [MeshCore Troubleshooting](./meshcore-troubleshooting.md).

---

## Step 7: Save a rebuild kit

Keep a small "rebuild kit" for each repeater in a password manager:

- **Private key** (`get prv.key`, serial only)
- **Repeater name**
- **Admin password**
- **Lat/long** (if published)

If you ever reflash or replace a board, you can restore these values and bring it back up identical to what is in the field.

---

## Optional: Run an observer

A repeater can also report the packets it hears to LetsMesh as an observer, which helps the community see coverage and routing quality. See [MeshCore LetsMesh Observer](./meshcore-letsmesh-observer.md).

---

## Quick command summary

```txt
ver
set radio 910.525,62.5,7,8
set tx 22
set advert.interval 240
set flood.advert.interval 47
set name <name>
set lat <latitude>
set lon <longitude>
password <new-admin-password>
set path.hash.mode 1
reboot
advert
```

Set a non-colliding private key using [MeshCore Repeater Collisions](./meshcore-collisions.md) before deploying.

For every available command, see the official [MeshCore CLI reference](https://docs.meshcore.io/cli_commands/).
