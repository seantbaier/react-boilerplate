import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './UsersManager.types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { listUsers, createUser, deleteUser } from '@/api/userApi';

export type UsersState = {
  selectedUserId: User['id'] | null;
  deletingUserId: User['id'] | null;
};

const initialState: UsersState = {
  selectedUserId: null,
  deletingUserId: null,
};

export const usersApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      queryFn: async () => {
        return {
          data: await listUsers(),
        };
      },
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<{ user: User }, User>({
      queryFn: async (user) => {
        return {
          data: await createUser(user),
        };
      },
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation<boolean, User>({
      queryFn: async (user) => {
        await deleteUser(user.id);
        return {
          data: true,
        };
      },
      invalidatesTags: ['Users'],
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        dispatch(setDeletingUserId(user.id));
        await queryFulfilled;
        dispatch(setDeletingUserId(null));
      },
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
} = usersApiSlice;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
    setDeletingUserId: (state, action: PayloadAction<string | null>) => {
      state.deletingUserId = action.payload;
    },
    resetUsersSlice: () => {
      return initialState;
    },
  },
});

export const resetUsersApiSlice = () => usersApiSlice.util.resetApiState();

export const initialiseUsersApi = () =>
  usersApiSlice.endpoints.fetchUsers.initiate();

export const { selectUser, setDeletingUserId, resetUsersSlice } =
  usersSlice.actions;

export const getSelectedUser = (users?: User[]) => (state: RootState) => {
  return users && state.users.selectedUserId
    ? users.find((user) => user.id === state.users.selectedUserId)
    : null;
};

export default usersSlice.reducer;
