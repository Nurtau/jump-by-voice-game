# Voice Jump Game - UI/UX Design (Mario-Inspired Theme)

## Design Philosophy

### Core Principles
1. **Clarity**: All UI elements must be immediately understandable
2. **Feedback**: Every action provides visual and audio feedback
3. **Accessibility**: Support for various play styles and abilities
4. **Nostalgia**: Evoke classic Mario platformer aesthetics
5. **Modern Touch**: Clean, polished interface with contemporary UX patterns

### Visual Style
- **Retro-Modern Hybrid**: Pixel art aesthetic with smooth animations
- **Bright and Colorful**: Vibrant color palette reminiscent of Mario games
- **High Contrast**: Ensure readability and visibility
- **Playful**: Fun, energetic, and inviting visual language

## Color Palette

### Primary Colors (Mario-Inspired)

#### Sky Blue
- **Primary**: `#5C94FC` - Main background sky
- **Light**: `#87CEEB` - Upper sky gradient
- **Dark**: `#4169E1` - Darker sky sections

#### Grass Green
- **Primary**: `#7EC850` - Ground and platforms
- **Light**: `#90EE90` - Highlights
- **Dark**: `#228B22` - Shadows and depth

#### Brick Red
- **Primary**: `#D84030` - Obstacles and danger
- **Light**: `#FF6B6B` - Highlights
- **Dark**: `#8B0000` - Deep shadows

#### Gold/Coin Yellow
- **Primary**: `#FFD700` - Coins, stars, achievements
- **Light**: `#FFEC8B` - Shine effects
- **Dark**: `#DAA520` - Shadows

#### Character Colors
- **Hero Blue**: `#4A90E2` - Main character primary
- **Hero White**: `#FFFFFF` - Character accents
- **Hero Orange**: `#FF8C42` - Energy/power indicators

### UI Colors

#### Background Elements
- **UI Dark**: `#2C3E50` - Menu backgrounds
- **UI Medium**: `#34495E` - Secondary panels
- **UI Light**: `#ECF0F1` - Light panels and cards

#### Text Colors
- **Primary Text**: `#FFFFFF` - Main text with black outline
- **Secondary Text**: `#2C3E50` - Menu text
- **Highlight**: `#FFD700` - Important information
- **Danger**: `#E74C3C` - Warnings and errors

#### Status Colors
- **Success**: `#2ECC71` - Achievements, perfect jumps
- **Warning**: `#F39C12` - Caution indicators
- **Error**: `#E74C3C` - Damage, game over
- **Info**: `#3498DB` - Tips and information

## Typography

### Font Choices

#### Primary Font: "Press Start 2P"
- **Usage**: Headers, score, main UI text
- **Style**: Retro pixel font (Mario-style)
- **Weight**: Regular (only weight available)
- **Fallback**: Courier New, monospace

```css
font-family: 'Press Start 2P', 'Courier New', monospace;
```

#### Secondary Font: "Super Mario 256"
- **Usage**: Menu titles, special announcements
- **Style**: Custom Mario-style font
- **Fallback**: Press Start 2P

#### Readable Font: "Roboto" or "Open Sans"
- **Usage**: Settings, instructions, longer text
- **Style**: Modern, clean sans-serif
- **Weights**: 400 (Regular), 700 (Bold)

### Text Styling

#### Pixel Text Effect (Mario Style)
```css
.pixel-text {
  font-family: 'Press Start 2P', monospace;
  color: #FFFFFF;
  text-shadow:
    3px 3px 0px #000000,
    -1px -1px 0px #000000,
    1px -1px 0px #000000,
    -1px 1px 0px #000000,
    1px 1px 0px #000000;
  letter-spacing: 2px;
}
```

#### Gold Text Effect (Coins/Score)
```css
.gold-text {
  font-family: 'Press Start 2P', monospace;
  color: #FFD700;
  text-shadow:
    2px 2px 0px #8B4513,
    4px 4px 0px rgba(0, 0, 0, 0.3);
  animation: shimmer 2s infinite;
}
```

