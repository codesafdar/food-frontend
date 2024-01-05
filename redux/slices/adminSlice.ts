import { createSlice } from "@reduxjs/toolkit";
import { IOptionType, InputFields } from "@/pages/admin/add-option";
import { addCategory, getCategories, deleteCategory, updateCategory, addOption, getOptions, deleteOption, updateOption, addProduct, getAllProducts, deleteProduct, updateProduct } from "@/redux/actions";
import { ICategoryInput } from "@/pages/admin/add-category";
import { IFormInput, initialValues } from "@/components/admin/Form";

// interfaces
export interface IproductOptionData {
  optionType: IOptionType
  itemPrice: number
  itemName: string
}

interface IShowModal {
  isShow: boolean
  id: string
  showImage: string
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
  productList: IFormInput[]
  isShowModal: IShowModal
  getOneProductData: IFormInput
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
  productList: [],
  isShowModal: {
    isShow: false,
    showImage: '',
    id: ''
  },
  getOneProductData: initialValues
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {

    resetToast: state => {
      state.isError = false
      state.isSuccess = false
      state.errormessage = ''
    },

    setOptions: (state, { payload }) => {
      state.productOptionData.push(payload)
    },

    resetOptionData: state => {
      state.productOptionData = []
    },

    deleteProductOption: (state, action) => {
      state.productOptionData.splice(action.payload, 1)
    },

    setIsShowModal: (state, { payload }) => {
      state.isShowModal = payload
    },

    setProductData: (state, { payload }) => {
      state.getOneProductData = payload
      state.productOptionData = payload.optionsList
    }
  },
  extraReducers: (builder) => {
    builder

      // add category
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false
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
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.categoryList = payload
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isSuccess = false
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isSuccess = true
        state.isLoading = false
        state.categoryList = state.categoryList.filter((item) => item._id !== payload?._id)
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.editedCat = payload
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // option
      // add 
      .addCase(addOption.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(addOption.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.optionsList.push(payload)
      })
      .addCase(addOption.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // get
      .addCase(getOptions.pending, state => {
        state.isLoading = true
      })
      .addCase(getOptions.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.optionsList = payload
      })
      .addCase(getOptions.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // delete option
      .addCase(deleteOption.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteOption.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.optionsList = state.optionsList.filter((item) => item._id !== payload._id)
      })
      .addCase(deleteOption.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })

      // update
      .addCase(updateOption.pending, state => {
        state.isLoading = true
      })
      .addCase(updateOption.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateOption.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // product
      // add
      .addCase(addProduct.pending, state => {
        state.isLoading = true
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.productList.push(payload)
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })

      // get products
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.productList = payload
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // delete product
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const index = state.productList.findIndex((item) => item._id === payload._id)
        state.productList.splice(index, 1)
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })

      // update product 
      .addCase(updateProduct.pending, state => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, state => {
        state.isLoading = false
        state.isSuccess = true
        state.getOneProductData = initialValues
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })
  },
})

const { actions, reducer } = adminSlice
export const {
  setOptions,
  resetOptionData,
  deleteProductOption,
  resetToast,
  setIsShowModal,
  setProductData,
} = actions

export default reducer