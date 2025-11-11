# Deployment Guide - Voice Jump Game

## 🚀 Deploying to GitHub Pages

This guide explains how to deploy the Voice Jump game to GitHub Pages.

## Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment.

### Prerequisites
1. GitHub repository with the code
2. GitHub Pages enabled in repository settings

### Steps

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to `Settings` > `Pages`
   - Under "Build and deployment":
     - Source: Select `GitHub Actions`
   - Save the settings

2. **Merge to Main Branch**
   - The GitHub Actions workflow is triggered on push to `main` or `master`
   - Merge your branch to main:
     ```bash
     # Option 1: Via GitHub UI (create Pull Request and merge)
     # Option 2: Via command line
     git checkout main
     git merge claude/voice-jump-game-design-011CV16FAEXb2MiBH5w4tqcD
     git push origin main
     ```

3. **Automatic Build & Deploy**
   - GitHub Actions will automatically:
     - Install dependencies
     - Build the production version
     - Deploy to GitHub Pages
   - Check the Actions tab to monitor progress

4. **Access Your Game**
   - Once deployed, your game will be available at:
   - `https://[your-username].github.io/jump-by-voice-game/`
   - Example: `https://Nurtau.github.io/jump-by-voice-game/`

## Manual Deployment (Alternative)

If you prefer manual deployment:

### Method 1: Using gh-pages Package

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Method 2: Manual Upload

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Push dist folder to gh-pages branch**
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## Configuration Details

### Vite Configuration (`vite.config.js`)

```javascript
export default defineConfig({
  base: '/jump-by-voice-game/',  // Important: matches repository name
  // ... other config
});
```

**Important**: The `base` path must match your repository name for assets to load correctly.

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

The workflow:
- Triggers on push to main/master
- Installs Node.js and dependencies
- Builds the production version
- Deploys to GitHub Pages

## Verification

After deployment, verify:

1. **Game loads correctly**
   - Visit your GitHub Pages URL
   - Check browser console for errors

2. **Assets load properly**
   - Images, sounds should load
   - No 404 errors in Network tab

3. **Microphone access works**
   - Browser should prompt for microphone permission
   - Voice meter should respond to sound

4. **Game functions correctly**
   - Can start the game
   - Voice control works
   - Keyboard controls work
   - Scoring system functions

## Troubleshooting

### Assets not loading (404 errors)
- **Problem**: Assets showing 404 errors
- **Solution**: Check that `base` in `vite.config.js` matches repository name
- **Example**: If repo is `my-game`, set `base: '/my-game/'`

### Microphone not working
- **Problem**: Microphone access denied
- **Solution**:
  - GitHub Pages requires HTTPS (automatically provided)
  - Users must grant microphone permission
  - Ensure browser supports Web Audio API

### Build fails in GitHub Actions
- **Problem**: Action fails during build
- **Solution**:
  - Check Actions logs for specific error
  - Ensure all dependencies are in package.json
  - Verify build works locally first

### Game shows blank page
- **Problem**: Page loads but game doesn't start
- **Solution**:
  - Check browser console for JavaScript errors
  - Verify base path is correct
  - Check that index.html is in root directory

## Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS**
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `[username].github.io`

3. **Update GitHub Settings**
   - Go to Settings > Pages
   - Enter custom domain
   - Enforce HTTPS

## Local Testing of Production Build

Before deploying, test the production build locally:

```bash
# Build
npm run build

# Preview (serves the dist folder)
npm run preview

# Open browser to http://localhost:4173
```

## Deployment Checklist

Before deploying to production:

- [ ] All features tested and working
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Assets load correctly in preview
- [ ] Voice input works (requires HTTPS)
- [ ] Keyboard controls work
- [ ] Mobile responsive (if applicable)
- [ ] Performance is good (60 FPS)
- [ ] README updated with deployment URL

## Environment-Specific Configuration

If you need different configs for dev/prod:

```javascript
// vite.config.js
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/jump-by-voice-game/' : '/',
  // ... other config
}));
```

## Monitoring Deployment

### Check GitHub Actions
1. Go to `Actions` tab in repository
2. Click on latest workflow run
3. View logs for build and deploy steps

### Check GitHub Pages Status
1. Go to `Settings` > `Pages`
2. See deployment status and URL
3. Click "View deployment" to access site

## Updating the Deployed Game

To update the deployed game:

1. **Make changes** to code
2. **Commit changes** to your branch
3. **Merge to main** branch
4. **Automatic deployment** triggers
5. **Wait** for GitHub Actions to complete
6. **Verify** changes on live site

Changes typically appear within 1-2 minutes after deployment completes.

## Rollback

If you need to rollback:

1. **Via Git**
   ```bash
   git revert [commit-hash]
   git push origin main
   ```

2. **Via GitHub**
   - Go to commit history
   - Find working commit
   - Create new commit reverting changes

## Support

If deployment issues persist:
- Check GitHub Pages documentation
- Review GitHub Actions logs
- Verify all URLs and paths
- Test locally first with `npm run preview`

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Last Updated**: 2025-01-11
**Game Version**: 1.0.0
