function decorateNewEntity(entity, context, currentTime = new Date()) {
    return {
        ...entity,
        createdBy: context.identity,
        createdDatetime: currentTime,
        lastModifiedBy: context.identity,
        lastModifiedDatetime: currentTime,
        clientId: context.client.id
    };
}

function decorateModifiedEntity(entity, context, currentTime = new Date()) {
    return {
        ...entity,
        lastModifiedBy: context.identity,
        lastModifiedDatetime: currentTime
    };
}

function removeReadonlyProperties(entity) {
    const {
        _id,
        ...modifiableProperties
    } = entity;
    return modifiableProperties
}

module.exports = {
    insertOne: function (collection, entity, context) {
        return collection.insertOne(decorateNewEntity(entity, context));
    },
    patchOne: function (collection, filter, entity, context) {
        const dto = decorateModifiedEntity(entity, context);
        const modifiableProperties = removeReadonlyProperties(dto);
        return collection.updateOne(filter, {
            $set: modifiableProperties
        });
    },
    updateOne: function (collection, filter, entity, context) {
        const dto = decorateModifiedEntity(entity, context);
        const modifiableProperties = removeReadonlyProperties(dto);
        return collection.replaceOne(filter, {
            $set: modifiableProperties
        });
    }
};