## UI Layouts

### Main Menu Screen

```
╔════════════════════════════════════════════╗
║                                            ║
║           🎮 VOICE JUMP 🎮                ║
║                                            ║
║         [Character Animation]              ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   START GAME     │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   TUTORIAL       │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   SETTINGS       │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   HIGH SCORES    │               ║
║        └──────────────────┘               ║
║                                            ║
║     High Score: 9999   🔊 [===]          ║
╚════════════════════════════════════════════╝
```

**Elements**:
- Animated title with bouncing letters
- Idle character animation in center
- Large, touch-friendly buttons
- Clouds drifting in background
- Sound toggle and volume indicator
- High score display at bottom

### Game HUD Layout

```
╔════════════════════════════════════════════╗
║ SCORE: 00000    ❤️❤️❤️    COMBO: x1      ║
║                                            ║
║ [Voice Meter]                              ║
║ ┌─┐                                        ║
║ │█│                                        ║
║ │█│              [GAMEPLAY AREA]          ║
║ │█│                                        ║
║ │█│                                        ║
║ │░│                                        ║
║ └─┘                                        ║
║                                            ║
║                                            ║
║ Distance: 234m                [PAUSE]      ║
╚════════════════════════════════════════════╝
```

**Key Elements**:
1. **Top Bar**:
   - Score (left)
   - Lives/Hearts (center)
   - Combo multiplier (right)

2. **Voice Meter** (left side):
   - Vertical bar
   - Color gradient (green → yellow → red)
   - Real-time volume visualization
   - Jump threshold indicators

3. **Bottom Bar**:
   - Distance traveled
   - Pause button
   - Mini-map (future enhancement)

### Gameplay Screen Details

#### HUD Components

**Score Display**
```
┌─────────────────┐
│ SCORE           │
│ 012345          │
└─────────────────┘
```
- Position: Top-left
- Font: Press Start 2P, 24px
- Color: White with black outline
- Updates: Every frame
- Animation: Pulse on score increase

**Lives Display**
```
┌──────────────┐
│ ❤️ ❤️ ❤️    │
└──────────────┘
```
- Position: Top-center
- Size: 32x32px per heart
- States: Full, empty
- Animation: Shake on damage

**Combo Multiplier**
```
┌──────────────┐
│ COMBO        │
│  x5 🔥       │
└──────────────┘
```
- Position: Top-right
- Font: Press Start 2P, 20px
- Color: Changes with multiplier level
  - x1: White
  - x2: Yellow
  - x3: Orange
  - x5: Red with flame animation
- Animation: Grows on combo increase

**Voice Meter**
```
┌──┐
│🔴│ ← Super Jump (85-100%)
│🟡│ ← High Jump (60-85%)
│🟢│ ← Medium Jump (30-60%)
│🟢│ ← Small Jump (10-30%)
│░░│ ← Threshold (0-10%)
└──┘
```
- Position: Left side, vertically centered
- Size: 40px wide, 200px tall
- Gradient: Green (bottom) to Red (top)
- Threshold lines: White dashed lines
- Current level: Filled bars
- Background: Semi-transparent dark

**Distance Counter**
```
┌──────────────┐
│ 📏 1,234 m   │
└──────────────┘
```
- Position: Bottom-left
- Font: Press Start 2P, 18px
- Color: White with outline
- Updates: Real-time

### Pause Menu

```
╔════════════════════════════════════════════╗
║                                            ║
║              ⏸️  PAUSED                    ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   RESUME         │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   RESTART        │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   SETTINGS       │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   MAIN MENU      │               ║
║        └──────────────────┘               ║
║                                            ║
╚════════════════════════════════════════════╝
```

**Features**:
- Darkened/blurred gameplay background
- Semi-transparent overlay
- Large, clear buttons
- Quick resume with ESC or spacebar

### Game Over Screen

