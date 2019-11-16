/**
 * Fournisseur.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        name:  {
          type: 'string',
          unique: true
        },
    balance : {
      type : "number",
      defaultsTo : 0
    },
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },
  },

};

