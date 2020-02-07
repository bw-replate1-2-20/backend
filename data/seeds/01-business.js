
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Business').del()
    .then(function () {
      // Inserts seed entries
      return knex('Business').insert([

        { id: 1,
          email: 'jim@subway.com', // password "subway"
          password: '$2y$12$ltTPMlLwtgLkOkEVn7Q1ieK.oMn/aiXJvoaCfN54091yYSJ0LWbYe',
          name: 'Subway',
          address: 'Underground. Where the trains are.',
          description: '$5 footlongs.',
          phone: '+1 212 555 8477',
        },

        { id: 2,
          email: 'owner@laughingplanet.com', // password "planet"
          password: '$2y$12$v.Eso1/FDCF5O/ZR0lJtYeZshb8LtjSwp.Ru4g1SFJN5WedvTKdd2',
          name: 'Laughing Planet',
          address: '701 Blair Ave, Eugene, OR 97402',
          description: 'Burritos and Bowls. And dinosaurs.',
          phone: '541-555-1234',
        },

        { id: 3,
          email: 'manager@costco.com', // password "bulk"
          password: '$2y$12$i8qHyGzlmnqoiztW2A7JHOs3Rzlr1.NqmTSF9Eky9rmKmIty832x6',
          name: 'Costco Wholesale',
          address: '123 Lots of Stuff Blvd',
          description: 'A bunch of stuff you want, but way too much of it.',
          phone: '(888) 555-8181',
        },

        { id: 4,
          email: 'food@safeway.com', // password "safe"
          password: '$2y$12$578L/1aEW9Lnp7Qql.rBdOBpS4gp8.XcDDbDWNqOhEAmqn9Yc468W',
          name: 'Safeway',
          address: '456 Safe Way #6',
          description: 'Grocery Store',
          phone: '800-201-2001 ext. 201',
        },

        { id: 5,
          email: 'fox@anchor.se', // password "fox"
          password: '$2y$12$R0J0vVxJHdtF4T07RL0WoOYAhnNBsAeOxrzRpDFZu7ZWxdgb1xzfe',
          name: 'The Fox and Anchor',
          address: 'Konstapelsgatan 26, 371-35 Karlskrona',
          description: 'Pub and buffet',
          phone: '+46 (0)768 613 788',
        },

      ]);
    });
};
