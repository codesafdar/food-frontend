import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategoryInput } from "@/pages/admin/add-category";
import { InputFields } from "@/pages/admin/add-option";
import axios from "axios";
import { IFormInput } from "@/components/admin/Form";
import useSWR from 'swr'


// category

export const addCategory = createAsyncThunk(
  'category/add', async (data: ICategoryInput, thunkAPI) => {
    try {
      const { isUpdate, category, _id } = data
      let res
      if (isUpdate) {
        res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}category/${_id}`, { category })
      } else {
        res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}category/add`, data)
      }

      if (res.status === 201 || res.status === 200) return res.data
      else return thunkAPI.rejectWithValue(category)
    } catch (err) {
      console.log('err,err', err)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// get
export const getCategories = createAsyncThunk(
  'category/getAll', async (arg, thunkAPI) => {
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}category/getall`)
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
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}category/${id}`)
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
      if (data) return data
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}options/create`, optionData)
      if (res.status === 201) {
        thunkAPI.dispatch(getOptions())
        return res.data
      }
      else return thunkAPI.rejectWithValue(data)
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
      const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}options/getAll`)
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
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}options/delete/${id}`)
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
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}options/${optionData?._id}`, optionData)
      const responseData = res.data
      if (res.status = 200) {
        thunkAPI.dispatch(getOptions())
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}product/create`, data)
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
      const get = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}product/getall`)

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
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}product/${id}`)
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

      const update = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}product/${id}`, data)

      if (update.status === 200) {
        thunkAPI.dispatch(getAllProducts())
        return update.data
      } else return thunkAPI.rejectWithValue(id)
      
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message)

    }
  }
)