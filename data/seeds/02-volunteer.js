
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Volunteer').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Volunteer').insert([
        { id: 1, 
          email: 'food@pantry.org', // password "pantry"
          password: '$2y$12$ZBzUownqQbZomwwpHXXYNe6scDVStWtE/7gec2ZI0sqwog6DK1zPW',
          name: 'Community Food Pantry',
          phone: '408-EAT-FOOD',
        },
        { id: 2, 
          email: 'soup@kitchen.org', // password "soup"
          password: '$2y$12$0b09NnkOnBrpGVaCfjsI6eaWav3kpc0Tg/p.pmHH0ZbZD2EqHhdx.',
          name: 'Bowl of Goodness',
          phone: '555-BOWL',
        },
        { id: 3, 
          email: 'bike@couriers.com', // password "bike"
          password: '$2y$12$hD6OQfBZvE3GcMXwrOM38O46ukaUhO7sEHFV.UbZXPVpgkMBFsMdm',
          name: 'Free food bike couriers',
          phone: '333-333-3333',
        },
        { id: 4, 
          email: 'bill@truck.com', // password "truck"
          password: '$2y$12$hD6OQfBZvE3GcMXwrOM38O46ukaUhO7sEHFV.UbZXPVpgkMBFsMdm',
          name: 'Bill (with the big truck)',
          phone: '555-1234',
        },
        { id: 5, 
          email: 'covert@foodnotbombs.org', // password "nobombs"
          password: '$2y$12$TTofg2cLNNGyZry5oIbjRelGJR/oTkUO0fVZOPkkkL0jFWC7xNcwe',
          name: 'Anonymous',
          phone: '000-000-0000',
        },
      ]);
    });
};
