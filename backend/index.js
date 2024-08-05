const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnect = require('./utils/database');
const errorHandler = require('./middlewares/errorHandler');

const userRouter = require('./routes/userRouter')
const todoRouter = require('./routes/todoRouter')

dotenv.config();
const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(cors())
dbConnect();

app.get('/', (req, res)=>{
  res.send("Hello Backend");
});

app.use('/api/v1/users', userRouter)
app.use('/api/v1/todos', todoRouter)

// error handler middleware
app.use(errorHandler);

let port = process.env.PORT;
let host = process.env.HOST; 

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});