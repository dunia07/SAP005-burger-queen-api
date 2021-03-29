module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        references: { model: 'Orders', key: 'id' },
        type: Sequelize.INTEGER,
      },
      product_id: {
        references: { model: 'Products', key: 'id' },
        type: Sequelize.INTEGER,
      },
      qtd: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ProductOrders');
  },
};
