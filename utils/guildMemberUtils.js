const updateName = (member) => {
    if (validName(member)) return;

    member.setNickname(member.displayName + '™');
}

const validName = (member) => member.displayName.endsWith('™');

module.exports = {
    updateName
}