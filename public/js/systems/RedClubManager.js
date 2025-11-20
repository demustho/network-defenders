// RedClubManager - Red Club point conversion and mock API
// Based on PRD Phase 10

export class RedClubManager {
    constructor() {
        this.loadData();
    }

    loadData() {
        const saved = localStorage.getItem('red_club_data');
        if (saved) {
            const data = JSON.parse(saved);
            this.totalRedClubPoints = data.totalRedClubPoints || 0;
            this.tier = data.tier || 'standard'; // standard, gold, platinum
            this.gamesPlayedToday = data.gamesPlayedToday || 0;
            this.lastPlayDate = data.lastPlayDate || null;
        } else {
            this.totalRedClubPoints = 0;
            this.tier = 'standard';
            this.gamesPlayedToday = 0;
            this.lastPlayDate = null;
        }
    }

    saveData() {
        const data = {
            totalRedClubPoints: this.totalRedClubPoints,
            tier: this.tier,
            gamesPlayedToday: this.gamesPlayedToday,
            lastPlayDate: this.lastPlayDate
        };
        localStorage.setItem('red_club_data', JSON.stringify(data));
    }

    convertGamePoints(gamePoints) {
        // Base conversion: 100 game points = 1 Red Club point
        let redClubPoints = Math.floor(gamePoints / 100);

        // Check if this is first game of the day (2x multiplier)
        const today = new Date().toDateString();
        if (this.lastPlayDate !== today) {
            // First game of the day
            if (this.gamesPlayedToday === 0) {
                redClubPoints *= 2;
                console.log('Daily first game 2x multiplier applied!');
            }
            this.gamesPlayedToday = 1;
            this.lastPlayDate = today;
        } else {
            this.gamesPlayedToday++;
        }

        // Tier multipliers
        switch (this.tier) {
            case 'platinum':
                redClubPoints = Math.floor(redClubPoints * 1.5);
                break;
            case 'gold':
                redClubPoints = Math.floor(redClubPoints * 1.25);
                break;
        }

        this.totalRedClubPoints += redClubPoints;
        this.saveData();

        return redClubPoints;
    }

    getBalance() {
        return this.totalRedClubPoints;
    }

    getTier() {
        return this.tier;
    }

    setTier(tier) {
        this.tier = tier;
        this.saveData();
    }

    // Mock API endpoints
    async mockAPIConvertPoints(gamePoints) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const redClubPoints = this.convertGamePoints(gamePoints);
        
        return {
            success: true,
            gamePoints: gamePoints,
            redClubPointsAdded: redClubPoints,
            newBalance: this.totalRedClubPoints,
            multiplier: this.gamesPlayedToday === 1 ? 2 : 1
        };
    }

    async mockAPIGetBalance() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 50));
        
        return {
            success: true,
            balance: this.totalRedClubPoints,
            tier: this.tier
        };
    }

    async mockAPIGrantTokens(actionType) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // This would be called by the Ooredoo app when user completes actions
        const tokenGrants = {
            'speed_test': { powerUpId: 'speed_booster', amount: 3, points: 30 },
            'data_renewal': { powerUpId: 'data_cannon', amount: 2, points: 25 },
            'login_streak': { powerUpId: 'shield', amount: 1, points: 0 },
            'wifi_map': { powerUpId: 'wifi_radar', amount: 3, points: 25 },
            '5g_map': { powerUpId: 'laser_beam', amount: 1, points: 30 },
            'bill_pay': { powerUpId: 'bonus_blast', amount: 1, points: 100 }
        };

        const grant = tokenGrants[actionType];
        if (!grant) {
            return { success: false, error: 'Unknown action type' };
        }

        // Award Red Club points for the action
        if (grant.points > 0) {
            this.totalRedClubPoints += grant.points;
            this.saveData();
        }

        return {
            success: true,
            action: actionType,
            powerUpId: grant.powerUpId,
            tokensGranted: grant.amount,
            redClubPointsAwarded: grant.points,
            newBalance: this.totalRedClubPoints
        };
    }

    // Reward tiers based on total points
    getRewardTier() {
        if (this.totalRedClubPoints >= 10000) return 'Diamond';
        if (this.totalRedClubPoints >= 5000) return 'Platinum';
        if (this.totalRedClubPoints >= 2000) return 'Gold';
        if (this.totalRedClubPoints >= 500) return 'Silver';
        return 'Bronze';
    }

    getMilestones() {
        return [
            { points: 100, reward: '100MB data', claimed: this.totalRedClubPoints >= 100 },
            { points: 500, reward: '500MB data', claimed: this.totalRedClubPoints >= 500 },
            { points: 2000, reward: '2GB data', claimed: this.totalRedClubPoints >= 2000 },
            { points: 5000, reward: '5GB data + ship skin', claimed: this.totalRedClubPoints >= 5000 },
            { points: 10000, reward: 'Premium voucher', claimed: this.totalRedClubPoints >= 10000 }
        ];
    }

    reset() {
        this.totalRedClubPoints = 0;
        this.tier = 'standard';
        this.gamesPlayedToday = 0;
        this.lastPlayDate = null;
        this.saveData();
    }
}

