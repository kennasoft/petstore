import constants from './constants';
import axios from 'axios';

export const findPet = (id) => {
    return {
        type: constants.FIND_PET,
        payload: axios.get(`${constants.PET_API_URL}/pet/${id}`)
    }
}

export const createPet = (pet) => {
    return {
        type: constants.CREATE_PET,
        payload: axios.post(`${constants.PET_API_URL}/pet`, pet)
    }
}

export const updatePet = (pet) => {
    return {
        type: constants.UPDATE_PET,
        payload: axios.put(`${constants.PET_API_URL}/pet`, pet)
    }
}

export const deletePet = (id) => {
    return {
        type: constants.DELETE_PET,
        payload: axios.delete(`${constants.PET_API_URL}/pet/${id}`)
    }
}

export const listCategories = () => {
    return {
        type: constants.FETCH_CATEGORIES,
        payload: axios.get(`${constants.PET_API_URL}/categories`)
    }
}

export const editPet = (pet) => {
    return {
        type: constants.EDIT_PET,
        payload: pet
    }
}

export default {
    findPet,
    createPet,
    deletePet,
    listCategories,
    editPet,
    updatePet
}