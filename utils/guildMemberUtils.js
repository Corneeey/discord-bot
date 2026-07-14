const { roleName, namePostfix } = require('../config.json');

// Tries To Update Names Of All Members In A Guild.
// Returns An Object With The Amount Of Updated Names
// And An Array Of All The Members That Couldn't Be Changed.
async function updateGuildNames(guild) {
    let updatedRoles = 0;
    const inaccessibleMembers = [];

    const members = await guild.members.fetch();

    // Process members sequentially to avoid blasting the API
    for (const member of members.values()) {
        const result = await updateName(member);
        if (result === true) {
            updatedRoles++;
        } else if (result === member) {
            inaccessibleMembers.push(member);
        }
    }

    return { updated: updatedRoles, inaccessible: inaccessibleMembers };
}

// Tries To Update The Name Of A Member
// Returns FALSE, If The Member Already Has A Valid Name.
// Returns TRUE, If The Member Was Updated.
// Returns The Member, If They Couldn't Be Updated.
async function updateName(member) {
    // Checks If The Member Already Has A Valid Name
    if (validName(member)) return false;

    // Checks If The Members Name Can Be Edited
    if (!isEditable(member)) return member;

    // Try to update the nickname and handle failures
    try {
        await member.setNickname(member.displayName + namePostfix);
        return true;
    } catch (err) {
        return member;
    }
}

// Checks If A Member Has A Valid Nickname
function validName(member) {
    return member.displayName.endsWith(namePostfix);
}

// Checks If A Member Can Be Edited (e.g Nickname)
function isEditable(member) {
    // Gets The Highest Roles Of The Member And The Bot
    const highestBotRole = member.guild.members.me.roles.highest;
    const highestMemberRole = member.roles.highest;

    // Compares The Roles
    const comparison = highestBotRole.comparePositionTo(highestMemberRole);

    // Returns Whether The Member Can Be Edited By The Bot
    return (comparison >= 0 && !isOwner(member));
}

// Checks If A Member Is The Server Owner
function isOwner(member) {
    return member.id === member.guild.ownerId;
}

// Updates Roles Of All Members In A Guild.
// Returns Promise Resolving Into Amount Of Updated Roles.
async function updateGuildRoles(guild) {
    let updatedRoles = 0;

    const members = await guild.members.fetch();

    // Process sequentially to avoid hitting rate limits
    for (const member of members.values()) {
        try {
            const updated = await updateRole(member);
            if (updated) updatedRoles++;
        } catch (err) {
            // ignore individual failures and continue
        }
    }

    return updatedRoles;
}


// Tries To Update The Roles Of A Member.
// Returns Whether The Role Was Updated.
async function updateRole(member) {
    // Checks If The Member Already Has The Role
    if (hasRole(member)) return false;

    // Gets The Role From The Server
    const role = member.guild.roles.cache.find(r => r.name === roleName);
    if (!role) return false;

    try {
        await member.roles.add(role);
        return true;
    } catch (err) {
        return false;
    }
}

// Checks Whether The Member Has The Role Defined In The Config File
function hasRole(member) {
    return member.roles.cache.some(role => role.name === roleName);
}

// Exports The Functions For Other Scripts To Use
module.exports = {
    updateName,
    updateRole,
    updateGuildRoles,
    updateGuildNames
}