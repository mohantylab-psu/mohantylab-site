# 📘 Complete Guide: Deploying Your Vite + React Website to Netlify via GitHub

## Prerequisites
Before you begin, make sure you have:
- ✅ A GitHub account (the one you want to use for this project)
- ✅ Login credentials for that GitHub account
- ✅ A Netlify account (sign up at [netlify.com](https://netlify.com))
- ✅ Your Vite + React project ready locally
- ✅ Git installed on your computer

---

## Part 1: Prepare Your Project

### Step 1: Verify Your Build Configuration

Your project already has the correct build configuration. Verify these settings in `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**✓ Your project is correctly configured!** The default build command is `npm run build` and the output directory is `dist`.

### Step 2: Test Your Build Locally

Before deploying, test that your project builds successfully:

```bash
npm run build
```

This should create a `dist` folder with your production-ready files. Then preview it locally:

```bash
npm run preview
```

Visit the local preview URL to ensure everything works correctly.

### Step 3: Create a Netlify Configuration File (Recommended)

Create a file named `netlify.toml` in your project root with the following content:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Why this file is important:**
- The `[build]` section explicitly defines your build settings
- The `[[redirects]]` section is **crucial for React Router** - it ensures all routes work correctly by redirecting all requests to `index.html` (required for SPAs)

---

## Part 2: Initialize Git with a Different GitHub Account

### Step 4: Initialize Git Repository

Since you want to use a **different GitHub account** than your currently logged-in personal account, follow these steps:

```bash
# Navigate to your project directory
cd /Users/heetshah/documents/mohanty-lab

# Initialize Git repository
git init
```

### Step 5: Configure Git for the Other Account (Local Configuration)

Configure Git to use the other account's credentials **for this repository only** (won't affect your other projects):

```bash
# Set the username for this repository
git config user.name "Their Full Name"

# Set the email for this repository
git config user.email "their-email@example.com"

# Verify the configuration
git config user.name
git config user.email
```

**Important**: Replace `"Their Full Name"` and `"their-email@example.com"` with the actual name and email associated with the other GitHub account.

### Step 6: Verify Your `.gitignore` File

Your `.gitignore` file should already exclude unnecessary files. It should contain:

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules

# Build output
dist
dist-ssr
*.local

# Environment files
.env
.env.local
.env.production

# Editor directories
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS files
.DS_Store
Thumbs.db
```

### Step 7: Make Your Initial Commit

```bash
# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit - Ready for Netlify deployment"

# Ensure you're on the main branch
git branch -M main
```

---

## Part 3: Create GitHub Repository with the Other Account

### Step 8: Create Repository on GitHub

**IMPORTANT**: You need to create the repository while logged into the **other GitHub account**, not your personal account.

1. **Log out of your personal GitHub account**:
   - Go to [github.com](https://github.com)
   - Click your profile icon (top right) → Sign out

2. **Log in to the other GitHub account**:
   - Use the login credentials for the account you want to use
   - Go to [github.com](https://github.com) and log in

3. **Create a new repository**:
   - Click the **"+"** icon in the top right corner
   - Select **"New repository"**
   - Fill in the details:
     - **Repository name**: `mohanty-lab` (or your preferred name)
     - **Description**: "Mohanty Lab Website - Vite + React"
     - **Visibility**: Choose Public or Private
     - **DON'T** initialize with README, .gitignore, or license (you already have these)
   - Click **"Create repository"**

4. **Copy the repository URL** from the quick setup page (you'll need this in the next step)

### Step 9: Connect Your Local Repository to GitHub

Back in your terminal, add the remote and push:

```bash
# Add the remote repository (replace OTHER-USERNAME with actual username)
git remote add origin https://github.com/OTHER-USERNAME/mohanty-lab.git

# Verify the remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

### Step 10: Authenticate with the Other Account

When you run `git push`, you'll be prompted to authenticate. You have several options:

#### **Option A: Use Personal Access Token (Recommended)**

1. While logged into the **other GitHub account**, go to:
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like "Mohanty Lab Deploy"
4. Set expiration (90 days or custom)
5. Check the **`repo`** scope (gives full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)

When prompted during `git push`:
- **Username**: Enter the other account's username
- **Password**: Paste the personal access token (NOT the account password)

#### **Option B: Use GitHub CLI**

```bash
# Install GitHub CLI if not already installed
brew install gh

# Logout from current account (if logged in)
gh auth logout

# Login to the other account
gh auth login

# Follow the prompts:
# - Choose: GitHub.com
# - Choose: HTTPS
# - Authenticate: via web browser (will open browser to log in with other account)

# Now push normally
git push -u origin main
```

#### **Option C: Use SSH Keys (Advanced)**

```bash
# 1. Generate a new SSH key for the other account
ssh-keygen -t ed25519 -C "their-email@example.com" -f ~/.ssh/id_ed25519_mohanty

# 2. Start SSH agent
eval "$(ssh-agent -s)"

# 3. Add the key to SSH agent
ssh-add ~/.ssh/id_ed25519_mohanty

# 4. Copy the public key to clipboard
pbcopy < ~/.ssh/id_ed25519_mohanty.pub

# 5. Add SSH key to the other GitHub account:
#    - Log into the other account on GitHub
#    - Go to Settings → SSH and GPG keys → New SSH key
#    - Paste the key and save

# 6. Change remote URL to use SSH
git remote set-url origin git@github.com:OTHER-USERNAME/mohanty-lab.git

# 7. Configure SSH to use the correct key (create/edit ~/.ssh/config)
# Add these lines:
# Host github.com-mohanty
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_mohanty

# 8. Update remote to use the alias
git remote set-url origin git@github.com-mohanty:OTHER-USERNAME/mohanty-lab.git

# 9. Push
git push -u origin main
```

---

## Part 4: Deploy to Netlify

### Option A: Deploy via Netlify Website (Recommended for Beginners)

#### Step 11: Import Your Project to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Log in to your Netlify account (can be the same or different from GitHub)
3. Click **"Add new site"** → **"Import an existing project"**

#### Step 12: Connect to GitHub

1. Click **"Deploy with GitHub"**
2. If this is your first time, you'll need to authorize Netlify
3. **IMPORTANT**: Make sure you authorize using the **same GitHub account** where you pushed the repository (the other account)
4. You may need to configure repository access:
   - Choose **"All repositories"** OR
   - Choose **"Only select repositories"** and select `mohanty-lab`
5. Click **"Install"** or **"Save"**

#### Step 13: Configure Build Settings

1. Find and select your `mohanty-lab` repository from the list
2. Netlify should **automatically detect** Vite and pre-fill:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main`
3. Verify these settings are correct
4. (Optional) Add a custom site name or leave it as auto-generated
5. Click **"Deploy [site name]"**

#### Step 14: Wait for Deployment

1. Netlify will start building your site (usually takes 1-3 minutes)
2. You'll see a live log of the build process
3. Once complete, you'll see **"Site is live"** with a URL like `https://your-site-name.netlify.app`

---

### Option B: Deploy via Netlify CLI (Advanced)

#### Step 11: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 12: Authenticate with Netlify

```bash
netlify login
```

This will open a browser window - authorize the CLI to access your Netlify account.

#### Step 13: Initialize Your Site

From your project directory:

```bash
netlify init
```

Follow the prompts:
1. Choose **"Create & configure a new site"**
2. Select your team
3. Choose a site name or use the auto-generated one
4. The CLI will detect Vite and suggest build settings - accept them
5. When asked about continuous deployment, choose **"Yes"**
6. Authorize GitHub access if prompted (make sure it's the correct account)

#### Step 14: Deploy

The site will deploy automatically after `netlify init`. For future manual deploys:

```bash
netlify deploy --prod
```

---

## Part 5: Post-Deployment Configuration

### Step 15: Set Up Custom Domain (Optional)

1. In your Netlify site dashboard, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow the instructions to:
   - Purchase a domain through Netlify, OR
   - Use an existing domain by updating DNS settings

### Step 16: Configure Environment Variables (if needed)

If your app uses environment variables:

1. Go to **"Site settings"** → **"Environment variables"**
2. Click **"Add a variable"**
3. Add your variables (e.g., `VITE_API_KEY`)
4. **Important**: Vite requires environment variables to be prefixed with `VITE_`

### Step 17: Enable HTTPS

Netlify automatically provisions SSL certificates for your site. This is enabled by default, but you can verify:

1. Go to **"Domain settings"** → **"HTTPS"**
2. Ensure **"Force HTTPS"** is enabled

---

## Part 6: Continuous Deployment is Now Active! 🎉

### How It Works

Every time you push changes to your `main` branch on GitHub, Netlify will:
1. Automatically detect the changes
2. Build your site using `npm run build`
3. Deploy the new version to your live site

### Making Updates

```bash
# Make your changes to the code

# Stage changes
git add .

# Commit with a descriptive message
git commit -m "Description of changes"

# Push to GitHub (will trigger automatic deployment)
git push origin main
```

**Note**: You may need to authenticate again. Use the same method (PAT, GitHub CLI, or SSH) you used in Step 10.

---

## Part 7: Managing Multiple GitHub Accounts

### For Future Commits from This Project

Since you configured this repository with the other account's credentials locally, all commits will use those credentials automatically. No need to reconfigure each time!

### Switching Back to Your Personal Account for Other Projects

When working on your personal projects:

```bash
# For a specific repository, set personal account
cd /path/to/personal/project
git config user.name "Your Personal Name"
git config user.email "your-personal@email.com"

# Or set global default (affects all new repos)
git config --global user.name "Your Personal Name"
git config --global user.email "your-personal@email.com"
```

### Quick Check: Which Account Am I Using?

```bash
# Check local repository configuration
git config user.name
git config user.email

# Check global configuration
git config --global user.name
git config --global user.email
```

---

## Part 8: Additional Features & Best Practices

### Deploy Preview for Pull Requests

Netlify automatically creates **preview deployments** for pull requests:

1. Create a new branch: `git checkout -b feature-branch`
2. Make changes and push: `git push origin feature-branch`
3. Create a pull request on GitHub
4. Netlify will comment with a preview URL
5. Review the changes before merging

### Build Notifications

Set up deployment notifications:

1. Go to **"Site settings"** → **"Build & deploy"** → **"Deploy notifications"**
2. Add notifications for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed
3. Choose notification method (Email, Slack, etc.)

### Rollback to Previous Deploy

If something goes wrong:

1. Go to **"Deploys"** tab
2. Find a successful previous deploy
3. Click **"Publish deploy"** to rollback

---

## Troubleshooting Common Issues

### Issue 1: "Authentication Failed" When Pushing to GitHub

**Problem**: Can't push to GitHub with different account credentials

**Solutions**:
- **Check you're using the correct credentials**: The username and token/password should match the account that owns the repository
- **Clear stored credentials**: 
  ```bash
  # macOS - clear keychain
  git credential-osxkeychain erase
  # Then press Enter, and paste:
  host=github.com
  protocol=https
  # Press Enter twice
  ```
- **Use Personal Access Token**: Don't use your account password, use a PAT (see Step 10, Option A)
- **Try GitHub CLI**: This handles authentication automatically (see Step 10, Option B)

### Issue 2: "Permission Denied" or "Repository Not Found"

**Problem**: Git says repository doesn't exist or you don't have access

**Solutions**:
- Verify you created the repository in the **correct GitHub account**
- Check the remote URL matches: `git remote -v`
- Ensure the repository name is spelled correctly
- Verify the account has access to the repository

### Issue 3: Netlify Can't Find Repository

**Problem**: Repository doesn't appear in Netlify's list

**Solutions**:
- Make sure you authorized Netlify with the **same GitHub account** where the repository exists
- Disconnect and reconnect GitHub in Netlify settings
- Grant Netlify access to the specific repository in GitHub settings

### Issue 4: 404 Error on Route Refresh

**Problem**: Routes work when clicking links, but refreshing gives 404

**Solution**: Add the `netlify.toml` file with redirects (see Step 3)

### Issue 5: Build Fails with "Command not found"

**Problem**: Build command isn't recognized

**Solution**: 
- Ensure `package.json` has the correct build script
- Check build command in Netlify settings matches your script name

### Issue 6: Environment Variables Not Working

**Problem**: Environment variables are undefined in production

**Solution**:
- Prefix all variables with `VITE_`
- Add them in Netlify dashboard under "Environment variables"
- Redeploy your site after adding variables

### Issue 7: Assets Not Loading

**Problem**: Images, CSS, or JS files return 404

**Solution**:
- Verify your build output directory is set to `dist`
- Check that assets are referenced correctly (use relative paths)
- For images in `public/` folder, reference them from root: `/image.png`

---

## Verification Checklist

Before considering your deployment complete:

- [ ] Git repository initialized with correct account credentials
- [ ] Repository pushed to GitHub under the other account
- [ ] Site loads at your Netlify URL
- [ ] All routes work correctly (test navigation and refresh)
- [ ] Images and assets load properly
- [ ] Forms work (if applicable)
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled (padlock icon in browser)
- [ ] Environment variables are set (if needed)
- [ ] Git pushes trigger automatic deployments

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Test production build
npm run build && npm run preview

# Git setup (one-time)
git init
git config user.name "Other Account Name"
git config user.email "other@example.com"

# Git workflow (ongoing)
git add .
git commit -m "Your message"
git push origin main

# Check which account is configured
git config user.name
git config user.email

# Netlify CLI commands
netlify login
netlify init
netlify deploy --prod
netlify open

# GitHub CLI commands
gh auth login
gh auth status
gh auth logout
```

---

## Summary: Multi-Account Git Workflow

**Key Takeaways:**

1. ✅ You configured this repository to use a **different GitHub account** locally
2. ✅ The configuration is **repository-specific** - won't affect your other projects
3. ✅ You need to authenticate with the **other account's credentials** when pushing
4. ✅ Use a **Personal Access Token** or **GitHub CLI** for easiest authentication
5. ✅ Netlify must be authorized with the **same GitHub account** as the repository
6. ✅ Once set up, continuous deployment works automatically on every push

---

## Additional Resources

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Vite Deployment Guide**: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy.html)
- **GitHub Docs - Multiple Accounts**: [docs.github.com/authentication](https://docs.github.com/en/authentication)
- **Git Credential Management**: [git-scm.com/docs/gitcredentials](https://git-scm.com/docs/gitcredentials)
- **Netlify Support**: [answers.netlify.com](https://answers.netlify.com)

---

## You're All Set! 🚀

You've successfully set up:
1. ✅ Your Vite + React project for deployment
2. ✅ Git repository with a different GitHub account
3. ✅ GitHub repository under the correct account
4. ✅ Netlify hosting with automatic deployments
5. ✅ Continuous deployment workflow
6. ✅ SPA routing configuration

Now every `git push` to your `main` branch will automatically deploy your updated site to Netlify!

**Need help?** Feel free to ask if you encounter any issues during the deployment process!
