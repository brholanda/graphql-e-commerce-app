updateEntity = (id, payload, list) => {
    let entity = null;
    const index = list.findIndex(entity => entity.id === id);
    if (index !== -1) {
        entity = {
            ...list[index],
            ...payload
        }
        list[index] = entity;
    }
    return entity;
}

exports.GeneralFunctions = {
    updateEntity,
}