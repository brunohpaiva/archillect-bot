module.exports = guild =>
  guild.channels.find(
    channel => channel.type === 'text' && channel.name === 'archillect'
  );
