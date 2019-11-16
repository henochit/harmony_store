/**
 * Packetage.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        label:  {
                  type: 'string',
                  unique: true
                },
        createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
        updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },

        produits: {
		      collection: 'produit',
		      via: 'packetage'
		    }
  },

};

