// MissionManager - Daily missions and achievements
// Based on PRD Phase 6

export class MissionManager {
    constructor() {
        this.loadMissions();
    }

    loadMissions() {
        const saved = localStorage.getItem('daily_missions');
        const today = new Date().toDateString();
        
        if (saved) {
            const data = JSON.parse(saved);
            
            // Check if missions need to be reset (new day)
            if (data.date === today) {
                this.missions = data.missions;
                this.date = data.date;
                return;
            }
        }
        
        // Generate new missions for today
        this.generateDailyMissions();
        this.date = today;
        this.saveMissions();
    }

    saveMissions() {
        const data = {
            missions: this.missions,
            date: this.date
        };
        localStorage.setItem('daily_missions', JSON.stringify(data));
    }

    generateDailyMissions() {
        // Pool of possible missions
        const gameplayMissions = [
            {
                id: 'morning_defender',
                name: 'Morning Defender',
                description: 'Play 3 games today',
                type: 'gameplay',
                target: 3,
                current: 0,
                reward: { points: 20, tokens: [{ id: 'wifi_radar', amount: 1 }] }
            },
            {
                id: 'sharpshooter',
                name: 'Sharpshooter',
                description: 'Achieve 90% accuracy in 1 game',
                type: 'gameplay',
                target: 90,
                current: 0,
                reward: { points: 50, tokens: [{ id: 'speed_booster', amount: 1 }] }
            },
            {
                id: 'perfect_defense',
                name: 'Perfect Defense',
                description: 'Win without taking damage',
                type: 'gameplay',
                target: 1,
                current: 0,
                reward: { points: 100, tokens: [{ id: 'shield', amount: 1 }] }
            },
            {
                id: 'speed_demon',
                name: 'Speed Demon',
                description: 'Win in under 30 seconds',
                type: 'gameplay',
                target: 1,
                current: 0,
                reward: { points: 75, tokens: [{ id: 'data_cannon', amount: 1 }] }
            }
        ];

        const featureMissions = [
            {
                id: 'network_guardian',
                name: 'Network Guardian',
                description: 'Complete a Speed Test',
                type: 'feature',
                target: 1,
                current: 0,
                reward: { points: 30, tokens: [{ id: 'speed_booster', amount: 3 }] }
            },
            {
                id: 'data_manager',
                name: 'Data Manager',
                description: 'Check usage dashboard',
                type: 'feature',
                target: 1,
                current: 0,
                reward: { points: 25, tokens: [{ id: 'data_cannon', amount: 1 }] }
            },
            {
                id: 'connected',
                name: 'Connected',
                description: 'Check WiFi hotspots map',
                type: 'feature',
                target: 1,
                current: 0,
                reward: { points: 25, tokens: [{ id: 'wifi_radar', amount: 3 }] }
            }
        ];

        // Select 2 gameplay missions and 1 feature mission randomly
        const selectedGameplay = this.randomSelect(gameplayMissions, 2);
        const selectedFeature = this.randomSelect(featureMissions, 1);
        
        this.missions = [...selectedGameplay, ...selectedFeature];
    }

    randomSelect(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    getMissions() {
        return this.missions;
    }

    updateMissionProgress(gameStats) {
        // Update missions based on game results
        this.missions.forEach(mission => {
            if (mission.completed) return;

            switch (mission.id) {
                case 'morning_defender':
                    mission.current++;
                    if (mission.current >= mission.target) {
                        mission.completed = true;
                    }
                    break;

                case 'sharpshooter':
                    if (gameStats.accuracy >= mission.target) {
                        mission.current = mission.target;
                        mission.completed = true;
                    }
                    break;

                case 'perfect_defense':
                    if (gameStats.victory && gameStats.damageTaken === 0) {
                        mission.current = 1;
                        mission.completed = true;
                    }
                    break;

                case 'speed_demon':
                    if (gameStats.victory && gameStats.sessionTime <= 30000) {
                        mission.current = 1;
                        mission.completed = true;
                    }
                    break;
            }
        });

        this.saveMissions();
        
        // Return newly completed missions
        return this.missions.filter(m => m.completed && !m.rewardClaimed);
    }

    claimMissionReward(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission && mission.completed && !mission.rewardClaimed) {
            mission.rewardClaimed = true;
            this.saveMissions();
            return mission.reward;
        }
        return null;
    }

    // Mock feature mission completion (would be called by Ooredoo app)
    completeFeatureMission(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission && !mission.completed) {
            mission.current = mission.target;
            mission.completed = true;
            this.saveMissions();
            return true;
        }
        return false;
    }

    getCompletedCount() {
        return this.missions.filter(m => m.completed).length;
    }

    getTotalCount() {
        return this.missions.length;
    }
}

