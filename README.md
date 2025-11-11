# 🎮 Voice Jump Game

A voice-controlled endless runner platformer game where your voice controls the height of your jumps! The louder you speak or shout, the higher your character jumps. Navigate through obstacles, survive as long as possible, and achieve high scores in this unique Mario-inspired game.

## 🎯 Game Concept

Run automatically from left to right and use your voice to jump over obstacles:
- **Whisper** → Small jump
- **Normal voice** → Medium jump
- **Loud voice** → High jump
- **Shout** → Super jump!

## ✨ Features

- 🎤 **Voice-Controlled Gameplay** - Jump by using your voice, with jump height based on volume
- 🏃 **Endless Runner** - Procedurally generated levels with increasing difficulty
- 🎨 **Mario-Inspired Theme** - Retro pixel art aesthetic with modern polish
- 🎵 **Dynamic Audio** - Upbeat 8-bit style music and satisfying sound effects
- 🏆 **Scoring System** - Combo multipliers, perfect jumps, and high score tracking
- 📊 **Voice Meter** - Real-time visualization of your voice input
- ⚙️ **Customizable** - Adjust voice sensitivity, volume, and controls
- ♿ **Accessible** - Alternative keyboard/touch controls, colorblind modes
- 📱 **Cross-Platform** - Works on desktop and mobile browsers

## 🎬 Quick Start

### Play Online
🎮 **Play now**: [https://Nurtau.github.io/jump-by-voice-game/](https://Nurtau.github.io/jump-by-voice-game/)

> **Note**: Grant microphone permission when prompted for voice control to work!

### Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/[username]/jump-by-voice-game.git
cd jump-by-voice-game
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173` (or the URL shown in terminal)

5. **Grant microphone access**
The game requires microphone access to detect your voice

## 🎮 How to Play

### Getting Started
1. Launch the game and grant microphone permission
2. Complete the quick calibration to adjust sensitivity
3. Practice in the tutorial to get comfortable with voice control
4. Start the game and survive as long as possible!

### Controls

#### Primary (Voice Control)
- **Speak/Make Noise** - Jump (height based on volume)
- Hold voice to sustain jump
- Short bursts for quick hops

#### Alternative Controls
- **Spacebar** - Jump (hold for higher jump)
- **Mouse Click** - Jump (hold for higher jump)
- **Touch/Tap** - Jump (hold for higher jump)

#### General
- **ESC** - Pause game
- **R** - Restart (after game over)

### Gameplay Tips
- 🎯 Time your jumps carefully - obstacles come fast!
- 🔥 Chain successful jumps for combo multipliers
- ⭐ Land perfect jumps for bonus points
- 📏 Watch the voice meter to see your current volume
- 🎤 Find your optimal voice volume in a quiet environment

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Game Design Document](docs/GAME_DESIGN.md)** - Complete game design specifications
  - Core gameplay mechanics
  - Obstacle types and progression
  - Scoring and power-up systems
  - Character and environment design

- **[Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md)** - System architecture and implementation
  - Technology stack
  - Core modules and classes
  - Data flow and algorithms
  - Performance optimization

- **[UI/UX Design](docs/UI_DESIGN.md)** - Visual design and user experience
  - Mario-inspired color palette
  - UI layouts and components
  - Animation specifications
  - Accessibility features

- **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)** - Development roadmap
  - Phase-by-phase development plan
  - Timeline and milestones
  - Resource requirements
  - Quality assurance checklist

## 🛠️ Technology Stack

- **Frontend**: HTML5, JavaScript (ES6+) / TypeScript
- **Rendering**: HTML5 Canvas (2D Context)
- **Audio**: Web Audio API for voice input analysis
- **Build Tool**: Vite
- **Styling**: CSS3
- **Storage**: LocalStorage for high scores and settings

## 🏗️ Project Structure

```
jump-by-voice-game/
├── src/
│   ├── core/          # Game engine (loop, physics, renderer)
│   ├── entities/      # Game objects (player, obstacles)
│   ├── systems/       # Game systems (voice, level gen, collision)
│   ├── ui/            # UI components (HUD, menus, screens)
│   ├── utils/         # Utilities (assets, animations, helpers)
│   ├── config/        # Configuration files
│   └── main.js        # Entry point
├── assets/
│   ├── images/        # Sprites and visual assets
│   ├── sounds/        # Sound effects and music
│   └── fonts/         # Game fonts
├── public/
│   └── index.html     # Main HTML file
├── docs/              # Documentation
└── tests/             # Test files
```

## 🚀 Development

### Prerequisites
- Node.js 16+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Microphone (for voice control testing)

### Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Files will be in /dist folder
# Deploy the /dist folder to your hosting provider
```

### Deploying to GitHub Pages

The game is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in repository settings:
   - Go to Settings > Pages
   - Source: Select "GitHub Actions"

2. **Push to main branch** (or use the workflow dispatch):
   ```bash
   git push origin main
   ```

3. **Automatic deployment** will start via GitHub Actions

4. **Access your game** at:
   - `https://[username].github.io/jump-by-voice-game/`

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🎨 Asset Creation

### Sprites
- Created with Aseprite or Piskel
- Pixel art style (8x8 or 16x16 base)
- Exported as sprite sheets
- 2x scaling for retro aesthetic

### Audio
- Sound effects: Freesound.org or custom
- Music: 8-bit style chiptune
- Format: MP3/OGG for web compatibility

### Fonts
- "Press Start 2P" for retro text
- Loaded via Google Fonts

## 🧪 Testing

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Support
- ✅ iOS Safari (with microphone permission)
- ✅ Android Chrome (with microphone permission)
- ⚠️ Voice input may vary by device

### Known Issues
- Some browsers require user interaction before accessing microphone
- Mobile browsers may have different audio latency
- Voice input quality depends on device microphone

## 📋 Roadmap

### Version 1.0 (MVP) - Current
- [x] Core gameplay mechanics
- [x] Voice control system
- [x] Basic obstacles and progression
- [x] Scoring and high scores
- [x] UI and menus
- [ ] Tutorial system
- [ ] Sound effects and music
- [ ] Polish and bug fixes

### Version 1.1 - Planned
- [ ] Additional character skins
- [ ] More obstacle types
- [ ] New visual themes (Desert, Ice, Night)
- [ ] Achievements system
- [ ] Statistics tracking
- [ ] Level packs

### Version 2.0 - Future
- [ ] Online leaderboards
- [ ] Multiplayer races
- [ ] Daily challenges
- [ ] Mobile apps (iOS/Android)
- [ ] Social features
- [ ] Tournament mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits focused and descriptive

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic Mario platformers
- Web Audio API documentation from MDN
- Pixel art community for inspiration
- Open-source game development community

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/[username]/jump-by-voice-game/issues)
- **Discussions**: [GitHub Discussions](https://github.com/[username]/jump-by-voice-game/discussions)
- **Email**: [your-email@example.com]
- **Twitter**: [@yourusername]

## 🎉 Have Fun!

Enjoy playing Voice Jump! Don't forget to share your high scores and let us know what you think!

---

Made with ❤️ and lots of voice testing
