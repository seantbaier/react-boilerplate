import AddUsers from './AddUsers';
import DisplayUsers from './DisplayUsers';
import SelectedUserDetails from './SelectedUserDetails';

const UsersManager = () => {
  return (
    <div className='container py-8 mx-auto'>
      <div className='grid grid-cols-12 gap-4 px-4'>
        <div className='col-span-4'>
          <AddUsers />
        </div>
        <div className='col-span-4'>
          <DisplayUsers />
        </div>
        <div className='col-span-4'>
          <SelectedUserDetails />
        </div>
      </div>
    </div>
  );
};

export default UsersManager;
