---
title: My Terminal Setup
date: 2017-01-18
layout: post.njk
hero: /images/2017-01-iterm.png
tags: Terminal, macOS
publish: draft
---

### iTerm2

I enjoy using Linux, and have worked on various Linux-specific projects in my spare time, but my primary OS for work is macOS. While the built-in Terminal app works, I prefer using [iTerm2](https://www.iterm2.com). It has many great features that Terminal lacks, of which my favorite is the ability to open multiple split panes and rearrange them in various ways. With a 15" MacBook, I'm able to have two columns of split panes, with each column having up to three panes at once. This is useful when I need to have two shells with long-running tasks for backend and frontend, a scratch shell, and often a db REPL as well.

![iTerm with multiple split panes](/images/2017-01-iterm-split-panes.png)

### Fish Shell

Bash is the default shell on both macOS and Linux. However, my favorite shell is [Fish](https://fishshell.com), which offers many improvements over Bash, including:

 * Smart autosuggestions based on your history and what you've started typing
 * Scrolling through a subset of your shell history based on what you've typed
 * Out-of-the-box completions with fancy descriptions pulled from man pages
 * Syntax highlighting, including highlighting file paths to indicate if the path exists

![Fish features](/images/2017-01-fish-features.png)

### Powerline

Fish is pretty cool on its own, but it gets even better when coupled with [Powerline](https://github.com/powerline/powerline). Powerline provides a nice statusline with a colored background that clearly stands out from command output. It also offers several developer integrations, such as showing which branch you're on in a code repository, or how many stashes you have in git.

![Powerline status](/images/2017-01-powerline.png)

### Hack Font

There's a slight issue with using Powerline: there are squares with question marks at several points in the statusline. This is because Powerline uses special characters to build arrows into the statusline. [The solution](https://powerline.readthedocs.io/en/latest/installation.html#fonts-installation) is to use a patched version of your preferred font or a fallback font. Or, better yet, use a font that comes with the special symbols built-in. I've tried several fonts, and my favorite fixed-width font for coding and terminal usage is [Hack](https://github.com/chrissimpkins/Hack)

![Hack font](https://sourcefoundry.org/hack/assets/img/mockup/Aa-mockup-2.png)

### OneDark theme

By default, Terminal uses a white background with dark text while iTerm uses a dark background with light text. While iTerm comes with a bunch of themes to choose from, my favorite theme is [OneDark](https://github.com/nathanbuchar/atom-one-dark-terminal), the same theme used by Atom. Unfortunately, the text color isn't bright enough against the dark background by default, so I've changed the text color to `#ACB2BE`, the same text color as Atom uses for regular text in the OneDark theme.

<!-- TODO: Screenshot of the OneDark theme -->


### Dotfiles



### Neovim

### VirtualFish

### Homebrew

### Links

Here are links to everything I use:

 * [iTerm2](https://www.iterm2.com)
 * [Fish](https://fishshell.com)
 * [Powerline](https://github.com/powerline/powerline)
 * [OneDark theme](https://github.com/nathanbuchar/atom-one-dark-terminal)
 * [Hack font](https://sourcefoundry.org/hack/)
 * [My dotfiles configuration](https://github.com/iBelieve/dotfiles)
 * [Neovim](https://neovim.io)
