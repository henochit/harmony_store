/**
 * Activite.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
     date: { type: 'ref', columnType: 'datetime'},
     debit: 'number',
     credit: 'number',
     Running_balance: 'number',
     narration: 'string',
     ref: 'string',
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },

    fournisseur: {
      model: 'fournisseur'
    },

  },
};

