# Student Marks Management (React)

## Project overview
A simple React app to manage student records (Roll, Name, Marks). Data is stored in browser `localStorage`. Features: Add/Edit/Delete, Search, Export CSV.

## Files added in this repo root
- `Jenkinsfile` — Declarative Jenkins pipeline that checks out code, installs, builds, and archives the `build/` folder.
- `react-app/` — the React application (use `cd react-app` to work there).
- `package.json` (root) — helper scripts for workspace-level commands.

## How to run locally
1. Open Powershell and go to the React app folder:

```powershell
cd C:\Users\srira\OneDrive\Desktop\devops\react-app
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm start
```

3. Open the app in your browser:

http://localhost:3000

4. To produce a production build (the folder Jenkins archives):

```powershell
npm run build

# build/ will be created in react-app\build
```

## Git/GitHub steps (suggested)
- Initialize the repo (if you haven't already):

```powershell
cd C:\Users\srira\OneDrive\Desktop\devops
git init
git add .
git commit -m "Initial commit: add react-app scaffold and Jenkinsfile"
git branch -M main
git remote add origin https://github.com/<your-username>/student-marks-app.git
git push -u origin main
```

- Create a feature branch and PR workflow:

```powershell
git checkout -b feature-edit
# make changes
git add . && git commit -m "feature: edit"
git push origin feature-edit
# open PR on GitHub, review, merge to main
```

## Jenkins setup

Option A — Poll SCM (easier when no webhooks):
1. Create a Pipeline job in Jenkins.
2. In the Pipeline section choose "Pipeline script from SCM" → Git → repo URL & credentials → Branch specifier: `*/main`.
3. Build Triggers → enable "Poll SCM" and set schedule `H/5 * * * *` (every 5 minutes).

Option B — GitHub webhooks (recommended):
1. Create a Pipeline job as above.
2. In GitHub repo Settings → Webhooks → Add webhook:
   - Payload URL: `http://<your-jenkins-host>/github-webhook/`
   - Content type: `application/json`
3. In Jenkins, enable "Build when a change is pushed to GitHub" (install GitHub plugin if needed).

Notes:
- Jenkins agents must have Node installed or use a Node Docker agent.
- `Jenkinsfile` uses `sh` steps and assumes a Unix-like agent; if your Jenkins master/agent is Windows, replace `sh` with `bat` steps.

## How to run the Jenkins job manually and capture logs
1. Open the Jenkins job and click "Build Now".
2. Click the running build number → "Console Output" to capture logs.
3. Take a screenshot showing "Started by user...", `npm run build` output, and "Finished: SUCCESS".

## Archive artifacts
- Jenkinsfile archives `build/**`. After a successful build open the build page → "Archived artifacts" to download the build files.

## Screenshots & logs (what to submit)
- `screenshots/app-running.png` — running app in browser at `http://localhost:3000`.
- `screenshots/jenkins-console.png` — Jenkins build console output showing `Finished: SUCCESS`.
- (Optional) `screenshots/archived-artifacts.png` — shows archived build files.

## Troubleshooting tips
- If `npm run build` fails on Jenkins ensure Node is installed on the agent or configure Jenkins to use Node (Manage Jenkins → Global Tool Configuration) or run the build in Docker.
- If `archiveArtifacts` doesn't find files, confirm `react-app/build` exists after `npm run build`.

## What I added for you now
- `Jenkinsfile` at repo root (declarative pipeline).  
- `README.md` at repo root (this file).

## Next steps (do these in order)
1. Verify the app runs locally: `cd react-app && npm install && npm start`. Open `http://localhost:3000` and confirm the UI appears.
2. Build locally: `cd react-app && npm run build` and confirm `react-app/build/` is created.
3. Initialize git (if not already), commit, and push to GitHub `main` (commands above).
4. In Jenkins create a Pipeline job that uses the `Jenkinsfile` from SCM (use Poll SCM or webhooks).
5. Run the job manually and capture console output screenshot.
6. Collect screenshots and paste your GitHub repo link for submission.

If you want, I can:
- Run `npm run build` locally now and confirm `build/` is created (I can run it in this environment).  
- Or prepare a Windows-friendly `Jenkinsfile` (replace `sh` with `bat`) if your Jenkins agents are Windows-based.
