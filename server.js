import express from 'express';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = 3001;

// Initialize Octokit with GitHub token
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

// Get repository info from package.json or environment
const getRepoInfo = () => {
    try {
        const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
        const repoUrl = packageJson.repository?.url || '';
        const match = repoUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);

        if (match) {
            return { owner: match[1], repo: match[2] };
        }
    } catch (e) {
        console.error('Could not read package.json:', e);
    }

    // Fallback to environment variables
    return {
        owner: process.env.GITHUB_OWNER || 'oskars',
        repo: process.env.GITHUB_REPO || 'RefineryWatch-Russian-Infrastructure-Tracker'
    };
};

app.post('/api/commit-refineries', async (req, res) => {
    try {
        const { refineries } = req.body;

        if (!refineries || !Array.isArray(refineries)) {
            return res.status(400).json({ error: 'Invalid refineries data' });
        }

        const { owner, repo } = getRepoInfo();

        // Get the current file content and SHA
        const { data: currentFile } = await octokit.repos.getContent({
            owner,
            repo,
            path: 'constants.ts',
        });

        // Generate new constants.ts content
        const newContent = generateConstantsFile(refineries);
        const encodedContent = Buffer.from(newContent).toString('base64');

        // Commit the changes
        const { data: commit } = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: 'constants.ts',
            message: `Update refinery data via Admin Panel - ${new Date().toISOString()}`,
            content: encodedContent,
            sha: currentFile.sha,
            branch: 'main'
        });

        res.json({
            success: true,
            commit: commit.commit.sha,
            message: 'Changes committed to GitHub successfully!'
        });

    } catch (error) {
        console.error('GitHub commit error:', error);
        res.status(500).json({
            error: 'Failed to commit to GitHub',
            details: error.message
        });
    }
});

function generateConstantsFile(refineries) {
    const imports = `
import { Refinery, RefineryStatus, Pipeline } from './types';

export const INITIAL_REFINERIES: Refinery[] = ${JSON.stringify(refineries, null, 2)};

export const MAJOR_PIPELINES: Pipeline[] = [
  {
    id: 'druzhba-oil',
    name: 'Druzhba Pipeline (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [53.2, 50.1], [53.2, 45.0], [52.7, 41.4], [52.9, 36.1], [53.2, 34.3],
      [52.4, 31.0], [52.0, 29.2], [52.1, 23.7], [51.2, 28.5], [50.6, 26.2],
      [49.8, 24.0], [48.6, 22.3]
    ]
  },
  {
    id: 'brotherhood-gas',
    name: 'Brotherhood Pipeline (Gas)',
    type: 'gas',
    status: 'operational',
    coordinates: [
      [51.3, 37.8], [50.9, 34.8], [50.4, 30.5], [49.4, 27.0], [48.9, 24.7], [48.6, 22.3]
    ]
  },
  {
    id: 'nord-stream-1',
    name: 'Nord Stream 1 (Gas)',
    type: 'gas',
    status: 'destroyed',
    coordinates: [
      [60.7, 28.5], [59.5, 25.5], [55.5, 15.8], [54.1, 13.6]
    ]
  },
  {
    id: 'cpc-oil',
    name: 'Caspian Pipeline Consortium (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [46.7, 51.4], [46.5, 48.0], [45.4, 43.0], [44.7, 37.8]
    ]
  },
  {
    id: 'baltic-pipeline-system',
    name: 'Baltic Pipeline System (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [57.6, 39.9], [59.4, 32.0], [60.3, 28.6]
    ]
  }
];
`;

    return imports.trim();
}

app.listen(PORT, () => {
    console.log(`✅ API Server running on http://localhost:${PORT}`);
    console.log(`🔧 GitHub repo: ${getRepoInfo().owner}/${getRepoInfo().repo}`);
});
