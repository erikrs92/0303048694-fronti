import { defineConfig } from "cypress"; 
import { renameSync } from 'fs';
import path from 'path';

function getTimestampedFilename(baseName: string): string {
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  return `${baseName}_${timestamp}`;
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const videoName = getTimestampedFilename(path.basename(spec.relative));
          const newVideoPath = path.join(path.dirname(results.video), `${videoName}.mp4`);
          renameSync(results.video, newVideoPath);
        }
      });

      on('after:screenshot', (details) => {
        const newFilename = getTimestampedFilename(details.name || 'screenshot');
        const newPath = path.join(details.path, '..', `${newFilename}.png`);
        renameSync(details.path, newPath);
        return { path: newPath };
      });
    },
    video: true,
    screenshotsFolder: 'cypress/evidences',
    videosFolder: 'cypress/evidences',
    trashAssetsBeforeRuns: true,
    screenshotOnRunFailure: true, // Asegura que las capturas se tomen en caso de fallos
  },
});
