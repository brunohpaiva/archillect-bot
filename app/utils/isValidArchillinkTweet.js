module.exports = (archillinkTweet, archillectTweet) =>
  archillinkTweet.in_reply_to_status_id_str === archillectTweet.id_str &&
  archillinkTweet.quoted_status_id_str === archillectTweet.id_str;
