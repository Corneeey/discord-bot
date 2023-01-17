const { roleName, namePostfix } = require('../config.json');

// Tries To Update Names Of All Members In A Guild.
// Returns A Promise Resolving Into An Object With The
// Amount Of Updated Roles And An Array Of All The Members
// That Couldn't Be Changed.
async function updateGuildNames(guild) {
    // Creates And Returns The Promise
    return new Promise(function(resolve, reject) {
        // Stores The Amount Of Roles Updated
        let updatedRoles = 0;
        // Stores The Members That Couldn't Be Updated
        const inaccessibleMembers = [];

        // Gets All Members
        guild.members.fetch()
        .then(members => {
            // Goes Through Each Member
            members.forEach(member => {
                // Tries To Update The Name And Stores The Result
                let result = updateName(member);

                // Increases Count On Success
                if (result === true)
                    updatedRoles++;
                // Adds Member To Array On Failure
                else if (result === member)
                    inaccessibleMembers.push(member);
            });

            // Resolves The Promise By Returning Object With Count And Array
            resolve({updated: updatedRoles, inaccessible: inaccessibleMembers});
        })
        // Catches The Error
        .catch(error => reject(error))
    });
}

// Tries To Update The Name Of A Member
// Returns FALSE, If The Member Already Has A Valid Name.
// Returns TRUE, If The Member Was Updated.
// Returns The Member, If They Couldn't Be Updated.
function updateName(member) {
    // Checks If The Member Already Has A Valid Name
    if (validName(member)) return false;

    // Checks If The Members Name Can Be Edited
    if (!isEditable(member)) return member;

    // Updates The Nickname
    member.setNickname(member.displayName + namePostfix);

    // Returns The Fact That The Name Was Updated
    return true;
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
    // Creates And Returns The Promise
    return new Promise(function(resolve, reject) {
        // Stores The Amount Of Members Updated
        let updatedRoles = 0;

        // Gets All Guild Members  
        guild.members.fetch()
        
        .then((members) => {
            // Updates The Roles Of Eeach Member And Counts The Amount Of Updates
            members.forEach(member => updatedRoles += updateRole(member));

            // Resolves The Promise
            resolve(updatedRoles);
        })
        // Logs Any Errors
        .catch(error => reject(error));
    });
}


// Tries To Update The Roles Of A Member.
// Returns Whether The Role Was Updated.
function updateRole(member) {
    // Checks If The Member Already Has The Role
    if (hasRole(member)) return false;

    // Gets The Role From The Server
    const role = member.guild.roles.cache.find(r => r.name === roleName);

    // Adds The Role To The Member
    member.roles.add(role);

    // Returns The Fact That The Role Was Updated
    return true;
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