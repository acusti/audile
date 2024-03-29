audile
======

[![latest version](https://img.shields.io/npm/v/audile?style=for-the-badge)](https://www.npmjs.com/package/audile)
[![bundle size](https://img.shields.io/bundlephobia/minzip/audile?style=for-the-badge)](https://bundlephobia.com/package/audile)

_A mobile-friendly audio player optimized for use with longer-form audio. [See it in action.](https://www.chrispattonmusic.com/nissas-flute/)_

Features
--------

* Supports both a single audio track or multiple tracks in order (e.g. a playlist)
* Saves last-played track and playhead location and restores them when returning to that page
* Features a simple mobile-first design with touch-friendly controls ([see example](https://www.chrispattonmusic.com/nissas-flute/))
* Includes controls for previous and next track and for skipping backwards or forwards 15 seconds
* Shows the title of the current playing track in the player
* Weighs in at around 10KB (minified) with no dependencies

Usage
-----
Include the library anywhere in your page HTML (insert desired version number in place of `1.0.1`):

```html
<script async src="https://unpkg.com/audile@1.0.1/index.js"></script>
```

Add the audio files you want to be playable by the player inside a `.audile` containing element:

```html
<div class="audile">
    <h2>The Ricky Gervais Show: The Complete First Season</h2>
    <audio preload="auto" src="https://archive.org/download/Ricky_Gervais-Podcasts/01%20Episode%20One.mp3" title="Episode One"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Two.mp3" title="Episode Two"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/01%20Episode%20Three.mp3" title="Episode Three"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Four.mp3" title="Episode Four"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/01%20Episode%20Five.mp3" title="Episode Five"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Six.mp3" title="Episode Six"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/01%20Episode%20Seven.mp3" title="Episode Seven"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Eight.mp3" title="Episode Eight"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Nine.mp3" title="Episode Nine"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Ten.mp3" title="Episode Ten"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Eleven.mp3" title="Episode Eleven"></audio>
    <audio src="https://archive.org/download/Ricky_Gervais-Podcasts/02%20Episode%20Twelve.mp3" title="Episode Twelve"></audio>
</div>
```
You can fix the player to the bottom or top of the viewport via the `data-adl-attach` attribute:
```html
<!-- Attach to the top of the viewport: -->
<div class="audile" data-adl-attach="top">…</div>
<!-- Attach to the bottom of the viewport: -->
<div class="audile" data-adl-attach="bottom">…</div>
```