```
╔════════════════════════════════════════════╗
║                                            ║
║            💀 GAME OVER! 💀               ║
║                                            ║
║         Your Score: 12,345                ║
║         High Score: 15,000                ║
║                                            ║
║         Distance: 1,234 m                 ║
║         Best Combo: x8                    ║
║         Perfect Jumps: 45                 ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   TRY AGAIN      │               ║
║        └──────────────────┘               ║
║                                            ║
║        ┌──────────────────┐               ║
║        │   MAIN MENU      │               ║
║        └──────────────────┘               ║
║                                            ║
║        📱 Share Score                     ║
╚════════════════════════════════════════════╝
```

**Features**:
- Dramatic entrance animation
- Statistics breakdown
- New high score celebration (if achieved)
- Share functionality
- Quick retry option

### Settings Screen

```
╔════════════════════════════════════════════╗
║                                            ║
║              ⚙️ SETTINGS                  ║
║                                            ║
║  🔊 SOUND                                  ║
║  ┌────────────────────────────┐           ║
║  │ Music      [=========>    ] 80%        ║
║  │ SFX        [===========>  ] 90%        ║
║  └────────────────────────────┘           ║
║                                            ║
║  🎤 VOICE                                  ║
║  ┌────────────────────────────┐           ║
║  │ Sensitivity [======>      ] 60%        ║
║  │ Threshold   [===>         ] 30%        ║
║  │                                         ║
║  │ [CALIBRATE MICROPHONE]                 ║
║  │ [TEST VOICE]                           ║
║  └────────────────────────────┘           ║
║                                            ║
║  🎮 CONTROLS                               ║
║  ┌────────────────────────────┐           ║
║  │ [✓] Voice Control                      ║
║  │ [ ] Keyboard (Space)                   ║
║  │ [ ] Mouse Click                        ║
║  └────────────────────────────┘           ║
║                                            ║
║  🎨 GRAPHICS                               ║
║  ┌────────────────────────────┐           ║
║  │ Quality:  [High ▼]                     ║
║  │ [✓] Particles                          ║
║  │ [✓] Screen Shake                       ║
║  └────────────────────────────┘           ║
║                                            ║
║            [BACK TO MENU]                 ║
╚════════════════════════════════════════════╝
```

**Sections**:
1. **Sound Settings**: Music and SFX volume sliders
2. **Voice Settings**: Microphone calibration and sensitivity
3. **Control Options**: Alternative input methods
4. **Graphics Options**: Performance and visual effects
5. **Accessibility**: Color blind mode, reduced motion

### Tutorial/Calibration Screen

```
╔════════════════════════════════════════════╗
║                                            ║
║         🎤 MICROPHONE SETUP                ║
║                                            ║
║  Step 1: Grant microphone permission      ║
║          [ALLOW ACCESS]                    ║
║                                            ║
║  Step 2: Calibration                      ║
║                                            ║
║  Please remain quiet for 3 seconds...     ║
║                                            ║
║  ┌────────────────────────────┐           ║
║  │ [Ambient Noise Detection]  │           ║
║  │                             │           ║
║  │    ▓▓▓▓▓░░░░░░░░░░░        │           ║
║  │                             │           ║
║  └────────────────────────────┘           ║
║                                            ║
║  Step 3: Test your voice                  ║
║                                            ║
║  Try different volumes:                   ║
║  • Whisper (small jump)                   ║
║  • Normal voice (medium jump)             ║
║  • Loud voice (high jump)                 ║
║  • Shout (super jump)                     ║
║                                            ║
║  ┌──┐        [Character Demo]             ║
║  │██│                                      ║
║  │██│        [Shows jump heights]         ║
║  │░░│                                      ║
║  └──┘                                      ║
║                                            ║
║         [CONTINUE TO GAME]                ║
╚════════════════════════════════════════════╝
```

**Tutorial Flow**:
1. Microphone permission request
2. Ambient noise calibration (3 seconds)
3. Voice range testing
4. Interactive jump height demo
5. Practice mode with first obstacle

## Visual Elements

