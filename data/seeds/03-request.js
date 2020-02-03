
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Request').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Request').insert([
        { id: 1,
          title: 'Bananas!',
          business_id: 3, // Costco
          volunteer_id: null,
          description: 'Dole organic bananas. Yellow to light brown. 94011.',
          quantity: '4 pallets',
          ready_by: null,
          picked_up: null,
          delivered: null,
        },
        { id: 2,
          title: 'Sandwiches',
          business_id: 1, // Subway
          volunteer_id: null,
          description: 'Veggie Delight on whole wheat. All the veggies. Mustard. Oregano.',
          quantity: '26 feet',
          ready_by: null,
          picked_up: null,
          delivered: null,
        },
        { id: 3,
          title: 'Burritos',
          business_id: 2, // Laughing Planet
          volunteer_id: null,
          description: 'Gourmet Burritos',
          quantity: '5',
          ready_by: null,
          picked_up: null,
          delivered: null,
        },
        { id: 4,
          title: 'Item 4',
          business_id: 3,
          volunteer_id: null,
          description: 'Potatoes!',
          quantity: '460 bags. Idaho Russets, probably.',
          ready_by: null,
          picked_up: null,
          delivered: null,
        },
      ]);
    });
};
