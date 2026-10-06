import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// Studio lives in ./studio, runs with `npm run dev` inside that folder.
export default defineConfig({
  name: 'ptca-blog',
  title: 'PTCA Blog Studio',
  projectId: 'iqvmrid9',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
