const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// In-memory storage for prototype
let weeklyLeaderboard = [];
let monthlyLeaderboard = [];
let alltimeLeaderboard = [];
let redClubAccounts = {};

// Helper to get start of week/month
function getWeekStart() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff)).toDateString();
}

function getMonthStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1).toDateString();
}

// Leaderboard endpoints
app.get('/api/leaderboard', (req, res) => {
    const type = req.query.type || 'weekly';
    const userId = req.query.userId || 'player1';

    let board;
    switch (type) {
        case 'monthly':
            board = monthlyLeaderboard;
            break;
        case 'alltime':
            board = alltimeLeaderboard;
            break;
        default:
            board = weeklyLeaderboard;
    }

    // Sort and get top 100
    const sorted = board.sort((a, b) => b.score - a.score);
    const top100 = sorted.slice(0, 100);

    // Find player's rank
    const playerIndex = sorted.findIndex(entry => entry.userId === userId);
    const playerRank = playerIndex >= 0 ? {
        rank: playerIndex + 1,
        name: sorted[playerIndex].name,
        score: sorted[playerIndex].score,
        change: sorted[playerIndex].change || 0
    } : null;

    res.json({
        leaderboard: top100,
        playerRank: playerRank
    });
});

app.post('/api/leaderboard', (req, res) => {
    const { name, score, userId } = req.body;
    if (!name || score === undefined) {
        return res.status(400).json({ error: 'Name and score are required' });
    }

    const entry = {
        userId: userId || 'player1',
        name,
        score,
        date: new Date(),
        change: 0
    };

    // Add to all leaderboards
    weeklyLeaderboard.push(entry);
    monthlyLeaderboard.push(entry);
    alltimeLeaderboard.push(entry);

    res.json({ success: true });
});

// Red Club endpoints
app.get('/api/redclub/balance', (req, res) => {
    const userId = req.query.userId || 'player1';
    const account = redClubAccounts[userId] || { balance: 0, tier: 'standard' };
    res.json({
        success: true,
        balance: account.balance,
        tier: account.tier
    });
});

app.post('/api/redclub/convert', (req, res) => {
    const { userId, gamePoints } = req.body;
    const uid = userId || 'player1';

    if (!redClubAccounts[uid]) {
        redClubAccounts[uid] = { balance: 0, tier: 'standard' };
    }

    const redClubPoints = Math.floor(gamePoints / 100);
    redClubAccounts[uid].balance += redClubPoints;

    res.json({
        success: true,
        gamePoints: gamePoints,
        redClubPointsAdded: redClubPoints,
        newBalance: redClubAccounts[uid].balance
    });
});

app.post('/api/redclub/grant', (req, res) => {
    const { userId, actionType } = req.body;
    const uid = userId || 'player1';

    if (!redClubAccounts[uid]) {
        redClubAccounts[uid] = { balance: 0, tier: 'standard' };
    }

    const grants = {
        'speed_test': { powerUpId: 'speed_booster', amount: 3, points: 30 },
        'data_renewal': { powerUpId: 'data_cannon', amount: 2, points: 25 },
        'bill_pay': { powerUpId: 'bonus_blast', amount: 1, points: 100 }
    };

    const grant = grants[actionType];
    if (grant) {
        redClubAccounts[uid].balance += grant.points;
    }

    res.json({
        success: true,
        action: actionType,
        powerUpId: grant?.powerUpId,
        tokensGranted: grant?.amount,
        redClubPointsAwarded: grant?.points,
        newBalance: redClubAccounts[uid].balance
    });
});

app.post('/api/reward/grant', (req, res) => {
    const { userId, rewardId, score } = req.body;
    console.log(`[REWARD] Granting ${rewardId} to user ${userId} (Score: ${score})`);

    // In a real app, this would call the Ooredoo backend
    res.json({
        success: true,
        rewardId: rewardId,
        message: "Reward granted successfully"
    });
});

// Periodic cleanup (reset weekly/monthly leaderboards)
setInterval(() => {
    const weekStart = getWeekStart();
    const monthStart = getMonthStart();

    weeklyLeaderboard = weeklyLeaderboard.filter(entry =>
        new Date(entry.date).toDateString() >= weekStart
    );

    monthlyLeaderboard = monthlyLeaderboard.filter(entry =>
        new Date(entry.date).toDateString() >= monthStart
    );
}, 3600000); // Every hour

app.listen(port, () => {
    console.log(`Network Defenders running at http://localhost:${port}`);
    console.log(`- Leaderboard API: http://localhost:${port}/api/leaderboard`);
    console.log(`- Red Club API: http://localhost:${port}/api/redclub/*`);
});
