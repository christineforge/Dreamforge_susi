# Azure Static Web Apps Deployment Guide

This guide will walk you through deploying your customized Clerk sign-in/sign-up flow to Azure Static Web Apps.

## Overview

Your Next.js app uses only client-side Clerk components, so we're using **static export** to convert it into static HTML/CSS/JS files that Azure can host. This approach is:
- ✅ Simple and cost-effective
- ✅ Fast loading times
- ✅ No server-side code needed
- ✅ Works perfectly with Clerk's client-side components

## Key Points

- **You only need the publishable key** (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) - **NO secret key needed**
- **Static export is safe** - Your code is 100% client-side compatible
- Clerk components work perfectly in static builds - they run entirely in the browser

## Prerequisites

Before you begin, make sure you have:

1. ✅ An Azure account (sign up at [azure.com](https://azure.com) if needed)
2. ✅ A Clerk account with your publishable key
3. ✅ Node.js installed locally
4. ✅ Your app builds successfully (`npm run build`)

## Quick Steps Summary

1. **Create Static Web App** - Create new resource in Azure Portal
2. **Add Environment Variable** - Add your Clerk publishable key
3. **Get Your URL** - Copy your app's public URL
4. **Deploy Files** - Upload your built static files
5. **Configure Clerk** - Add your Azure URL to Clerk Dashboard
6. **Test** - Visit your URL and test the sign-in/sign-up flow

---

## Part 1: Prepare Your App Locally

### Step 1.1: Build Your App

1. Open your terminal in the `dreamforge-auth` directory
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Build your app:
   ```bash
   npm run build
   ```
4. Verify the `out` folder was created with static files
5. Test locally (optional):
   ```bash
   npx serve out
   ```
   Visit `http://localhost:3000` to verify everything works

### Step 1.2: Get Your Clerk Publishable Key

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign in and select your application
3. Go to "API Keys" section
4. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
5. Keep this handy - you'll need it in Azure

---

## Part 2: Create Azure Static Web App

### Step 2.1: Log into Azure Portal

1. Go to [https://portal.azure.com](https://portal.azure.com)
2. Sign in with your Azure account

### Step 2.2: Create New Resource

1. Click the **"+ Create a resource"** button (top left, or use the search bar)
2. Search for **"Static Web App"**
3. Click **"Static Web App"** from the search results
4. Click the **"Create"** button

### Step 2.3: Fill in Basic Details

Fill in the form with these details:

- **Subscription**: Select your Azure subscription
- **Resource Group**: 
  - Click **"Create new"**
  - Enter a name like `dreamforge-auth-rg`
  - Click **"OK"**
  - OR select an existing resource group from the dropdown
- **Name**: Enter a unique name (e.g., `dreamforge-auth` or `dreamforge-auth-prod`)
  - ⚠️ Must be globally unique (Azure will check availability)
  - Use lowercase letters, numbers, and hyphens only
  - Example: `dreamforge-auth-prod-2024`
- **Plan type**: 
  - Select **"Free"** for testing (has some limitations)
  - Select **"Standard"** for production (recommended)
- **Region**: Select the closest region to your users
  - Examples: `East US`, `West Europe`, `Southeast Asia`

### Step 2.4: Deployment Details

- **Source**: Select **"Other"** (for manual deployment)
  - If you want automatic GitHub deployment, select "GitHub" and follow the connection steps
  - For this guide, we'll use manual deployment

### Step 2.5: Review and Create

1. Click the **"Review + create"** button at the bottom
2. Review all your settings
3. Click the **"Create"** button
4. Wait for deployment to complete (takes 1-2 minutes)
5. When done, click **"Go to resource"** button

---

## Part 3: Configure Environment Variables

### Step 3.1: Navigate to Environment Variables

1. In your Static Web App resource, find **"Settings"** in the left sidebar
2. Click **"Settings"** to expand it
3. Click **"Environment variables"** (under Settings)
4. You'll see an "Environments" dropdown at the top - make sure **"Production"** is selected

### Step 3.2: Add Environment Variable

1. Click the **"+ Add"** button in the **"Application settings"** section
2. Fill in the form:
   - **Name**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Value**: Paste your Clerk publishable key (from Step 1.2)
3. Click **"OK"**
4. ⚠️ **Important**: Click **"Save"** at the top of the page
5. Wait for Azure to update (takes about 30 seconds)

---

## Part 4: Get Your App URL

### Step 4.1: Find Your URL

1. In your Static Web App resource, find **"Overview"** in the left sidebar
2. Click **"Overview"**
3. Look for the **"URL"** field - this is your app's public URL
4. Format: `https://your-app-name.azurestaticapps.net`
5. **Copy this URL** - you'll need it for Clerk configuration

---

## Part 5: Deploy Your Files

### Step 5.1: Build Your App (if not already done)

**What this does:** This command converts your Next.js app into static HTML, CSS, and JavaScript files that Azure can host. It creates an `out` folder containing all the files needed to run your app.

**Step-by-step instructions:**

1. **Open your terminal/command prompt**
   - Windows: Open PowerShell or Command Prompt
   - Mac/Linux: Open Terminal
   - Make sure you're in the correct directory

2. **Navigate to your project folder**
   ```bash
   cd "D:\Work files\Dream Forge\DreamForge Email\button css\dreamforge-auth"
   ```
   (Adjust the path to match your actual project location)

3. **Verify you're in the right place**
   - You should see files like `package.json`, `next.config.js`, and the `app` folder
   - You can check by running: `dir` (Windows) or `ls` (Mac/Linux)

4. **Install dependencies (if you haven't already)**
   ```bash
   npm install
   ```
   - This ensures all required packages are installed
   - Only needed if you haven't run this before or added new packages

5. **Build your app**
   ```bash
   npm run build
   ```
   - This will take 30-60 seconds
   - You'll see output showing the build progress
   - Look for messages like "Creating an optimized production build" and "Export successful"

6. **What to expect:**
   - ✅ **Success**: You'll see "Export successful" or similar message
   - ✅ **Output folder**: A new `out` folder will be created in your project directory
   - ✅ **No errors**: The build should complete without errors

7. **Verify the build worked:**
   - Check that the `out` folder exists in your project root
   - The `out` folder should contain:
     - `index.html` (main page)
     - `auth/` folder (with your auth pages)
     - `_next/` folder (with JavaScript and CSS files)
     - `images/` folder (if you have images in `public/images/`)
   - You can check by running: `dir out` (Windows) or `ls out` (Mac/Linux)

8. **Test locally (optional but recommended):**
   ```bash
   npx serve out
   ```
   - This starts a local server
   - Visit `http://localhost:3000` in your browser
   - Verify your app loads correctly
   - Press `Ctrl+C` to stop the server when done

**Troubleshooting build issues:**

- **Error: "Cannot find module"**
  - Run `npm install` first
  - Make sure you're in the correct directory

- **Error: "next.config.js" issues**
  - Verify `next.config.js` has `output: 'export'` (we already added this)
  - Check for syntax errors in the file

- **No `out` folder created:**
  - Check the build output for errors
  - Make sure `output: 'export'` is in `next.config.js`
  - Try deleting `.next` folder and rebuilding: `rm -r .next` then `npm run build`

- **Build succeeds but files are missing:**
  - Check that all your pages use `'use client'` (they should)
  - Verify images are in `public/images/` folder

### Step 5.2: Get Deployment Token

**What this is:** A deployment token is a special key that Azure uses to authenticate your deployment. It's like a password that allows you to upload files to your Static Web App.

**Important:** 
- This token is unique to your Static Web App
- Keep it secure - don't share it publicly
- You can regenerate it if needed (but the old one will stop working)
- You'll need this token for Azure CLI deployment (Option B)

**Step-by-step instructions:**

1. **Open Azure Portal**
   - Go to [https://portal.azure.com](https://portal.azure.com)
   - Make sure you're signed in

2. **Navigate to your Static Web App**
   - In the search bar at the top, type your Static Web App name
   - Click on your Static Web App from the results
   - OR navigate via: All resources → Your Static Web App name

3. **Go to Overview**
   - In the left sidebar, click **"Overview"**
   - This is usually the default view when you open the resource

4. **Find the deployment token section**
   - Scroll down in the Overview page
   - Look for a section called **"Essentials"** or **"Properties"**
   - Find the **"Manage deployment token"** link
   - It might be labeled as:
     - "Manage deployment token"
     - "Deployment token"
     - "Get deployment token"
     - Or look for a key icon 🔑

5. **Click the link**
   - Click on **"Manage deployment token"** or the key icon
   - A dialog/popup will appear showing your token

6. **Copy the token**
   - The token is a long string of characters (looks like: `abcdefghijklmnopqrstuvwxyz1234567890...`)
   - Click the **copy icon** (📋) next to the token
   - OR select all the text and copy it (Ctrl+C on Windows, Cmd+C on Mac)
   - ⚠️ **Important**: Copy the ENTIRE token - it's usually quite long

7. **Save the token securely**
   - Paste it into a text file temporarily (you'll use it soon)
   - OR keep it in your clipboard if you're deploying immediately
   - Don't save it in a public place or commit it to Git

8. **Verify you have the token**
   - The token should be a long string (50+ characters)
   - It typically contains letters, numbers, and sometimes special characters
   - If it looks too short or wrong, try copying again

**Alternative: If you can't find "Manage deployment token"**

- Look in the left sidebar under **"Settings"** → **"Deployment tokens"**
- OR go to **"Configuration"** → look for deployment settings
- OR check the **"Properties"** section in Overview

**Note for VS Code Extension users:** 
- If you're using the VS Code extension (Option A), you don't need the token manually
- The extension handles authentication automatically when you sign in to Azure
- You can skip this step if using VS Code extension

### Step 5.3: Deploy Using VS Code Extension (Recommended - Easiest Method)

**Why this method:** This is the easiest way to deploy. VS Code handles authentication automatically, and you can deploy with just a few clicks.

**Prerequisites:**
- VS Code installed ([download here](https://code.visualstudio.com/) if needed)
- Your `out` folder built and ready (from Step 5.1)

**Step-by-step instructions:**

1. **Install the Azure Static Web Apps Extension**
   - Open VS Code
   - Click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
   - In the search box, type: **"Azure Static Web Apps"**
   - Look for the extension by Microsoft (it should show "Azure Static Web Apps" with Microsoft as publisher)
   - Click the **"Install"** button
   - Wait for installation to complete (usually takes 10-30 seconds)

2. **Sign in to Azure in VS Code**
   - Press `F1` (or `Ctrl+Shift+P` on Windows, `Cmd+Shift+P` on Mac) to open the command palette
   - Type: **"Azure: Sign In"**
   - Select **"Azure: Sign In"** from the dropdown
   - A browser window will open asking you to sign in
   - Sign in with your Azure account credentials
   - After signing in, you'll see a message in VS Code saying "Successfully signed in to Azure"
   - ⚠️ **Note**: You only need to do this once. VS Code will remember your login.

3. **Open your project in VS Code**
   - In VS Code, go to **File** → **Open Folder**
   - Navigate to your `dreamforge-auth` project folder
   - Click **"Select Folder"**
   - You should see your project files in the left sidebar

4. **Deploy your app**
   - In the left sidebar (Explorer), find the **`out`** folder
   - **Right-click** on the `out` folder
   - From the context menu, select **"Deploy to Static Web App..."**
   - If you don't see this option:
     - Make sure the Azure extension is installed
     - Make sure you're signed in to Azure
     - Try refreshing VS Code

5. **Select your Azure resources**
   - A dropdown will appear asking for your **Azure subscription**
     - Select the subscription where you created your Static Web App
   - Another dropdown will appear asking for your **Static Web App**
     - Select your Static Web App name (the one you created in Part 2)
   - If you don't see your app listed:
     - Make sure you're signed in to the correct Azure account
     - Verify your Static Web App exists in Azure Portal

6. **Wait for deployment**
   - VS Code will show a notification: "Deploying to Static Web App..."
   - A progress indicator will appear in the bottom-right corner
   - Deployment usually takes 1-3 minutes
   - You'll see output in the VS Code terminal showing the deployment progress

7. **Verify deployment completed**
   - When done, you'll see a notification: "Successfully deployed to Static Web App"
   - The terminal will show "Deployment completed successfully"
   - You can now visit your app URL in a browser

**Troubleshooting VS Code deployment:**

- **"Deploy to Static Web App" option not showing:**
  - Make sure you right-clicked on the `out` folder (not a file inside it)
  - Verify the Azure Static Web Apps extension is installed and enabled
  - Try restarting VS Code

- **Can't sign in to Azure:**
  - Make sure you have an active internet connection
  - Try signing out and signing back in: `F1` → "Azure: Sign Out" → then sign in again
  - Check that your Azure account has permissions to deploy

- **Subscription or app not showing:**
  - Verify you're signed in to the correct Azure account
  - Check that your Static Web App exists in Azure Portal
  - Try refreshing: `F1` → "Azure: Refresh"

- **Deployment fails:**
  - Check the VS Code terminal for error messages
  - Verify your `out` folder contains files
  - Make sure you have the correct permissions in Azure

### Step 5.4: Deploy Using Azure CLI (Alternative Method)

**When to use this method:** Use this if you prefer command-line tools, or if the VS Code extension doesn't work for you.

**Prerequisites:**
- Azure CLI installed
- Your deployment token from Step 5.2
- Your `out` folder built and ready

**Step-by-step instructions:**

1. **Install Azure CLI** (if not already installed)

   **Windows:**
   - Download the installer from: [aka.ms/installazurecliwindows](https://aka.ms/installazurecliwindows)
   - Run the installer (MSI file)
   - Follow the installation wizard
   - Restart your terminal after installation

   **Mac:**
   ```bash
   brew install azure-cli
   ```
   (Requires Homebrew - if you don't have it, install from [brew.sh](https://brew.sh/))

   **Linux:**
   - Follow instructions at: [docs.microsoft.com/cli/azure/install-azure-cli](https://docs.microsoft.com/cli/azure/install-azure-cli)
   - Or use your package manager (apt, yum, etc.)

   **Verify installation:**
   ```bash
   az --version
   ```
   - You should see the Azure CLI version number
   - If you get "command not found", make sure Azure CLI is in your PATH

2. **Sign in to Azure**
   ```bash
   az login
   ```
   - This will open a browser window
   - Sign in with your Azure account
   - After signing in, you'll see your subscriptions listed in the terminal
   - ⚠️ **Note**: You only need to do this once per terminal session

3. **Navigate to your project folder**
   ```bash
   cd "D:\Work files\Dream Forge\DreamForge Email\button css\dreamforge-auth"
   ```
   (Adjust the path to match your actual project location)

4. **Verify you're in the right place**
   - You should see the `out` folder in this directory
   - You can check with: `dir out` (Windows) or `ls out` (Mac/Linux)

5. **Deploy your app**
   
   Replace the placeholders in this command with your actual values:
   ```bash
   az staticwebapp deploy \
     --name your-app-name \
     --resource-group your-resource-group-name \
     --source-location ./out \
     --token YOUR_DEPLOYMENT_TOKEN
   ```

   **What to replace:**
   - `your-app-name`: Your Static Web App name (from Part 2, Step 2.3)
     - Example: `dreamforge-auth-prod`
   - `your-resource-group-name`: Your resource group name (from Part 2, Step 2.3)
     - Example: `dreamforge-auth-rg`
   - `YOUR_DEPLOYMENT_TOKEN`: The token you copied in Step 5.2
     - Paste the entire token (it's long!)

   **Example command (with actual values):**
   ```bash
   az staticwebapp deploy \
     --name dreamforge-auth-prod \
     --resource-group dreamforge-auth-rg \
     --source-location ./out \
     --token abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567
   ```

6. **Run the command**
   - Copy your command (with your actual values)
   - Paste it into your terminal
   - Press Enter
   - The deployment will start

7. **Wait for deployment**
   - You'll see output showing the deployment progress
   - It will upload files and show progress
   - Usually takes 1-3 minutes
   - Look for "Deployment completed successfully" message

**Troubleshooting Azure CLI:**

- **"az: command not found"**
  - Azure CLI is not installed or not in your PATH
  - Reinstall Azure CLI or add it to your PATH

- **"Please run 'az login' to setup account"**
  - Run `az login` first
  - Make sure you're signed in

- **"Resource not found"**
  - Check that your app name and resource group name are correct
  - Verify they exist in Azure Portal
  - Check that you're using the correct Azure subscription

- **"Invalid token"**
  - Make sure you copied the entire deployment token
  - Try getting a new token from Azure Portal
  - Check for extra spaces or line breaks in the token

- **"Permission denied"**
  - Make sure your Azure account has permissions to deploy
  - Check that you're signed in to the correct account

### Step 5.5: Verify Deployment

1. Go to your app URL in a browser (from Step 4.1)
2. Check that the page loads correctly
3. Test the sign-in/sign-up flow
4. Verify Clerk components work properly

---

## Part 6: Configure Clerk Dashboard

### Step 6.1: Log into Clerk Dashboard

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign in to your Clerk account
3. Select your application

### Step 6.2: Add Allowed Redirect URLs

1. In the left sidebar, click **"Paths"** or **"Redirect URLs"**
2. Find the **"Allowed redirect URLs"** section
3. Click **"+ Add URL"** button
4. Add these URLs (replace `your-app-name` with your actual app name):
   - `https://your-app-name.azurestaticapps.net`
   - `https://your-app-name.azurestaticapps.net/`
   - `https://your-app-name.azurestaticapps.net/auth/*`
5. Click **"Save"** after adding each URL

### Step 6.3: Add Allowed Origins (if needed)

1. Find the **"Allowed origins"** section
2. Click **"+ Add origin"**
3. Add: `https://your-app-name.azurestaticapps.net`
4. Click **"Save"**

### Step 6.4: Verify Configuration

1. Go back to **"API Keys"** section
2. Verify your publishable key matches what you added to Azure
3. Make sure you're using the correct key (test vs. production)

---

## Part 7: Test Your Deployment

### Step 7.1: Test Basic Functionality

1. Visit your Azure Static Web Apps URL
2. Verify the page loads with your custom styling
3. Check that the background image loads (if you have one)
4. Verify fonts load correctly

### Step 7.2: Test Authentication Flow

1. Click on sign-in or sign-up
2. Verify Clerk components render correctly
3. Test the sign-up flow:
   - Enter email and password
   - Complete verification if required
   - Verify redirect works
4. Test the sign-in flow:
   - Enter credentials
   - Verify authentication works
   - Check redirect after sign-in

### Step 7.3: Test OAuth (if configured)

1. If you have social login buttons (Google, GitHub, etc.)
2. Click on a social login button
3. Complete the OAuth flow
4. Verify redirect back to your app works

---

## Part 8: Monitor and Update Your App

### Step 8.1: View Deployment History

1. In Azure Portal, go to your Static Web App
2. Click **"Deployment history"** in the left sidebar
3. See all deployments with:
   - Status (Success/Failed)
   - Timestamp
   - Commit/deployment details

### Step 8.2: View Logs

1. Click **"Log stream"** to see real-time logs
2. Click **"Logs"** to download log files
3. Useful for debugging issues

### Step 8.3: Update Your App

When you make changes to your code:

1. Make changes locally
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy the new `out` folder using the same method from Part 5
5. Changes appear in 1-2 minutes

### Step 8.4: Check Build Status

- If using GitHub integration, check the **"GitHub Actions"** tab
- See build progress and any errors
- View deployment logs

---

## Part 9: Configure Custom Domain (Optional)

### Step 9.1: Add Custom Domain

1. In your Static Web App, click **"Custom domains"** in the left sidebar
2. Click **"+ Add"** button
3. Enter your domain name (e.g., `auth.yourdomain.com`)
4. Follow the DNS verification steps:
   - Azure will provide a TXT record
   - Add it to your domain's DNS settings
   - Wait for verification (can take a few minutes to hours)
5. Once verified, your custom domain will be active

### Step 9.2: Update Clerk Redirect URLs

After adding a custom domain:

1. Go back to Clerk Dashboard
2. Add your custom domain to allowed redirect URLs:
   - `https://auth.yourdomain.com`
   - `https://auth.yourdomain.com/`
   - `https://auth.yourdomain.com/auth/*`

---

## Troubleshooting

### Issue: App shows blank page

**Solutions:**
- Check browser console for errors
- Verify environment variable is set correctly in Azure
- Check that `out` folder was deployed completely
- Verify `staticwebapp.config.json` is in the root of your project

### Issue: Clerk components don't load

**Solutions:**
- Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in Azure Configuration
- Check that the key is correct (no extra spaces)
- Verify Clerk redirect URLs include your Azure URL
- Check browser console for Clerk-related errors

### Issue: Routing doesn't work (404 errors)

**Solutions:**
- Verify `staticwebapp.config.json` is deployed
- Check that routes are configured correctly
- Ensure `navigationFallback` is set to `/index.html`

### Issue: Images don't load

**Solutions:**
- Verify images are in the `public/images` folder
- Check that image paths in CSS use `/images/` (absolute paths)
- Ensure images are included in the `out` folder after build

### Issue: Environment variable not working

**Solutions:**
- Make sure you clicked **"Save"** after adding the variable
- Wait 30-60 seconds for Azure to restart
- Verify the variable name is exactly: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Check that the value doesn't have extra spaces or quotes

### Issue: Deployment fails

**Solutions:**
- Check deployment logs in Azure Portal
- Verify your deployment token is correct
- Ensure `out` folder exists and has files
- Check that you have proper Azure permissions

---

## GitHub Automatic Deployment (Optional)

If you want automatic deployments from GitHub:

### Setup GitHub Integration

1. When creating the Static Web App, select **"GitHub"** as the source
2. Authorize Azure to access your GitHub account
3. Select your repository
4. Select your branch (usually `main` or `master`)
5. Azure will create a GitHub Actions workflow automatically

### Configure Workflow

The workflow file will be created at `.github/workflows/azure-static-web-apps-*.yml`

Make sure it includes:
- Build command: `npm run build`
- App artifact location: `out`
- API location: (leave empty if no API)

### Environment Variables in GitHub

1. Go to your GitHub repository
2. Go to Settings → Secrets and variables → Actions
3. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` as a repository secret
4. Update the workflow file to use this secret

---

## Architecture Overview

```
User Browser
    ↓
Azure Static Web Apps (Static HTML/JS/CSS)
    ↓
Clerk Components (Client-side, runs in browser)
    ↓
Clerk API (via publishable key)
```

**Key Points:**
- All authentication happens in the browser
- No server-side code needed
- Static files are served by Azure CDN
- Fast and cost-effective

---

## Next Steps

After successful deployment:

1. ✅ Test all authentication flows
2. ✅ Monitor logs for any errors
3. ✅ Set up custom domain (if needed)
4. ✅ Configure production Clerk keys (if using test keys)
5. ✅ Set up monitoring/alerts in Azure
6. ✅ Document your deployment process for your team

---

## Support Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Azure Portal](https://portal.azure.com)
- [Clerk Dashboard](https://dashboard.clerk.com)

---

## Summary Checklist

Before going live, verify:

- [ ] App builds successfully locally (`npm run build`)
- [ ] Static Web App created in Azure
- [ ] Environment variable set in Azure Configuration
- [ ] Files deployed to Azure
- [ ] App URL accessible in browser
- [ ] Clerk redirect URLs configured
- [ ] Sign-in flow tested
- [ ] Sign-up flow tested
- [ ] OAuth flows tested (if applicable)
- [ ] Custom domain configured (if applicable)
- [ ] Production keys used (if in production)

---

**Congratulations!** Your customized Clerk authentication flow is now live on Azure Static Web Apps! 🎉

