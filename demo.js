const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://kobinaotchereadjoku_db_user:Mummyawo12345@cluster0.lq4e0uf.mongodb.net/?appName=Cluster0"
  const client = new MongoClient(uri);
  try {
    await client.connect();

    // await createMovie(client, {
    //   title: "The Matrix",
    //   cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    //   info: {
    //     directors: ["Lana Wachowski", "Lilly Wachowski"],
    //     yearReleased: 1999
    //   }
    // });

    // await createMultipleMovies(client, [
    //   {
    //     title: "Inception",
    //     cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    //     info: {
    //       directors: ["Christopher Nolan"],
    //       yearReleased: 2010
    //     }
    //   },
    //   {
    //     title: "Interstellar",
    //     cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    //     info: {
    //       directors: ["Christopher Nolan"],
    //       yearReleased: 2014
    //     }
    //   }
    // ]);

    // await findOneMovie(client, "The Matrix");
    // await findAllMovies(client, { title: "The Matrix" });

    // await updateMovieByName(client, "Inception", { info: { yearReleased: 1999, directors: ["Lana Wachowski", "Lilly Wachowski"] } });

      // await upsertMovie(client, "The Matrix", { info: { yearReleased: 1999, directors: ["Lana Wachowski", "Lilly Wachowski"] } });
      // await updateAllMoviesToHaveRating(client, 5);

    // await listDatabases(client);

    // await deleteMovieByName(client, "The Matrix");
      await deleteMovieReleasedBeforeDate(client, new Date("1903"));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
async function deleteMovieReleasedBeforeDate(client, date) {
  const result = await client.db("sample_mflix").collection("movies").deleteMany({ "info.yearReleased": { $lt: date } });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteMovieByName(client, nameOfMovie) {
  const result = await client.db("sample_mflix").collection("movies").deleteOne({ title: nameOfMovie });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function updateAllMoviesToHaveRating(client, rating) {
  const result = await client.db("sample_mflix").collection("movies").updateMany({}, { $set: { "info.rating": rating } });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertMovie(client, nameOfMovie, updatedMovie) {
  const result = await client.db("sample_mflix").collection("movies").updateOne({ title: nameOfMovie }, { $set: updatedMovie }, { upsert: true });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  if (result.upsertedCount > 0) {
    console.log(`One document was inserted with the id ${result.upsertedId._id}`);
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}

async function updateMovieByName(client, nameOfMovie, updatedMovie) {
  const result = await client.db("sample_mflix").collection("movies").updateOne({ title: nameOfMovie }, { $set: updatedMovie });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}
async function findAllMovies(client, query = {}) {
  const cursor = client.db("sample_mflix").collection("movies").find(query);
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found listing(s) in the collection with the query '${JSON.stringify(query)}':`);
    results.forEach((result, i) => {
      console.log();
      console.log(`${i + 1}. title: ${result.title}`);
      console.log(`   _id: ${result._id}`);
    });
  } else {
    console.log(`No listings found with the query '${JSON.stringify(query)}'`);
  }
}

async function findOneMovie(client, movieTitle) {
  const result = await client.db("sample_mflix").collection("movies").findOne({ title: movieTitle });
  if (result) {
    console.log(`Found a listing in the collection with the title '${movieTitle}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the title '${movieTitle}'`);
  }
}

async function createMovie(client, newMovie) {
  const result = await client.db("sample_mflix").collection("movies").insertOne(newMovie)
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createMultipleMovies(client, newMovies) {
  const result = await client.db("sample_mflix").collection("movies").insertMany(newMovies)
  console.log(`${result.insertedCount} new listings created with the following ids: ${result.insertedIds}`);
  console.log(result.insertedIds);
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};