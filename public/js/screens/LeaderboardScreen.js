// LeaderboardScreen - Display leaderboards with weekly/monthly/all-time tabs
// Based on PRD Phase 8

export class LeaderboardScreen {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.currentTab = 'weekly'; // weekly, monthly, alltime
        this.leaderboardData = [];
        this.playerRank = null;
        this.done = false;
        
        // UI elements
        this.tabs = [
            { id: 'weekly', label: 'Weekly', x: 60, y: 100, width: 80, height: 30 },
            { id: 'monthly', label: 'Monthly', x: 150, y: 100, width: 80, height: 30 },
            { id: 'alltime', label: 'All-Time', x: 240, y: 100, width: 80, height: 30 }
        ];
        
        this.closeButton = {
            x: 10,
            y: 10,
            width: 60,
            height: 30,
            text: 'BACK'
        };
    }

    async start() {
        this.done = false;
        await this.loadLeaderboard(this.currentTab);
    }

    async loadLeaderboard(type) {
        // Mock API call
        try {
            const response = await fetch(`/api/leaderboard?type=${type}`);
            const data = await response.json();
            this.leaderboardData = data.leaderboard || [];
            this.playerRank = data.playerRank || null;
        } catch (error) {
            console.error('Failed to load leaderboard:', error);
            // Generate mock data
            this.leaderboardData = this.generateMockLeaderboard();
            this.playerRank = {
                rank: 42,
                name: 'You',
                score: 3450,
                change: 5
            };
        }
    }

    generateMockLeaderboard() {
        const names = ['Ahmed', 'Fatima', 'Hassan', 'Aisha', 'Ali', 'Mariam', 'Omar', 'Zainab', 'Mohamed', 'Aminath'];
        const leaderboard = [];
        
        for (let i = 0; i < 50; i++) {
            leaderboard.push({
                rank: i + 1,
                name: names[Math.floor(Math.random() * names.length)],
                score: 10000 - (i * 150) + Math.floor(Math.random() * 100),
                change: Math.floor(Math.random() * 11) - 5 // -5 to +5
            });
        }
        
        return leaderboard;
    }

    handleClick(x, y) {
        // Check tab clicks
        this.tabs.forEach(tab => {
            if (this.isPointInRect(x, y, tab)) {
                this.currentTab = tab.id;
                this.loadLeaderboard(tab.id);
            }
        });
        
        // Check close button
        if (this.isPointInRect(x, y, this.closeButton)) {
            this.done = true;
        }
    }

    isPointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
               y >= rect.y && y <= rect.y + rect.height;
    }

    update(deltaTime) {
        return this.done;
    }

    render() {
        // Clear screen
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Title
        this.ctx.font = '20px "Press Start 2P"';
        this.ctx.fillStyle = '#E30613';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#E30613';
        this.ctx.shadowBlur = 20;
        this.ctx.fillText('LEADERBOARD', this.canvas.width / 2, 50);
        this.ctx.shadowBlur = 0;

        // Render tabs
        this.tabs.forEach(tab => {
            const isActive = tab.id === this.currentTab;
            
            this.ctx.fillStyle = isActive ? '#E30613' : 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(tab.x, tab.y, tab.width, tab.height);
            
            this.ctx.strokeStyle = isActive ? '#FFFFFF' : '#666666';
            this.ctx.lineWidth = isActive ? 3 : 2;
            this.ctx.strokeRect(tab.x, tab.y, tab.width, tab.height);
            
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillStyle = isActive ? '#FFFFFF' : '#888888';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(tab.label, tab.x + tab.width / 2, tab.y + 18);
        });

        // Player's rank (sticky header)
        if (this.playerRank) {
            const headerY = 145;
            this.ctx.fillStyle = 'rgba(227, 6, 19, 0.8)';
            this.ctx.fillRect(10, headerY, this.canvas.width - 20, 30);
            
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(10, headerY, this.canvas.width - 20, 30);
            
            this.ctx.font = '10px "Press Start 2P"';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Your Rank: #${this.playerRank.rank}`, 20, headerY + 15);
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${this.playerRank.score} pts`, this.canvas.width - 20, headerY + 15);
            
            if (this.playerRank.change !== 0) {
                const arrow = this.playerRank.change > 0 ? '↑' : '↓';
                const changeColor = this.playerRank.change > 0 ? '#00FF00' : '#FF0000';
                this.ctx.fillStyle = changeColor;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`${arrow}${Math.abs(this.playerRank.change)}`, this.canvas.width / 2, headerY + 15);
            }
        }

        // Leaderboard entries
        const startY = 185;
        const rowHeight = 28;
        const maxVisible = 12;
        
        this.leaderboardData.slice(0, maxVisible).forEach((entry, index) => {
            const y = startY + (index * rowHeight);
            const isPlayer = entry.name === 'You';
            
            // Background
            if (isPlayer) {
                this.ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
                this.ctx.fillRect(10, y, this.canvas.width - 20, rowHeight - 2);
            }
            
            // Rank
            this.ctx.font = '10px "Press Start 2P"';
            this.ctx.fillStyle = this.getRankColor(entry.rank);
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`#${entry.rank}`, 20, y + 16);
            
            // Name
            this.ctx.fillStyle = isPlayer ? '#00F0FF' : '#FFFFFF';
            this.ctx.fillText(entry.name, 70, y + 16);
            
            // Score
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${entry.score}`, this.canvas.width - 20, y + 16);
            
            // Change indicator
            if (entry.change !== 0) {
                const arrow = entry.change > 0 ? '↑' : '↓';
                const changeColor = entry.change > 0 ? '#00FF00' : '#FF0000';
                this.ctx.fillStyle = changeColor;
                this.ctx.fillText(`${arrow}${Math.abs(entry.change)}`, this.canvas.width - 80, y + 16);
            }
        });

        // Close button
        this.ctx.fillStyle = '#666666';
        this.ctx.fillRect(this.closeButton.x, this.closeButton.y, this.closeButton.width, this.closeButton.height);
        
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.closeButton.x, this.closeButton.y, this.closeButton.width, this.closeButton.height);
        
        this.ctx.font = '10px "Press Start 2P"';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.closeButton.text, this.closeButton.x + this.closeButton.width / 2, this.closeButton.y + 18);

        // Reset text alignment
        this.ctx.textAlign = 'left';
    }

    getRankColor(rank) {
        if (rank === 1) return '#FFD700'; // Gold
        if (rank === 2) return '#C0C0C0'; // Silver
        if (rank === 3) return '#CD7F32'; // Bronze
        return '#FFFFFF';
    }
}