### Character Design - "Echo"

#### Sprite Specifications
- **Size**: 40x60 pixels (scaled 2x for retro look)
- **Color Scheme**:
  - Primary: Bright blue (`#4A90E2`)
  - Secondary: White (`#FFFFFF`)
  - Accent: Orange (`#FF8C42`)
  - Outline: Dark blue (`#2C3E50`)

#### Animation States

**Running (8 frames, 12fps)**
```
Frame 1: Leg back, arms forward
Frame 2: Mid-stride
Frame 3: Leg forward, arms back
Frame 4: Both feet together
Frame 5: Opposite leg back
Frame 6: Mid-stride
Frame 7: Opposite leg forward
Frame 8: Both feet together
```

**Jumping (5 phases)**
```
Crouch: Pre-jump squat (1 frame)
Launch: Pushing off (2 frames)
Ascent: Rising, arms up (1 frame)
Peak: Top of arc, curled (1 frame)
Descent: Falling, arms down (1 frame)
Landing: Impact absorption (2 frames)
```

**Hit/Death (5 frames)**
```
Frame 1: Impact shock
Frame 2: Star-seeing dazed
Frame 3: Spinning
Frame 4: Falling
Frame 5: Flat on ground
```

### Obstacle Designs

#### Spike Trap
```
     /\
    /  \
   /    \
  /      \
████████████
```
- **Size**: 40x40px
- **Color**: Gray stone with red-tipped spikes
- **Animation**: Idle (no animation)
- **Style**: Sharp, dangerous, Mario-like spikes

#### Fire Pit
```
  🔥 🔥 🔥
████████████
```
- **Size**: 100x60px
- **Animation**: Fire flicker (4 frames, 8fps)
- **Colors**: Orange, red, yellow gradient
- **Effect**: Heat wave distortion above

#### Barrel
```
    ◢████◣
   ◢██████◣
  │  ━━━━  │
  │  ━━━━  │
  │  ━━━━  │
   ◥██████◤
    ◥████◤
```
- **Size**: 50x50px
- **Color**: Brown barrel with dark stripes
- **Animation**: Rolling (8 frames)
- **Movement**: Rolls toward player

#### Gap
```
████        ████
████        ████
████  [GAP] ████
```
- **Size**: 120px width
- **Visual**: Empty space between platforms
- **Depth**: Shows background below

### Environmental Elements

#### Ground/Platform
```
╔══════════════════╗
║ 🌱 🌱   🌱 🌱   ║  ← Grass layer
╠══════════════════╣
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║  ← Dirt layer
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
╚══════════════════╝
```
- **Colors**: Green grass on brown dirt
- **Texture**: Pixel-style grass blades
- **Pattern**: Repeating seamless tile

#### Clouds (Background)
```
      ████
   ████████████
 ██████████████████
████████████████████
 ██████████████████
```
- **Color**: White with light gray shadow
- **Movement**: Parallax scrolling at 0.2x speed
- **Size**: Various (small, medium, large)

#### Hills (Mid-ground)
```
                    ╱╲
          ╱╲      ╱    ╲
        ╱    ╲  ╱        ╲
      ╱        ╲          ╲
════════════════════════════
```
- **Color**: Dark green (`#228B22`)
- **Movement**: Parallax scrolling at 0.5x speed
- **Style**: Rounded, cartoon hills

#### Bushes
```
    ░░▒▒░░
  ░░▒▒▒▒▒▒░░
░░▒▒▒▒▒▒▒▒▒▒░
 ░▒▒▒▒▒▒▒▒▒░
   ▀▀▀▀▀▀▀▀
```
- **Color**: Bright green with darker shadows
- **Placement**: Ground level decoration
- **Variation**: 3 different sizes

### Particle Effects

#### Jump Particle
```
  ✦
```
- **Color**: White/yellow sparkle
- **Count**: 3-5 particles per jump
- **Behavior**: Shoot downward from feet
- **Lifespan**: 0.3 seconds

