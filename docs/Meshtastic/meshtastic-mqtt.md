---
id: meshtastic-mqtt
title: Meshtastic MQTT Server
sidebar_label: Meshtastic MQTT
---

# Meshtastic MQTT Server

The Meshtastic side of the NEO Mesh network uses a shared MQTT broker to sync telemetry and messages between local radios and the public Meshtastic map services.

Our Meshtastic MQTT broker is:

- **Hostname:** `mqtt.neomesh.org`
- **Protocol:** MQTT (unencrypted on port 1883)
- **Authentication:** neomesh:meshneo
- **Bridged to maps:**  
  - [Liam Cottle’s Meshtastic Map](https://meshtastic.liamcottle.net/)  
  - [MeshMap.net](https://meshmap.net/)

You only need to configure your radio to talk to **`mqtt.neomesh.org`**. The broker will automatically uplink your position and telemetry to both maps.

:::info
All *radio-level* security (encryption, channels, etc.) is still handled by Meshtastic. The MQTT broker simply carries already-encrypted Meshtastic packets between devices and the mapping backends.
:::

---

## MQTT Broker Behavior

The broker at `mqtt.neomesh.org` is configured to:

- Accept connections from Meshtastic nodes with valid credentials.
- Uplink packets under the **`msh/US/OH`** root topic to:
  - `mqtt.meshtastic.liamcottle.net` (for Liam Cottle’s map)
  - `mqtt.meshmap.net` / `mqtt.meshtastic.org`-style backends (for MeshMap.net and related services)
- Provide downlink & uplink commands from the internet back into the mesh .

---

## Recommended Meshtastic Settings

On your Meshtastic device (via the app, web UI, or CLI), configure the following options.

### MQTT Settings

Under **MQTT**:

- **MQTT > Enabled:** `ON`  
  Enables MQTT support so your node can connect to the broker.

- **MQTT > Encryption Enabled:** `ON`  
  Keeps your MQTT messages encrypted at the Meshtastic protocol level.  
  *(This is independent of TLS on the broker port.)*

- **MQTT > Map Report:** `ON`  

- **MQTT > Root Topic:** `msh/US/OH`  
  This ensures your node publishes into the **OH** topic tree that our broker expects.

- **MQTT > Address:** `mqtt.neomesh.org`  
  This is the hostname of the NEO Mesh Meshtastic MQTT broker.

- **MQTT > Username:** `neomesh`  
- **MQTT > Password:** `meshneo`  

  These are the required credentials for this broker.  
  If your node doesn’t support username/password, it **will not** be able to connect.

- **MQTT > TLS Enabled:** `OFF`  
  Our Meshtastic MQTT listener currently runs on plain MQTT (`tcp://`) with encryption handled by Meshtastic itself.  
  Make sure this is off unless explicitly told otherwise in future docs.

---

### Channel Settings

Under **Channels** → **Primary Channel**:

- **Positions Enabled:** `ON`  
  Allows your node to send GPS/location updates over the channel.

- **Approximate Location:** *(set as desired)*  
  Use this to blur your exact location if you want more privacy.  
  - Smaller radius = more accurate position on the map.  
  - Larger radius = more privacy, but less precise pin on the map.

- **MQTT Uplink:** `ON`  
  This allows position and telemetry from this channel to be sent **up** to the MQTT broker (and then to the maps).

- **MQTT Downlink:** `ON or OFF`  
  We currently allow users to chose either option. With MQTT Downlink ON you will connect to others on the mesh via the mqtt broker. With MQTT Downlink off you will not download any data from the mqtt broker. 

---

### Module Settings

Under **Settings** → **Modules**:

- **Neighbor Info:** `ON`  

This enables the Neighbor Info module, which provides information about nearby nodes and helps make the mesh health and topology visible to monitoring tools and maps.

---

### LoRa Settings

Under **LoRa**:

- **Ok to MQTT:** `ON`  

This setting confirms that it’s acceptable for RF traffic to be mirrored to MQTT.  
With this turned on, your node will contribute to the shared view of the mesh on the mapping services.

---

## What This Setup Does for You

With the settings above:

- Your node connects to `mqtt.neomesh.org` using **MQTT + credentials**.
- The broker forwards (uplinks) your Meshtastic packets to:
  - [https://meshtastic.liamcottle.net/](https://meshtastic.liamcottle.net/)
  - [https://meshview.neomesh.org/map](https://meshview.neomesh.org/map)
- Your device’s position and telemetry appear on those maps under the **OH** region/topic.
- RF traffic stays local on LoRa and is mirrored to the internet for visualization and analysis.

You don’t need to configure any external MQTT addresses on your node—just the **NEO Mesh MQTT broker** details listed here.

---

## Troubleshooting

If your node is not appearing on the map:

1. **Verify MQTT Status on the Node**
   - Check that:
     - MQTT is **Enabled**
     - Address is **`mqtt.neomesh.org`**
     - Root Topic is **`msh/US/OH`**
     - Username/password are set correctly.

2. **Check Approximate Location**
   - If your approximate radius is very large, your pin may look very “blurred” or generalized.

3. **Confirm Channel Matching**
   - Ensure your node is using the correct **Primary Channel** matching the rest of the NEO Mesh Meshtastic setup.

4. **Try a Reboot**
   - Power-cycle the node or restart from the UI after changing MQTT settings.

If the problem persists, reach out to the NEO Mesh maintainers with your node’s **ID** and **approximate location** so we can check the MQTT broker logs and map uplink status.
