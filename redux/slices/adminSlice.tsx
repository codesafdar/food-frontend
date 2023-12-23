import { createSlice } from "@reduxjs/toolkit";
import { InputFields } from "@/pages/admin/add-option";
import { addCategory, getCategories, deleteCategory, updateCategory, addOption } from "@/redux/actions";
import { ICategoryInput } from "@/pages/admin/add-category";


// interfaces
export interface IproductOptionData {
  optionType: string
  itemPrice: number
  itemName: string
}

export interface IAdminData {
  title?: string
  categoryList: any[]
  editedCat: ICategoryInput | null | undefined
  optionsList: any[]
  editedOption: InputFields | null
  productOptionData: IproductOptionData[]
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  errormessage: string | undefined
}

const initialState: IAdminData = {
  categoryList: [],
  editedCat: null,
  optionsList: [],
  editedOption: null,
  productOptionData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errormessage: '',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {

    resetError: state => {
      console.log('.....>>>>>>>RRrRRR>>>>>>>')
     state.isError = false
     state.errormessage = ''
    },
    editCategory: (state, { payload }) => {
      const id = payload._id
      const itemsList = [...state.categoryList]

      const index = itemsList.findIndex((item) => item._id === id)
      if (index !== -1) {
        state.editedCat = payload

      }
      // const list = [...state.categoryList]
      // const item = list[index];
      // state.categoryList = itemsList
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
    },

    // addOption: (state, { payload }) => {
    //   state.productOptionData.push(payload)
    // },
    deleteProductOption: (state, action) => {
      state.productOptionData.splice(action.payload, 1)
    }
  },
  extraReducers: (builder) => {
    builder

      // add category
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        if (payload.isUpdate) {
          const index = state.categoryList.findIndex((item) => item._id === payload._id)
          if (index) state.categoryList.splice(index, 1, payload)
        } else state.categoryList.push(payload)

        let updateCatValue = {
          ...state.editedCat,
          isUpdate: false
        }
        state.editedCat = updateCatValue
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = action?.error?.message
      })

      // get all categories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categoryList = action.payload
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // delete category
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isSuccess = true
        state.isLoading = false
        state.categoryList = state.categoryList.filter((item) => item._id !== payload?._id)
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // update category
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.editedCat = payload
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // option
      .addCase(addOption.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.optionsList.push(payload)
      })
      .addCase(addOption.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addOption.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

  },
})

const { actions, reducer } = adminSlice
export const {
  editCategory,
  setOptions,
  deleteOption,
  editOption,
  deleteProductOption,
  resetError
} = actions

export default reducer