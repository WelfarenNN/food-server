import express from "express";

const app = express();

const PORT = 1111;

app.get("/api/health", (request, response) => {
  response.json({ message: `API HEALTHY RUNNING ON!${PORT}` });
});
app.post("/todo", (request, response) => {
  response.json({ message: `YOU ARE CALLING POST!${PORT}` });
});
app.delete("/todo", (request, response) => {
  response.json({ message: `YOU ARE CALLING DELETE!${PORT}` });
});
app.put("/todo", (request, response) => {
  response.json({ message: `YOU ARE CALLING UPDATE!${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});