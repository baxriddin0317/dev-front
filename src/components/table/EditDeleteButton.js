import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import Tooltip from '../tooltip/Tooltip';

function EditDeleteButton({ id, handleUpdate, handleModalOpen }) {
  return (
    <div className="flex justify-end text-right">
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleUpdate(id)}
        className="p-2 cursor-pointer text-[#9E9E9EFF] hover:text-green-600"
      >
        <Tooltip id="edit" Icon={FiEdit} title="Edit" bgColor="#10B981" />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => handleModalOpen(id)}
        className="p-2 cursor-pointer text-[#9E9E9EFF] hover:text-red-600"
      >
        <Tooltip id="delete" Icon={FiTrash2} title="Delete" bgColor="#EF4444" />
      </div>
    </div>
  );
}

export default EditDeleteButton;
