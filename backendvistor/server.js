const app = require('./app');
const PORT = process.env.PORT || 3001;
const { sequelize } = require('./models');

async function startServer(){
  try {
    await sequelize.sync({});
    await sequelize.authenticate();
    console.log("Connect done");
    
    app.listen(PORT, ()=>{
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
  catch (error){
    console.error("Cant connect" , error)
  }
}
startServer()