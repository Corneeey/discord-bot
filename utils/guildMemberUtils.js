const { roleName, namePostfix } = require('../config.json');

const updateGuildNames = (guild) => {
    guild.members.fetch()
    .then((members) => members.forEach(member => updateName(member)))
    .catch(console.log)
}

// Tries To Update The Name Of A Member
const updateName = (member) => {
    // Checks If The Member Already Has A Valid Name
    if (validName(member)) return;

    // Checks If The Members Name Can Be Edited
    if (!isEditable(member)) return;

    // Updates The Nickname
    member.setNickname(member.displayName + namePostfix);
}

// Checks If The Nickname Is Valid
const validName = (member) => member.displayName.endsWith(namePostfix);

// Checks If A Member Can Be Edited (e.g Nickname)
const isEditable = (member) => {
    // Gets The Highest Roles Of The Member And The Bot
    const highestBotRole = member.guild.members.me.roles.highest;
    const highestMemberRole = member.roles.highest;

    // Compares The Roles
    const comparison = highestBotRole.comparePositionTo(highestMemberRole);

    // Returns Whether The Member Can Be Edited By The Bot
    return (comparison >= 0 && !isOwner(member));
}

// Checks If A Member Is The Server Owner
const isOwner = (member) => member.id === member.guild.ownerId;

// Updates Roles Of All Members In The Guild
const updateGuildRoles = (guild) => { 
    // Gets All Guild Members  
    guild.members.fetch()
    // Updates The Roles Of Eeach Member
    .then((members) => members.forEach(member => updateRole(member)))
    // Logs Any Errors
    .catch(console.log);
}


// Tries To Update The Roles Of A Member.
const updateRole = (member) => {
    // Checks If The Member Already Has The Role
    if (hasRole(member)) return;

    // Gets The Role From The Server
    const role = member.guild.roles.cache.find(r => r.name === roleName);

    // Adds The Role To The Member
    member.roles.add(role);
}

// Checks Whether The Member Has The Role Defined In The Config File
const hasRole = (member) => member.roles.cache.some(role => role.name === roleName);

// Exports The Functions For Other Scripts To Use
module.exports = {
    updateName,
    updateRole,
    updateGuildRoles,
    updateGuildNames
}