#### Collision Particle
```
  ★ ✦ ☆
```
- **Color**: Red/orange explosion
- **Count**: 10-15 particles
- **Behavior**: Radial burst from collision point
- **Lifespan**: 0.5 seconds

#### Perfect Jump Particle
```
  ⭐ ✨ ⭐
```
- **Color**: Gold sparkles
- **Count**: 8-12 particles
- **Behavior**: Rising sparkle trail
- **Lifespan**: 0.8 seconds

#### Combo Particle
```
  🔥
```
- **Color**: Orange flame trail
- **Behavior**: Trail behind character when combo active
- **Duration: Continuous during combo

### UI Buttons

#### Button Design (Mario Style)

**Default State**
```
╔══════════════╗
║  START GAME  ║
╚══════════════╝
```
- **Colors**:
  - Background: Green gradient (`#7EC850` to `#228B22`)
  - Border: Dark green (`#1A5F1A`)
  - Text: White with black shadow
- **Size**: 240x60px
- **Padding**: 15px vertical, 30px horizontal

**Hover State**
```
╔══════════════╗
║ ►START GAME◄ ║
╚══════════════╝
```
- **Changes**:
  - Slight scale up (1.05x)
  - Brighter colors
  - Arrow indicators
  - Subtle bounce animation

**Pressed State**
```
╔══════════════╗
║  START GAME  ║
╚══════════════╝
```
- **Changes**:
  - Slight scale down (0.95x)
  - Darker colors
  - Inset shadow effect

**Disabled State**
```
╔══════════════╗
║  LOCKED 🔒   ║
╚══════════════╝
```
- **Colors**: Grayscale
- **Opacity**: 50%
- **Cursor**: not-allowed

### Icons and Symbols

#### UI Icons (32x32px)

**Sound On/Off**
```
🔊  = Sound On
🔇  = Sound Muted
```

**Pause/Play**
```
⏸️  = Paused
▶️  = Playing
```

**Settings**
```
⚙️  = Settings menu
```

**Info/Help**
```
ℹ️  = Information
❓  = Help/Tutorial
```

**Achievements**
```
⭐ = Star/Achievement
🏆 = Trophy/High Score
```

## Animations and Transitions

### Screen Transitions

#### Fade Transition
```javascript
// Duration: 0.3s
opacity: 0 → 1 (fade in)
opacity: 1 → 0 (fade out)
```

#### Slide Transition
```javascript
// Duration: 0.4s
// Menu screens slide in from right
transform: translateX(100%) → translateX(0)
easing: cubic-bezier(0.4, 0.0, 0.2, 1)
```

#### Scale Transition
```javascript
// Duration: 0.2s
// Buttons and modals
transform: scale(0.8) → scale(1)
opacity: 0 → 1
easing: cubic-bezier(0.34, 1.56, 0.64, 1) // bounce
```

### UI Animations

#### Score Counter
```javascript
// Number count-up animation
duration: 0.5s
easing: ease-out
// Pulse effect on increase
scale: 1 → 1.2 → 1
color: white → gold → white
```

#### Combo Multiplier
```javascript
// Scale pulse on combo increase
scale: 1 → 1.5 → 1
rotation: -10° → 10° → 0°
duration: 0.3s
```

#### Heart/Life Loss
```javascript
// Shake and fade
translateX: -5px → 5px → -5px → 5px → 0
scale: 1 → 0.5 → 0
opacity: 1 → 0
duration: 0.6s
```

#### Voice Meter
```javascript
// Real-time bar fill
transition: height 0.05s linear
// Smooth color gradient based on height
```

### Gameplay Animations

#### Camera Shake (on collision)
```javascript
offset: ±10px random X/Y
duration: 0.3s
frequency: 30fps
decay: linear to 0
```

#### Slow Motion (perfect jump)
```javascript
timeScale: 1.0 → 0.3 → 1.0
duration: 0.5s
effect: Brief slow-mo on perfect landing
```

