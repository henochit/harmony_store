/**
 * Produit.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
     code:  {
              type: 'string',
              unique: true
            },
   nom: 'string',
   stock: 'string',
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },

    categorie: {
      model: 'categorie'
    },

    packetage: {
      model: 'packetage'
    }
  },

};

