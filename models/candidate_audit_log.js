const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Audit_log = sequelize.define('audit_log', {
    log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modified_by_emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'),
        allowNull: false
      },
      modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      old_value: {
        type: DataTypes.JSON,
        allowNull: false
      },
      new_value: {
        type: DataTypes.JSON,
        allowNull: false
      }
});

module.exports = Audit_log;