import React from "react";
import ExpandablePanel from "./expandablePanel";
import AlbumList from "./albumList";
import { GoTrash } from "react-icons/go";

interface User {
  id: number;
  name: string;
}

function userListItem({ user }: { user: User }) {
  const headar = (
    <>
      <button style={{ marginRight: "10px", border: "none" }}>
        <GoTrash size={20} color="red" />
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

export default userListItem;
