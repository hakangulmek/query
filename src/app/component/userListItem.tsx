import React from "react";

interface User {
  id: number;
  name: string;
}

function userListItem({ user }: { user: User }) {
  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}

export default userListItem;
