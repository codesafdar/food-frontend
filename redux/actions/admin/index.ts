import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategoryInput } from "@/components/admin/Categories";
import { InputFields } from "@/components/admin/OptionsAdmin";
import { IFormInput } from "@/components/admin/Form";
import { IAdminLogin } from "@/app/auth/admin-login/page";
import { ICreateAdmin } from "@/components/admin/CreateAdmin";
import axiosInstance from "@/services/axiosInterceptorInstance";

// category
export const addCategory = createAsyncThunk(
  'category/add', async (data: ICategoryInput, thunkAPI) => {
    console.log("🚀 ~ 'category/add', ~ data:", data)
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}category/add`, data)
      const status = res?.status
      if (status === 201) {
        await thunkAPI.dispatch(getCategories())
        return res.data
      }
      else return thunkAPI.rejectWithValue(res.data)
    } catch (err) {
      console.log('err`', err)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// get
export const getCategories = createAsyncThunk(
  'category/getAll', async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}category/getall`)
      if (response?.status === 200) {
        return response?.data
      }
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

// delete
export const deleteCategory = createAsyncThunk(
  'category/delete', async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}category/${id}`)
      if (res.status === 200) return res.data
      else return thunkAPI.rejectWithValue('Something went wrong, try again')
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)


//  update
export const updateCategory = createAsyncThunk(
  'category/update', async (data: ICategoryInput, thunkAPI) => {
    try {
      const { _id, ...result } = data
      const res = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}category/${_id}`, result)
      if (res.status === 200) {
        await thunkAPI.dispatch(getCategories())
        return res.data
      }
      else thunkAPI.rejectWithValue(data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// option
// add option
export const addOption = createAsyncThunk(
  'option/add', async (data: InputFields, thunkAPI) => {
    try {
      const { optionData } = data
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}options/create`, optionData)
      if (res.status === 201) {
        await thunkAPI.dispatch(getOptions())
        return res.data
      }
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)
// get options
export const getOptions = createAsyncThunk(
  'option/get', async (args, thunkAPI) => {
    try {
      const res = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}options/getAll`)
      if (res.status === 200) return res.data
      else thunkAPI.rejectWithValue('Something went wrong')
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)
// delete option
export const deleteOption = createAsyncThunk(
  'option/delete', async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}options/delete/${id}`)
      if (res.status === 200) return res.data
      else return thunkAPI.rejectWithValue(id)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// update option
export const updateOption = createAsyncThunk(
  'option/update', async (data: InputFields, thunkAPI) => {
    try {
      const { optionData } = data
      const res = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}options/${optionData?._id}`, optionData)
      const responseData = res.data
      if (res.status = 200) {
        await thunkAPI.dispatch(getOptions())
        return responseData
      } else return thunkAPI.rejectWithValue(responseData)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)


// product
// add product
export const addProduct = createAsyncThunk(
  'product/add', async (data: IFormInput, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}product/create`, data)
      if (res.status === 201) return res.data
      else return thunkAPI.rejectWithValue(res.data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)


// getall products
export const getAllProducts = createAsyncThunk(
  'product/get', async (args, thunkAPI) => {
    try {
      const get = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}product/getall`)

      if (get.status === 200) return get.data
      else return thunkAPI.rejectWithValue(get.data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// delete product
export const deleteProduct = createAsyncThunk(
  'product/delete', async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}product/${id}`)
      if (res.status === 200) return res.data
      else return thunkAPI.rejectWithValue(res.data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// update product
export const updateProduct = createAsyncThunk(
  'product/update', async (data: any, thunkAPI) => {
    try {
      const id = data.get('id')
      const update = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}product/${id}`, data)

      if (update.status === 200) {
        await thunkAPI.dispatch(getAllProducts())
        return update.data
      } else return thunkAPI.rejectWithValue(id)

    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)

    }
  }
)

// ADMIN Login
export const adminLogin = createAsyncThunk(
  'admin/login', async (data: IAdminLogin, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}admin/login`, { username: data.email, password: data.password })

      if (res.status === 201) {
        const data = res.data
        localStorage.setItem('access_token', (data.access_token))
        localStorage.setItem('refresh_token', (data.refresh_token))
        localStorage.setItem('role', (data.role))
        return data
      }
      else return thunkAPI.rejectWithValue('Went something wrong')
    }
    catch (err: any) {
      if (err.response.data.message) return thunkAPI.rejectWithValue(err.response.data.message)
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// create admin
export const createAdminAction = createAsyncThunk(
  'createAdmin', async (data: ICreateAdmin, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}admin/create-admin`, data)
      if (response.status === 201) {
        return response.data
      }
      return thunkAPI.rejectWithValue('Went something wrong')

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

// getall products
export const getAllUsers = createAsyncThunk(
  'users/get', async (args, thunkAPI) => {
    try {
      const get = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}admin/get-users`)
      if (get.status === 200) return get.data
      else return thunkAPI.rejectWithValue(get.data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// delete admin
export const deleteAdmin = createAsyncThunk(
  'admin/delete', async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}admin/${id}`)
      if (res.status === 200) {
        await thunkAPI.dispatch(getAllUsers())
        return res.data
      }
      else return thunkAPI.rejectWithValue(res.data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// update admin role
export const updateAdmin = createAsyncThunk(
  'admin/role', async (data: ICreateAdmin, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}admin/${data?._id}`, data)
      if (res.status === 200) {
        await thunkAPI.dispatch(getAllUsers())
        return res.data
      }
      else return thunkAPI.rejectWithValue(res.data)
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)