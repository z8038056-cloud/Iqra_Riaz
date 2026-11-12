# Deploying to Cloudflare Pages (Free)

This guide walks you through deploying the Iqra Riaz portfolio to Cloudflare Pages for free hosting with automatic deployments.

## ✅ Step 1: Push your code (Already done!)

Your code has been successfully pushed to GitHub:
- **Repository URL:** https://github.com/z8038056-cloud/Iqra_Riaz
- **Branch:** master
- **GitHub Account:** z8038056-cloud

---

## 🚀 Step 2: Create a Cloudflare account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up for a free account (no credit card required)
3. Verify your email address
4. Log in to the Cloudflare dashboard

---

## 🔗 Step 3: Connect GitHub to Cloudflare Pages

1. In the Cloudflare dashboard, navigate to **Workers & Pages** in the left sidebar
2. Click **Create application**
3. Select the **Pages** tab
4. Click **Connect to Git**
5. Click **Connect GitHub** and authorize Cloudflare to access your GitHub account
6. In the repository list, find and select **Iqra_Riaz**
7. Click **Begin setup**

---

## ⚙️ Step 4: Configure build settings

On the build configuration page, enter the following settings:

### Basic Settings
- **Project name:** `iqra-riaz` (or any name you prefer - this becomes part of your URL)
- **Production branch:** `master`

### Build Settings
- **Framework preset:** Select **None** (or **Vite** if available)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** (leave empty - the package.json is at the repository root)

### Environment Variables
Click **Add variable** and add:
- **Variable name:** `NODE_VERSION`
- **Value:** `20`

This ensures Cloudflare uses Node.js 20 for the build (required for the latest dependencies).

---

## 🎉 Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will start building your project
3. The first build typically takes 2-3 minutes
4. Once complete, you'll see a success message with your live URL

Your site will be available at a free Cloudflare URL like:
- `https://iqra-riaz.pages.dev` (or similar, based on your project name)

---

## 🌐 Step 6: Custom domain (Optional, Free)

To use your own domain name:

1. Go to your Pages project in the Cloudflare dashboard
2. Click the **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow the DNS configuration instructions provided by Cloudflare
   - If your domain is already on Cloudflare, it will be configured automatically
   - If not, you'll need to add CNAME records at your DNS provider

Custom domains on Cloudflare Pages are completely free and include SSL certificates.

---

## 🔄 Auto-deploys

Once set up, your site will automatically redeploy:
- Every time you push to the **master** branch
- Each deployment takes ~1-2 minutes
- You'll receive notifications on build status (success/failure)

### Preview Deployments
- Cloudflare also creates preview deployments for pull requests
- Each PR gets its own unique preview URL
- Perfect for testing changes before merging

---

## 🛠️ Troubleshooting

### Build fails with "Command not found"
- Verify the build command is exactly `npm run build`
- Check that `NODE_VERSION` environment variable is set to `18`

### Site loads but styles are broken
- Verify the build output directory is set to `dist`
- Check the build log to ensure CSS files were generated

### 404 errors on page refresh
This is a TanStack Router (SPA) routing issue. Add a `_redirects` file at the project root:

```
/*    /index.html   200
```

Then commit and push:
```bash
git add _redirects
git commit -m "Add SPA redirect rules for Cloudflare Pages"
git push
```

### Build fails with dependency errors
- Check the build log in the Cloudflare dashboard for specific errors
- Ensure all dependencies are listed in `package.json` (not just devDependencies)
- Try clearing the build cache in Cloudflare Pages settings

### Slow initial load
- Enable **Speed** > **Optimization** in your Cloudflare dashboard for automatic minification
- Consider enabling **Auto Minify** for HTML, CSS, and JavaScript

---

## 📊 Monitoring & Analytics

Cloudflare Pages includes free analytics:
1. Go to your project in the Cloudflare dashboard
2. Click the **Analytics** tab
3. View page views, bandwidth usage, and performance metrics

---

## 💰 Cost

Cloudflare Pages is **completely free** for:
- Unlimited sites
- Unlimited requests
- Unlimited bandwidth
- Custom domains with SSL
- 500 builds per month
- 1 build at a time

This is more than enough for a portfolio site!

---

## 🔐 Environment Variables (If Needed Later)

Currently, this portfolio doesn't require any secret environment variables. If you add backend features later (like a contact form API):

1. Go to **Settings** > **Environment variables**
2. Add variables for Production and/or Preview environments
3. Never commit secrets to the repository - always use Cloudflare's environment variables

---

## 📝 Summary

Your Iqra Riaz portfolio is now:
- ✅ Hosted on Cloudflare's global CDN
- ✅ Served over HTTPS
- ✅ Automatically deployed on every push
- ✅ Free forever with no hidden costs

**Live at:** Check your Cloudflare dashboard for your `.pages.dev` URL!

---

## 🆘 Need Help?

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Build Logs:** Available in your Cloudflare Pages dashboard
- **Support:** Cloudflare Community Forum or Discord

Happy deploying! 🚀
