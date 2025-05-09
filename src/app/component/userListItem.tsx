import React from "react";
import ExpandablePanel from "./expandablePanel";
import AlbumList from "./albumList";
import { GoTrash } from "react-icons/go";
import { useRemoveUserMutation } from "../store";
import CircularProgress from "@mui/material/CircularProgress";

interface User {
  id: number;
  name: string;
}

function UserListItem({ user }: { user: User }) {
  const [removeUser, result] = useRemoveUserMutation();
  const handleRemoveClick = () => {
    removeUser(user);
  };
  const headar = (
    <>
      <button
        style={{ marginRight: "10px", border: "none", cursor: "pointer" }}
        onClick={handleRemoveClick}
      >
        {result.isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <GoTrash size={20} color="red" />
        )}
      </button>
      {user.name}
    </>
  );
  return (
    <div>
      <ExpandablePanel header={headar}>
        <AlbumList user={user} />
      </ExpandablePanel>
    </div>
  );
}

export default UserListItem;
