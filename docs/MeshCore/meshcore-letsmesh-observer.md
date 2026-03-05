---
id: meshcore-letsmesh-observer
title: MeshCore LetsMesh Observer
sidebar_label: LetsMesh Observer
---

# MeshCore LetsMesh Observer

LetsMesh analyzer: https://analyzer.letsmesh.net/

## What Is LetsMesh?

LetsMesh is a packet analyzer and observer network for MeshCore. It collects packet reports from observer nodes to help communities understand coverage, routing quality, and overall network behavior.

## What Does an Observer Do?

An observer is an MQTT-connected MeshCore node that reports packets it hears to LetsMesh. Observers can be repeater, room server, or companion setups depending on your node type.

## NEO Observer Status

You can view active observers for NEO here:

- https://analyzer.letsmesh.net/status/observers?region=NEO

## Set Up an Observer

To set up your own observer, follow the LetsMesh onboarding instructions:

- https://analyzer.letsmesh.net/observer/onboard

## Also Upload to NEO MQTT

If you are already uploading to LetsMesh, you might as well also upload to the NEO Mesh MQTT server to help improve local visibility and our live map.

When your setup asks about additional/custom brokers, choose **yes** and add NEO MQTT.

- NEO MQTT setup doc: https://neome.sh/docs/MeshCore/meshcore-mqtt
oming Soon - You can view the local once your uploads are flowing.

## MeshMapper + Wardriving

MeshMapper for NEO runs off LetsMesh observer data. For MeshMapper links and wardriving details, see:

- https://neome.sh/docs/MeshCore/meshcore-wardrive
