import { createSlice, current } from "@reduxjs/toolkit";
import { InputFields } from "@/pages/admin/add-option";

// interfaces
interface EditedCategory {
  item: string
  id?: number
}

interface AdminData {
  title?: string
  categoryList: any[]
  editedCat: EditedCategory | null
  optionsList: any[]
  editedOption: InputFields | null
}

const initialState: AdminData = {
  categoryList: [],
  editedCat: null,
  optionsList: [],
  editedOption: null
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCategoryList: (state, { payload }) => {
      const { category, id } = payload;
      const itemsList = [...state.categoryList]
      if ('id' in payload && id !== undefined && id >= 0 && id < itemsList.length) {
        itemsList.splice(id, 1, category)
      } else {
        itemsList.push(category)
      }
      return { ...state, categoryList: itemsList };
    },
    deleteCategory: (state, action) => { state.categoryList.splice(action.payload, 1) },
    editCategory: (state, action) => {
      const index = action.payload;
      const list = [...state.categoryList]
      const item = list[index];
      state.editedCat = { item, id: action.payload }
    },
    setOptions: (state, { payload }) => {
      const id = payload.id
      if ('id' in payload && id !== undefined) {
        state.optionsList.splice(id, 1, payload)
      } else {
        state.optionsList.push(payload)
      }
    },
    deleteOption: (state, action) => { state.optionsList.splice(action.payload, 1) },
    editOption: (state, { payload }) => {
      const list = [...state.optionsList]
      const id = payload.id
      const item = list[id]
      state.editedOption = { ...item, id }
    }
  }
})
const { actions, reducer } = adminSlice
export const { 
  setCategoryList,
  deleteCategory,
  editCategory,
  setOptions,
  deleteOption,
  editOption
} = actions

export default reducer