#### Screen Flash (combo milestone)
```javascript
overlay: white 50% opacity
duration: 0.1s
trigger: Every 5x combo
```

## Responsive Design

### Viewport Breakpoints

#### Desktop (1920x1080)
- Full UI, all features visible
- Voice meter on left side
- Large character and obstacles

#### Tablet (1024x768)
- Slightly scaled UI
- Voice meter smaller
- Touch-friendly button sizes

#### Mobile Landscape (844x390)
- Compact HUD
- Voice meter as mini bar at top
- Simplified UI

#### Mobile Portrait (390x844)
- Not recommended, show rotation prompt
- Alternative: Simplified vertical endless mode

### Scaling Strategy
```javascript
// Base resolution: 1920x1080
// Scale factor calculation
const scaleX = window.innerWidth / 1920
const scaleY = window.innerHeight / 1080
const scale = Math.min(scaleX, scaleY)

// Maintain aspect ratio
// Add letterboxing if needed
```

## Accessibility Features

### Visual Accessibility

#### Colorblind Modes

**Protanopia Mode** (Red-blind)
- Replace red with blue-purple hues
- Adjust obstacle colors
- High contrast outlines

**Deuteranopia Mode** (Green-blind)
- Adjust green elements to blue
- Different grass colors
- Modified UI colors

**Tritanopia Mode** (Blue-blind)
- Adjust blue to green/red spectrum
- Modified sky colors

**High Contrast Mode**
- Bold outlines (4px) on all elements
- Pure black and white primary colors
- Simplified visual effects

#### Screen Reader Support
- Alt text for all UI elements
- Aria labels for buttons
- Status announcements for score/combo

### Audio Accessibility

#### Visual Audio Cues
- Visual indicator for all sound effects
- Waveform display for voice input
- Subtitle-style text for audio feedback

#### Hearing Impaired Mode
- Enhanced visual feedback
- Larger particle effects
- Screen border flashes for important events

### Motor Accessibility

#### Alternative Controls
- Keyboard: Spacebar (variable hold time)
- Mouse: Click and hold
- Touch: Tap and hold
- Gamepad: Button press

#### Adjustable Difficulty
- Slower game speed option
- Wider obstacle spacing
- Extended reaction time
- Practice mode with no death

## Loading Screen

```
╔════════════════════════════════════════════╗
║                                            ║
║           🎮 VOICE JUMP 🎮                ║
║                                            ║
║              Loading...                    ║
║                                            ║
║   ████████████████░░░░░░░░░░  75%         ║
║                                            ║
║         [Character bouncing]               ║
║                                            ║
║        Tip: Louder voice = Higher jump!   ║
║                                            ║
╚════════════════════════════════════════════╝
```

**Features**:
- Progress bar with percentage
- Animated character preview
- Rotating gameplay tips
- Smooth loading animation
- Asset loading status (optional)

## Error States

### Microphone Denied

```
╔════════════════════════════════════════════╗
║                                            ║
║              🎤 ❌                        ║
║                                            ║
║     Microphone Access Required            ║
║                                            ║
║  This game requires microphone access     ║
║  to detect your voice for jumping.        ║
║                                            ║
║        [GRANT PERMISSION]                 ║
║                                            ║
║        [USE KEYBOARD INSTEAD]             ║
║                                            ║
╚════════════════════════════════════════════╝
```

### Browser Not Supported

```
╔════════════════════════════════════════════╗
║                                            ║
║              ⚠️                           ║
║                                            ║
║     Browser Not Supported                 ║
║                                            ║
║  This game requires a modern browser      ║
║  with Web Audio API support.              ║
║                                            ║
║  Recommended browsers:                    ║
║  • Chrome 90+                             ║
║  • Firefox 88+                            ║
║  • Edge 90+                               ║
║  • Safari 14+                             ║
║                                            ║
╚════════════════════════════════════════════╝
```

### Connection Lost (Future Online Features)

