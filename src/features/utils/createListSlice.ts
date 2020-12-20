import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AppThunk } from '../../app/store';
import { newDto } from '../../dtos/newDto';
import { AbstractControl } from '../../services/AbstractControl';
import { Filter } from '../../types/Filter';

interface ListState<T> {
  list: T[];
  error: null | string;
  loading: boolean;
  modal: {
    opened: boolean;
    formData: T | null;
    loading: boolean;
  };
}

export const createListSlice = <T>(
  name: string,
  control: AbstractControl<T>
): any => {
  const initialState: ListState<T> = {
    list: [],
    error: null,
    loading: false,
    modal: {
      opened: false,
      formData: null,
      loading: false,
    },
  };

  const listSlice = createSlice({
    name,
    initialState,
    reducers: {
      fetchStart: (state) => {
        state.loading = true;
        state.list = [];
        state.error = null;
      },
      fetchSuccess: (state, action: PayloadAction<Draft<T>[]>) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      },
      fetchError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload;
      },
      toggleModal: (state, action: PayloadAction<null | Draft<T>>) => {
        state.modal = {
          opened: !state.modal.opened,
          formData: action.payload,
          loading: false,
        };
      },
      submitModalStart: (state) => {
        state.modal.loading = true;
      },
      submitModalSuccess: (state) => {
        state.modal = {
          opened: false,
          formData: null,
          loading: false,
        };
      },
      submitModalError: (state) => {
        state.modal.loading = false;
      },
    },
  });

  const {
    fetchStart,
    fetchSuccess,
    fetchError,
    submitModalStart,
    submitModalSuccess,
    submitModalError,
  } = listSlice.actions;

  const fetchList = (filter?: Filter): AppThunk => async (dispatch) => {
    try {
      dispatch(fetchStart());

      const response = await control.getAll(filter);

      dispatch(fetchSuccess(response.data));
    } catch ({ message }) {
      dispatch(fetchError(message));
    }
  };

  const create = (data: newDto<T>, filter?: Filter): AppThunk => async (
    dispatch
  ) => {
    try {
      dispatch(submitModalStart());

      await control.create(data);

      dispatch(submitModalSuccess());

      notification.success({
        message: 'Item successfully created!',
      });

      dispatch(fetchList(filter));
    } catch ({ message }) {
      dispatch(submitModalError());

      notification.error({
        message,
      });
    }
  };

  const update = (data: T, filter?: Filter): AppThunk => async (dispatch) => {
    try {
      dispatch(submitModalStart());

      await control.update(data);

      dispatch(submitModalSuccess());

      notification.success({
        message: 'Item successfully updated!',
      });

      dispatch(fetchList(filter));
    } catch ({ message }) {
      dispatch(submitModalError());

      notification.error({
        message,
      });
    }
  };

  const remove = (data: string, filter: Filter): AppThunk => async (
    dispatch
  ) => {
    try {
      dispatch(fetchStart());

      await control.remove(data);

      dispatch(fetchList());

      notification.success({
        message: 'Item successfully removed!',
      });

      dispatch(fetchList(filter));
    } catch ({ message }) {
      dispatch(fetchError(message));
    }
  };

  return {
    actions: listSlice.actions,
    thunk: {
      fetchList,
      create,
      update,
      remove,
    },
    reducer: listSlice.reducer,
  };
};
