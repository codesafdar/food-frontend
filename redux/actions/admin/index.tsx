import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICategoryInput } from "@/pages/admin/add-category";
import { InputFields } from "@/pages/admin/add-option";

// category

export const addCategory = createAsyncThunk(
  'category/add', async (data: ICategoryInput, thunkAPI) => {
    try {
      const { isUpdate, category, _id } = data
      let res
      if (isUpdate) {
        res = await axios.put(`http://localhost:3333/category/${_id}`, { category })
      } else {
        res = await axios.post('http://localhost:3333/category/add', data)
      }

      if (res.status === 201 || res.status === 200) return data
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
      const response = await axios('http://localhost:3333/category/getall')
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
      const res = await axios.delete(`http://localhost:3333/category/${id}`)
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

export const addOption = createAsyncThunk(
  'option/add', async (data: InputFields, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:3333/options/create', data)
      if(res.status === 201) return res.data
      else return thunkAPI.rejectWithValue(data)
    }
    catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message)
    }
    finally {

    }
  }
)