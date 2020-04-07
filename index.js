const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/recipe.model.js');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({title: 'Curry', cuisine: 'Indian'})
    Recipe.insertMany(data).then((recipesFromDatabase) => {
      Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        .then(() => { })
      Recipe.findOneAndDelete({ title: "Carrot Cake" }).then(() => {
      
        mongoose.connection.close()
      })
      console.log(recipesFromDatabase)
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


