import { createSlice } from "@reduxjs/toolkit";
import { IOptionType, InputFields } from "@/components/admin/OptionsAdmin";
import { addCategory, getCategories, deleteCategory, updateCategory, addOption, getOptions, deleteOption, updateOption, addProduct, getAllProducts, deleteProduct, updateProduct, adminLogin, createAdminAction, getAllUsers, deleteAdmin, updateAdmin } from "@/redux/actions";
import { ICategoryInput } from "@/components/admin/Categories";
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
  successMessage: string
  errormessage: string | undefined
  productList: IFormInput[]
  isShowModal: IShowModal
  getOneProductData: IFormInput
  adminData: adminData
  users: []
}

export interface adminData {
  access_token: string
  refresh_token: string
  email: string
  fName: string
  lName: string
  role: string
  _id: string
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
  successMessage: '',
  errormessage: '',
  productList: [],
  isShowModal: {
    isShow: false,
    showImage: '',
    id: ''
  },
  getOneProductData: initialValues,
  adminData: {
    access_token: '',
    refresh_token: '',
    email: '',
    fName: '',
    lName: '',
    role: '',
    _id: '',
  },
  users: []
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {

    resetToast: state => {
      state.isError = false
      state.isSuccess = false
      state.successMessage = ''
      console.log("🚀 ~ state.successMessage:resettaost>>>>>>>>", state.isSuccess)
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
    },
    removeToken: (state) => {
      state.adminData.access_token = ''
    },
    setUsers:(state, {payload})=>{
5
    }

  },
  extraReducers: (builder) => {
    builder

      // add category
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
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
        state.isSuccess = false
        state.isError = false
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
        state.isError = false
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isSuccess = true
        state.successMessage = 'Deleted successfully'
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

      // get all
      .addCase(getOptions.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
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
        state.isSuccess = false
        state.isError = false
      })
      .addCase(deleteOption.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = 'Deleted successfully'
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

      // products


      // add product
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
        state.isSuccess = false
        state.isError = false
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

      // admin login
      .addCase(adminLogin.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = 'Logged in successfully'
        state.adminData = payload
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })



      // create admin
      .addCase(createAdminAction.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(createAdminAction.fulfilled, state => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = 'Admin created successfully'
      })
      .addCase(createAdminAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })

      // get all users
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.users = payload
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.errormessage = payload as string
      })

      // delete admin
      .addCase(deleteAdmin.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAdmin.fulfilled, state => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = 'User deleted successfully'
      })
      .addCase(deleteAdmin.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.errormessage = payload as string
      })

      // update admin
      .addCase(updateAdmin.pending, state => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(updateAdmin.fulfilled, state => {
        state.isLoading = false
        state.isSuccess = true
        console.log("🚀 ~ state.isSuccess:", state.isSuccess)
        state.successMessage = 'User updated successfully'
      })
      .addCase(updateAdmin.rejected, (state, { payload }) => {
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
  removeToken
} = actions

export default reducer