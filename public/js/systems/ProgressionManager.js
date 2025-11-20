// ProgressionManager - Handles player rank progression
// Based on PRD Phase 5

import { RANKS } from '../data/RankData.js';

export class ProgressionManager {
    constructor() {
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('player_progression');
        if (saved) {
            const data = JSON.parse(saved);
            this.totalGamesPlayed = data.totalGamesPlayed || 0;
            this.totalPoints = data.totalPoints || 0;
            this.currentRankId = data.currentRankId || 1;
            this.highScore = data.highScore || 0;
        } else {
            this.totalGamesPlayed = 0;
            this.totalPoints = 0;
            this.currentRankId = 1;
            this.highScore = 0;
        }
    }

    saveProgress() {
        const data = {
            totalGamesPlayed: this.totalGamesPlayed,
            totalPoints: this.totalPoints,
            currentRankId: this.currentRankId,
            highScore: this.highScore
        };
        localStorage.setItem('player_progression', JSON.stringify(data));
    }

    getCurrentRank() {
        return RANKS.find(r => r.id === this.currentRankId) || RANKS[0];
    }

    getNextRank() {
        const nextRankId = this.currentRankId + 1;
        return RANKS.find(r => r.id === nextRankId);
    }

    checkRankUp() {
        const nextRank = this.getNextRank();
        if (!nextRank) return null; // Already at max rank

        if (this.totalGamesPlayed >= nextRank.gamesRequired &&
            this.totalPoints >= nextRank.pointsRequired) {
            this.currentRankId = nextRank.id;
            this.saveProgress();
            return nextRank;
        }
        return null;
    }

    addGameResult(score, victory) {
        this.totalGamesPlayed++;
        this.totalPoints += score;
        
        if (score > this.highScore) {
            this.highScore = score;
        }

        // Check for rank up
        const rankUp = this.checkRankUp();
        
        this.saveProgress();
        
        return {
            rankUp: rankUp,
            totalGames: this.totalGamesPlayed,
            totalPoints: this.totalPoints
        };
    }

    getProgressToNextRank() {
        const nextRank = this.getNextRank();
        if (!nextRank) {
            return { games: 100, points: 100 }; // Max rank
        }

        const gamesProgress = (this.totalGamesPlayed / nextRank.gamesRequired) * 100;
        const pointsProgress = (this.totalPoints / nextRank.pointsRequired) * 100;

        return {
            games: Math.min(100, gamesProgress),
            points: Math.min(100, pointsProgress),
            gamesNeeded: Math.max(0, nextRank.gamesRequired - this.totalGamesPlayed),
            pointsNeeded: Math.max(0, nextRank.pointsRequired - this.totalPoints)
        };
    }

    getMaxPowerUpSlots() {
        const currentRank = this.getCurrentRank();
        return currentRank.maxPowerUpSlots || 2;
    }

    getUnlockedFeatures() {
        const unlockedFeatures = [];
        RANKS.forEach(rank => {
            if (rank.id <= this.currentRankId) {
                unlockedFeatures.push(...rank.unlocks);
            }
        });
        return unlockedFeatures;
    }

    reset() {
        this.totalGamesPlayed = 0;
        this.totalPoints = 0;
        this.currentRankId = 1;
        this.highScore = 0;
        this.saveProgress();
    }
}

