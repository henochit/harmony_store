/**
 * Entree.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
     date: { type: 'ref', columnType: 'datetime'},
     quantite: 'number',
     motif: 'string',
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },

    produit: {
      model: 'produit'
    },

  },
};

