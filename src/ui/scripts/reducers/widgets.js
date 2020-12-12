import produce from 'immer'

import {
	SET_WIDGETS_START,
	SET_WIDGETS_END,
	SET_WIDGETS_FETCHING,
	SET_WIDGETS_ERROR
} from '../actions'

export const initialState = () => ({
	value: {}
})

export const initialSubState = () => ({
	value: undefined,
	Renderer: () => null,
	variables: {},
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_WIDGETS_START:
			// Initialize when id is unknown
			draft.value[action.id] = draft.value[action.id] || initialSubState()
			// Reuse existing value when available
			const value = draft.value[action.id].value == null ? action.value : draft.value[action.id].value
			draft.value[action.id].value = value
			// Set remaining data
			draft.value[action.id].Renderer = action.Renderer
			draft.value[action.id].variables = action.variables
			draft.value[action.id].fetching = true
			break
		case SET_WIDGETS_END:
			draft.value[action.id].value = action.value
			draft.value[action.id].fetching = false
			break
		case SET_WIDGETS_FETCHING:
			draft.value[action.id].fetching = action.payload || initialSubState().fetching
			break
		case SET_WIDGETS_ERROR:
			draft.value[action.id].error = action.payload || initialSubState().error
			break
	}

}, initialState())