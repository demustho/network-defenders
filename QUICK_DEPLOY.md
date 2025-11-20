# ⚡ Quick Deploy Commands

## Step 1: Push to GitHub (5 minutes)

1. **Create repository on GitHub.com:**
   - Go to github.com → Click "+" → "New repository"
   - Name: `network-defenders`
   - Click "Create repository"
   - **Copy the repository URL** (looks like: `https://github.com/YOUR-USERNAME/network-defenders.git`)

2. **Run these commands in Terminal:**

```bash
cd "/Users/musthafarasheed/Documents/Projects/Network Defenders"

git remote add origin https://github.com/YOUR-USERNAME/network-defenders.git

git branch -M main

git push -u origin main
```

(Replace `YOUR-USERNAME` with your actual GitHub username)

---

## Step 2: Deploy on Render (5 minutes)

1. **Go to render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your **"network-defenders"** repository
4. Fill in:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Click **"Create Web Service"**
6. Wait 3-5 minutes
7. Your game will be live at: `https://YOUR-APP-NAME.onrender.com`

---

## That's It! 🎉

Share the URL with your friends and enjoy!

**Note:** First load takes 30-60 seconds (free tier limitation), then it's instant.

---

## Update Your Game Later

```bash
cd "/Users/musthafarasheed/Documents/Projects/Network Defenders"
git add .
git commit -m "Updated game"
git push
```

Render will auto-deploy in 2-3 minutes!

