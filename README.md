# Sinhala Mulakuru - Sinhala Typing Practice App

Sinhala Mulakuru is a modern, mobile-friendly web application designed to help you learn and practice Sinhala typing using different keyboard layouts. Whether you are a beginner or want to improve your speed and accuracy, this app provides a fun and effective way to master Sinhala typing.

## Features
- Practice Sinhala words and sentences (Easy / Medium / Hard / Custom)
- Typing speed (WPM) and accuracy tracking
- Mistake highlighting and feedback
- Multiple keyboard layouts: Phonetic, Wijesekara
- Custom text practice mode
- Leaderboard to track your best scores
- Dark/Light mode
- Custom themes and keyboard layouts (Premium)
- **Advertisement system:** Video or image ads with clickable links (sidebar, desktop/mobile responsive)
- **Premium removes all ads**
- Fully responsive, professional UI/UX (works great on mobile and desktop)
- Improved help modal with clear Sinhala typing instructions

## Getting Started
1. **Download or clone** this repository.
2. Open the `index.html` file in your web browser (no installation required).

## Folder Structure
```
index.html
css/
  styles.css
js/
  app.js
assets/
  (images, icons, logo)
ads/
  (ad video/image files)
```

## How to Add or Change Ads
- Ads are shown in the sidebar as video or image banners.
- To add or change an ad:
  1. Place your ad video (e.g. `1.mp4`) or image (e.g. `2.jpg`) in the `ads/` folder.
  2. In `index.html`, inside the `.ad-video-row` div, add or update the following:
     ```html
     <a href="https://your-ad-link.com" target="_blank" rel="noopener noreferrer">
       <video class="ad-video" width="90" height="60" src="./ads/1.mp4" autoplay muted loop playsinline></video>
     </a>
     <a href="https://your-ad-link.com" target="_blank" rel="noopener noreferrer">
       <img class="ad-video" width="90" height="60" src="./ads/2.jpg" />
     </a>
     ```
  3. Change the `href` to your desired link. You can mix video and image ads.
- **Premium users will not see ads.**

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the app.

## License
MIT

---
Developed by [Janith Suraweera](https://github.com/janithsuraweera/) 