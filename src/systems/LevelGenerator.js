import { Obstacle, ObstacleType } from '../entities/Obstacle.js';
import { GameConfig } from '../config/GameConfig.js';

/**
 * LevelGenerator - Generates procedural obstacles
 */
export class LevelGenerator {
  constructor() {
    this.obstacles = [];
    this.nextObstacleX = 800; // Start spawning after this distance
    this.difficulty = 0;
    this.patterns = this.createPatterns();
  }

  createPatterns() {
    // Obstacle patterns with varying difficulty
    return [
      // Easy patterns (difficulty 0-1)
      {
        difficulty: 0,
        obstacles: [
          { type: ObstacleType.SPIKE, offsetX: 0 }
        ]
      },
      {
        difficulty: 0,
        obstacles: [
          { type: ObstacleType.PIT, offsetX: 0 }
        ]
      },
      {
        difficulty: 1,
        obstacles: [
          { type: ObstacleType.SPIKE, offsetX: 0 },
          { type: ObstacleType.SPIKE, offsetX: 200 }
        ]
      },

      // Medium patterns (difficulty 2-4)
      {
        difficulty: 2,
        obstacles: [
          { type: ObstacleType.BARREL, offsetX: 0 },
          { type: ObstacleType.SPIKE, offsetX: 180 }
        ]
      },
      {
        difficulty: 3,
        obstacles: [
          { type: ObstacleType.GAP, offsetX: 0 }
        ]
      },
      {
        difficulty: 3,
        obstacles: [
          { type: ObstacleType.SPIKE, offsetX: 0 },
          { type: ObstacleType.PIT, offsetX: 150 },
          { type: ObstacleType.SPIKE, offsetX: 300 }
        ]
      },

      // Hard patterns (difficulty 5+)
      {
        difficulty: 5,
        obstacles: [
          { type: ObstacleType.PIT, offsetX: 0 },
          { type: ObstacleType.BARREL, offsetX: 150 },
          { type: ObstacleType.GAP, offsetX: 250 }
        ]
      },
      {
        difficulty: 6,
        obstacles: [
          { type: ObstacleType.SPIKE, offsetX: 0 },
          { type: ObstacleType.SPIKE, offsetX: 80 },
          { type: ObstacleType.SPIKE, offsetX: 160 },
          { type: ObstacleType.PIT, offsetX: 300 }
        ]
      },
      {
        difficulty: 7,
        obstacles: [
          { type: ObstacleType.GAP, offsetX: 0 },
          { type: ObstacleType.SPIKE, offsetX: 180 },
          { type: ObstacleType.GAP, offsetX: 300 }
        ]
      }
    ];
  }

  update(cameraX, distance) {
    // Update difficulty based on distance
    this.difficulty = Math.floor(distance * GameConfig.LEVEL.DIFFICULTY_INCREASE_RATE);

    // Spawn new obstacles ahead of camera
    const spawnX = cameraX + GameConfig.OBSTACLES.SPAWN_DISTANCE;

    while (this.nextObstacleX < spawnX) {
      this.spawnPattern(this.nextObstacleX);

      // Random spacing between patterns
      const minSpacing = GameConfig.OBSTACLES.MIN_SPACING;
      const maxSpacing = GameConfig.OBSTACLES.MAX_SPACING;
      const spacing = minSpacing + Math.random() * (maxSpacing - minSpacing);

      this.nextObstacleX += spacing;
    }

    // Clean up old obstacles
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.position.x + obstacle.size.width < cameraX - GameConfig.OBSTACLES.CLEANUP_DISTANCE) {
        return false;
      }
      return true;
    });
  }

  spawnPattern(x) {
    // Select pattern based on difficulty
    const availablePatterns = this.patterns.filter(p =>
      p.difficulty <= Math.min(this.difficulty, 7)
    );

    if (availablePatterns.length === 0) return;

    // Random pattern selection
    const pattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)];

    // Create obstacles from pattern
    pattern.obstacles.forEach(obstacleData => {
      const obstacle = new Obstacle(
        x + obstacleData.offsetX,
        obstacleData.type
      );
      this.obstacles.push(obstacle);
    });
  }

  getObstacles() {
    return this.obstacles;
  }

  reset() {
    this.obstacles = [];
    this.nextObstacleX = 800;
    this.difficulty = 0;
  }
}
