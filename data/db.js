const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud_db', 'rebeca', 'root1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

testConnection();

module.exports = sequelize;
