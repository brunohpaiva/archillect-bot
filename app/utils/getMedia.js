module.exports = tweet =>
  tweet.extended_entities
    ? tweet.extended_entities.media[0]
    : tweet.entities.media[0];
