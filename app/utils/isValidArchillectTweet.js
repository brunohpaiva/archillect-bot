module.exports = tweet =>
  (tweet.extended_entities || tweet.entities) &&
  (tweet.extended_entities.media.length === 1 || tweet.entities.media.length === 1) &&
  !tweet.is_quote_status &&
  !tweet.in_reply_to_status_id_str &&
  !tweet.retweeted_status;
