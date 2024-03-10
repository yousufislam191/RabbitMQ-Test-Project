import { app } from "./app";

const PORT: number = 3001;

app.listen(PORT, (): void => {
  console.log(`Product Server listening at http://localhost:${PORT}`);
});
