import { createServer } from "./index";

const app = createServer();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🚀 Production server running on http://localhost:${port}`);
});
