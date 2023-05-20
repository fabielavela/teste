const { response } = require('express');
const tasksModel = require('../models/tasksModel');

const getAll = async (request, response) => {

    const tasks = await tasksModel.getAll();

    return response.status(200).json(tasks);
};

const createRamal = async (request,response) => {
    const createdRamal = await tasksModel.createRamal(request.body);
    return response.status(201).json(createdRamal);
}

const deleteRamal = async (request, response) => {
    const { id } = request.params;

    await tasksModel.deleteRamal(id);
    return response.status(204).json();
};

const updatedRamal = async (request, response) => {
    const { id } = request.params;

    await tasksModel.updateRamal(id, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createRamal,
    deleteRamal,
    updatedRamal
};