import { createApp } from './app.js';
import { PORT } from './config/index.js';
const app = createApp();
app.listen(PORT, () => console.log(`API on :${PORT}`));
