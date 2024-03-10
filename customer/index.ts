import { app } from "./app";

const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Customer Server listening at http://localhost:${PORT}`);
});