```
╔════════════════════════════════════════════╗
║                                            ║
║              📡 ❌                        ║
║                                            ║
║     Connection Lost                       ║
║                                            ║
║  Unable to connect to game servers.       ║
║  Playing in offline mode.                 ║
║                                            ║
║  • Leaderboards unavailable               ║
║  • Progress may not sync                  ║
║                                            ║
║        [RETRY CONNECTION]                 ║
║        [CONTINUE OFFLINE]                 ║
║                                            ║
╚════════════════════════════════════════════╝
```

## Interactive Feedback

### Visual Feedback

#### Success States
- ✅ Perfect Jump: Golden sparkle burst + screen flash
- 🎯 Obstacle Cleared: Small particle effect
- 🔥 Combo Milestone: Fire trail effect + glow
- ⭐ Achievement: Star burst animation

#### Danger States
- ⚠️ Near Miss: Screen edge highlight (yellow)
- 💥 Collision: Screen shake + red flash
- 💔 Life Lost: Heart shake + break animation
- ☠️ Game Over: Dramatic slow-motion death

#### Neutral States
- 🏃 Running: Dust particles from feet
- 🎤 Voice Active: Meter glow effect
- ⏸️ Paused: Screen desaturate + blur
- 🔄 Loading: Pulsing animation

### Audio Feedback

#### UI Sounds
- **Button Hover**: Soft "pop" (0.1s)
- **Button Click**: Firmer "click" (0.15s)
- **Menu Open**: Whoosh up (0.3s)
- **Menu Close**: Whoosh down (0.3s)

#### Gameplay Sounds
- **Small Jump**: Soft "boing"
- **Medium Jump**: Medium "boing"
- **High Jump**: Louder "boing"
- **Super Jump**: Extra loud "BOING!"
- **Landing**: Soft thud
- **Running**: Continuous light footsteps (8fps loop)

#### Feedback Sounds
- **Perfect Jump**: Chime + sparkle
- **Combo +1**: Rising tone
- **Combo Lost**: Descending tone
- **Hit Obstacle**: Crash sound
- **Life Lost**: Dramatic "oof"
- **Game Over**: Sad trombone
- **New High Score**: Victory fanfare

#### Ambient Audio
- **Background Music**: Upbeat 8-bit style loop
- **Wind**: Soft wind sound during jumps
- **Environment**: Birds chirping, distant sounds

## Asset Requirements Summary

### Sprites Needed
1. **Character**:
   - Run cycle (8 frames)
   - Jump sequence (6 frames)
   - Death animation (5 frames)
   - Idle (2 frames)

2. **Obstacles**:
   - Spikes (1 frame)
   - Fire pit (4 frames animation)
   - Barrel (8 frames rolling)
   - Various gaps (procedural)

3. **Environment**:
   - Ground tiles (seamless)
   - Platform blocks
   - Background hills (3 layers)
   - Clouds (3 sizes)
   - Bushes (3 variations)
   - Sky gradient

4. **UI Elements**:
   - Button states (3 per button)
   - Icons (15 total)
   - Hearts (full, empty)
   - Fonts (3 families)
   - Particle textures

### Sound Effects Needed
- Jump sounds (4 variations)
- Landing sound
- Collision sound
- Combo sounds (escalating)
- Perfect jump chime
- UI interaction sounds (4 types)
- Footstep loop
- Death sound

### Music Tracks
- Main menu theme
- Gameplay loop (normal)
- Gameplay loop (intense)
- Game over jingle
- Victory fanfare

## Implementation Priority

### Phase 1: Core UI
1. Basic HUD (score, lives, distance)
2. Voice meter
3. Pause menu
4. Game over screen

### Phase 2: Enhanced UI
1. Main menu with animations
2. Settings screen
3. Tutorial/calibration flow
4. Polished transitions

### Phase 3: Polish
1. Particle effects
2. Advanced animations
3. Sound design
4. Visual effects (shake, flash)

### Phase 4: Accessibility
1. Alternative controls
2. Colorblind modes
3. High contrast mode
4. Screen reader support
