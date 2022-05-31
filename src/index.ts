import app from './server';
const PORT = process.env.SERVER_PORT;

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}`);
});
