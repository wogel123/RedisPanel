const permissions = {};
const ranks = {
    'user': {
        power: 0
    },
    'admin': {
        power: 10
    }
};

permissions.isAllowed = (needed, rank) => {
    if (rank === undefined) rank = 'user';
    if (needed === undefined) needed = 'user';
    return ranks[rank].power >= ranks[needed].power;
}


export default permissions;