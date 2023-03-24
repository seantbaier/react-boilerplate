import { listUsers, createUser, deleteUser } from '@/api/userApi';
import { RootState } from '@/store';
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { User } from './UsersManager.types';

type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

export type UsersState = {
  selectedUserId: User['id'] | null;
  fetchUsersStatus: ApiStatus;
  addUserStatus: ApiStatus;
  deleteUserStatus: ApiStatus;
  deletingUserId: User['id'] | null;
};

const initialState: UsersState = {
  selectedUserId: null,
  fetchUsersStatus: 'IDLE',
  addUserStatus: 'IDLE',
  deleteUserStatus: 'IDLE',
  deletingUserId: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers);
export const addUser = createAsyncThunk('users/addUser', createUser);
export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userData: User) => {
    await deleteUser(userData.id);
    return userData;
  }
);

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<UsersState>(initialState),
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      usersAdapter.setAll(state, action.payload);
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
    resetUsers: () => {
      return usersAdapter.getInitialState<UsersState>(initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchUsersStatus = 'PENDING';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.fetchUsersStatus = 'SUCCESS';
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchUsersStatus = 'ERROR';
    });
    builder.addCase(addUser.pending, (state) => {
      state.addUserStatus = 'PENDING';
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      usersAdapter.addOne(state, action.payload.user);
      state.addUserStatus = 'SUCCESS';
    });
    builder.addCase(addUser.rejected, (state) => {
      state.addUserStatus = 'ERROR';
    });
    builder.addCase(removeUser.pending, (state, action) => {
      state.deletingUserId = action.meta.arg.id;
      state.deleteUserStatus = 'PENDING';
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      usersAdapter.removeOne(state, action.payload.id);
      state.deleteUserStatus = 'SUCCESS';
      state.deletingUserId = null;
    });
    builder.addCase(removeUser.rejected, (state) => {
      state.deleteUserStatus = 'ERROR';
      state.deletingUserId = null;
    });
  },
});

export const { setUsers, selectUser, resetUsers } = usersSlice.actions;

export const usersSelector = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);

export const getSelectedUser = (state: RootState) => {
  return state.users.selectedUserId
    ? usersSelector.selectById(state, state.users.selectedUserId)
    : null;
};

export const { selectAll: selectAllUsers, selectTotal: selectTotalUsers } =
  usersSelector;

export default usersSlice.reducer;
