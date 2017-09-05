---
title: Projects
---

### [AeroPi](https://github.com/iBelieve/aeropi-rs)

This is my flight controller for a DIY quadcopter I'm building, written in Rust and designed to be fully automated, with little or no interaction from a human pilot.

### [Krunch](https://github.com/iBelieve/krunch)

Krunch is a Kotlin parser/combinator library that I wrote for an Android budgeting app that will use [hledger](http://hledger.org/) plain-text accounting files as the source for budgeting/financial info. It uses Kotlin's inline function calls to make for easily understable parsers like this:

``` kotlin
val transaction = datePair and status and optional(code) and description and
        followingComment and postings flatMap ::TransactionAST
```

### [GNOME Inbox](https://github.com/iBelieve/gnome-inbox)

Built using Rust and Gtk, this app for integrates Google Inbox with the GNOME Inbox, much like [Boxy](http://www.boxyapp.co/) does for macOS.

### [Oxide](https://github.com/iBelieve/oxide)

Oxide is my toy operating system kernel, written primarily in Rust with a bit of assembly mixed in where needed. My first kernel was written in C++. My goal is to eventually implement a text-based user interface for the OS.

### [Papyros](https://github.com/papyros)

One of the largest projects I've worked on, Papyros was an operating system based on Arch Linux with a custom desktop environment and set core applications built around Wayland, Qt/QML, and Google's Material Design guidelines. The project has sense merged into [Liri](http://liri.io/), which I'm no longer actively contributing to.

### [QML Material](https://github.com/papyros/qml-material)

QML Material was a UI framework built on QtQuick and implementing Google's Material Design guidelines. It's since been superseded by QtQuick Controls 2.0.

### [Quickly](https://github.com/quickly/quickly)

Quickly was my attempt to improve JavaScript usage in QML by integrating Babel to support ES6+ features as well as offering a more Node.js-like environment, even to the point of supporting npm modules. I ran into issues getting that to work, and am not actively working on the idea.
